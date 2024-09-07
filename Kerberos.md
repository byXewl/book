在域环境中，Kerberos 常常用于身份验证。它可以确保用户在域内的各种服务中都可以使用同一组凭证进行身份验证。



## **Kerberos协议**
Kerberos 是一种网络身份验证协议，用于通过计算机网络上的不安全通道安全地验证用户和服务。它采用了客户端-服务器模型，并使用密钥分发中心（KDC）来进行身份验证。Kerberos 协议的设计目标是提供强大的身份验证，同时避免在网络上传递明文密码。

漏洞：
横向移动-漏洞票据，票据劫持
权限维持-黄金票据，白银票据

黄金票据可以伪造域内任意用户，即使这个用户不存在，黑客入侵成功后，记下krbtgt的SID和krbtgt的散列值，即使蓝队修改了管理员密码，红队依然能通过黄金票据畅通无阻。


## **krbtgt账户**
账户krbtgt（Knowledge Base Ticket Granting Ticket）是Kerberos认证系统中的一个关键组件，用于存储和管理TGT（黄金票据）。在Windows域环境中，每个域控制器（DC）都有一个krbtgt用户账户，这个账户是Kerberos的密钥发行中心（KDC）的服务账户。

以下是关于krbtgt账户的一些关键点：
1. **服务账户**：`krbtgt`账户是KDC的服务账户，它负责生成和分发TGT。
2. **密码管理**：`krbtgt`账户的密码是系统随机生成的，并且这个账户的密码更改会触发Kerberos票据的更新。
3. **安全性**：由于`krbtgt`账户的密码用于加密TGT，因此它是整个Kerberos认证体系中非常敏感的部分。
4. **票据加密**：在Kerberos认证过程中，`krbtgt`账户的NTLM Hash被用来加密TGT，而TGT中又包含了用于加密 服务票据（ST）的会话密钥。
5. **域操作**：在Active Directory的林恢复操作中，可能需要重置`krbtgt`账户的密码，这通常是一个复杂的过程，需要谨慎操作。
6. **不可登录**：`krbtgt`账户不是为了日常使用而设计的，它不能用于登录主机。
7. **域控制器间同步**：域中的每个域控制器都会维护一个`krbtgt`账户，并且这些账户的密码会通过目录服务在域控制器之间同步。
8. **攻击目标**：由于`krbtgt`账户的重要性，它也可能成为攻击者的目标，特别是通过黄金票据（Golden Ticket）和白银票据（Silver Ticket）攻击来获取或伪造TGT。

了解`krbtgt`账户的作用对于维护Windows域环境的安全性至关重要。管理员需要保护好`krbtgt`账户的密码，防止未授权的访问和滥用。



