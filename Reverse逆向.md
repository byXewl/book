用IDA软件和IDA插件 等
逆向exe，elf（linux）等可执行文件，反汇编变成汇编代理，反编译变成C语言代码。
必要时需要py脚本。
小迪逆向虚拟机 密码toor
文档：<https://www.yuque.com/reverser/znv8mg/tn3avot4t5rlpio4>

## **题型**
控制台游戏题
迷宫maze
数字逻辑游戏
常见算法识别
对抗静态分析技术

## **文件信息探测**
工具：exeinfope.exe，studyPE，Detect It Easy
多少位，是否加壳(压缩壳，加密壳。如UPX压缩壳)
![image-20240804230107029](http://cdn.33129999.xyz/mk_img/image-20240804230107029.png)
手工看多少位：文件头后面的PE..L.．x2e是32位exe文件特征，PE..d?.．是64位exe文件特征。

IDA打开用shift+f12 查看字符串窗口，即可ctrl + f 搜索。
可以根据字符串初步判断是什么高级语言打包的可执行文件，如py会有很多Py_xx字符串。如果加壳后可能无法判断。
