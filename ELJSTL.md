**EL\JSTL:**
EL和 JSTL是用于在JSP中处理动态内容和简化标签使用的两种相关技术。


# **EL（Expression Language）**:

   * EL 是一种表达式语言，用于在JSP2.0页面中访问和处理数据。
   * 它提供了一种简化的方式来访问Java对象的属性、调用方法和执行算术运算等。
   * EL 通常用于替代传统的Java代码片段，使JSP页面更容易阅读和维护。
   * EL 表达式通常使用`${}`包围，例如`${user.name}`，它可以访问`user`对象的`name`属性。

 示例：
### **使用requst属性：**
req.setAttribute("user",user)；
使用 EL 访问属性：
```
<p>Welcome, ${requestScope.user.name}!</p>
```
```
<p>Welcome, ${user.name}!</p>
作用域：page < request < session < application
当使用 EL 表达式时，它们会按照上述顺序依次查找属性。
```
判断检测对象是否为 null、空字符串、空数组、空集合或空 Map：
```
${empty user}
```

### **使用 session 属性:**
```
HttpSession session = request.getSession();
session.setAttribute("user", user);
```
在 JSP 页面中使用 EL 表达式访问会话中的属性：
```
<p>Welcome, ${sessionScope.user.name}!</p>
```
### **使用 cookie 属性：**
```
<p>${cookie.username}</p>
```

### **使用 application 属性：**
```
ServletContext context = request.getServletContext();
context.setAttribute("user", user);
```
在 JSP 页面中使用 EL 表达式访问应用程序（application）范围中的属性：
```
<p>Welcome, ${applicationScope.user.name}!</p>
```

### **EL函数:**
让在EL中可以调用的函数
```
<td>${myfn:fmtMoney(item.book.price) } </td>
```
默认有常见EL函数，也可自定义EL函数类配置tld的xml定义函数。


^
^
# **JSTL（JavaServer Pages Standard Tag Library）**:

jakarta.servlet.jsp.jstl-2.0.0.jar
jakarta.servlet.jsp.jstl-api-2.0.0.jar
tomcat10引入使用需要。

   * 引入JSTL的包 jstl.jar等
   * jsp文件头引入标签库
   * JSTL 是一组自定义标签，用于在JSP页面中执行常见的控制结构和数据操作，例如循环、条件语句、迭代集合等。
   * JSTL 提供了多个标签库，包括核心标签库（c标签库）、格式化标签库（fmt标签库）、XML标签库（xml标签库）等。
   * JSTL 标签可以大大简化JSP页面中的控制逻辑，使页面更易读和维护。
   * JSTL 标签通常使用`<c:tag>`格式，例如`<c:forEach>`用于循环迭代。

   示例使用 JSTL 进行循环迭代：

   ```
   <c:forEach items="${userList}" var="user">
       <p>${user.name}</p>
   </c:forEach>
   ```
```
在JSP页面中使用JSTL标签库中<c:forEach >标签，需要：
需要在项目中提供jtsl的jar包
需要在jsp文件中添加：<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
需要在forEach标签的items属性中使用EL表达式指定服务器端提供的数据，如<c:forEach items="${adminUsers }" var="admin" >
```
