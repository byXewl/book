一般linux自带nc命令工具。

nc传文件
```
公网nc监听接收文件
nc -lvp 1234 >1.py

nc反弹传文件发送
nc 172.16.250.128 1234</home/1.py
```

nc接收请求，可以接收查看是什么请求包协议，tcp、udp、http、dns等：
```
nc -lvvp 1234
```
^
## **nc下载安装**
windows一个nc.exe即可。https://eternallybored.org/misc/netcat/ 注意!!! Windows系统会报病毒,如果有杀毒软件要全部关掉,自带的defender关掉。

linunx安装nc
<https://blog.csdn.net/weixin_44462773/article/details/137586959>
编译安装
```
wget http://sourceforge.net/projects/netcat/files/netcat/0.7.1/netcat-0.7.1.tar.gz/download -O netcat-0.7.1.tar.gz
tar zxvf netcat-0.7.1.tar.gz
cd netcat-0.7.1
./configure
make
cd src
./netcat -h
```

centos
```
yum install glibc*
wget https://sourceforge.NET/projects/netcat/files/netcat/0.7.1/netcat-0.7.1.tar.gz
tar -zxvf netcat-0.7.1.tar.gz -C /usr/local
cd /usr/local/netcat-0.7.1
./configure
make && make install
nc
```