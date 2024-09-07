## **Java反序列化漏洞的原理**
Java反序列化漏洞的原理涉及到Java对象序列化和反序列化机制。
当一个Java对象需要在网络上传输、持久化到磁盘或通过RMI（远程方法调用）等方式进行传递时，它可以被序列化成字节流，然后在需要的时候反序列化还原成对象。

由于Java的反序列化机制本质上是将字节流还原成对象，并且这个过程会调用对象的构造函数方法。
攻击者可以构造一个带有特定的构造函数的恶意类，这个构造函数中包含了攻击者想要执行的恶意代码。当这个类被反序列化时，其构造函数就会被调用，从而执行了攻击者植入的恶意代码。


^
java反序列化有多种反序列化，如序列化传反成对象、xml反成对象、json反成对象、yml反成对象(nacos等配置文件注册中常见)，反正都是反成对象的时候会调用构造函数方法。
借助java反序列化会调用构造函数方法，实现代码执行getshell，反弹shell，请求DNSlog，弹计算器等。
0day基本上白盒审计出来，然后测试漏洞与利用。
 


## **反序列化利用**
```
ObjectInputStream.readObject
ObjectInputStream.readUnshared
XMLDecoder.readObject
Yaml.load
XStream.fromXML
ObjectMapper.readValue
JSON.parseObject
```
使用场景
http 参数，cookie，ssesion，存储方式可能是 base64(rO0），压缩后的base64,MII 等
Servlets http,Sockets,Session 管理器，

包含的协议就包括：
JMX,RMI,JMS,JND1 等
xml Xstream,XmldEcoder 等（http Body:Content-type:application/xml）
json(jackson,fastjson)http 请求中包含。

利用工具
jndi，ysoserial，marshalsec，FastjsonExploit 等
```
ysoserial：
根据不同类型的java反序列化组件，输入参数如执行命令，生成利用的java序列化字符串。
如shrio利用的base64的java序列串。
再手动拿去抓包传参利用。

marshalsec：支持一些组件，直接RCE。

FastjsonExploit：生成利用payload，并启动所有利用环境，如监听ldap端口。
```

## **JNDI请求利用和外带数据**
JNDI是对各种访问目录服务的逻辑进行了再封装。
JNDI提供了一个通用的接口，使得Java应用程序可以查找和访问各种不同类型的命名服务和目录服务，包括文件系统、配置文件、DNS、LDAP服务器、RMI服务器等。
^
JNDI注入主要是用过下载远程class，来运行恶意代码。JNDI注入攻击时常用的就是通过RMI和LDAP两种服务。
>LDAP（轻型目录访问协议）：是一个开放的，中立的，工业标准的应用协议，通过IP协议提供访问控制和维护分布式信息的目录信息。目录是一个为查询、浏览和搜索而优化的专业分布式数据库，它呈树状结构组织数据，就好象Linux/Unix系统中的文件目录一样。
>RMI（远程方法调用）：它是一种机制，能够让在某个java虚拟机上的对象调用另一个Java虚拟机 的对象的方法。
## **RMI利用和外带**
RMI算是JAVA定制版RPC(远程通信的机制，使得分布式系统中的不同部分能够相互调用)
RMI（远程方法调用）并不是一个独立的协议，而是一种Java编程语言中用于实现远程过程调用的机制。它允许在Java虚拟机上运行的对象调用其他JVM上的对象的方法，就好像调用本地对象的方法一样。
^
JRMP：RMI使用Java远程对象协议（JRMP）来进行通信。
JRMP是一种Java专用的二进制协议，它用于在RMI系统中传输Java对象和调用信息。
RMI 在进行远程调用时，需要将对象在网络上传输，这就涉及到对象的序列化和反序列化。在 RMI 中，对象需要实现 java.io.Serializable 接口。
rmi://远程的rmi服务器ip
构造rmi服务器执行代码反弹shell利用复现：<https://icode.best/i/30418758861003>
![](https://img-bc.icode.best/26de9fc36b2940c6882491c5453db571.png)



