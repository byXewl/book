frp代理工具流量层面有那些特征？
1.客户端->服务端认证信息包含version，hostname,os,arch,user,privilege_key,runid,metas等frp信息
2.服务端->客户端认证信息包含version,run_id,server_udp_port等frp信息
3.可以看到攻击者vps-ip、出口ip、和被用作穿透的内网机器计算机名

1.首先，Frp 会使用自定义协议进行通信，其默认端口为7000，该端口在流量中是可以被识别出来的。
2.Frp 在启动时，会在流量中进行特定的标识，例如会发送“frps"或“frpc"字符串，用于标识是服务端还是客户端。
3.Frp 会使用心跳包来维持与服务器之间的连接，心跳包的特征是由两个字节的包头和固定长度的包体组成。
4.在正常使用过程中，Frp 会产生大量的 TCP 连接，每个连接都对应着一个隧道，通过观察连接的建立和断开可以推断出 Frp 是否正在被使用。


^
frp流量特征
连接过程中，如果没有进行加密的情况下可以看到连接的主机名称，以及相关ini配置文件的内容。流量中一般会有受害主机的IP地址等。frpc 在连接认证 frps 的时候，会进行三次握手，会把 Frp 的版本信息发给 frps 进行认证，如果是用的一个没有改过的Frp 那么这时候只要建立连接，很容易就会被安全设备捕获到。一般流量中带有Version、Arch、User、Privilege_key等字段。
<https://www.freebuf.com/articles/web/370741.html>

如果流量进行了加密，使用tls enable加密后。首次连接会一个0x17）的头部特征，并发送一个大小为243的数据包。

^
传配置文件
```
[common]
server_addr = 192.168.239.123
server_port = 7778
token=Xa3BJf2l5enmN6Z7A8mv

[test_sock5]
type = tcp
remote_port =8111
plugin = socks5
plugin_user = 0HDFt16cLQJ
plugin_passwd = JTN276Gp
use_encryption = true
use_compression = true
```