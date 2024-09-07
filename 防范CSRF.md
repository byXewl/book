1. 在表单中嵌入CSRF令牌随机token，该随机token不存于cookie中，需要主动携带。spring security防csrf时采用此方法。csrf_token可以放入redis等。

2. 关键的操作前加验证（如：加验证码。改密码前先输入旧密码。）

3. 验证Referer是否为源网站。 即使是ajax在浏览器中是不能自定义Referer发起请求的。
>当使用本地文件（file://）发起表单请求时，Referer 头字段通常会被设置为空字符串或者被指定为 `null`。以及origin:null，这是因为 `file://` 协议通常被认为是没有来源（origin）的请求，因此 Referer 头字段不包含有效的来源信息。
Referer 头字段通常包含了请求的来源页面的 URL，用于告知服务器请求是从哪个页面跳转过来的。在 Web 安全方面，Referer 头有时会用于检测 CSRF（Cross-Site Request Forgery）攻击，但在一些情况下，它可能会受到安全政策的影响而被设置为空。

4. 对cookie设置SameSite
Set-Cookie: cookieName=cookieValue; SameSite=Strict;
Strict（严格）： 如果设置为 Strict，那么浏览器仅在请求目标站点的情况下才会发送 Cookie。即，只有在目标站点的 URL 与发起请求的站点完全匹配时，Cookie 才会被发送。这有助于防范 CSRF 攻击。


5. 不使用cookie，使用jwt放在本地缓存存储，请求时放请求头。