^
## **认证流程**
域内用户主机Client要去一个服务器请求一个服务，需要身份认证。
![](https://img.kancloud.cn/ec/c3/ecc3819bc640b130439fc6503a5d135b_838x510.png)
![image-20240424135543862](http://cdn.33129999.xyz/mk_img/image-20240424135543862.png)
说明
```
KDC(Key Distribution Center):密钥分发中心，里面包含两个服务：AS(发放黄金票据)和TGS(发放白银票据)

AS(Authentication Server):身份认证服务，提供的票据称为票据授权凭证TGT(Ticket Granting Ticket) 
或叫 黄金票据，用于身份认证，存储在内存，默认有效期为10小时

TGS(Ticket Granting Server):票据授予服务,提供的票据也称为服务票据 ST 或叫 白银票据

客户端使用ST向目标服务请求服务
```
双向认证
```
用户Client登录域内用户名和密码，此时密码的NTLM Hash就是Client密钥。

1.用户客户端Client 自动向 KDC的AS 发送认证请求。

2.AS 根据Client用户名 查询数据库 获取用户的NTLM Hash，成功查到。
返回 由Client密钥(用户的NTLM Hash)加密的Client/TGS的Sessionkey，和 krbtgt账户的NTLM Hash加密的TGT黄金票据。
TGT中包含如下信息：
* [Client/TGS SessionKey]
* Client ID
* Ticket有效时间，默认10小时
* CLient 地址



3.用户客户端接受到，可以解密Client/TGS的Sessionkey，但没有 krbtgt账户的NTLM Hash无法解密TGT。
此时拿到解密Client/TGS的Sessionkey和加密TGT，以及要请求的服务ID[Service ID]去请求 TGS。

4.TGS接收客户端请求，TGS通过 krbtgt账户的NTLM Hash解密TGT，TGT中的内容和客户端的Client/TGS的Sessionkey比对成功。
返回CLIENT/TGS SESSIONKEY加密的Client/Service的Sessionkey，和SERVICE密钥(请求目标的服务器的NTLM hash)加密的ST白银票据。
ST包含如下信息:
* [Client/Server SessionKey]
* Client网络地址
* Ticket有效时间，比TGT短
* Client ID

5.客户端有Client/TGS的Sessionkey可以解密Client/Service的Sessionkey，但没有目标服务器的NTLM hash无法解密ST。
此时客户端拿Client/Service的Sessionkey，和加密的ST去请求对应的目标服务器。

6.目标服务器SERVICE密钥(请求目标的服务器的NTLM hash)解密ST，认证比对后。
返回Client/Service的Sessionkey加密的Timestamp。

客户端再使用 Client/Service的Sessionkey 对其解密，提取Timestamp信息，比对认证。实现双向认证。



PS:
Client密钥、Service 密钥 为对应 客户端用户、目标服务器用户的NTLM Hash
TGS密钥 == KDC Hash == krbtgt用户的NTLM Hash，这几个可能有时候叫法不一样但是是一个东西

Server 和 Service 也可以当作一个东西，就是Client想要访问的服务器或者服务。
```
^
## **场景流程**

1. **一次登录**：用户在域成员计算机上使用域账户登录时，操作系统会尝试使用Kerberos认证协议来获取用户的初始票据（即TGT）。
2. **票据获取**：如果用户凭据有效，域控制器的AS会生成一个TGT，并使用`krbtgt`账户的密钥对其进行加密，然后发送回客户端。
3. **票据缓存**：客户端的操作系统会将这个TGT缓存起来，通常存储在系统的票据缓存中，例如在Windows系统中，可以使用`klist`命令查看缓存的票据。
4. **服务访问**：当用户尝试访问域内网络资源（如文件服务器、Web服务等）时，如果服务需要Kerberos认证，客户端将使用缓存的TGT向TGS请求对应的服务票据（ST）。
5. **服务票据请求**：客户端使用TGT作为凭证，向TGS请求访问特定服务的服务票据。如果TGT有效，TGS将生成ST并发送给客户端。
6. **服务访问授权**：客户端使用ST来向服务证明其身份，如果服务票据有效，服务将授权客户端访问请求的资源。


**委派**：在某些情况下，服务可能需要代表客户端访问其他服务。Kerberos协议支持委派机制，允许服务使用客户端的票据进行操作，这在分布式应用程序中非常有用。
**klist**：此时klist命令可以看到内存中的TGT和TS以及会话票据信息。


^
## **伪造票据**
* 伪造黄金票据 AS确认Client端登录者用户身份
 当黑客获取到krbtgt用户的NTLM哈希后，便可主动使用krbtgt用户的NTLM哈希来生成TGT发送给KDC，这样KDC如果通过解密伪造TGT获取到伪造的 [CLIENT/TGS SESSIONKEY]并完成与TGT中的数据进行比对，便成功骗过了KDC，也就是成功伪造了黄金票据。伪造了流程2、3，可以任意访问任意的目标服务器资源

* 伪造白银票据 Client向SS(Service Server)发送服务请求
  黑客获取到了目标服务Service Server的NTLM Hash和目标服务ID[Service ID]，便可伪造Ticket(TS)，目标服务Service Server再接收到Ticket(TS)后可以使用自己的NTLM Hash正常解密完成比对，也就是成功伪造了白银票据。伪造了流程3、4，可以访问指定的目标服务器资源。

