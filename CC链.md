
CommonsCollections包为Java标准的CollectionsAPi提供了相当好的补充。在此基础上对其常用的数据结构操作进行了很好的封装、抽象和补充。让我们在开发应用程序的过程中，既保证了性能，同时也能大大简化代码。
简称cc，第三方依赖库，被许多组件和项目所依赖，cc在很多项目或者组件中都有使用，
然而3和4相关版本存在反序列化利用链（Gadget）当出现反序列化入口时候，就存在反序列化漏洞。
Web和网络安全中"Gadget"一词通常指的是可以被利用来进行攻击的对象或代码片段。

## **环境**
CommonsCollections版本为3.2.1时漏洞最多。
```
<dependencies>
    <dependency>
        <groupId>commons-collections</groupId>
        <artifactId>commons-collections</artifactId>
        <version>3.2.1</version>
    </dependency>
</dependencies>
```
java老版本下载：<https://blog.lupf.cn/articles/2022/02/19/1645283454543.html> 密码8899
复现环境配置：<https://www.freebuf.com/articles/web/383152.html>

安装jdk<=8u65，解压里面的src.zip。
安装jdk8源码，复制里面sun(jdk-af660750b2f4\src\share\native\sun)目录到刚刚解压的src目录下，这样可以跟踪jdk源码。


## **要求**
CC1链：java<=JDK8u71(1.8.0_71)、CommonsCollections<=3.2.1
>常见jdk=8u65进行复现。

CC6链：java<=JDK8u71(1.8.0_71)、CommonsCollections<=3.2.1
>这条链是基于CC1，只是入口类改了，入口类为hashMap。CC6=CC1+URLDNS。


CC3链：java<=JDK8u71(1.8.0_71)、CommonsCollections<=3.2.1
>CC1 链与 CC6 链是通过 Runtime.exec() 进行命令执行的。而很多时候服务器的代码当中的黑名单会选择禁用 Runtime。​
CC3 链则是通过动态加载类加载机制来实现自动执行恶意类代码的。

CC4链：java<=JDK8u71(1.8.0_71)、CommonsCollections=4
>因为 CommonsCollections4 除 4.0 的其他版本去掉了 InvokerTransformer 的 Serializable 继承，导致无法序列化​。
CC4链找到InvokerTransformer的替换。

CC2链：java<=JDK8u71(1.8.0_71)、CommonsCollections=4
>CC2链是在CC4链的基础上修改。

CC7链：java<=JDK8u71(1.8.0_71)、commons-collections:<=3.2.1
CC5链：java<=JDK8u71(1.8.0_71)、commons-collections:<=3.2.1