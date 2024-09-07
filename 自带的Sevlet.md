
Tomcat默认安装两个Servlet：

1. **DefaultServlet**: DefaultServlet是Tomcat的默认Servlet，负责处理静态资源文件，例如HTML、CSS、JavaScript、图像等。当你在浏览器中请求这些静态资源时，DefaultServlet会处理并将它们返回给客户端。
2. **JspServlet**: JspServlet用于处理JSP文件负责编译和管理JSP页面。JSP是一种在服务器端生成动态网页内容的技术，类似于PHP或ASP。当你的应用程序包含JSP页面并向Tomcat请求这些页面时，JspServlet会处理JSP文件，执行其中的Java代码，并生成HTML响应。

这两个Servlet的配置通常在Tomcat的conf/web.xml文件中
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">

    <!-- Servlet mapping for DefaultServlet -->
    <servlet>
        <servlet-name>default</servlet-name>
        <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
        <init-param>
            <param-name>debug</param-name>
            <param-value>0</param-value>
        </init-param>
        <init-param>
            <param-name>listings</param-name>
            <param-value>false</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!-- Servlet mapping for JspServlet -->
    <servlet>
        <servlet-name>jsp</servlet-name>
        <servlet-class>org.apache.jasper.servlet.JspServlet</servlet-class>
        <init-param>
            <param-name>fork</param-name>
            <param-value>false</param-value>
        </init-param>
        <init-param>
            <param-name>xpoweredBy</param-name>
            <param-value>false</param-value>
        </init-param>
        <load-on-startup>3</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>jsp</servlet-name>
        <url-pattern>*.jsp</url-pattern>
    </servlet-mapping>

</web-app>
```