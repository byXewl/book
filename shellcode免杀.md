MSF的客户端源码是开源的，可以找到地址reversetcp.rb，是ruby语言。
查看ruby语言源码比对生成的shellcode。
可以看到shellcode本质是16进制数字，有特征，可以看到外链的ip和端口，可以直接修改shellcode中16进制。

shellcode通过加载器打包成可执行文件。加载器可以是python，c/c++汇编，go，java等。
python一般是代码脚本执行，需要打包器(pyinstall、py2exe、Nuitka)，打包成可执行文件。
go可以交叉编译成可执行文件，是比较方便的。