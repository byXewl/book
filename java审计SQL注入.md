场景：
  1、直接动态拼接前端参数：“select * from user where id=”+req.getParameter(“id”)。如有使用Mybatis框架，封装后对应的关键词${id}。
  2、orderby & like & in语句：由于这种不能预编译，所以需要过滤器或自定义过滤等。
  3、二次注入、宽字节注入场景。
  4、关键词：select、insert、update、statement、delete、${、order by、like、in。
危害：通过SQL注入获取敏感数据、写入木马、获取系统最高权限等。
防御：能预编译的情况都做预编译，一些特殊无法做预编译的则过滤用户可控的参数。


## **场景**
```
order by&group by&like&in查询：（由于这种不能预编译，强行预编译转义字符后功能会失效。所以需要过滤器或自定义过滤）

防御：能预编译的情况都做预编译，一些特殊无法做预编译的，则过滤用户可控的参数。
```


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