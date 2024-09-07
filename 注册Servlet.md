### **注解注册Servlet**
**@WebServlet:**
一般放在开发者自定义继承HttpServlet的类上，配置不当会让有的Servlet访问不到。
**常见用法：**
```
@WebServlet("/login")
一般必须有/，否则为有通配符情况下("*.html")。

@WebServlet("/test/*")
访问/test/a   /test/b/c均可达。

@WebServlet("/")
没有找到的路径都来访问这个Servlet，不会出现404情况，注意访问静态资源也会到这而访问不到静态资源。

@WebServlet(name="MyServlet",value={"/a","/b"},loadOnStartup = 1)
多个访问路径找这个Servlet。这个Servlet在tomcat启动时就实例化，如有数据库操作耗时（数字越小越先）。

@WebServlet(name="MyServlet",value="/my")
@WebServlet(name="MyServlet",urlPatterns="/my")
两者效果相同，指明了名字后，一定要指明路径。
```
.
<br>
<br>
<br>
### **XML注册Servlet**
**在web.xml中配置**
1.定义Servlet
2.配置路径映射
例：
```
<servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>com.xxx.servlet.user.LoginServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/login.do</url-pattern>
</servlet-mapping>
```
