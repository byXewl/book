## **at提权**
利用条件：Windows2000、Windows2003、WindowsXP这三类系统中，个人电脑不行。
Windows2008后改为sc命令了。

at是一个发布定时任务计划的命令行工具，语法比较简单。通过at命令发布的定时任务计划Windows默认以SYSTEM权限运行。

定时打开一个system权限的cmd
```
at 10:45 /interactive cmd
```

## **sc提权**
利用条件：windows7/8，Windowsserver2003、2008、2012、2016存在sc命令。但多少有防护，Windowsserver2003最容易。

创建cmd服务，启动服务
```
sc Create systemcmd binPath= "cmd /K start" type= own type= interact  
其中systemcmd是服务名称可以随意填写，
binpath是启动的命令，type=own是指服务这个服务属于谁，
type=interact，cmd/k start 这个命令，这个命令就是启动一个新的cmd窗口。

sc start syscmd     
启动服务
```

## **ps提权（最好）**
利用条件：Windowsserver2003/2008/2012/2016中测试都是能用的，在Windows7/8/10由于需要调用服务，而个人主机通常没有这类服务所以就会出现调用失败的情况。

pstools是微软官方工具，是为windows提供的第三方工具库。需要手动安装，是自带免杀的。
<https://learn.microsoft.com/zh-cn/sysinternals/downloads/pstools>

启动一个system权限的cmd
```
psexec.exe -accepteula -s -i -d cmd.exe  
```


## **利用**
使用system权限的cmd 运行上线后门，实现高权限上线。