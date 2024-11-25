
## **IDA安装**
安装使用：<https://www.bilibili.com/video/BV1uA411V7LK/?vd_source=972491eeb83c0ed4c0015aef1be6c537>(不推荐)
推荐渊龙，吾爱破解的。如ida 7.7插件整合版

目录：
ida.exe 争对32位
ida64.exe 争对64位
plugins/  插件放在这个目录
 python/  内置的python环境

## **视图窗口和操作**
用户可以通过View ->Open Subviews ->打开各种未显示的子窗口。
上方有代码函数据进度条，常规函数为蓝色，蓝色最前面就是main函数入口，蓝色可以反编译。
按table键切换窗口。
#### **IDA View 反汇编窗口**
按空格 切换显示模式：
![image-20240428204235925](http://cdn.33129999.xyz/mk_img/image-20240428204235925.png)
操作：
点击选中 右键 有一些数据转换显示
点击选中+x快捷键 查看被调用
点击选中+h快捷键 16转10
点击选中+r快捷键  10转ascii字符
点击选中+e快捷键  ascii字符转16
点击选中+a快捷键  16转ascii字符
CTRL+S快捷键 列举出二进制程序的段的开始地址、结束地址等信息
G 快捷键 跳转指定地址
alt + t 搜索字符串
点击后+d 转成单字节格式显示

点击：或；在汇编后面来添加注释。
：是填写常规注释，；填写的是可重复注释。如果填写了常规注释和可重复注释，那么只显示常规注释。
快捷键A 以ascii码值显示;备注。 
快捷键U 以字母显示;备注。 


选择后shift+e 可以导出汇编为c代码，16进制数据等。
一般导出为C unsigned char array(hex)，变成c数组或python列表数组，进行遍历操作。
数据段的值：需要注意定义
![](.topwrite/assets/image_1732431392925.png)
注意变量指向的地址
![](.topwrite/assets/image_1732514362599.png)

^
#### **Pseudocode伪代码窗口**
F5 汇编反编译转C语言。
点击/ 添加注释。
Esc返回上一级
点击选中+n快捷键 统一重命名C语言代码函数，或C语言变量名。
点击选中+y快捷键 统一修改变量类型，如字符数组类型，修改int s 为_BYTE * s方便查看。
点击选中+r快捷键  10转ascii字符。
点击选中+h快捷键 16转10。


常见函数：
```
1、memset是 C 语言标准库中的一个函数，用于将内存的一段区域设置为指定的值。
void *memset(void *s, int c, size_t n);
`s` 是指向要设置的内存区域的指针。
`c` 是要设置的值，对于字符串来说，通常是字符的 ASCII 码。
`n` 是要设置的字节数。


2、memcpy函数用于将内存从一个位置复制到另一个位置

3、strcat函数用于将一个字符串追加到另一个字符串的末尾。具体来说，`strcat`函数会将`Source`字符串（包括终止的空字符`\0`）复制到`Destination`字符串的末尾，并返回`Destination`字符串的指针。


```
注意：
```
int类型的数组和变量，一般是连续的
  int v7[2]; // [esp+8h] [ebp-20030h] BYREF   //8h+4=Ch  //Ch+4=10h
  int v8; // [esp+10h] [ebp-20028h]
  int v9; // [esp+14h] [ebp-20024h]
  int v10; // [esp+18h] [ebp-20020h]
fun1(v7, 0, 4);//实际上v7到v10都传进入函数了



在C语言中，当在函数中定义局部变量时，它们会按照声明的顺序在栈上连续分配空间。
这里是这些变量在内存中的布局顺序：
1字节8位
1. `_BYTE v4[12];` - 占用12个字节。
2. `_DWORD v5[3];` - 每个`_DWORD`通常是4字节，所以这个数组占用12字节。
3. `_BYTE v6[5];` - 占用5个字节。
4. `int v7;` - 通常占用4字节。
5. `int v8;` - 占用4字节。
6. `int v9;` - 占用4字节。
7. `char v10;` - 占用1字节。
8. `int i;` - 占用4字节。
9. unsigned __int8  u 占用1字节。
10. __int64 i 占8字节

内存地址：
  _BYTE v4[12]; // [esp+12h] [ebp-2Eh] BYREF
  _DWORD v5[3]; // [esp+1Eh] [ebp-22h]
  _BYTE v6[5]; // [esp+2Ah] [ebp-16h] BYREF
  int v7; // [esp+2Fh] [ebp-11h]
  int v8; // [esp+33h] [ebp-Dh]
  int v9; // [esp+37h] [ebp-9h]
  char v10; // [esp+3Bh] [ebp-5h]
  int i; // [esp+3Ch] [ebp-4h]
```

^
#### **String字符串窗口**
IDA不会默认打开String窗口，shift+f12 查看字符串窗口，即可ctrl + f 搜索。
可以根据字符串初步判断是什么高级语言打包的可执行文件，如py会有很多Py_xx字符串。
如有关键字符串，双击进入字符串的存储地址，ctrl+x（交叉引用）查看那段函数调用了该字符，再反汇编反编译f5。
简单逆向题：<https://blog.csdn.net/YueXuan_521/article/details/135675052>



^
#### **Functions函数列表窗口**
ctrl + f 可搜索


#### **16进制窗口**
Hex View


#### **Imports导入表窗口**
显示其他动态链接库导入的所有函数，当程序加壳后识别不了。



^
## **程序退出保存**
默认退出的模式，会保存成在同目录一下一个 同名.idb数字 文件，里面有纪录修改。
退出选择最下面选项，则不会保存修改后的记录为文件。



^
## **IDA插件操作**
OBPO 自动去除混淆。

Keypatch Patcher 修改条件才跳转的汇编代码。

lazyIDA 在汇编页，右键有NOP可以快去去除花指令（先点击后+d 转成单字节格式显示，NOP单字节变90），
右键有Convert类似Export data可以导出python格式数据。

D-810 去除混淆
^
## **IDA动态调试**
汇编页，打断点
左上角debugger选择本地windows运行，
继续左上角debugger F9继续，进入动态调试页的断点处，
右上角可以修改EIP寄存器双击修改下一跳地址，如0x00401520是一个函数A的地址
F9下一步
如此实现进入动态修改的内容，进行调用函数A
