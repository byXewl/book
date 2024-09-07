Xray监听127.0.0.1:7777进行被动扫描。
```
/xray webscan --listen 127.0.0.1:7777 --html-output  xray-bp.html
```
awvs设置目标，设置Proxy Server代理为127.0.0.1:7777，即可主动扫描时也转发到了Xray。
也可转到bp的:8080，bp再转代理到Xray的:7777。