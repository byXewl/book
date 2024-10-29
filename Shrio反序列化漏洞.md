Apache Shiro是一款开源安全框架，提供身份认证、授权、密码学和会话管理。
Apache Shiro 1.2.4 反序列化漏洞Shiro550（ CVE-2016-4437）
Shiro550<Apache Shiro 1.2.4
Shiro721<Apache Shiro 1.4.2
^
## **Shiro550漏洞原理**
Apache Shiro1.2.4以及以前部版本中，加密的用户信息序列会存储在名为RememberMe的Cookie中，
Shiro默认先接受用户提交的RememberMe Cookie的值，会进行一次Base64解码，再使用AES密钥解密，最后反序列化Cookie值。
攻击者使用Shiro的默认AES秘钥加密 有代码执行的java序列化串，伪造用户Cookie，触发Java反序列化漏洞，进而在目标机器上执行任意命令。


^
## **Shiro站点特征**
java程序，登录时有记住我功能
1. 在网站登录时抓包，勾选rememberMe并且密码错误时，返回包响应头中会有rememberMe=deleteMe
2. 在网站登录时，勾选rememberMe并且密码正确时，会返回cookie经过加密的rememberMe值。

黑暗引擎
shodan搜索：rememberMe=deleteMe
fofa搜索：header="rememberMe=deleteMe"

代码中密钥：
```
@Bean
public CookieRememberMeManager rememberMeManager(SimpleCookie rememberMeCookie) {
    CookieRememberMeManager manager = new CookieRememberMeManager();
    manager.setCipherKey(Base64.decode("Z3VucwAAAAAAAAAAAAAAAA=="));
    manager.setCookie(rememberMeCookie);
    return manager;
}
```
^
## **Shiro漏洞利用和验证**

复现：<https://www.cnblogs.com/kalixcn/p/17841026.html>
Shiro漏洞利用工具：<https://github.com/feihong-cs/ShiroExploit-Deprecated/releases/tag/v2.51> 
java -jar xx1.jar  xx2.jar运行，输入/login地址，选择DNSlog反弹shell等。
最新工具ShiroAttack2：<https://github.com/SummerSec/ShiroAttack2>
自带爆破AES密钥，直到发现有用利用链。
可进行命令执行，上传木马配合蚁剑等。



## **防护修复**
1、使用开源的框架中使用了shiro框架时，修改默认密钥。
2、代码审计，全局搜索“setCipherKey(Base64.decode(”关键字，或者"setCipherKey"方法，Base64.decode()中的字符串就是shiro的密钥，要确保该密钥的安全性
3、WAF拦截Cookie中长度过大的rememberMe值
4、更新shiro到1.2.4以上的版本。


^
## **Shiro550和Shiro721漏洞**
一、一样的利用过程🍺 
Apache Shiro框架进行登录，服务端在接收cookie时，会经过下面的流程： 
 1、检索RememberMe Cookie的值  2、Base64解码  3、AES解密（加密密钥硬编码）  4、进行反序列化操作（未过滤处理）  5、攻击者可以使用Shiro的默认密钥构造恶意序列化对象进行编码来伪造用户的Cookie，服务端反序列化时触发漏洞，从而执行命令  。
二、主要区别🍺 
1、这两个漏洞主要区别在于Shiro550使用已知密钥碰撞，只要有足够密钥库（条件较低），不需要Remember Cookie  。
2、Shiro721的ase加密的key基本猜不到，系统随机生成，可使用登录后rememberMe去爆破正确的key值，即利用有效的RememberMe Cookie作为Padding Oracle Attack的前缀，然后精心构造 RememberMe Cookie 值来实现反序列化漏洞攻击，难度高 。
由于Apache Shiro cookie中通过 AES-128-CBC 模式加密的rememberMe字段存在问题，用户可通过Padding Oracle 加密生成的攻击代码来构造恶意的rememberMe字段，并重新请求网站，进行反序列化攻击，最终导致任意代码执行。


三、版本问题🍺 
Shiro550<Apache Shiro 1.2.4
Shiro721<Apache Shiro 1.4.2

1、Shiro框架1.2.4版本之前的登录时默认是先验证"rememberMe" Cookie的值，而不是先进行身份验证，这也是Shiro550漏洞能够利用的原因之一，攻击者可以利用该漏洞通过伪造"rememberMe" Cookie的值来绕过Shiro框架的身份认证机制，从而实现未授权访问 。
2、Shiro框架1.2.4版本之后的登录时先进行身份验证，而不是先验证"rememberMe" Cookie的值，所以攻击者需要知道受害者已经通过登录验证，并且Shiro框架已经为受害者创建了一个有效的会话，以便攻击者可以利用该会话ID进行身份伪造并绕过Shiro框架的权限控制机制。  
3、同时，Shiro框架的登录流程也是可以自定义的。