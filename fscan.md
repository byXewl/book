fscan：一款内网综合扫描工具，方便一键自动化、全方位漏扫扫描。支持主机存活探测、端口扫描、常见服务的爆破、ms17010、redis批量写公钥、计划任务反弹shell、读取win网卡信息、web指纹识别、web漏洞扫描、netbios探测、域控识别等功能。

## **安装**
下载：<https://github.com/shadow1ng/fscan/releases>
linux：fscan32  fscan64
windows：fscan32.exe  fscan64.exe
一般上传到入口主机，进行扫描内网。
<https://mp.weixin.qq.com/s?__biz=MzU2NzYxODk3MQ==&mid=2247484166&idx=1&sn=c1eef8fc2db078b5154101eed4cd6c22&chksm=fc9b3ff2cbecb6e458cefa2257bae9cd57b3dbb505bb4b4315fd6d030981079f9ea7eb161592&token=657800978&lang=zh_CN#rd>

^
## **使用**
<https://www.cnblogs.com/nanhe7/p/15966742.html>
探测局域网内网卡ip存活和开放端口。
```
fscan64.exe -h 192.168.0.0/24
```
结果直接显示或默认保存在同目录下result.txt文件。
^
```
fscan.exe -h 192.168.1.1/24  (默认使用全部模块)
fscan.exe -h 192.168.1.1/24 -nopoc 不使用web漏洞扫描
fscan.exe -h 192.168.1.1/24 -np 无ping扫描，不主机发现，直接扫
fscan.exe -h 192.168.1.1/16  (B段扫描)

挂代理
--proxy=socks5://127.0.0.1:10809
```

^
## **免杀**
对fscan做免杀