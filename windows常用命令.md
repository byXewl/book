windows命令不区分大小写
命令解释器
```
cmd.exe   默认的，win+r输入cmd

powershell.exe 先进的，命令有点像cmd和bash的集合。win+r输入powershell
有的ide如(vscode)中会使用powershell，这时的环境变量可以查看：$env:PATH
```

cmd基础操作
```
cd /d E:\    移动盘符去E盘
E:           去E盘

cd   /      去盘根
cd E:/myHVV/ctf 去详细位置
cd \myHVV\ctf 去详细位置

dir       列出当前目录
dir xx   看文件信息
mkdir xx   创建目录xx
echo Hello, World! > xx.txt   创建文件
echo. > newfile.txt
copy nul newfile.txt

more xx.txt   看文件内容
type xx.txt   看文件内容


start       Windows开一个cmd终端
start .     Windows打开目录，当前pwd目录文件管理器
thunar   Linux打开当前pwd目录文件管理器
```

看文件哈希值
```
最好在C盘中使用:
certUtil -hashfile E:/flag.php md5
certUtil -hashfile E:/flag.php sha1
```

进程端口号
```
netstat -an 查看本地端口服务
查看端口开放：防火墙-高级-入站规则

netstat -ab 查看程序对应端口

netstat -ano | findstr 8081 //查端口号被那个进程占用，列出进程极其占用的端口，包含 8081的

tasklist | findstr 2000   //列出进程 搜名含2000的

taskkill -pid 进程号 -f //根据进程号强制关闭某个进程
taskkill /im ADSafe.exe /f      //根据名称exe杀死

shutdown -r -t 10 //十秒后重启

ping内网：路由器可能阻止
for /l %p in (1,1,254) do @ping 192.168.0.%p -n 1 -l 16 -w 20 |find "TTL=" /I
```

```
systeminfo //查看系统信息，高权限才能使用此命令
linux命令：hostnamectl
```
用户与用户组
```
whoami //当前登录用户

net user //列出系统中所有账户。
默认可能有四个用户：
Administrator: 这是系统管理员账户，具有最高权限。
DefaultAccount: Windows 10 中的一个预定义账户，通常用于一些系统服务和应用程序。这个账户通常处于禁用状态。
Guest: 系统的默认访客账户，提供一个有限权限的访客访问选项。
WDAGUtilityAccount: 用于支持 Windows Defender Application Guard 功能。系统自动生成，用于安全隔离应用程序。


net user administrator  //查看账号信息，账户所属组
net user administrator P@ssw0rd   //修改账号密码


开启来宾用户GUEST
net user guest /active yes //开启
net user guest /active no  //关闭

查看管理员组的成员
net localgroup administrators
查看普通用户组的成员(新增用户默认加入这个组)
net localgroup users
查看来宾组的成员(自带的guest用户默认加入这个组)
net localgroup guests
查看远程登录的用户组
net localgroup "Remote Desktop Users"

```
用户提权
```
管理员权限打开终端：
将guest用户加入管理员组
net localgroup administrators guest /add

创建一个用户hacker
net user hacker 123456 /add

将hacker用户加入管理员组，已有远程登录权限（Remote Desktop Users）。
net localgroup administrators hacker /add

登录hacker账户
runas /user:hacker "tsdiscon" 
tsdiscon 命令前往登录界面登录
或远程登录hacker账户


Windows默认同时只能登录一个账号,另一个下线。
Windows Server版，支持远程桌面多用户登陆。
linux支持远程多用户登录。
```