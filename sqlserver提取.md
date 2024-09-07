sqlserver提权方法：
需要先获取SA用户。弱口令爆破，配置文件中泄露。
利用默认带有的扩展组件xp_cmdshell，sp_OACreate，沙盒

防御：关闭或删除sys.xp_cmdshell等的对应组件。但是就算关闭删除，也可能可以打开和恢复。
## **利用MSF弱口令mssql提权**
数据库密码爆破
```
mssql_login模块
```
命令执行模块
```
auxiliary/admin/mssql/mssql_exec
```
反弹shell模块
```
exploit/windows/mssql/mssql_clr_payload
```

