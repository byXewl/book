## **syscall**
>1. **系统调用（System Call）**： 系统调用是用户空间程序与操作系统内核之间的接口。它们允许程序请求操作系统的服务，如输入/输出操作、进程控制、通信和数据管理等。系统调用提供了一种安全的方式，让应用程序能够访问系统资源，同时受到操作系统的监管和控制。
   在不同的操作系统和架构中，系统调用的实现和可用的调用列表可能会有所不同。例如，在Unix-like系统中，可以通过`int syscall(int number, ...)`形式的C库函数来进行系统调用，其中`number`是系统调用的编号，后续参数是该系统调用所需的参数。
>2. **Go语言的syscall包**： 在Go语言中，`syscall`是一个提供对底层系统调用接口的包。它允许Go程序执行系统调用，从而能够执行一些需要操作系统支持的底层操作。Go的`syscall`包提供了许多与Unix系统调用相对应的函数，这些函数可以用来实现跨平台的系统级功能。
   Go的`syscall`包中定义了大量与C语言系统调用相同的函数和常量。使用`syscall`包，Go程序可以访问操作系统提供的许多高级功能，包括但不限于文件操作、网络通信、进程管理等。
<https://xz.aliyun.com/t/14692?time__1311=GqAhYKBK0K7KY5DsD7%2B3GQfuYxfgt6W1YD#toc-12>

## **syscall免杀**
syscall已经成为了绕过AV/EDR所使用的主流方式，可以用它绕过一些敏感函数的调用监控(R3最高级别)。主流的AV/EDR都会对敏感函数进行HOOK(分析程序做了那些事情)，而syscall则可以用来绕过该类检测。

http://cloud.tencent.com/developer/article/1944012

一般上线的后门程序借助高级语言的函数，函数调用很多dll，dll再调用底层操作系统api，是nosyscall的。
syscall的上线后门程序，直接利用底层操作系统的api，只调用几个必要的dll。
>可以使用PowerTool64位工具查看进程的系统调用。

系统调用demo：
http://github.com/7BitsTeam/EDR-Bypass-demo
go的系统调用demo：
<https://xz.aliyun.com/t/14692?time__1311=GqAhYKBK0K7KY5DsD7%2B3GQfuYxfgt6W1YD#toc-12>

此时可以过EDR，但是沙箱还能检测，需要反沙箱。