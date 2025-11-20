

编译源代码会生成一个二进制文件（LCTT 译注：即 `.o` 文件）。在编译期间，你可以向 `gcc` 编译器提供 *标志(flags)*，以启用或禁用二进制文件的某些属性，这些属性与安全性相关。

Checksec 是一个漂亮的小工具，同时它也是一个 shell 脚本。Checksec 可以识别编译时构建到二进制文件中的安全属性。编译器可能会默认启用一些安全属性，你也可以提供特定的标志，来启用其他的安全属性。


使用
```
checksec pwn01

pwn checksec --file=xxx
```
查看程序的一些保护机制开启或关闭
Arch:
RELRO:
Stack:
NX:
PIE:
RWX:


例如
```
Arch:     i386-32-little （32位的程序） 
Stack: No canary found （栈溢出关闭 可以利用栈溢出） 
PIE: No PIE (0x400000) （地址随机化关闭）

root@kali:~/桌面/CTF# pwn checksec --file=test
[*] '/root/\xe6\xa1\x8c\xe9\x9d\xa2/CTF/test'
    Arch:     amd64-64-little
    RELRO:    No RELRO
    Stack:    No canary found
    NX:       NX disabled
    PIE:      No PIE (0x400000)
    RWX:      Has RWX segments
```