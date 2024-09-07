IPv6
在IPv6中，路由器不再进行分片（fragmentation）的操作，而是要求发送方在需要时进行分片。因此，如    果一台路由器接收到的IPv6数据报因太大而不能转发到输出链路上，路由器将会把该数据报**丢弃**而 不是进行分片。
IPv6安全性：IPsec被设计为IPv6的一部分，提供了对IPv6通信的安全支持。使用对称加密，哈希算法加密。
^
IPv6的系统防火墙：
ip6tables 是用于配置 IPv6 防火墙规则的linux命令。
^
一台服务器可以配置同时支持 IPv4 和 IPv6。
ipv6就是ip变成了这个样子：2409:8a20:11e5:3720:250:56ff:fea9:13c9
http请求ipv6地址的端口：http://[2409:8a20:11e5:3720:250:56ff:fea9:13c9]:80/index.php

^
域名和ipv6的DNS解析使用AAAA纪录。
通过域名获取ipv6地址：
```
第一步：ipconfig /flushdns 清缓存

第二步：nslookup -qt=aaaa 域名

ping为ipv4的协议，不可用
```
或者在线查询：
IPv6在线检测：[https://ipw.cn]
IPv6地址查询：[https://ipw.cn/ipv6/]
IPv6在线Ping测试：[https://ipw.cn/ipv6ping/]


^
工具使用：
fofa查ipv6：is_ipv6=true
nmap扫ipv6端口：nmap -6 2409:8a20:11e5:3720:250:56ff:fea9:13c9

