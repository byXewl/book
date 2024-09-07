把查询的结果存储在一张视图表，方便查看结果。
作用：
简化查看信息操作。
可以授权给指定用户能看。

简单视图表可以通过修改视图更新原表，否则不允许修改。

```
创建视图:
create view test as select * from student where sex ='男‘；

修改视图：
alter 修改结构
update view set ...;

删除视图：
drop view test;
```