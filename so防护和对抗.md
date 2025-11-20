## 3.SO防护手段

常见防护手段:

| 主要功能         | 描述                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| SO加壳           | 对C/C++源码编译出来的SO文件进行加壳，使SO文件无法正确反编译和反汇编。                                                      |
| SO源码虚拟化保护 | 将原始汇编指令翻译为自定义的虚拟机指令，跳转到自定义的虚拟机中执行，每次保护生成的虚拟机指令随机，且对虚拟机解释器再度混淆 |
| SO防调用         | 对SO文件进行授权绑定，防止SO文件被非授权应用调用运行。                                                                     |
| SO Linker        | 对整个SO文件进行加密压缩，包括代码段、符号表和字符串等，运行时再解密解压缩到内存，从而有效的防止SO数据的泄露。             |
| SO源码混淆       | 常量字符串加密、分裂基本块、等价指令替换、虚假控制流、控制流平坦化。                                         |
| SO环境监测                |   防frida\xposed\root、防动态调试、防模拟器、防多开等                                                                                                                        |

### 1.ollvm简介
LLVM(Obfuscator-LLVM)是瑞士西北应用科技大学安全实验室于2010年6月份发起的一个项目,该项目旨在提供一套开源的针对LLVM的代码混淆工具,以增加对逆向工程的难度，只不过仅更新到llvm的4.0，2017年开始就没在更新。
[项目地址](https://github.com/obfuscator-llvm/obfuscator)
```
源代码（c/c++）经过clang--> 中间代码(经过一系列的优化，优化用的是Pass)--> 机器码
```
### 2.ollvm的分类

| 分类 | 描述 |
| --- | --- |
| 指令替换（Instructions Substitution)(Sub) | 将一条运算指令替换为多条等价的运算指令，例如：y=x+1变为y=x+1+1-1 |
| 虚假控制流（Bogus Control Flow)(bcf) | 通过加入包含不透明谓词的条件跳转和不可达的基本块，来干扰IDA的控制流分析和F5反汇编 |
| 控制流平坦化(Control Flow Flattening)(Fla) | 主要通过一个主分发器来控制程序基本块的执行流程，将所有基本代码放到控制流最底部，然后删除原理基本块之间跳转关系，添加次分发器来控制分发逻辑，然后过新的复杂分发逻辑还原原来程序块之间的逻辑关系 |
| 字符串加密 | 编写一个pass将其中的字符串信息使用一些加密算法进行加密，然后特定的时间进行还原 |
#### 1.2.1 指令替换（Sub）
指令替换，将一条运算指令，替换为多条等价的运算指令。例如：`y=x+1`变为`y=x+1+1-1`
![](_assets_12/5657f2b0cb88f9410b9ec005374483ee4165.webp)
#### 1.2.2 虚假控制流（bcf）
虚假控制流混淆主要通过加入包含不透明谓词(相邻数字相乘恒为偶数)的条件跳转和不可达的基本块，来干扰IDA的控制流分析和F5反汇编
常见特征：不透明谓词-->例如`y > 10 || x * (x + 1) % 2 != 0`
![|800](_assets_12/d69ff8297a12fd1c9fe7ff62fbe5efae4286.webp)
#### 1.2.3 控制流平坦化（Fla）
控制流平坦化，主要通过一个主分发器来控制程序基本块的执行流程。该方法将所有基本代码放到控制流最底部，然后删除原理基本块之间跳转关系，添加次分发器来控制分发逻辑，然后过新的复杂分发逻辑还原原来程序块之间的逻辑关系。
常见的特征：一大堆分支函数
![|800](_assets_12/70e8ece9cfaf25fc157f469ee70bdc276221.webp)
![|800](_assets_12/e966a143f2519a137216d5614e0e2ea36269.webp)
#### 1.2.4 字符串加密
字符串加密的原理很简单，编写一个pass将其中的字符串信息使用一些加密算法进行加密，然后特定的时间进行还原。一般含有字符串混淆、函数名混淆、不在init_array解密等
常见的特征：datadiv_decoded
![|800](_assets_12/3c7df87b5caf4fb8e8eb5a5e6770974c3143.webp)
### 3.ollvm对抗
1.简单ollvm可以通过交叉引用分析
2.angr去除不透明谓词
3.Unicorn/Unidbg/AndroidNativeEmu模拟执行
4.IDA Trace
5.binary ninja
6.后端编译优化
7.frida辅助分析
### 4.IDA Trace 实战分析ollvm
1.在要trace的函数前后下断，触发断点
2.配置trace的log输出路径，并选择trace模式
- Instruction tracing 调试器将为每条指令保存所有修改后的寄存器值。
- Basic block tracing 调试器将保存到达临时基本块断点的所有地址。
- Function tracing 调试器将保存发生函数调用或函数返回的所有地址。
3.run并触发trace

感谢SharkFall大佬帮忙编译的样本

[遇到ollvm平坦化怎么办？没事！chatGpt爸爸帮你解决](https://bbs.kanxue.com/thread-275993.htm)

[记一次基于unidbg模拟执行的去除ollvm混淆](https://bbs.kanxue.com/thread-277086.htm)

[Unicorn反ollvm控制流平坦化之bb](https://www.52pojie.cn/thread-1114563-1-1.html)

[ARM64 OLLVM反混淆](https://bbs.kanxue.com/thread-252321.htm)

[OLLVM 与去平坦化 & [RoarCTF2019] polyre 详细WP](https://www.52pojie.cn/forum.php?mod=viewthread&tid=1601573)

[移除ollvm中的控制流平坦化、不透明谓词](https://www.52pojie.cn/forum.php?mod=viewthread&tid=1502997)

[【reverse】虚假控制流入门：Ubuntu20.04安装ollvm4.0踩坑记+用IDApython去除BCF](https://www.52pojie.cn/forum.php?mod=viewthread&tid=1692596)

[基于IDA Python的OLLVM反混淆(一) 手动去混淆](https://www.52pojie.cn/forum.php?mod=viewthread&tid=148835)

[你所需要的对抗ollvm的知识都在这里](https://bbs.kanxue.com/thread-272414.htm)

[ollvm反混淆学习](https://bbs.kanxue.com/thread-269441.htm)

[记使用Trace还原ollvm混淆的函数](https://bbs.kanxue.com/thread-261773.htm)

[frida辅助分析ollvm](https://bbs.kanxue.com/thread-275265.htm)
