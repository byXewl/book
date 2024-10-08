pwndbg ： 
gdb插件，在gdb运行动态调试查看二进制代码时做一些增强的功能
```
git clone https://github.com/pwndbg/pwndbg
cd pwndbg.
/setup.sh
```
安装后输入gdb回车显示是pwndbg了。

## **作用命令**
设置断点 break
启动程序 run
继续执行程序 continue
单步执行程序，跳过函数调用 next
单步执行程序，进入函数调用 step
显示内存中的内容 x/<n/f/u>
退出gdb quit
查看汇编代码 disassemble
显示进程的虚拟内存映射 vmmap