## **OWASP Top 10漏洞**
<https://www.freebuf.com/vuls/379157.html>
```
1、注入
2、XML外部实体注入
3、XSS跨站脚本攻击
4、失效的身份认证
5、失效的访问控制
6、敏感数据泄露
7、安全配置错误
8、不安全的反序列化
9、不足的日志记录和监控
10、使用含有已知漏洞的组件

看面试题觉得top16这么分
1.SQL注入
2.跨站点脚本攻击（XSS）漏洞
3.XXE漏洞
4.服务器端请求伪造（SSRF）漏洞
5.跨站点请求伪造（CSRF）漏洞
6.跨域资源共享（CORS）漏洞
7.远程执行代码（RCE）漏洞
8.越权漏洞（IDOR）漏洞
9.未授权访问漏洞
10.逻辑漏洞
11.弱口令漏洞
12.Oauth认证缺陷漏洞
13.重定向漏洞
14.jsonp漏洞
15.文件操作漏洞
16.条件竞争漏洞
```
## **危害**
OWASP Top 10漏洞可能带来严重的安全危害。
例如:
注入漏洞允许攻击者执行未授权数据库操作，可能导致敏感数据泄露。
失效的身份验证使弱密码和会话劫持成为现实，威胁用户账户安全。
敏感数据暴露可能导致隐私泄露和身份盗窃。
XXE漏洞可使攻击者读取敏感文件，引发信息泄露风险。
失效的访问控制可能导致越权访问，影响关键数据完整性。
安全配置错误使得未经审查的设置成为攻击入口，可能暴露服务器信息。
XSS漏洞允许攻击者注入恶意脚本，危及用户隐私。
不安全的反序列化可能导致远程代码执行，增加攻击面。
使用有漏洞的组件可能使应用易受攻击，引发未授权访问。
未经验证的重定向可能导致用户被引导至恶意站点，威胁用户凭证安全。



## **严重：**
sql注入getshell，文件上传getshell等
## **高危：**
SQL注入，文件上传，文件包含解析，任意读文件，代码执行，未授权访问，用户信息泄露
## **中危：**
逻辑漏洞，存储型xss
token复用
## **低危：**
文件泄露，目录列表遍历，网站没有使用https安全传输，

OPTIONS请求404的页面，测试可请求方法(如果能响应，且响应中有可PUT，则网站存在不安全的请求方法)

mysql错误日志泄露

任意url跳转可定制

用户登录账号密码直接明文放在请求头的url，服务器访问日志都能直接看到。
>服务器访问日志通常会记录请求头的信息，但不仅限于请求头。它还会记录请求的其他相关信息，如请求的方法（GET、POST 等）、请求的 URL、请求的时间、客户端的 IP 地址、响应状态码、响应体大小等。

^
过时的jq：
jq的dom型xss，控制台输入弹窗
```
$("element[attribute='< img src=x onerror=alert(1)>'")
```
^
<http://mp.weixin.qq.com/s?__biz=MzkyMDUzMzY1MA==&mid=2247496382&idx=1&sn=01ebf46009a5a858ac634d55ee26905f&chksm=c193dd43f6e45455001a803374b5c069cb2fdf344b27b9c9c4dd9f0ea522b67a3925c45e724c&mpshare=1&scene=24&srcid=0110X3Fe2cIJqUU6CIAh2mic&sharer_shareinfo=79fb1cd132aaa093520654e75da97ab6&sharer_shareinfo_first=ad460299c710b41109867d24b639f3be#rd>
^
<https://ccc-f.github.io/posts/3bae2a35>
## **其他：**
漏洞学习专栏：<https://www.zhihu.com/column/CISP-PTE>

漏洞模板：<https://web.sqlsec.com/storage/attachments/2023/07/01/wrjhhYU9gzLzfqicJ3vXNP47wzQJvMT51EGH4TPS.pdf>

