## **系统日志**
计算机-计算机管理-服务管理器-诊断-事件查看器-
可以查看windows日志 或 应用程序和服务日志。

windows日志：
安全：有登录成功(审核成功)，失败日志的ip。可看是否有3386远程登录爆破。SMB爆破。
如果是域内，Kerberos协议，是记录mac地址。

应用程序和服务日志：
Exchange：邮箱服务记录。

日志策略开启强化：
在默认情况下，安全日志仅仅只记录一些简单的登录日志。需要记录详细的安全日志，则需要通过修改本地策略来启用其它项的安全日志记录功能。通过win+r->gpedit.msc打开本地策略编辑。
计算机配置-Windows设置-安全设置-本地策略-审核策略

^
## **计划任务**

要添加计划任务，你可以使用schtasks 命令，并提供必要的参数。以下是一个示例：
```
schtasks /create /tn "MyTask" /tr "C:\path\to\your\program.exe" /sc daily /st 09:00
这个命令将创建一个名为 "MyTask" 的计划任务，每天在上午 9 点运行指定的程序。
```

查看计划任务：
要查看计划任务，可以使用 schtasks命令，并提供 /query 参数。以下是一个示例：
```
schtasks /query /fo LIST /v
```
也可以使用PChunter等工具分析。
