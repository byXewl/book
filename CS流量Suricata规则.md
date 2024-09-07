![image-20240402202022273](http://cdn.33129999.xyz/mk_img/image-20240402202022273.png)


![image-20240402210022441](http://cdn.33129999.xyz/mk_img/image-20240402210022441.png)


## **CS特征**
过程：
<https://www.ddosi.org/cobaltstrike/>
① 基础特征：使用默认配置时存在的特征，可通过修改 profile 文件或证书将其隐藏。
 在请求的返回包中，通信数据均隐藏在jqeury*.js中，就好像在请求js。
<https://asnail7.github.io/2023/08/18/Cobalt%20Strick%20%E7%9A%84%E6%B5%81%E9%87%8F%E7%89%B9%E5%BE%81/>
② 强特征：需要修改 cobaltstrike 源码才能较好去除的这部分特征。

## **后门区别导致强特征**
Windows可执行程序（E）：
小马拖大马模式。
安装包11kb很小，运行时再会请求280kb数据payload 下载，使用 http 协议从指定服务器下载 stage 。
默认http 请求路径不唯一，如果没有魔改都符合一个 checksum8 规则，即：32位后门请求的路径的 ascii 之和与 256 取余计算值等于 92 ，64位后门为93，有测试脚本一键测试。
如：/Yle2、/cKTZ、/wQPD  、http://IP/HjIa
^
Windows可执行程序（Stageless）：
直接就是大马完整马。
安装包280kb。

^
 checksum8 的特征规则
```
# suricata规则
# http-beacon-staging，向c2服务器发起get请求，下载大小约210kb的stager，请求地址符合checksum8规则
# 调用lua检查uri是否符合checksum8规则：计算uri的ascii之和并与256做取余计算，余数为92则符合规则
alert http any any -> any any (gid:3333; sid:30001; rev:1; \
    msg:"http-beacon-checksum8-path-parse"; \
    classtype: http-beacon; \
    flow: established, to_server; \
    urilen:4<>6; \
    luajit:checksum8_check.lua; \
)


# checksum8_check.lua
function init (args)
    local needs = {}
    needs["http.uri"] = tostring(true)
    return needs
end

function match(args)
    local uri_raw = tostring(args["http.uri"])
    local uri = string.sub(uri_raw, 2, -1) -- 去除uri中的"/"
    local sum = 0

    for i=1,#uri do
        local x = string.sub(uri,i,i)
        sum = sum + string.byte(x)
    end

    if (sum % 256) == 92 then
        return 1 -- 符合checksum8规则，匹配成功
    else 
        return 0 -- 不符合checksum8规则，匹配失败
    end
end
```

^
^
## **HTTPS的后门tls心跳包强特征**
被控端发送心跳包
被控端会向服务端发送心跳包。心跳包是一种延迟发送的数据包，默认间隔为60秒。这种设计的目的是为了迷惑防护软件。如果木马一直处于连接状态并持续传输数据，很容易被安全设备检测到。因此，CS可以通过设置心跳包的时间间隔，让木马在一段时间内不产生流量，处于睡眠状态。一旦有指令下达，木马就会通过间隔的时间传输数据并等待对方回应，相当于唤醒时间。这种心跳包的设计可以迷惑一些设备，防止设备捕获长时间在线的流量

PS：
如果心跳包不存在了，说明主机下线了，存在则说明处于被控状态。
每次发出的心跳包的源端口可能不一样。

^
https监听器的心跳包的tls握手强特征：
<https://www.ddosi.org/cobaltstrike/>
tls请求client hello包，有特定ja3值。
tls响应server hello包，有特定ja3s值。
>ja3 和 ja3s 分别代表 tls 握手阶段的 client-hello、server-hello 的数据特定自动集合计算出的哈希值（md5），相同版本相同系统下指纹相同，该特征与操作系统、cobaltstrike 版本有关，profile 文件无法对其修改。

排查：通过端口找到进程，杀死进程清除后门。

^
ja3,ja3s特征IDS规则
```
# https-beacon-ja3指纹，client-hello
alert tls any any -> any any (gid:6666; sid:30005; rev:1; \
    msg:"https-beacon-ja3-hash"; \
    classtype: https-beacon; \
    ja3.hash; pcre:"/652358a663590cfc624787f06b82d9ae|4d93395b1c1b9ad28122fb4d09f28c5e|72a589da586844d7f0818ce684948eea|a0e9f5d64349fb13191bc781f81f42e1/"; \
)


# https-beacon-ja3s指纹，server-hello
alert tls any any -> any any (gid:6666; sid:30006; rev:1; \
    msg:"https-beacon-ja3s-hash"; \
    classtype: https-beacon; \
    ja3s.hash; pcre:"/fd4bc6cea4877646ccd62f0792ec0b62|15af977ce25de452b96affa2addb1036|b742b407517bac9536a77a7b0fee28e9/"; \
)
```
