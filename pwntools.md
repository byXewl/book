pwntools ： CTF框架+漏洞利用开发库 可快速编写exp
pip3 install pwntools -i <https://pypi.tuna.tsinghua.edu.cn/simple>

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