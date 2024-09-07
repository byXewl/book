## **windows应急**
一、查看系统账号安全
1、查看服务器是否有弱口令、可疑账号、隐藏账号、克隆账号、远程管理端口是否对公网开放
2、win+r（eventwmr.msc）查看系统日志，查看管理员登录时间、用户名是否存在异常

3、查看历史命令：windows查看历史命令
type %userprofile%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
type %appdata%\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt

二、检查异常端口、进程
1、netstat -ano 检查端口连接情况，是否有远程连接、可疑连接
2、tasklist | findstr "PID"根据pid定位进程
3、使用功能查杀工具

三、启动项检查、计划任务、服务
1、检查服务器是否有异常的启动项，msconfig看一下启动项是否有可以的启动
2、检查计划任务，查看计划任务属性，可以发现木马文件的路径
3、见擦汗服务自启动，services.msc注意服务状态和启动类型，检查是否有异常服务

四、检查系统相关信息
1、查看系统版本以及补丁信息 systeminfo
2、查找可以目录及文件 是否有新建用户目录 分析最近打开分析可疑文件（%UserProfile%\Recent）

五、自动化查杀
使用360 火绒剑 webshell后门可以使用d盾 河马等

六、日志分析
360星图日志分析工具 ELK分析平台

