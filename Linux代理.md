
proxychains代理链是Linux下一款代理设置工具，一般自带。
1. **SOCKS4/SOCKS5**：这两种代理类型主要用于TCP连接，SOCKS5还支持UDP连接。
2. **HTTP(S)代理**：支持标准的HTTP和加密的HTTPS代理。
3. **SSH隧道**：可以通过SSH连接创建安全的代理隧道


kali中默认安装，ubuntu需要使用命令`apt-get install proxychains`安装
kali端修改配置文件：
```
/etc/proxychains4.conf
/etc/proxychains4.conf
```
注释socks4添加socks5（注意是socks5 127 ,也不是分号而是空格，下图有误）

```
socks5 192.168.82.110 7890  #192.168.82.110为物理机地址，同时注释掉socks4 127.0.0.1 9050
```

![image-20211126145926459](https://image.3001.net/images/20211126/1637924072_61a0bce89ebe66bd0f364.png!small)

测试
```
proxychains ssh 127.0.0.1
```

输入密码连接后，成功连接ssh，查看本机ip

![image-20211126152824274](https://image.3001.net/images/20211126/1637924073_61a0bce9311d57adf948f.png!small)

![image-20211126152726640](https://image.3001.net/images/20211126/1637924073_61a0bce9d42440974877b.png!small)

使用firefox

```
proxychains firefox 10.0.0.2
```

![image-20211126153020846](https://image.3001.net/images/20211126/1637924075_61a0bceb6af87eb8b0125.png!small)

```
proxychains msfconsole 代理msf正向上线。
```