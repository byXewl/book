### **session**
辨别当前请求来自哪个用户发起，实现用户登录后同一个浏览器的所有请求，就属于同一个会话。

session是一个对象，是中心式的存储在服务器端，服务器端可以同时存储多个session对象（多个用户同时登录）。
^
>用户请求服务器tomcat会自动给用户一个sessionID(JSESSIONID，不同会话值不同，默认勾选HttpOnly不允许js更改)放在cookie中自动携带（如果用户禁用cookie用URL重写提供），由于cookie在用户端sessionID也可能被篡改盗取。
用户登录成功时，服务端可通过自动req.getSession() (根据的sessionID值)  获取session对象(有则获取，无则创建)，并可在这个session对象中存储用户信息。
之后用户请求服务端自动通过请求的sessionID找到存储在服务器对应的session对象，可查看session对象对象是否有用户信息判断用户是否登录。
^
>java的session默认存储在内存中，也可配置序列化存储（对象存储到HttpSession 中一般要求该对象的类实现Serializable接口）。
php的session数据默认序列化存储在文件中。

^
利用HttpServletRequest对象中提供的getSession()方法可以自动通过sessionID获取请求所在的会话对象，如果会话不存在就创建一个新会话对象。不用开发者手动创建，开发者只需要获取会话对象。
每个用户访问的 HttpSession对象是不同的。
当用户首次访问服务器时，服务器会为该用户创建一个新的 HttpSession 对象，并为其生成一个唯一的会话ID。这个会话ID通常通过cookie发送到客户端，或者在URL中进行传递，以便在用户的后续请求中识别和检索相应的会话。
如果用户在之后的请求中提供了有效的会话ID（通常是通过cookie），服务器将使用该ID来检索与该用户关联的 `HttpSession` 对象，而不会创建新的会话对象。
所以，对于相同的会话ID，服务器会将其映射到相应的 `HttpSession` 对象，以确保与特定用户关联的会话状态能够被正确地维护。如果会话ID不同，那么每个用户都将有自己独立的 `HttpSession` 对象。
会话对象可以setAttribute
也可以getAttribute
^
```
当前用户登录成功后，将用户对象加入到session中，需要用户对象信息时就从Session中拿。
// 请求对象获取session，存储数据到Session
HttpSession session = req.getSession();
session.setAttribute("user", user);

// 请求对象获取session，从Session中获取数据
HttpSession session = req.getSession();
User user = (String) session.getAttribute("user")



销毁session会话:
1.关闭浏览器，原sessionID丢失，有些 Web 客户端（如浏览器）提供了会话恢复功能，它们可以在浏览器重新打开时还原之前的会话状态。
2.会话结束，退出登录按钮，方法主动销毁 session.invalidate(); 此时sessionID也会消失而重置。
3.服务器重启
4.写入session开始，没有请求该session,则默认时间是30分钟后销毁，xml中配置
```