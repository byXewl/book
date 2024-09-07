当网站有文件上传，且可以回显。
<tps://blog.csdn.net/weixin_66717977/article/details/131484050>
迅捷PDF编辑器
新建pdf
左下角页面属性
加js
嵌入js代码：app.alert('xss')
保存
文件上传回显url即可。


## **防范：**
1.作为网站管理员或开发者，可以选择强迫浏览器下载 PDF 文件，而不是提供在线浏览等，或修改 Web 服务器配置的 header 和相关属性。
响应头：Content-Disposition: attachment



2.使用第三方插件解析pdf，不用chrome自带的pdf解析就行，https\://github.com/adobe-type-tools/cmap-resources

