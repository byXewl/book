## DDL操作库：
```
### 展示所有库
show databases;

### 创建库

create database 库名（character set utf8）;

(库名不能重复)

### 判断库存在
create database if not exists 库名;

### 删除库
drop database 库名;

### 使用进入数据库
use 库名;
```

## DDL操作表：
```
### 使用进入数据库后：

### 创建表create

create table 表名(

​		字段名1 数据类型1，

​		xxxxxxx xxxxxxxx,

​		xxxxxxx xxxxxxxx #最后一行不加逗号

);
```
```
create table student(

    id int,#数字id

    name varchar(10),

    sex char(1),#男女

    birthday date, #年月日

    score double(5,2), #成绩，总长度5，小数后最多2

    email varchar(64),

    tel varchar(15),

    status tinyint#用数字表示各种状态，上学，休学，辍学...

);
```

```

### 查询表retireve

#### 查看这个库的所有表：

show 库名；

#### 查看一个表的结构：

desc 表名;

describe 表名; 



### 修改表alter

#### 1.修改表名：

alter table 表名 rename to 新表名;

```