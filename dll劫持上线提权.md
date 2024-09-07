Windows动态链接库劫持提权，白加黑权限维持。
替换dll文件为恶意。

Windows上第三方程序运行的时候可能会动态的加载运行DLL文件。如果加载DLL路径可以找到，则可以在程序要查找的DLL位置替换放置恶意DLL来提权。
应用程序有其预定义好的DLL路径表，里面大部分是操作系统的dll我们无法修改，而有的dll是应用程序本身自带的，在程序所在目录下，如此我们可以有权限修改替换。

```
程序加载dll搜索目录顺序：
1.C:\Windows\System32
2.C:\Windows\System
3.C:\Windows
4.当前工作目录 Current Working Directory，CWD
5.PATH 环境变量的目录（先系统后用户）
```

## **查看程序调用的dll 及 dll所在路径**
用火绒剑查看某个第三方程序的进程，进入查看其调用的dll。

## **验证是否可替换dll劫持**
用ChkDllHijack.exe输入第三方程序的.exe和目录里的.dll，即可验证是否可劫持。

## **MSF使用dll后门劫持上线**
生成监听.dll后门，修改名字为目录里的.dll文件同名，替换即可。

此时受害者管理员运行这个第三方程序，即可上线MSF，再会话getsystem提权。

