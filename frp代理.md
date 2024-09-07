以下不支持
## **使用frp进行socks5代理**
服务端配置文件：
```
[common]
bindPort = 7000
# web页面，默认为 127.0.0.1，如果需要公网访问，需要修改为 0.0.0.0。
webServer.addr = "0.0.0.0"
webServer.port = 7500
# dashboard 用户名密码，可选，默认为空
webServer.user = "admin"
webServer.password = "admin"
[auth]
method = "token"
token = "12345678"
```

^
客户端配置文件：
```
[common]
# frps服务端地址
serverAddr = "47.x.x.x"
serverPort = 7000
# frpc.toml
webServer.addr = "127.0.0.1"
webServer.port = 7400
webServer.user = "admin"
webServer.password = "admin"
[auth]
method = "token"
token = "12345678"


[[proxies]]
name = "plugin_socks5"
type = "tcp"
remotePort = 1080
[proxies.plugin]
type = "socks5"
username = "abc"
password = "abc"
```
启动服务端：
./frps -c ./socks5.ini

启动客户端：
./frpc -c ./socks5.ini