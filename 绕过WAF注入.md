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
## **or 被过滤，orderby、information_schema都不能用**
用其他逻辑运算符and ， && ， &， |  ,1^1^
查表名使用 select group_concat(table_name）from mysql.innodb_table_stats wheredatabase_name=database()

如果information_schema被禁止，通过sys.schema获取当前数据库表名
通过无列名注入获取表group_concat(某一字段所有值)。
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


如果此时下面存在
$id=str_replace(array("\\0","%00","\\'","'"),"",$id);

```
