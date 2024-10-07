拿到题，访问web。
查看源码 仔细查看或者搜索关键词，如flag,include等，提示方向。

F12查看网络请求情况。
最好抓包，仔细查看请求头，响应头信息。

查看传参，回显情况。sql注入，文件包含，模板注入。

目录测试，如flag.php，robots.txt
探针/tz.php，/backup.sql

临时文件是在vim编辑文本时就会创建的文件，如果程序正常退出，临时文件自动删除，如果意外退出就会保留，当vim异常退出后，因为未处理缓存文件，导致可以通过缓存文件恢复原始文件内容。所以通过在url后面加上/index.php.swp即可看到flag。
以index.php来说，第一次退出后，缓存文件名为index.php.swp，第二次退出后，缓存文件名为index.php.swo,第三次退出后文件名为index.php.swn。

^
一般flag在/flag或/flag.txt中，也可能在env命令环境变量中，还可能在phpinfo()中。

^
GET函数漏洞
```
GET file:|readflag
会执行readflag程序的命令，并返回程序执行结果。
```
