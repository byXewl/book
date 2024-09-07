用户与用户组
```
whoami //当前登录用户

net user //列出系统中所有账户。
默认可能有四个用户：
Administrator: 这是系统管理员账户，具有最高权限。
DefaultAccount: Windows 10 中的一个预定义账户，通常用于一些系统服务和应用程序。这个账户通常处于禁用状态。
Guest: 系统的默认访客账户，提供一个有限权限的访客访问选项。
WDAGUtilityAccount: 用于支持 Windows Defender Application Guard 功能。系统自动生成，用于安全隔离应用程序。


net user administrator  //查看账号信息，账户所属组
net user administrator P@ssw0rd   //修改账号密码


开启来宾用户GUEST
net user guest /active yes //开启
net user guest /active no  //关闭

查看管理员组的成员
net localgroup administrators
查看普通用户组的成员(新增用户默认加入这个组)
net localgroup users
查看来宾组的成员(自带的guest用户默认加入这个组)
net localgroup guests
查看远程登录的用户组
net localgroup "Remote Desktop Users"

```
用户提权
```
管理员权限打开终端：
将guest用户加入管理员组
net localgroup administrators guest /add

创建一个用户hacker
net user hacker 123456 /add

将hacker用户加入管理员组，有远程登录权限。
net localgroup administrators hacker /add

登录hacker账户
runas /user:hacker "tsdiscon" 
tsdiscon 命令前往登录界面登录
或远程登录hacker账户


Windows默认同时只能登录一个账号,另一个下线。
Windows Server版，支持远程桌面多用户登陆。
linux支持远程多用户登录。
```