

Binlog（二进制日志）在MySQL中不是一个单一的文件，而是由一系列日志文件组成，这些文件记录了数据库的所有更改操作，如INSERT、UPDATE、DELETE以及数据定义语言（DDL）操作，不含select。每个Binlog文件在达到一定大小时会被滚动替换，生成新的日志文件。
（重启，flush logs命令）。
Binlog文件通常位于MySQL的数据目录下，文件名以`binlog.000001`、`binlog.000002`等格式命名。
http://blog.51cto.com/u_16099328/8476198

要查看数据库执行的日志，可以采取以下几种方法：

1. **使用`mysqlbinlog`工具**： `mysqlbinlog`是MySQL自带的一个实用程序，用于解析和显示Binlog文件的内容。例如，要查看`binlog.000001`文件的内容，可以使用以下命令：

  ```
查看
 mysqlbinlog mysql-bin.000007

按时间段恢复
mysqlbinlog --base64-output=decode-rows -v --database=kaoshi库名 --start-datetime="2024-03-01 00:50:00" --stop-datetime="2024-03-07 10:10:10" mysql-bin.000007 > binlog_07.sql

最新恢复   
mysqlbinlog  mysql-bin.000007 > binlog_07.sql

基于节点恢复
SHOW BINLOG EVENTS IN 'binlog.000001';  -- 显示了pos序号
mysqlbinlog --start-position=11123 --stop-p0sition=122224  --database=kaoshi库名 mysql-bin.000007 > binlog_07.sql

 mysqlbinlog --start-position=11123 --stop-p0sition=122224  --database=kaoshi库名 mysql-bin.000007 | mysql-uroot -pgansir123456
```

2. **通过MySQL命令行**： 可以登录到MySQL服务器，然后使用`SHOW BINLOG EVENTS`语句来查看Binlog事件。例如：

 ```
查看所有binlog的记录:

SHOW MASTERR STATUS;
SHOW MASTERR logs;
show binary logs;

查看历史操作：
SHOW BINLOG EVENTS IN 'binlog.000001';
```

3. **查看慢查询日志（Slow Query Log）**： 慢查询日志记录了执行时间超过指定阈值的所有SQL语句。可以通过MySQL的配置文件（通常是`my.cnf`或`my.ini`）开启慢查询日志，并设置慢查询的时间阈值。开启后，可以使用`mysqlbinlog`工具查看慢查询日志文件。

4. **查看错误日志（Error Log）**： MySQL的错误日志记录了启动、运行和停止MySQL服务器时的错误信息。错误日志的位置可以通过`SHOW VARIABLES LIKE 'log_error';`命令查看。

5. **查看通用查询日志（General Query Log）**： 通用查询日志记录了所有对MySQL服务器的请求，无论它们是否成功执行。可以通过配置文件开启通用查询日志。

6. **使用第三方监控工具**： 有许多第三方工具和应用程序，如phpMyAdmin、MySQL Workbench等，它们提供了图形界面来查看和管理MySQL日志。

请注意，查看Binlog文件时，内容通常是二进制格式的，因此直接使用文本编辑器打开可能无法正确显示内容。使用`mysqlbinlog`工具可以将其转换为可读的文本格式。同时，出于安全考虑，应确保只有授权用户才能访问Binlog文件。

