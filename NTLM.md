## **NTLM**
NTLM 是 Microsoft Windows 操作系统中使用的一种身份验证协议。它最初是为了取代旧版本的基于文本的 LAN Manager（LM）身份验证协议而开发的。NTLM 在 Windows 网络环境中用于验证用户的身份，并授权他们访问网络资源。
尽管 NTLM 在过去被广泛使用，但它已被认为不够安全，无法双向身份认证，并且在一些场景中被现代的身份验证协议（如 Kerberos 和 NTLMv2）所取代。




^
NTLM协议允许使用密码哈希来进行认证，因此如果系统接受哈希值作为认证凭证，可能PTH 攻击。
**NTLM认证（NTLM Hash来加密解密认证）**：
1. **客户端请求**：用户在客户端输入用户名和密码，请求访问网络资源。
2. **挑战消息**：服务器向客户端发送一个随机生成的挑战消息（称为nonce），要求客户端证明其知道密码。
3. **密码哈希**：客户端使用用户密码的哈希值（NTLM Hash）对挑战消息进行加密，生成响应消息。
4. **响应消息**：客户端将加密后的响应消息发送回服务器。
5. **验证过程**：服务器接收到响应消息后，使用存储在SAM（Security Account Manager）数据库或NTDS（Active Directory数据库）中的用户密码哈希值，对相同的挑战消息进行加密，得到预期的响应值。
6. **比较响应**：服务器将预期的响应值与客户端提供的响应值进行比较。如果两者匹配，认证成功，用户获得访问权限。

**存在的场景**：
1. **工作组环境**：在没有域控制器的环境中，如工作组网络，NTLM认证常用于本地或远程登录到Windows系统。
2. **域环境**：在基于Windows的Active Directory域环境中，NTLM作为Kerberos认证的备用机制，在Kerberos不可用或失败时使用。
3. **跨域访问**：当客户端和服务器位于不同的域中，且这些域之间没有建立信任关系时，可能会使用NTLM认证。
4. **特定应用程序**：一些旧的或非Microsoft应用程序可能仍然使用NTLM作为认证机制




## **NTLM Hash**
NTLM Hash：用户密码加密后的hash，用md4等算法加密明文密码。
LM Hash：用户密码加密后的hash，不安全的DES。

NTLM Hash应用：
* 在Kerberos认证中，NTLM Hash被用来加密票证。具体来说，KDC中的特殊账户krbtgt的NTLM Hash用于加密TGT，而服务器的NTLM Hash用于加密ST。
* NTLM认证通常用于Windows工作组环境，而Kerberos认证用于Windows域环境，尤其是在Active Directory中。
* 尽管NTLM认证仍然在一些环境中使用，但Kerberos提供了更为安全和可靠的认证机制，特别是在跨网络的信任和委派场景中。

总结来说，NTLM Hash是NTLM认证机制中使用的密码哈希值，而Kerberos认证是一个更高级的协议，它在认证过程中可能会使用到NTLM Hash来加密票证，以确保通信的安全性。两者在Windows网络环境中都很重要，但Kerberos提供了更高级的安全特性。



