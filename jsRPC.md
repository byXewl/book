<https://mp.weixin.qq.com/s/LDPwjUXagvvJfLOkq51n0g>

针对请求接口加密/响应需要解密的情况，在使用Burp测试时无法对数据进行操作，需要确认传输都为明文我们才可以进行常规测试。这块有点JS基础和Python基础基本都可以通杀。
jsRPC免去抠代码。
原理：一种往浏览器里弄个ws的客户端，然后接受服务器的指令，去调用已经加载好的js方法。

![](.topwrite/assets/image_1727580420081.png)


## **1、配置mitmproxy**
```
mitmdump.exe -p 6666 -s main.py --mode upstream:http://127.0.0.1:6662  --ssl-insecure
```


## **使用**
分析JS中加密解密
如果加密解密函数的调用：my1("123456"); my2("#fahkbf");
代理加密函数到windows变全局：windows.encode=my1
代理解密函数到windows变全局：windows.decode=my2

F12-源代码-片段：里面是RPC客户端的代码
控制台创建一个浏览器中的RPC客户端，连接本地启动的RPC服务端
将代理的加解密函数注册到RPC服务里面。