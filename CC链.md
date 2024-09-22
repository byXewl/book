
CommonsCollections包为Java标准的CollectionsAPi提供了相当好的补充。在此基础上对其常用的数据结构操作进行了很好的封装、抽象和补充。让我们在开发应用程序的过程中，既保证了性能，同时也能大大简化代码。
简称cc，第三方依赖库，被许多组件和项目所依赖，cc在很多项目或者组件中都有使用，
然而3和4相关版本存在反序列化利用链（Gadget）当出现反序列化入口时候，就存在反序列化漏洞。
Web和网络安全中"Gadget"一词通常指的是可以被利用来进行攻击的对象或代码片段。

## **版本**
CommonsCollections版本为3.2.1时漏洞最多。
java老版本下载：<https://blog.lupf.cn/articles/2022/02/19/1645283454543.html> 密码8899



CC1链：java<=JDK8u71(1.8.0_71)、CommonsCollections<=3.2.1
常见jdk<=8u65


复现环境配置：
<https://www.freebuf.com/articles/web/383152.html>
安装jdk<=8u65，解压里面的src.zip。
安装jdk8源码，复制里面sun(jdk-af660750b2f4\src\share\native\sun)目录到刚刚解压的src目录下，这样可以跟踪jdk源码。