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
## **基础使用**

```
模板使用:
./nuclei -u http://172.16.10.3 -t ./POC/ECOLORY_9.0_DESER.yaml -p http://127.0.0.1:8080
	-u 指定扫描目标
	-t 指定使用的扫描模板
	-p 指定使用的代理

单个目标扫描:
	./nuclei -u http://172.16.10.5

常用指定模板，批量目标扫描:
	nuclei -t ERP系统_存在信息泄露.yaml -l erp_zc.txt 
	-l 指定扫描url的文件
	-o输出文件

用模板文件夹进行漏洞
	nuclei -l urls.txt -t templates/ -o results.txt
	-t 指定使用的扫描模板
```

参数
```
--debug 扫描过程中可以显示所发送的数据包
-tags joomla  筛选出joomla，cms的漏洞验证模板
```






^
## **自制POC**
nuclei的yaml基础：
<https://mp.weixin.qq.com/s/9n13N28-c_zmaqae2-iAUw>
案例：
<https://mp.weixin.qq.com/s/Tc2xkkuu_vR3qFBVtpWz-Q>