找到你的AndroidStudio(AS)的sdk安装目录下的\platform-tools
start E:\Users\Administrator.DESKTOP-L9N4RF9\AppData\Local\Android\Sdk\platform-tools
里面有你AS调试的adb.exe

打开安卓虚拟机，这里mumu虚拟机，默认adb调试端口7555

命令：adb connect 127.0.0.1:7555

连接成功后AS中就可以选择虚拟机中的手机设备为运行调试设备。

```
E:\Users\Administrator.DESKTOP-L9N4RF9\AppData\Local\Android\Sdk\platform-tools\adb.exe connect 127.0.0.1:7555
```




```

mumu
adb connect 127.0.0.1:7555
雷电
adb connect 127.0.0.1:5555

通常情况下，雷电模拟器的默认ADB端口是5555，但如果你打开了多个模拟器实例，端口号会根据实例编号进行调整。具体计算方法如下：
端口号 = 5555 + 2 * 当前打开的模拟器编号
例如，如果当前打开的模拟器编号是29，那么对应的ADB端口号就是：
5555 + 2 * 29 = 5613


adb devices
```

