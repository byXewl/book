.c和.cpp文件都可使用gcc或g++编译链接成可执行文件，如linux ./  或windows .exe。
```
gcc -o hello hello.c   //指明可执行文件为hello。
./hello
或
hello.exe
```
## **Windows下c、c++环境**
Windows安装MinGW或cygwin，用于在 Windows 系统上提供类 Unix 环境的开发工具集。c、c++开发工具集。

Devc++就是mingw64，git也是基于mingw64。

VScode也一般配置MinGW实现c、c++。

Clion是一般也是基于MinGW开发工具。

Visual Studio 使用的编译器是 Microsoft Visual C++ (MSVC) 编译器，它是专门设计用于 Windows 平台的编译器，支持 ANSI C/C++ 标准，并提供了许多针对 Windows 开发的特定功能。

>Visual Studio的安装过程中，‌C语言静态库文件（‌如.lib文件）‌通常会被安装在特定于版本的文件夹中。‌例如，‌如果你使用的是Visual Studio 2022或更高版本，‌库文件可能位于类似`%ProgramFiles(x86)%\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.30.30704\lib`的路径下，‌其中`14.30.30704`代表具体的版本号。‌这个路径包含了C语言的运行时库和其他必要的库文件，‌这些文件对于使用C语言进行项目开发是必不可少的。‌这些 `.lib` 文件是静态库文件，包含了编译器在编译和链接过程中需要的函数和资源。


>头文件路径：%ProgramFiles(x86)%\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\版本号\include
 >在这个路径下，你可能会找到如下几种类型的文件和目录：
>* **标准C头文件**：如 `<stdio.h>`、`<stdlib.h>`、`<string.h>` 等，这些文件包含了标准 C 库的定义。
>* **宽字符版本头文件**：如 `<wchar.h>`，包含了宽字符支持的相关定义。
>* **平台特定的头文件**：如 `<windows.h>`，包含了 Windows API 的定义。
>* **其他库的头文件**：可能包括其他库和框架的头文件，如 ATL、MFC、OpenMP 等。

>第三方库和头文件，放%ProgramFiles(x86)%\Microsoft Visual Studio\2022\Community\VC\Auxiliary\




>很多软件在安装或运行时需要特版本的 Microsoft Visual C++ Redistributable Packages，这是因为它们使用了使用 Microsoft Visual C++ 编写的某些库或组件。这些库和组件是由 C++ 编写的动态链接库（DLL），在运行时需要在系统中存在相应版本的运行时支持，是 Microsoft 提供的一组运行时库（Runtime Libraries），用于在 Windows 系统上运行使用 Microsoft Visual C++ 编写的程序。



^
## **GCC参数说明**
<https://www.cnblogs.com/blizzard8204/p/17519125.html>
`gcc` 是 GNU 编译器套件中的 C 编译器，它用于编译 C 语言源代码文件。`gcc` 命令的参数是用来控制编译器的行为，根据不同的需求可以使用不同的参数。以下是一些常用的 `gcc` 命令参数及其含义：

- `-o <output>`：指定输出文件的名称。例如，`-o program` 将编译器的输出文件命名为 `program`。不指明为a.out。

- `-c`：只编译源文件，生成目标文件（Object File），而不进行链接操作。

- `-Wall`：显示所有警告信息。启用该参数可以让编译器输出更多的警告信息，有助于发现潜在的问题。

- `-g`：生成可调试的目标文件，包含调试信息。在编译时启用该选项，可以生成包含调试信息的目标文件，方便使用调试器GDB进行调试。

- `-I <directory>`：指定头文件的搜索路径。例如，`-I /usr/include` 将指定编译器在 `/usr/include` 目录中搜索头文件。

- `-L <directory>`：指定库文件的搜索路径。例如，`-L /usr/lib` 将指定编译器在 `/usr/lib` 目录中搜索库文件。

- `-l <library>`：链接指定的库文件。例如，`-l pthread` 将链接 pthread 库。

- `-std=<standard>`：指定要遵循的 C 语言标准。例如，`-std=c11` 指定使用 C11 标准。

- `-Wl,<option>`：将选项传递给链接器。例如，`-Wl,-rpath,/usr/local/lib` 将指定链接器在 `/usr/local/lib` 目录中搜索动态链接库。

这些是 `gcc` 命令的一些常用参数，还有很多其他的参数可以用来控制编译器的行为。您可以使用 `gcc --help` 命令来查看所有可用的选项及其含义。


^
## **GDB调试器**
gcc -g -o my_program my_program.c
gdb my_program
GDB（GNU Debugger）是一款由 GNU 项目开发的强大的调试器工具，用于调试 C、C++ 等编程语言编写的程序(-g参数)。它能够帮助开发者在程序运行时检测和修复错误，提高程序的稳定性和可靠性。

GDB 提供了一系列的功能，使开发者能够深入程序内部，观察和修改程序的状态，包括：

* 设置断点：在程序执行到指定位置时暂停程序的执行。
* 单步执行：逐行执行程序代码，并观察每一步的执行情况。
* 检查变量：查看程序中的变量的值，包括局部变量、全局变量等。
* 栈跟踪：查看函数调用栈，了解程序的调用关系。
* 检查内存：查看程序运行时的内存使用情况，包括内存地址、内存内容等。
* 观察程序状态：查看程序的寄存器状态、信号处理情况等。
* 修改程序状态：在程序暂停时，可以修改变量的值、执行指令等操作。

通过使用 GDB，开发者可以更加高效地进行程序调试和错误修复，尤其对于复杂的程序和难以复现的错误，GDB 能够提供强大的调试功能，帮助开发者快速定位和解决问题。

