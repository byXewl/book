## **Nuclei**
go语言开发，扫网站和主机系统漏洞验证。
Nuclei使用零误报的定制模板向目标发送请求，同时可以对大量主机进行快速扫描。Nuclei提供TCP、DNS、HTTP、FILE等各类协议的扫描。
^
下载：<https://github.com/projectdiscovery/nuclei>
下载exe即可。
使用：<https://www.cnblogs.com/cijian9000/p/16006359.html>

^
## **漏洞扫描**
自带有漏洞模板，可以自动更新。基于yaml模板语法也可以定制poc。
yaml中有所属tags，还有shodan语法。
```
全漏洞扫描
nuclei.exe -u baidu.com
```
指定tags，会探测有该tags的漏洞模板：
```
nuclei.exe -u baidu.com -tags zyxel
nuclei.exe -u baidu.com -tags zyxel,shrio,thinkphp
```

## **自写yaml补充漏洞**
```
用自写扫描：
nuclei.exe -t 自写.yaml -u xx.com --debug
```

^
nuclei的yaml基础：
<https://mp.weixin.qq.com/s/9n13N28-c_zmaqae2-iAUw>
案例：
<https://mp.weixin.qq.com/s/Tc2xkkuu_vR3qFBVtpWz-Q>