场景：
  1、直接动态拼接前端参数：“select * from user where id=”+req.getParameter(“id”)。如有使用Mybatis框架，封装后对应的关键词${id}。
  2、orderby & like & in语句：由于这种不能预编译，所以需要过滤器或自定义过滤等。
  3、二次注入、宽字节注入场景。
  4、关键词：select、insert、update、statement、delete、${、order by、like、in。
危害：通过SQL注入获取敏感数据、写入木马、获取系统最高权限等。
防御：能预编译的情况都做预编译，一些特殊无法做预编译的则过滤用户可控的参数。


## **场景**
```
order by&group by&like&in查询：（由于这种不能预编译，强行预编译转义字符后功能会失效报错等。所以需要过滤器或自定义过滤）

盲注。
报错捕获异常回显。

防御：能预编译的情况都做预编译，一些特殊无法做预编译的，则过滤用户可控的参数。
```
学习<https://zhuanlan.zhihu.com/p/408555998>

## **关键词**
大多数JavaEE网站，用的相对多的是SpringMVC架构，那么用到的Mybatis框架就会比较多，所以搜索SQL关键字就是"${}"优先，其次是以下的关键字。

如果是SpringBoot ，可能会使用注解等方式，如：

```
@query(selectid from user where name = ?);
```

以上语句写了"？"，则代表是预编译语句，就不会产生注入，如果写的是变量，就可能产生注入了。

```
${}
select
insert
update
in
like   可以使用布尔，时间盲注，联合注入等。
order by 一般无法预编译，可以使用布尔，时间盲注。
group by 一般无法预编译，可以使用布尔，时间盲注。
statement
```

^
## **二次注入场景**
第一次使用了预编译，执行sql语句时转义了，但是存储的数据没有转义。
但是读取存储的数据后，再作为sql执行参数，相信了而没有使用预编译。



^
## **mybatis-plus场景sql注入**


Mybatisplus中的 PaginationInterceptor 主要用于处理数据库的物理分页，避免内存分页。\
分析PaginationInterceptor 的源码可以发现

Orderby场景下的SQL注入

前面提到了分页中会存在Orderby的使用，因为Orderby动态查询没办法进行预编译，所以不经过安全检查的话会存在注入风险。PaginationInnerInterceptor主要是通过设置com.baomidou.mybatisplus.extension.plugins.pagination.page对象里的属性来实现orderby的，主要是以下函数的调用，因为直接使用sql拼接，所以需要对进行排序的列名进行安全检查：

```
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;


page.addOrder();
page.setAscs();
page.setDescs();
```

```
http://127.0.0.1:8080/account?current=1&size=10&ascs=create_time;DROP

/page?orderBy1=name AND (SELECT 2406 FROM (SELECT(SLEEP(5)))OCkK)
```


^
## **like场景**


在区分数据库下的用法区分，例如：
不安全
```
//mysql环境
mybatis和php
select * from test where school_name like concat('%',${name},'%') 
select * from test where school_name like concat('%',$name,'%')


//oracle环境
select * from test where school_name like '%'||${name},'%' 

//SQL Server环境
select * from test where school_name like '%'+${name},+'%'
```

安全
预编译
```
#### Mysql数据库
select * from test where school_name like concat('%',#{name},'%') 
sql = " and indexNum like concat('%',?,'%') "

#### [Oracle]
sql = " like '%' || ? || '%' "

#### []()SQL Server
sql = " like '%' + ? + '%' "
```