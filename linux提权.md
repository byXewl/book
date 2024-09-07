## **Linux提权方法**
内核(脏牛、脏管道、Ubantu)，借助数据库，第三方服务，SUID&GUID提权，定时任务，环境变量，SUDO，权限不当等

Web用户->root：
SUID提权
脏牛漏洞(CVE-2016-5195)
脏管道Dirty Pipe(CVE-2022-0847)

本地用户提权：
SUID提权
脏牛漏洞(CVE-2016-5195)
脏管道Dirty Pipe(CVE-2022-0847)
SUDO(CVE-2021-3156)
Polkit(CVE-2021-4034)
Ubantu内核提权
权限不当


## **Linux提权利用**
基础信息收集：
<https://blog.csdn.net/weixin_44268918/article/details/129907425?spm=1001.2014.3001.5501>

探测工具：
```
命令：
查看系统版本内核版本
hostnamectl
是否有sudo漏洞
sudoedit -s /  （报错：提示/不是常规文件 则存在漏洞）


一个综合类探针：
traitor   ./traitor-amd64   
go语言程序，即可以信息收集安全配置，也可以探测cve提权。

一个自动化提权：
BeRoot（集成了gtfobins&lolbas） 
py综合脚本，支持Windows，Linux自动化提权。

两个信息收集：
LinEnum.sh 探测当前linux可能的安全配置问题，suid提权，定时任务，环境变量等。（不对cve做检测）
linuxprivchecker.py 探测安全配置。

两个漏润探针：    
linux-exploit-suggester2.pl 探测当前linux可能存在的cve提权，perl脚本一般可在linux直接运行。
linux-exploit-suggester.sh (les.sh) 探测当前linux可能存在的cve提权
```



工具使用：
```
各种exp，一般是c或cpp文件，受害机上wget下载 或 手动上传受害主机(一般/tmp目录，借助webshell或msf或Xftp等)，编译运行。

msf会话中上传文件：
upload /root/les.sh /tmp/les.sh
shell chmod +x les.sh
```
^
一般利用webshell工具或msf利用获取普通权限shell，再通过webshell管理工具，xshell/xftp，msf，wget等上传获取探测工具脚本如les.sh发现提权漏洞，再进行上传提权exp编译运行提取到root权限。