## frida持久化方案  
### 1.免root方案  
Frida的Gadget是一个共享库，用于免root注入hook脚本。  
[官方文档](https://frida.re/docs/gadget/#/)  
思路:将APK解包后，通过修改smali代码或patch so文件的方式植入frida-gadget，然后重新打包安装。  
优点:免ROOT、能过掉一部分检测机制  
缺点:重打包可能会遇到解决不了的签名校验、hook时机需要把握  
  
1. 基于obejction的patchapk功能  
[官方文档](https://github.com/sensepost/objection/wiki/Patching-Android-Applications)  
命令：  
```  
objection patchapk -V 14.2.18 -c config.txt -s demo.apk(注意路径不要有中文)  
-V 指定gadget版本  
-c 加载脚本配置信息  
-s 要注入的apk  
```  
  
注意的问题:  
`objection patchapk`命令基本上是其他几个系统命令的补充，可尽可能地自动化修补过程。当然，需要先安装并启用这些命令。它们是：  
  
- `aapt`- 来自：[http://elinux.org/Android_aapt](http://elinux.org/Android_aapt)  
- `adb`- 来自：[https://developer.android.com/studio/command-line/adb.html](https://developer.android.com/studio/command-line/adb.html)  
- `jarsigner`- 来自：[http://docs.oracle.com/javase/7/docs/technotes/tools/windows/jarsigner.html](http://docs.oracle.com/javase/7/docs/technotes/tools/windows/jarsigner.html)  
- `apktool`- 来自：[https://ibotpeaches.github.io/Apktool/](https://ibotpeaches.github.io/Apktool/)  
  
ps:这几个环境工具，aapt、jarsigner都是Android Studio自带的，所以在配置好as的环境即可，abd的环境配置网上搜一下就行，apktool则需要额外配置，我会上传到课件当中  
  
另外会遇到的问题，patchapk的功能在patch的时候会下载对应版本的gadget的so，但是网络问题异常慢，所以建议根据链接去下载好，然后放到这个路径下并重命名  
```  
C:\Users\用户名\.objection\android\arm64-v8a\libfrida-gadget.so  
```  
  
### 2.root方案  
方法一:  
思路:可以patch /data/app/pkgname/lib/arm64(or arm)目录下的so文件，apk安装后会将so文件解压到该目录并在运行时加载，修改该目录下的文件不会触发签名校验。  
Patch SO的原理可以参考[Android平台感染ELF文件实现模块注入](https://gslab.qq.com/portal.php?mod=view&aid=163)  
优点:绕过签名校验、root检测和部分ptrace保护。  
缺点:需要root、高版本系统下，当manifest中的android:extractNativeLibs为false时，lib目录文件可能不会被加载，而是直接映射apk中的so文件、可能会有so完整性校验  
使用方法  
```  
python LIEFInjectFrida.py test.apk ./ lib52pojie.so -apksign -persistence  
test.apk要注入的apk名称  
lib52pojie.so要注入的so名称  
```  
然后提取patch后是so文件放到对应的so目录下  
  
方法二:  
思路:基于magisk模块方案注入frida-gadget，实现加载和hook。寒冰师傅的[FridaManager](https://github.com/hanbinglengyue/FridaManager)  
优点:无需重打包、灵活性较强  
缺点:需要过root检测，magsik检测  
  
![](_assets_19/5d77cb0275b0416dd9108347d069a6543952.png)  
  
方法三:  
思路:基于jshook封装好的fridainject框架实现hook  
[JsHook](https://github.com/Xposed-Modules-Repo/me.jsonet.jshook)  
![](_assets_19/e9b4df380b4d463c8071b32d63fd79474022.png)  
### 3.源码定制方案  
原理:修改aosp源代码,在fork子进程的时候注入frida-gadget  
[ubuntu 20.04系统AOSP(Android 11)集成Frida](https://www.mobibrw.com/2021/28588#/)  
[AOSP Android 10内置FridaGadget实践01](https://www.52pojie.cn/thread-1740214-1-1.html#/)  
[AOSP Android 10内置FridaGadget实践02(完)](https://www.52pojie.cn/thread-1748101-1-1.html)|  
  
## 3.其他检测思路与反思  
1.检测方法签名信息，frida在hook方法的时候会把java方法转为native方法  
2.Frida在attach进程注入SO时会显式地校验ELF_magic字段，不对则直接报错退出进程，可以手动在内存中抹掉SO的magic，达到反调试的效果。  
[检测点](https://github.com/frida/frida-gum/blob/8d9f4578b58c03025aef63652ec4defa19f8061c/gum/backend-linux/gumandroid.c#L876)  
![](_assets_19/05021abca85b3171197d0fe3fb67ab6b4981.png)  
```C  
if (memcmp (GSIZE_TO_POINTER (start), elf_magic, sizeof (elf_magic)) != 0)  
    return FALSE;  
```  
```C  
FILE *fp=fopen("/proc/self/maps","r");  
while (fgets(line, sizeof(line), fp)) {  
    if (strstr(line, "linker64") ) {  
          start = reinterpret_cast<int *>(strtoul(strtok(line, "-"), NULL, 16));  
          *(long*)start=*(long*)start^0x7f;  
          }  
     }  
```  
3.Frida源码中多次调用somain结构体,但它在调用前不会判断是否为空，只要手动置空后Frida一附加就会崩溃  
[检测点](https://github.com/frida/frida-gum/blob/8d9f4578b58c03025aef63652ec4defa19f8061c/gum/backend-linux/gumandroid.c#L1078)  
![](_assets_19/6083ea10892635db16bebb2051bde8c15922.png)  
```C  
somain = api->solist_get_somain ();  
gum_init_soinfo_details (&details, somain, api, &ranges);  
api->solist_get_head ()  
gum_init_soinfo_details (&details, si, api, &ranges);  
```  
```C  
int getsomainoff = findsym("/system/bin/linker64","__dl__ZL6somain");  
*(long*)((char*)start+getsomainoff)=0;  
```  
4.通常inline hook第一条指令是mov 常数到寄存器，然后第二条是一个br 寄存器指令。检查第二条指令高16位是不是0xd61f,就可以判断目标函数是否被inline hook了！  
![](_assets_19/12c3c4392e3cbe98d587338ffaa17b958258.png)  
  
5.还可以去hook加固壳，现在很多加固厂商都antifrida了，从壳中的代码去分析检测思路  
  
`反思`  
  
| 反调试现状       | 详细说明                                                                                     |  
|------------------|----------------------------------------------------------------------------------------------|  
| 检测方式多样     | 从通用检测、hook检测到源码检测，方式层出不穷。源码检测可以针对每行代码都能开发出不同检测方式，Frida指纹过多。 |  
| 检测位置不确定   | 一般是单独开线程跑，也可以在关键函数执行前判断 |  
| 强混淆加大定位难度 | 反调试通常埋几行代码，但结合混淆可达万行代码，不考虑效率可膨胀更多，定位极难。    |  