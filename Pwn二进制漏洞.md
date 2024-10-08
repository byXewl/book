Pwn胖：PWN在黑客俚语中代表着攻破、取得权限，多为溢出类题目。
二进制漏洞利用，劫持程序流，权限提升。

劫持程序流：连接远程服务器的服务软件，劫持这个服务软件，拿到服务器shell，读flag。
权限提升：连接远程服务器的连接权限为普通用户，通过漏洞等操作权限提升，拿到root。

应用：
BOF + syscall：利用缓冲区溢出漏洞来执行系统调用。
虚拟机逃逸，docker逃逸，如何提root，挖掘系统漏洞，常见服务器和库的漏洞比如nginx redis openssl的未公布高危漏洞等等。

## **入门**
```
入门目录：
二进制文件-ELF
汇编与寄存器
进程相关（Process）
地址与数据
函数调用约定（Calling Convention）
栈帧（Stack Frame）
简单的栈溢出实操（ret2text）
ROP链
```
<https://www.bilibili.com/video/BV1ub4y1F71R/?spm_id_from=333.337.search-card.all.click&vd_source=972491eeb83c0ed4c0015aef1be6c537>
## **CTF题**
利用系统漏洞，编写脚本获取服务器shell，再获取flag。
出题人给出服务器的ip和端口，端口上运行一个进程，
进程运行的程序二进制文件也给你，找出二进制文件中的漏洞，利用这个漏洞获取服务器的最高权限。

<https://www.cnblogs.com/bonelee/p/9985111.html#:~:text=%E5%BD%93%E7%84%B6%EF%BC%8CCTF%E4%B8%AD%E7%9A%84%E7%BB%9D%E5%A4%A7>


^
## **工具**
IDA Pro ：静态分析F5转换为C语言

pwntools ： CTF框架+漏洞利用开发库 可快速编写exp
```
pip3 install pwntools -i https://pypi.tuna.tsinghua.edu.cn/simple
测试
>>> import pwn
>>> pwn.asm("xor eax, eax")
```

checksec ：查看程序相关的保护措施。
```
一般安装pwntools库后默认安好。在~/.local/bin 目录下
~/.local/bin/checksec
```

ROPgadget ： 查找代码中用来rop的代码片段。一般安装pwntools后默认安好。

pwndbg ： gdb插件，在gdb运行动态调试查看二进制代码时做一些增强的功能
```
git clone https://github.com/pwndbg/pwndbg
cd pwndbg.
/setup.sh
安装后输入gdb回车显示是pwndbg了。
```

one _gadget：获取shell
