
联合查询是可合并多个相似的选择查询的结果集。等同于将一个表追加到另一个表，从而实现将两个表的查询组合在一起，使用为此为UNINO或UNION ALL。
联合查询：将多个查询的结果合并到一起（纵向合并）：字段数不变，多个查询的记录数合并。

语法：
```
select 语句 + union[union选项] + select 语句；

union选项：与select选项基本一样
distinct：去重，去掉完全重复的数据（默认）
all：保存所有的数据。
```
注意细节：union理论上只要保证字段数一样，不需要每次拿到的数据对应的字段类型一致。查询结果只保留第一个select语句对应的字段名字。

