###  安卓so常见反调试
1.调试端口检测
检测常见的23946端口，所以在运行时可以加 -p 指定一个另外的端口来过掉这个检测
2.调试进程名检测
固定的进程名 android_server gdb_server等等，所以要改个名字，例如as64

^
3.ptrace检测
目标程序可能会附加检测TracerPid值，不为0则在附加调试（TracerPid默认为0）。
原理：每个进程同时刻只能被1个调试进程ptrace ，主动ptrace本进程可以使得其他调试器无法调试。
在附加前先用ptrace(PTRACE_TRACEME,0,0,0）把进程占坑，对方再ptrace会失败。
实现代码：
```c++
int ptrace_protect()//ptrace附加自身线程 会导致此进程TracerPid 变为父进程的TracerPid 即zygote
{
    return ptrace(PTRACE_TRACEME,0,0,0);;//返回-1即为已经被调试
}
```
绕过：
该apk运行时会自己附加一个子进程，IDA中直接动态调试会显示两个Pid的该进程（可以进入/proc/进程id/status进行信息查看，子进程的TracePid就是父进程的Pid），由于一个进程只能被附加一次
，因此不能再对子进程进行附加，对父进程调试也发生了错误。
1、静态找到检测点，修改函数的call直接retun nop。
2、Debug模式动态调试则可以在so完全加载前开始调试，一边加载so，一边查看so中那个指令后调试被中断。
再修改对应指令的so重新替换打包即可。
使用MT管理器可以一键替换so并签名，如果打开闪退可以看日志再解决。



^
4.TracerPid检测
/proc/%d/status中的TracerPid检测到非0则在调试。


绕过：静态或Debug模式动态调试找到检测点手动修改检测函数汇编重写so。
模拟器是什么架构就修改重新替换什么架构下的so。
真机一般是arm下的so。
