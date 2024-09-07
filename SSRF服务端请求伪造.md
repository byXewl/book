Server-side Request Forgery（SSRF）：网站及服务端提供了从其他服务器应用获取数据的功能，且没有对目标地址做过滤与限制，攻击者可以从该功能进行SSRF攻击，获取主机信息，访问内网，收集内网信息攻击内网等。



php ssrf中的伪协议：
```
file dict sftp ldap tftp gopher
```

Java ssrf 中的伪协议：
```
file ftp mailto http https jar netdoc
```
<https://www.cnblogs.com/nice0e3/p/13682434.html>

