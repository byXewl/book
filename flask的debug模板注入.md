Flask模板注入中debug模式下pin码的获取和利用:
## **什么是pin码**
pin码是flask在开启debug模式下，进行代码调试模式所需的进入密码，需要正确的PIN码才能进入调试模式，可以理解为自带的webshell。
有了pin，然后报错或访问/consloe进，点击一个条列的右边有一个终端按钮，点击进入控制台rce

## **pin码生成要六要素**
通常任意文件读取ssti：
```
{{().__class__.__bases__[0].__subclasses__()[75].__init__.__globals__.__builtins__['open']('/etc/passwd').read()}}
```
1.username在可以任意文件读的条件下读/etc/passwd进行猜测
2.modname 默认 flask.app
3.appname 默认Flask
4.moddir flask库下app.py的绝对路径,可以通过报错拿到,如传参的时候给个不存在的变量5.uuidnode mac地址的十进制,任意文件读/sys/class/net/ethe/address
6.machine_id 机器码 这个待会细说,一般就生成pin码不对就是这错了

```
os.popen("ls -l /").read()
os.popen("cat /this_is_the_flag.txt").read()
```



![](.topwrite/assets/image_1728027706412.png)
^
<https://blog.csdn.net/rfrder/article/details/110240245>

<https://www.cnblogs.com/MisakaYuii-Z/p/12407760.html>