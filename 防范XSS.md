**1.引用第三方链接，设置crossorigin="anonymous"**

`crossorigin="anonymous"` 是一个用于指定资源（例如图片、脚本、样式表等）跨域请求的 HTML 属性。

当你引用来自其他域的资源（比如通过 CDN 引入的文件）时，浏览器可能会执行跨域请求。这个属性告诉浏览器，即使跨域请求，也不会包含用户的身份验证凭证（例如，cookies、HTTP认证和客户端 SSL 证书等）。

在 `script` 或 `link` 标签中使用 `crossorigin="anonymous"`，告诉浏览器以匿名方式处理来自其他域的资源，不传递用户的任何凭据。这可以帮助防止某些安全风险，例如某些跨站点攻击（如跨站点脚本攻击）。

示例中的代码：

```
<script src="https://example.com/script.js" crossorigin="anonymous"></script>
```

告诉浏览器从 `https://example.com/script.js` 获取脚本文件时，不要传递任何用户的凭证，以匿名方式获取该资源。

**2.开启HttpOnly**
Cookie被标记为HttpOnly后，JS将无法访问操作Cookie，只能对应站点自动携带对应Cookie。只能CSRF跨站请求伪造。
```
在HTTP响应头中设置Cookie时，在Set-Cookie头中添加HttpOnly标志来启用HttpOnly。
Set-Cookie: mycookie=myvalue; HttpOnly
```

**3.使用HTML实体化编码**
vue中使用v-html，所有标签不解析到页面
htmlspecialchars()；实体化编码函数
stripslashes();去掉\字符

**4.加网站WAF**
**5.输入时校验，浏览器与web应用端采用相同的字符编码**