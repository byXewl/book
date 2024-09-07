Xray（长亭研发，先python后go）:<https://docs.xray.cool/#/README>
主要基于被动扫描（手动访问网站页面，也可主动扫描）
和可以配合ceye的外链，反连平台。
配合维护的POC，扫描中间件漏洞等。
配合bp被动收集。
^
图形化界面：Super Xray
^

## **基础使用**
学习，进阶，联动：<https://www.sqlsec.com/2020/04/xray.html>
下载：<https://download.xray.cool/xray/1.9.6>
安装：<https://blog.csdn.net/weixin_44369049/article/details/131205774>

```
程序目录cmd：
安装证书(https):
/xray_windows_amd64.exe genca

浏览器代理：127.0.0.1:7777


Xray开启代理：
/xray webscan --listen 127.0.0.1:7777 --html-output xray-testphp.html

漏洞报告的输出的文件名为：xray-testphp.html

执行后程序根目录出现一个config.yml配置文件
config.yml:如何扫描，扫描什么，什么不扫描的配置
测XSS很强，文件包含不太行

开启后边点网站，边输入搜索参数，边扫描(漏洞红色)出报告。
```
```
配置自己公网服务器，用于一些无回显漏洞扫描。
```