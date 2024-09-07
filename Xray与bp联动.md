文档：<https://docs.xray.cool/#/scenario/burp>
场景：与bp联动扫描APP，小程序等。

^
## **bp转发代理到xray进行被动扫描**
bp配置上层代理为127.0.0.1:7777
>Proxy->Proxy settings->找到Upstream Proxy Servers
   add添加代理：Destination hostProxy hostProxyport
   目标主机填：*，代理主机填：127.0.0.1，端口填：7777

xray监听127.0.0.1:7777进行被动扫描。
```
/xray webscan --listen 127.0.0.1:7777 --html-output  xray-bp.html
```