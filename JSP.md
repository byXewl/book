一种模板引擎，会造成前后端耦合重。

1.Tomcat默认有两个Servlet，一个用于请求静态资源，一个用于处理jsp的JspServlet。
每一个jsp部署在服务器也是源代码的文件，被访问时Tomcat才处理后也是一个Servlet(xx_jsp.java)，html页面则被字符串输出。
2.开发者自己的Servelt可以请求转发或重定向到jsp:
req.getRequestDispatcher("list.jsp").forward(req, resp);
jsp中也可重定向到Servelt等。
3.JspServlet的路径映射：
```
<servlet-mapping>
        <servlet-name>jsp</servlet-name>
        <url-pattern>*.jsp</url-pattern>
        <url-pattern>*.jspx</url-pattern>
</servlet-mapping>
```
4.模板代码：
```
标签：`<%`和`%>`用于嵌入Java代码，`<%= %>`用于输出Java表达式的结果
<% System.out.println("666"); %>//输出在idea控制台
<%="666" %>//输出在前端页面，表达式不能有;
<% out.println("Hello"); %> //输出前端页面

注释： 使用`<%-- --%>`标签添加注释，注释内容不会被发送到客户端浏览器。
内置对象： JSP页面中有一些内置对象，如`request`、`response`、`session`、`out`等，可以在JSP页面中直接使用，无需声明。
```
.
.


