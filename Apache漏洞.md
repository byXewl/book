跨平台web服务器
回显的nginx，也可能是apche
## **Apache解析漏洞**
<https://blog.csdn.net/qq_41617034/article/details/105069094>
Apache HTTPD 多后缀解析漏洞
上传的文件中只要包含.php都能被解析


文件的文件名test.php.aaa.bbb
文件名后缀不属于Apache解析的黑名单，或白名单
自动从bbb的位置开始解析，不属于，又会向左aaa，直到能解析到php,最终成功解析成PHP脚本执行。
test.php.aaa.jpg访问也访问test.php.aaa.jpg会解析php

^
## **目录遍历原理**
程序在实现上没有充分过滤用户输入的.之类的目录跳转符，导致恶意用户可以通过提交目录跳转来遍历服务器上的任意文件。这里的目录跳转符可以是../，也可是../的ASCII编码或者是unicode编码等。目录遍历的标志：Indexof/防御措施：修改httpd.conf文件中的参数



^
## **Apache HTTPD 换行解析漏洞（CVE-2017-15715）**
一个文件上传，文件名使用的$_POST['name']获取，而不是file。有后缀黑名单，不能php123等
那么在name后加一个0A，即可绕过黑名单并解析PHP。注意不是0D 0A
```
1.php bp16进制后门加一个0a

此时访问1.php%0a成功解析
```


