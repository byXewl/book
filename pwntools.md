pwntools ： CTF框架+漏洞利用开发库 可快速编写exp
```
pip3 install pwntools -i https://pypi.tuna.tsinghua.edu.cn/simple
此时此cmd：也有pwn命令
python中：import pwn
```


## **使用**

连接
本地：io = porcess("/文件名")
远程：io = remote("IP",端口)

解析
文件解析文件：elf=ELF("./文件名")

发送数据
io.send(str)
io.sendline(str)
io.sendafter("str1" , str2)

接收数据
io.recv()
io.recvline()
io.recvuntil("str")

^
## **案例**
官网的一个简单样例

```
from pwn import *
context(arch = 'i386', os = 'linux')
r = remote('exploitme.example.com', 31337)
EXPLOIT CODE IS HERE
r.send(asm(shellcraft.sh()))
r.interactive()
```

基本上仿造这个格式就可以写exp了。

```
from pwn import *
```

用来导入pwntools模块

```
context(arch = 'i386', os = 'linux')
```

设置目标机的信息

```
r = remote('exploitme.example.com', 31337)
```

用来建立一个远程连接，url或者ip作为地址，然后指明端口

这里也可以仅仅使用本地文件,调试时方便:

```
r = process("./test")
```

test即为文件名,这使得改变远程和本地十分方便.

```
asm(shellcraft.sh())
```

asm()函数接收一个字符串作为参数，得到汇编码的机器代码。

比如

```
>>> asm('mov eax, 0')
'\xb8\x00\x00\x00\x00'
```

shellcraft模块是shellcode的模块，包含一些生成shellcode的函数。

其中的子模块声明架构，比如shellcraft.arm 是ARM架构的，shellcraft.amd64是AMD64架构，shellcraft.i386是Intel 80386架构的，以及有一个shellcraft.common是所有架构通用的。

而这里的shellcraft.sh()则是执行/bin/sh的shellcode了

r.send()将shellcode发送到远程连接

最后，

```
r.interactive()
```

将控制权交给用户，这样就可以使用打开的shell了

### Context设置

`context`是pwntools用来设置环境的功能。在很多时候，由于二进制文件的情况不同，我们可能需要进行一些环境设置才能够正常运行exp，比如有一些需要进行汇编，但是32的汇编和64的汇编不同，如果不设置context会导致一些问题。

一般来说我们设置context只需要简单的一句话:

```
context(os='linux', arch='amd64', log_level='debug')
```

这句话的意思是：

1. os设置系统为linux系统，在完成ctf题目的时候，大多数pwn题目的系统都是linux
2. arch设置架构为amd64，可以简单的认为设置为64位的模式，对应的32位模式是’i386’
3. log_level设置日志输出的等级为debug，这句话在调试的时候一般会设置，这样pwntools会将完整的io过程都打印下来，使得调试更加方便，可以避免在完成CTF题目时出现一些和IO相关的错误。

### 数据打包

数据打包,即将整数值转换为32位或者64位地址一样的表示方式,比如0x400010表示为\x10\x00\x40一样,这使得我们构造payload变得很方便

用法:
\* `p32/p64`: 打包一个整数,分别打包为32或64位
\* `u32/u64`: 解包一个字符串,得到整数

p对应pack,打包,u对应unpack,解包,简单好记

```
payload = p32(0xdeadbeef) # pack 32 bits number
```

 

### 数据输出

如果需要输出一些信息,最好使用pwntools自带的,因为和pwntools本来的格式吻合,看起来也比较舒服,用法:

```
some_str = "hello, world"
log.info(some_str)
```

其中的info代表是log等级，也可以使用其他log等级。



### Cyclic Pattern

Cyclic pattern是一个很强大的功能，大概意思就是，使用pwntools生成一个pattern，pattern就是指一个字符串，可以通过其中的一部分数据去定位到他在一个字符串中的位置。

在我们完成栈溢出题目的时候，使用pattern可以大大的减少计算溢出点的时间。
用法：

```
cyclic(0x100) # 生成一个0x100大小的pattern，即一个特殊的字符串
cyclic_find(0x61616161) # 找到该数据在pattern中的位置
cyclic_find('aaaa') # 查找位置也可以使用字符串去定位
```

比如，我们在栈溢出的时候，首先构造`cyclic(0x100)`，或者更长长度的pattern，进行输入，输入后pc的值变味了0x61616161，那么我们通过`cyclic_find(0x61616161)`就可以得到从哪一个字节开始会控制PC寄存器了，避免了很多没必要的计算。

### 汇编与shellcode

有的时候我们需要在写exp的时候用到简单的shellcode，pwntools提供了对简单的shellcode的支持。
首先，常用的，也是最简单的shellcode。shellcraft : shellcode的生成器。即调用`/bin/sh`可以通过shellcraft得到：

注意，由于各个平台，特别是32位和64位的shellcode不一样，所以最好先设置context，如果没声明平则

```
32位:shellcraft.i386.linux.sh()
64位:shellcraft.amd64.linux.sh()
```

```
print(shellcraft.sh()) # 打印出shellcode
```

不过，现在我们看到的shellcode还是汇编代码，不是能用的机器码，所以还需要进行一次汇编

```
print(asm(shellcraft.sh())) # 打印出汇编后的shellcode
```

asm可以对汇编代码进行汇编，不过pwntools目前的asm实现还有一些缺陷，比如不能支持相对跳转等等，只可以进行简单的汇编操作。如果需要更复杂一些的汇编功能，可以使用`keystone-engine`项目，这里就不再赘述了。

asm也是架构相关，所以一定要先设置context，避免一些意想不到的错误。

asm也是架构相关，所以一定要先设置context，避免一些意想不到的错误。



^

### ELF文件操作

```
In [1]: from pwn import*

In [2]: elf = ELF('./level0')
[*] '/home/nuo/level0'
    Arch:     amd64-64-little
    RELRO:    No RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)

In [3]: callsys_addr = elf.symbols['callsystem']

In [4]: print callsys_addr
4195734
In [6]: a=hex(callsys_addr)

In [7]: print a
0x400596
```

可见ipython时，ELF相当于checksec ,但其主要是获取信息，一些地址等

```
>>> e = ELF('/bin/cat')
>>> print hex(e.address)  # 文件装载的基地址
0x400000
>>> print hex(e.symbols['write']) # 函数地址,symbols,got,plt均是列表
0x401680
>>> print hex(e.got['write']) # GOT表的地址
0x60b070
>>> print hex(e.plt['write']) # PLT的地址
0x401680
>>> print hex(e.search('/bin/sh').next())# 字符串/bin/sh的地址字符串加（）
```