<https://mp.weixin.qq.com/s/LDPwjUXagvvJfLOkq51n0g>

针对请求接口加密/响应需要解密的情况，在使用Burp测试时无法对数据进行操作，需要确认传输都为明文我们才可以进行常规测试。这块有点JS基础和Python基础基本都可以通杀。
jsRPC免去抠代码。
![](.topwrite/assets/image_1727580420081.png)


## **1、配置mitmproxy**
```
mitmdump.exe -p 6666 -s main.py --mode upstream:http://127.0.0.1:6662  --ssl-insecure
```


