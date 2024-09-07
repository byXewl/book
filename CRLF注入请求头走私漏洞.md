## **CRLF注入漏洞**
原理：CRLF是”回车+换行”（rn)的简称，其十六进制编码分别为0x0d和0x0a。
在HTTP协议中,HTTP header与HTTP Body是用两个CRLF分隔的,浏览器就是根据这两个CRLF来取出HTTP内容并显示出来。所以，一旦我们能够控制HTTP消息头中的字符，注入一些恶意的换行，这样我们就能注入一些会话Cookie或者HTML代码。CRLF漏洞常出现在Location与Set-cookie消息头中。

CRLF是CR和LF两个字符的拼接，它们分别代表"回车+换行”（rn）“，全称为CarriageReturn/LineFeed"十六进制编码分别为0x0a，0x0d。URL编码为%0a和%0d。
CR和LF组合在一起即CRLF命令，它表示键盘上的"Enter"键，许多应用程序和网络协议使用这些命令作为分隔符。
而在HTTP协议中，HTTP header之间是由一个CRLF字符序列分隔开的，HTTP Header与Body是用两个CRLF分隔的，浏览器根据这两个CRLF来取出HTTP内容并显示出来。

所以**如果用户的输入在HTTP返回包的Header处回显**，便可以通过CRLF来提前结束响应头，在响应内容处注入攻击脚本。因此CRLFInjection又叫HTTP响应拆分/截断（HTTPResponse Splitting）简称HRS。
^
响应包的内容可以通过用户输入回显，可能造成响应包双重响应包（第二个包恶意重定向），会话固定（一直同一个Set-Cookie），注入XSS等。
^
通过“回车”和“换行”字符注入HTTP流，实现网站篡改、跨站脚本、劫持等。CRLF是表示回车和换行的字符序列，通常以"\r\n"表示。
HTTP头注入：攻击者可以在HTTP请求或响应的头部中插入CRLF字符，从而修改报文的结构，欺骗服务器或客户端执行非预期的操作。例如，攻击者可以插入CRLF字符来伪造HTTP响应头，修改网页内容或重定向用户到恶意网站。
HTTP响应拆分：攻击者可以利用CRLF注入漏洞，将多个HTTP响应拆分成多个独立的响应，绕过服务器的处理机制。这可能导致安全漏洞，例如欺骗用户执行恶意操作或绕过访问控制。
HTTP请求劫持：攻击者可以通过插入恶意的CRLF字符来篡改HTTP请求，从而劫持用户的请求。这种攻击可以用于在HTTP请求中注入恶意内容、篡改请求参数或绕过身份验证。



## **防范CRLF注入**
1、最简单的方法，装WAF。
2、对用户的数据进行合法性校验，对特殊的字符进行编码，如<、>、‘、”、CR、LF等，限制用户输入的CR和LF，或者对CR和LF字符正确编码后再输出，以防止注入自定义HTTP头。创建安全字符白名单，只接受白名单中的字符出现在HTTP响应头文件中。在将数据传送到http响应头之前，删除所有的换行符。

## **漏洞复现**
nginx出现过

^
如果响应头中回显了访问url
```
https://ip/xxx/xxx?d=%c4%8d%c4%8aHello666: Me_Too%c4%8d%c4%8aSet-Cookie:xxx

直接设置cookie
/%0d%0aSet-Cookie:%20a=1

响应反射型xss，获取cookie等
/%0d%0a%0d%0a<img src=1 onerror=alert(/xss/)>/
```

## **检测工具**
CRLFuzz：https://github.com/dwisiswant0/crlfuzz/releases
直接测试有没有
crlfuzz.exe -u baidu.com
[vln]有
[err]没有