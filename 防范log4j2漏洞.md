审计排查：
```
1. pom版本检查2.0<=Log4j2<=2.14.1
   2.10.0版本不存在

2. 可以通过检查日志中是否存在"jndi:ldap://","jndi:rmi"等字符来发现可能的攻击行为

3. 检查日志中是否存在相关堆栈报错，
堆栈里是否有JndiLookup、IdapURLContext、getObjectFactoryFromRefernce
等与jndi调用相关的堆栈信息。

4. 使用安全产品自动化排查

5. 一些使用了log4j2.x的开源框架：
Spring-Boot-strater-log4j2全版本
Apache Struts2全版本
Apache Solr 已经在9.0和8.11.1修复
Apache Flink 1.11.0-rc1到1.14.0
Apache Druid 0.7.x以上
Apache Druid 1.0.15以及以上
ElasticSearch 5.x,6.x,7.x等等
```
临时方案：
```
1. 升级JDK
2. 修改log4j配置
    设置参数....
    禁止log4j所在服务器外连
3. 使用安全产品防护：WAF、RASP等  
    请求数据包里不能有jndi等字符。
```


log4j的防护，要么升级该组件Log4j2>=2.17.1和jdk版本；
要么通过注入jar包阻断对于该表达式的执行，这就是原生注入，适用于业务无法中断或者环境无法改变的场景；
还有就是安装安全设备对流量进行过滤和阻断，但安全设备对于执行开销和相关策略的考虑，就会出现并发还是能打过去，部分流量没被拦截的效果。


