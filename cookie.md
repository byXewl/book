### **cookie**
一般用于第一访问时给客户端一些东西，让他以后访问都带上这个东西。每个域名的cookie不同。
javaweb默认一次浏览器访问会给一个随机的JSESSIONID在cookie。
<br>
<br>
返回对象中响应在响应头加set-cookie
浏览器会把cookie保存到本地
之后每次访问同一网站的同一应用，自动在请求头携带cookie
请求对象中获取cookie



```
//Cookie配置
maxAge:
负数，临时cookie，关闭浏览器就清除。
0正数，失效时长（秒）,常配合使用7天免登陆记住我功能。

secure:是否强制使用安全传输HTTPS,默认false，默认让http也可以使用。
path:/app
domain: .baidu.com域

//响应包例子：
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: sessionId=abc123; Path=/; Max-Age=3600; Secure; HttpOnly
```
```
//响应对象设置Cookie
Cookie cookie = new Cookie("java","yyds");
cookie.setMaxAge(20);//20秒失效
resp.addCookie(cookie);

//请求对象获取Cookie
Cookie[] cookies = req.getCookies(); 
if (cookies != null) {
     for (Cookie cookie : cookies) {
         String name = cookie.getName();
         String value = cookie.getValue(); 
          // 在这里对每个Cookie进行处理 
        System.out.println("Cookie Name: " + name + ", Value: " + value);
     }
 }

```

## **跨域**
