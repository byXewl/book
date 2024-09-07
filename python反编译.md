## **python反编译**
.pyc文件
.py文件在被import运行的时候会在同目录下编译一个pyc的文件（为了下次快速加载），这个文件可以和py文件一样使用，但无法阅读和修改；

在线将pyc文件反编译为py文件：
<https://tool.lu/pyc/>
<https://www.lddgo.net/string/pyc-compile-decompile>

反编译工具：
<https://blog.csdn.net/qq_63585949/article/details/126706526>
pycdc：<https://blog.csdn.net/qq_63585949/article/details/127080253>
pycdc编译好的exe：<https://github.com/extremecoders-re/decompyle-builds/releases/tag/build-31-Mar-2024-6467c2c>
## **python打包解包**
判断可执行文件为py打包成：<https://blog.csdn.net/weixin_49764009/article/details/120340153>
.py可以打包成linux或win的exe可执行文件。

解包反编译：
<https://www.cnblogs.com/c10udlnk/p/14214028.html>
解包pyinstxtractor.py下载:<https://sourceforge.net/projects/pyinstallerextractor/>
pyinstxtractor-ng.py下载：<https://blog.csdn.net/weixin_49764009/article/details/120340153>
```
1.解包成.pyc
python3 .\pyinstxtractor.py  main.exe
使用010Editor打开生成文件夹中的main和struct，将struct中E3前面的字节复制粘贴到main的E3前
修改main文件后缀为main.pyc

或
python3  pyinstxtractor-ng.py home
直接生成.pyc文件

2.反编译成.py
pycdc.exe main.pyc
或
uncompyle6 .\main.pyc > palu.py
或使用在线平台反编译
```