
## **frida+r0capture通杀安卓反证书抓包**
r0capluie仅限安卓平台，一般需要root，测试安卓7、8、9、10、11、12、13，
可用无视所有证书校验或绑定，不用考虑任何证书的事情。
通杀协议包括：Http、WebSocket、Ftp、Xmpp、Smtp、Protobuf等、及它们的SSL版本。
r0capture下载：http://github.com/r0ysue/r0capture
Frida：https://github.com/frida/frida/releases
>Frida框架分为两部分：
>1. 一部分是运行在系统上的交互工具frida CLI。
>2. 另一部分是运行在目标安卓机器上的代码注入工具 frida-serve。注意：版本要与本地Frida一致
>使用：<https://zhuanlan.zhihu.com/p/651445850>

^
### **安装**
电脑本地安装frida本地版：frida 15.2.2
电脑模拟器安装frida-server服务版x86版本（真机arm版本）
本地版连接服务版
再用r0capture免证书抓包。
```
python3环境

pip list
pip install frida
pip install frida-tools
```
然后去https://github.com/frida/frida/releases
下载对应型号且与电脑安装Frida版本一致的Frida-server版本frida 15.2.2。
```
例如我的机器为arm32为架构，就选择frida-server-12.8.14-android-arm.xz下载
可以在adb使用命令 adb shell getprop ro.product.cpu.abi 查询手机架构
或者去百度搜自己的手机型号处理器是什么架构
```
^
使用adb安装frida服务端
模拟器如mumu模拟器的adb.exe程序加入环境变量或直接cmd使用。
```
adb命令调试模拟器中的安卓。

adb devices 列出当前连接到计算机的所有 Android 设备。

adb.exe connect 127.0.0.1:16384  可能没有显示，这里mumu模拟器直接连接模拟器的adb端口

adb shell 直接连接第一个的模拟器，启动与设备的命令行交互会话。
进入虚拟机中的目录
getprop ro.product.cpu.abi 查看虚拟机的内核。如x86_64。
```
```
server端需要安装在要hook的主机上，server端的安装版本必须与客户端版本一致，
且server端的安装包文件必须和主机的CPU架构匹配。
首先使用adb shell getprop ro.product.cpu.abi查看CPU架构，结果为x86_64，
则下载frida-server-16.1.3-android-x86_64.xz，解压。

adb root 获取root权限，模拟器中点确认授权给shell。
adb push D:/xxx/frida-server-xx-xx    /data/loacl/frida-server
adb shell
cd /data/local/
chmod 777 ./frida-server
./frida-sever 启动服务端，此时无响应

检查安装是否成功：
另一个终端adb shell进入再ps | grep frida-server 或 ps -a
或
在本地电脑安装了frida客户端终端可执行frida-ps -U，如果能返回手机端运行的进程则说明frida环境搭建成功


端口转发
后续执行frida注入可能会提示找不到设备，这时尝试添加端口转发，
27042是默认客户端和服务端通信端口，不确定27043是不是必须的，网上搜索的结果都是两个端口都加入了转发。
新终端执行：
adb forward tcp:27042 tcp:27042
adb forward tcp:27043 tcp:27043

此时可以frida-ps -R
模拟器中运行一个APP即可看到进程。
```

^
### **使用**
基础
```
列出正在运行的进程(USB连接)
frida-ps -U

列出正在运行的进程(网络连接)
frida-ps -R

列出正在运行的应用程序
frida-ps -Ua

列出已安装的应用程序，带包名
frida-ps -Uai

对某个程序运行 frida hook 脚本
frida -U -l [hook脚本] [应用包名]
```
开始r0capture抓包某一个APP。
启动APP
已知获取了APP的包名（/data/data/下有所有安装程序的包名。）
如探探包名:com.p1.mobile.putong
```
python r0capture.py -U -f com.p1.mobile.putong -p tantan.pcap
pcap为全数据包，运行命令后，虚拟机自动启动探探，并获取对应数据包到tantan.pcap文件。
使用wireshark软件打开分析数据包文件。
```
