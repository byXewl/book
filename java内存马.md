
学习示例：
<https://github.com/W01fh4cker/LearnJavaMemshellFromZero>
<https://github.com/0ofo/java-memshell>

^
## **快捷工具**
java内存马在线生成工具：
<https://party.memshell.news/>
原生支持哥斯拉、冰蝎、蚁剑、Suo5、NeoreGeorg 等常用内存马功能，通过高度灵活的自定义内存马上传功能，可以将任何定制化载荷融入 MemShellParty 的生成体系，打造最贴合自身战术需求的攻击平台

^
Agent内存马工具：
冰蝎作者写的Agent马支持多种环境：<https://github.com/rebeyond/memShell>
vagent内存马注入工具：<https://github.com/veo/vagent>

^
## **流程**
为了更好地学习，Real-World Attack 的例子比起 Demo 总是会让人更感兴趣，那么什么是一次真实场景下的内存马注入攻击顺序呢（我认为的，我并没有攻击实战经验）。

> 某些工具的交互方式显然有些问题，虽然不影响使用但是值得优化

1. 确认目标站点的中间件类型，Tomcat、WebLogic 等等。
2. 选择注入内存马类型，Servlet、Filter、Listener 等等。
3. 选择注入内存马功能，仅回显、仅命令执行、Godzilla、Behinder、suo5(HTTP正向代理) 等等。
4. 选择封装方式，也就是 RCE 漏洞类型，反序列化、表达式注入、模板注入、JNDI 等等。


> 开发过程中遇到的一些需要注意到的知识会以博客的方式输出。

随着攻击方式的增多，写 JavaWeb 内存马的师傅层出不穷，前人栽树后人乘凉，而我也应该是走在了聚合的道路上，试图去打造一款更利于全面学习内存马的注入工具。

1. SpringBoot 开发，易于部署，易于构建，让 JavaWeb 安全人员感到更亲切。
2. 提供靶场测试 docker 用例，方便部署学习测试。
3. 自带丰富的示例，让初学者在常见情况下都能完美注入，不再担心因为技能不够深入，出错导致一次勇敢的尝试戛然而止。
4. 不仅给出完整的 POC，也能给出中间态产物，例如我仅好奇 GodzillaFilter 的类如何编写。
5. 让使用者不仅仅只停留在脚本小子的阶段，学会了举一反三，能应对不同场景下的变形注入。
6. 拥有一定的自定义能力，方便构建自己的武器测试库。

JDK 版本：

1. JDK1.6、JDK1.7
2. JDK8
3. JDK11
4. JDK17

中间件：

1. [Tomcat](https://tomcat.apache.org/)、[Jetty](https://jetty.org/)
2. [Undertow](https://undertow.io/) ([JBossAS](https://jbossas.jboss.org/downloads/)/[JBossEAP](https://developers.redhat.com/products/eap/download)/[WildFly](https://www.wildfly.org/downloads/))
3. [SpringMVC 框架](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
4. [WebLogic](https://www.oracle.com/middleware/technologies/weblogic-server-installers-downloads.html)
5. [WebSphere](https://www.ibm.com/products/websphere-application-server)
6. [Resin](https://caucho.com/products/resin/download)
7. [GlassFish](https://javaee.github.io/glassfish/download)/[Payara](https://www.payara.fish/downloads/payara-platform-community-edition/)
8. [东方通](https://www.tongtech.com/pctype/25.html)
9. [宝兰德](https://www.bessystem.com/product/0ad9b8c4d6af462b8d15723a5f25a87d/info?p=101)

内存马类型：

1. Servlet
2. Filter
3. Listener
4. WebSocket
5. TomcatValue
6. TomcatUpgrade
7. TomcatExecutor
8. Agent
9. Netty
10. Spring Controller（多种方式）
11. Spring Interceptor
12. Spring Webflux

内存马功能：

1. 回显
2. 命令执行
3. [Godzilla 哥斯拉内存马](https://github.com/BeichenDream/Godzilla/releases)
4. [Suo5](https://github.com/zema1/suo5)
5. [Neo-reGeorg](https://github.com/L-codes/Neo-reGeorg)
6. 自定义

漏洞类型：

1. 反序列化漏洞，readObject、fastJson、snakeyaml、XStream 等
2. 文件上传漏洞 JSP
3. 表达式注入，EL、MVEL、SpEL、Ognl 等
4. 模板引擎注入，Freemarker、Velocity 和 JinJava
5. 脚本引擎注入、ScriptEngine、
6. JNDI 注入




^
其他参考
<https://www.cnblogs.com/CoLo/category/2025319.html?page=2>
<https://github.com/pen4uin/java-memshell-generator>
<https://github.com/4ra1n/MemShellParty>