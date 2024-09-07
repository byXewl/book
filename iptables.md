iptables端口转发
root权限
转发机设置转发：（https：80改443即可）
```
iptables -I INPUT -p tcp -m tcp --dport 80 -j ACCEPT 
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 47.94.236.117:80
iptables -t nat -A POSTROUTING -j MASQUERADE
iptables -I FORWARD -j ACCEPT
iptables -P FORWARD ACCEPT
sysctl net.ipv4.ip_forward=1
```
这些命令的组合配置了一台 Linux 服务器作为网络网关，允许外部 HTTP 流量通过端口 80 进入，并将这些流量转发到另一个指定的 IP 地址（47.94.236.117）上的 80 端口。同时，它还设置了系统允许数据包在不同网络接口之间转发。这种配置通常用于搭建代理服务器、负载均衡器或 VPN 服务器。



```
本地有33066，且可以外链，但是防火墙只开放了3306

iptables -I INPUT -p tcp -m tcp --dport 3306 -j ACCEPT 
iptables -t nat -A PREROUTING -p tcp --dport 3306 -j DNAT --to-destination 127.0.0.1:33066
iptables -t nat -A POSTROUTING -j MASQUERADE
iptables -I FORWARD -j ACCEPT
iptables -P FORWARD ACCEPT
sysctl net.ipv4.ip_forward=1





MySQL 账户配置为不允许远程连接（即所谓的“外链”）
那么您通常只能从服务器本地（localhost）进行连接。在这种情况下，即使您在 `iptables` 中设置了端口转发，远程机器也无法通过该转发规则连接到 MySQL 服务器。


iptables -I INPUT -p tcp -m tcp --dport 3306 -j ACCEPT 
iptables -t nat -A PREROUTING -p tcp --dport 3306 -j DNAT --to-destination 127.0.0.1:80
iptables -t nat -A POSTROUTING -j MASQUERADE
iptables -I FORWARD -j ACCEPT
iptables -P FORWARD ACCEPT
sysctl net.ipv4.ip_forward=1
```

