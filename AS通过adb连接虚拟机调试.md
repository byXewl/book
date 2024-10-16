找到你的AndroidStudio(AS)的sdk安装目录下的\platform-tools
start E:\Users\Administrator.DESKTOP-L9N4RF9\AppData\Local\Android\Sdk\platform-tools
里面有你AS调试的adb.exe

打开安卓虚拟机，这里mumu虚拟机，默认adb调试端口7555

命令：adb connect 127.0.0.1:7555

连接成功后AS中就可以选择虚拟机中的手机设备为运行调试设备。

```
E:\Users\Administrator.DESKTOP-L9N4RF9\AppData\Local\Android\Sdk\platform-tools\adb.exe connect 127.0.0.1:7555
```