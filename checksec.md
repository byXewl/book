checksec pwn01


查看程序保护
Arch:
RELRO:
Stack:
NX:
PIE:
RWX:


例如
```
Arch:     i386-32-little （32位的程序） 
Stack: No canary found （栈溢出关闭） 
PIE: No PIE (0x400000) （地址随机化关闭）

```