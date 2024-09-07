## **Ubuntu内核提权（CVE-2017-16995）**
影响版本：
Linux内核：Linux Kernel Version 4.14 ~ 4.4
Ubuntu版本：16.04.01~ 16.04.04

条件：需要有本地用户，提权到root
提权过程：连接-获取可利用漏洞-下载或上传EXP-最好在/tmp目录-编译EXP-给权限执行-提权
```
gcc 45010.c -o exp
chmod +x exp
/exp
此时普通用户变root
id
```



## **Ubuntu内核提权（CVE-2021-3493）**
Ubuntu内核OverlayFS权限逃逸（CVE-2021-3493）

原理
根据官方介绍，OverlayFs漏洞允许Ubuntu下的本地用户获得root权限。这个漏洞是Ubuntu系统中的特定问题，在该问题中，未正确验证关于用户namespace文件系统功能的应用程序。由于Ubuntu附带了一个允许非特权的Overlayfs挂载的补丁，结合这个补丁挂载Overlayfs可以权限逃逸，达到权限提升的目的

影响版本：
* Ubuntu 20.10
* Ubuntu 20.04 LTS
* Ubuntu 18.04 LTS
* Ubuntu 16.04 LTS
* Ubuntu 14.04 ESM

利用方法
```
拿到一个ssh普通账户
利用Xftp 7工具去连接目标，并上传漏洞exp文件dirty.c
利用Xshell 7工具连接目标
通过C语言的预处理，成为可执行文件
    gcc exploit.c –o expoit
利用预处理所生成的可执行文件
    ./expoit
```

