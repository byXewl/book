Java审计其实和Php审计的思路一样，唯一不同的可能是复杂的框架和代码。



1.正向跟踪

从数据层查找变量，一级一级调用，最后到控制器，这种相对简单、快速。



2.逆向思维，追踪变量，对象调用

查找变量，有没有传参数，是谁调用了这个变量，又是谁调用了这个方法，先从控制器找变量，然后逆着找方法，调用关系，最后到DAO层数据。这种方法一般比较浪费时间，跟踪到最后可能发现变量不可控。



3.直接挖掘漏洞点

比如搭建后，访问平台，发现有上传的功能，直接去控制器找上传相关代码，进行审计。



4.通读全文代码

这是最纯粹、最直接的方式。但是可能会遇到一个问题——看不懂代码。

##  

**1** **关键字定位**



**SQL注入**

大多数JavaEE网站，用的相对多的是SpringMVC架构，那么用到的Mybatis框架就会比较多，所以搜索SQL关键字就是"${}"优先，其次是以下的关键字。



如果是SpringBoot ，可能会使用注解等方式，如：

```
@query(selectid from user where name = ?);
```

以上语句写了"？"，则代表是预编译语句，就不会产生注入，如果写的是变量，就可能产生注入了。 

```
${}
select
insert
update
in
like
order by 一般无法预编译
statement
```





**文件上传**

在文件上传功能中，先看框架——比如Spring框架，默认不会解析jsp文件。然后看代码有没有定义黑名单数组等等。

```
org.apache.commons.fileupload
file
xxxstream
RequestMethod
MultipartHttpServletRequest
```

**xss**

```
getParamter
<%=
param
el表达式
```

**目录遍历**

```
path
System.GetProperty("user.dir")
fileInputStream
file.read
filePath
```

**xml注入类似xxe**

```
DocumentBuilder
XMLStreamReader
SAXBuilder
SAXParser
SAXReader 
XMLReader
SAXSource
TransformerFactory
SAXTransformerFactory
SchemaFactory
```

**命令执行**

```
ProcessBuilder
start
Runtime
getRuntime
exec
```

**序列化**

```
readObject
readUnshared
XMLDecoder.readObject
Yaml.load
XStream.fromXML
ObjectMapper.readValue
JSON.parseObject
```

**任意文件删除**

```
delete
```

**异常信息被打印**
```
e.printStackTrace()
```

**逻辑漏洞**没什么关键字，可以去看User控制器，或者看过滤器，寻找有无校验。



**2** **MVC模式讲解**

MVC模式是一种软件框架模式，被广泛应用在JavaEE项目的开发中。

MVC即模型（Model）、视图（View）、控制器（Controller）。



**模型（Model）**

模型是用于处理数据逻辑的部分。

所谓数据逻辑，也就是数据的映射以及对数据的增删改查，Bean、DAO（dataaccess object，数据访问对象）等都属于模型部分。



**视图（View）**

视图负责数据与其它信息的显示，也就是给用户看到的页面。

HTML、JSP等页面都可以作为视图。



**控制器（controller）**

控制器是模型与视图之间的桥梁，控制着数据与用户的交互。

控制器通常负责从视图读取数据，处理用户输入，并向模型发送数据，也可以从模型中读取数据，再发送给视图，由视图显示。

首先要了解项目整体结构。大致了解作者编写逻辑，搞清请求流程。

src/main下面有两个目录，分别是java和resources，java目录中主要存放的是java代码，resources目录中主要存放的是资源文件，比如：html、js、css等。

在Java目录下还有其他一些常见目录，具体含义整理如下：



**/java目录下**

annotation：放置项目自定义注解；

controller/: 存放控制器，接收从前端传来的参数，对访问控制进行转发、各类基本参数校验或者不复用的业务简单处理等；

dao/: 数据访问层，与数据库进行交互，负责数据库操作，在Mybaits框架中存放自定义的Mapper接口；

entity/: 存放实体类；

interceptor/: 拦截器；

service/:存放服务类，负责业务模块逻辑处理。Service层中有两种类，一是Service，用来声明接口；二是ServiceImpl，作为实现类实现接口中的方法；

utils/: 存放工具类；

dto/: 存放数据传输对象（DataTransfer Object），如请求参数和返回结果；

vo/: 视图对象（ViewObject）用于封装客户端请求的数据，防止部分数据泄漏，保证数据安全

constant/: 存放常量；

filter/: 存放过滤器。



**/resources目录下**

mapper/：存放Mybaits的mapper.xml文件；

static/：存放静态资源文件目录（Javascript、CSS、图片等），在这个目录中的所有文件可以被直接访问；

templates/: 存放模版文件；

application.properties或application.yml:Spring Boot：默认配置文件。



**代码跟踪流程**

用户请求URL发送到服务器，服务器解析请求后发送到后端代码处理请求。

在后端代码处，首先经过Filter(过滤器)和Interceptor(拦截器)，然后根据请求的URL映射到绑定的Controller，之后调用Service接口类，然后再调用serviceImpl接口实现类，最后调用DAO。



controller：负责简单的逻辑处理和参数校验功能，之后调用Service；

service：接口类，主要负责业务模块逻辑处理；

serviceImpl：接口实现类，实现类实现service接口中的方法；

DAO：如果service涉及数据库操作就会调用DAO。DAO主要处理数据库操作。DAO只做中间传递角色