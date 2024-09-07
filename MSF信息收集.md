## **自带nmap扫描端口**
使用必须配置的数据库
```
msf6>db_nmap -PA -PS 192.0.0.01

-PA TCP的ACK + ping
-PS TCP的SYN + ping

```
## **auxiliary的discover模块扫C段**
```
search discover

use auxiliary/scanner/discover/arp_sweep

show options

set rhosts 192.0.0.0/24

set threads 20

run
```
一般msf配置路由代理内网网段后
```
use auxiliary/scanner/portscan/tcp           
#基于tcp进行端口扫描(1-10000)，如果开放了端口，则说明该主机存活
set RHOSTS 192.168.1.0/24
run
```

