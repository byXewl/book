MITM交互式中间代理劫持
^
**启动代理**：
1. 免配置启动：内置代理的谷歌浏览器。
2. 本地浏览器代理：下载证书安装，浏览器设置代理，点击劫持启动。
支持国密劫持（那种用burp开代理站就访问不了，不开就能访问那种）。
以及使用插件。
下游代理：再一层代理，飞机 或 配合xray被动扫描代理。

^
**规则设置**：正则匹配，关键词内容匹配。可匹配请求和响应中的字符设置不同的提示或替换对应字符。
默认有自带规则，也可以添加自定义规则


^
**历史记录**：
在左上角有History列表所有请求纪录，里面有代理的请求历史列表，右键可以进行更多操作：
发送到Fuzzer(测试器，重发器)，数据包漏洞扫描等。

^
**过滤器**：过滤不需要拦截的请求包。
包含：要测试拦截的域名。
排除：不要拦截的域名。

^
**Websocket劫持**
wss://
点击Fuzz进入Websocket Fuzzer。