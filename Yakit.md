yakit可代替BP的国产化工具，yak语言插件功能实现渗透测试全流程。
yaklong:有try catch的golong语言。
说明文档：<https://yaklang.com/products/intro>
案例：<https://www.freebuf.com/tag/yakit>
### **安装:**
linux安装yak引擎程序即可。
```
bash <(curl -sS -L http://oss.yaklang.io/install-latest-yak.sh)

安装在/root/yakit-projects/
```
windows官网安装yakit客户端，自动安装引擎。
（默认引擎位置:C:\Users\用户名\yakit-projects\yak-engine\yak.exe)


### **本地模式:**
本地电脑yakit客户端直接启动一个随机端口的yak grpc服务器。
grpc:基于 HTTP2 协议tcp长连接协议。

### **远程模式：**
- 在托管主机VPS/ECS上
- 本地个人PC
- 内网环境
```
开启一个yak grpc服务器。
yak.exe grpc --host 0.0.0.0 --port 8087 --secret 自定义密码 --tls
yak grpc --host 0.0.0.0 --port 8087 --secret 自定义密码 --tls

yak grpc 启动参数设置实现远程连接的安全需求：
--tls(连接需要证书密钥)
--secret(连接需要定义密码)

本地yakit客户端远程连接这个服务器
```
