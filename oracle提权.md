Oracle一般搭配java，而java获取webshell后一般就是system，root权限了。

对于Oracle提权：
知道数据库账号密码，如果是DBA账号，命令执行就已经是system权限了。
使用工具OracleShell提权，利用。

^
防护：
`DBA:`拥有全部特权，是系统最高权限，只有DBA才可以创建数据库结构
`RESOURCE:`拥有Resource权限的用户只可以创建实体，不可以创建数据库结构
`CONNECT:`拥有Connect权限的用户只可以登录Oracle，不可以创建实体，不可以创建数据库结构
对于普通用户：授予connect，resource权限
对于DBA用户：授予connect，resource，dba权限