在访问量极大的一些页面上的XSS可以攻击一些小型网站，实现DDOS攻击的效果。
1. `<img>` 标签：当 `<img>` 标签的 `src` 属性包含 URL 时，浏览器会自动发送 GET 请求以获取图片资源。
2. `<script>` 标签：当 `<script>` 标签的 `src` 属性包含 URL 时，浏览器会自动发送 GET 请求以获取 JavaScript 文件。
3. `<link>` 标签：当 `<link>` 标签的 `href` 属性包含 URL 时，浏览器会自动发送 GET 请求以获取外部样式表文件。
4. `<iframe>` 标签：当 `<iframe>` 标签的 `src` 属性包含 URL 时，浏览器会自动发送 GET 请求以获取嵌入的网页内容。

