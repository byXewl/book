域名解析时，使用udp协议，tcp防火墙无效。

DNS隧道的原理：在后门程序进行DNS查询时，如果查询的域名不在DNS服务器本机的缓存中，就会访问互联网进行查询，然后返回结果，如果互联网上有一台攻击者设置的服务器，那么服务器就可以依靠域名解析的响应进行数据包的交换，从DNS协议的角度来看，这样的操作只是反复查询某个或者某些特定的域名并且得到解析结果，但其本质是，DNS预期的返回结果应该是一个IP地址，而事实上不是——返回的可以是任意字符串，包括加密的C&C指令，从而将其他协议封装在DNS协议中进行传输。

如：Dnscat2是一个DNS隧道工具，通过DNS协议创建加密的命令和控制通道。
可以利用Dnscat2实现DNS隐蔽隧道反弹Shell。
## **CS创建DNS隧道**
需要准备一个域名。

1、xxx.com域名的子域名解析设置 A,NS 记录
ns1 ns cs.xxx.com
ns2 ns cs.xxx.com  备用
cs A xx.xx.xx.xx(CS服务端 的 IP)

2、CS 监听器-DNS
Beacon DNS
DNS 地址配置：
ns1.xxx.com
ns2.xxx.com
![image-20240410211024167](http://cdn.33129999.xyz/mk_img/image-20240410211024167.png)
默认监听端口53

3、生成后门上线后
进入会话执行命令mode dns-txt 实现dns数据包通信。

执行后 checkin 唤醒


且此时后门查目的ip是公网DNS服务器的ip，不是CS服务端ip（防溯源）。


## **DNS内网穿透**
借助iodine程序使用DNS协议实现外网和内网主机相互通信。
<https://github.com/yarrick/iodine>