代表vs2019，vs2019项目也可以一键重定向后在vs2022运行。

功能：
可以编译运行c、c++、c#。
可以编译成lib，dll，exe等。
可以支持内联汇编，反汇编。
可以支持编译32位或64位。


^
Visual Studio 使用的编译器是 Microsoft Visual C++ (MSVC) 编译器，它是专门设计用于 Windows 平台的编译器，支持 ANSI C/C++ 标准，并提供了许多针对 Windows 开发的特定功能。

>Visual Studio的安装过程中，‌C语言静态库文件（‌如.lib文件）‌通常会被安装在特定于版本的文件夹中。‌例如，‌如果你使用的是Visual Studio 2022或更高版本，‌库文件可能位于类似`%ProgramFiles(x86)%\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.30.30704\lib`的路径下，‌其中`14.30.30704`代表具体的版本号。‌这个路径包含了C语言的运行时库和其他必要的库文件，‌这些文件对于使用C语言进行项目开发是必不可少的。‌这些 `.lib` 文件是静态库文件，包含了编译器在编译和链接过程中需要的函数和资源。


>头文件路径：%ProgramFiles(x86)%\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\版本号\include
 >在这个路径下，你可能会找到如下几种类型的文件和目录：
>* **标准C头文件**：如 `<stdio.h>`、`<stdlib.h>`、`<string.h>` 等，这些文件包含了标准 C 库的定义。
>* **宽字符版本头文件**：如 `<wchar.h>`，包含了宽字符支持的相关定义。
>* **平台特定的头文件**：如 `<windows.h>`，包含了 Windows API 的定义。
>* **其他库的头文件**：可能包括其他库和框架的头文件，如 ATL、MFC、OpenMP 等。

>第三方库和头文件，放%ProgramFiles(x86)%\Microsoft Visual Studio\2022\Community\VC\Auxiliary\


## **Visual Studio一些使用**
提示fopen不安全用fopen_s：
项目-属性-c/c++预处理器-预处理定义-编辑-加一行
```
_CRT_SECURE_NO_WARNINGS

如果通过命令行编译，可以在编译器选项中添加 `/D_CRT_SECURE_NO_WARNINGS`。
或直接在源代码文件的开始处添加 `#define _CRT_SECURE_NO_WARNINGS`。
```


^
提示v143 不是v142：原因是vs2019项目，但是你在vs2022打开的。
方式一：按提示转成v143项目。
方式二：属性-常规-平台工具集-选择v142，修改.vcxproj文件中143为142等。