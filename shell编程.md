## **bash的shell**
命令换行
```
cat xxx.txt  回车

cat xx\ 回车
x.txt   回车
```

自定义变量
```
foo=1
echo $foo
```

算术运算
```
((foo = 5 + 5))
echo $foo
//10
```
输出处理
```
echo 'ddd' | md5sum
echo 'ddd' | base64
```


^
## **shell脚本：.sh或.py等**
脚本（script）就是包含一系列命令的一个文本文件。Shell 读取这个文件，依次执行里面的所有命令，就好像这些命令直接输入到命令行一样。所有能够在命令行完成的任务，都能够用脚本完成。

脚本的好处是可以重复使用，也可以指定在特定场合自动调用，比如系统启动或关闭时自动执行脚本。


touch myscript.sh 创建名为 myscript.sh 的脚本，vim进行编辑内容如下：
```
#!/bin/bash

# 这是一个简单的 Shell 脚本示例
echo "Hello, this is my script!"

# 接受用户输入
echo "Please enter your name:"
read name

# 打印用户输入
echo "Hello, $name! Nice to meet you."
```

### 脚本调用流程

1. **创建脚本文件：** 在文本编辑器中创建一个新文件，将上述脚本内容复制并粘贴到文件中。保存文件并确保文件名以 .sh`结尾，例如 myscript.sh。
touch myscript.sh 创建名为 myscript.sh 的脚本，vim进行编辑内容。

2. **添加执行权限：** 打开终端，使用以下命令为脚本添加执行权限：

   ```
   chmod +x myscript.sh
   ```

3. **运行脚本：** 在终端中运行脚本：

   ```
   ./myscript.sh
   ```

   或者，如果脚本在当前目录中，也可以使用：

   ```
   bash myscript.sh
   ```

4. **脚本执行：** 脚本将输出欢迎信息并要求输入用户名。用户输入后，脚本将打印个性化的问候语。


^
## **脚本shebang 行**
在典型的 Unix 和 Linux 系统中，脚本的第一行通常以 `#!`（shebang）开头，后跟解释器的路径。这行被称为 shebang 行，用于指定脚本使用的解释器。
```
#!/bin/bash
```
上面的示例指定了脚本使用 Bash 解释器来执行。这是常见的默认选择，因为许多 Unix 和 Linux 系统中都安装了 Bash。
但并不是所有的脚本都必须以 `#!/bin/bash` 开头。实际上，shebang 行的目的是告诉系统使用哪个解释器来执行脚本。你可以根据脚本使用的编程语言或解释器类型来选择不同的 shebang。

例如，如果你使用 Python 编写的脚本，可以这样写 shebang 行：
```
#!/usr/bin/env python
```
这告诉系统使用环境中的 Python 解释器来执行脚本，此时为.py文件。
总体而言，shebang 行并不是脚本执行的绝对必要条件，特别是对于那些将直接通过解释器运行的脚本。然而，它是一个良好的实践，有助于确保脚本在不同环境中能够正确执行。




