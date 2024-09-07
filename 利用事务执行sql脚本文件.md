cat命令写.sql脚本文件
```
cat>./load_data.sql<<EOF
insert into classroom values ('Packard', '101', '500');
insert into department values ('Biology', 'Watson', '90000');
insert into takes values ('00128', 'CS-101', '1', 'Fall', '2009', 'A');
commit;
EOF
```
load_data.sql中内容：
```
insert into classroom values ('Packard', '101', '500');
insert into department values ('Biology', 'Watson', '90000');
insert into takes values ('00128', 'CS-101', '1', 'Fall', '2009', 'A');
commit;
```
高斯数据库中，用\i命令载入sql脚本文件，并用手动事务执行。
```
-- 关闭自动事务提交（.sql文件中最后一行有commit）
\set AUTOCOMMIT off
-- 载入执行.sql脚本，脚本里提交事务
\i ./load_data.sql
```