>Rootkit是一个特殊的恶意软件，它可隐藏自身以及指定的文件、进程、网络、链接、端口等信息。Rootkit可通过加载特殊的驱动修改系统内核，进而达到隐藏信息的目的。Rootkit的三要素就是：隐藏、操纵、收集数据。不同的操作系统会有不同的Rootkit，Linux系统中的Rootkit就被称为LinuxRootkit。
Rootkit具有隐身功能，无论静止时作为文件存在，还是活动时作为进程存在，都不会被察觉，它可能永远存在于计算机中。
可以远程下载文件，上传文件，shell交互等。
^
netstat -anpt 无法查看
网卡网络抓包也无法查看。


## **Rootkit后门检测工具**
大部分开源产品不好检测到。最好的方法就是在被Rootkit入侵授权前就部署好的安全防护检测到流量。

以下为可能检测到：
chkrootkit：http://www.chkrootkit.org
检测rookit

GScan：https://github.com/grayddq/GScan
python脚本，linux后门日志综合检测

rkhunter：http://rkhunter.sourceforge.net  
rkhunter使用：<https://cloud.tencent.com/developer/article/1598013>

Volatility：Volatility 是一个开源的内存取证工具，可以分析入侵攻击痕迹，
包括网络连接、进程、服务、驱动模块、DLL、Handles、进程注入、cmd历史命令、
IE浏览器历史记录、启动项、用户、shimcache、userassist、部分rootkit 隐藏文件、cmdliner 等

## **chkrootkit使用**
**安装**
apt源的直接下载：
```
sudo apt install chkrootkit -y
```
Centos yum源没有，使用编译下载：
用wget进行下载
```
wget ftp://ftp.chkrootkit.org/pub/seg/pac/chkrootkit.tar.gz
```

如果服务器断网，可下载至本机，<https://www.chkrootkit.org/download/>，第一个。随后使用rz命令进行上传。
下载完成后，需解压，如下：
```
tar -zxvf chkrootkit.tar.gz
```
进入目录，用gcc编译
```
yum install gcc gcc-c++ make glibc-static
make sense
```
**使用**
chkrootkit默认对整个系统进行rootkit查杀，可以使用命令：./chkrootkit | grep INFECTED去搜索关键字：INFECTED (被感染），方便查看
```
./chkrootkit | grep INFECTED
```