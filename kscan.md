## **ksacn**

ksan -t  x.x.xx
```
IP地址：114.114.114.114
C段：114.114.114.1/24
IP地址段：114.114.114.114-115.115.115.115
URL地址：https://www.baidu.com
文件地址：/tmp/target.txt



--check 对ip端口做指纹识别，不扫端口，如192.168.20.128:8000
-sV 全端口扫描
--hydra 自动化密码爆破

```

ksan --spy
```
上传目标主机执行kscan_windows_386.exe --spy
默认扫描B网段存活可达

--scan 并端口扫描kscan_windows_386.exe --spy --scan
all  所有内网段扫描
```


## **移动终端设备扫描**
kscan扫描发现移动终端设备端口，用adb直接连接上，可以
```
adb devices：列出当前连接到计算机的所有 Android 设备。

adb connect 127.0.0.1:端口  连接设备。

adb shell：启动与设备的命令行交互会话。

adb root 获取root权限，模拟器中点确认授权给shell。
```
大概60台左右算物联网分数上限直接满。
