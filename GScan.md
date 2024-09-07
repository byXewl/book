python脚本，linux后门综合检测
yum install git
git clone https://github.com/grayddq/GScan.git

使用
```
python3 GScan.py


python3 GScan.py --full
```
<https://blog.51cto.com/u_12343119/5850597>
```
1、主机信息获取
2、系统初始化alias检查
3、文件类安全扫描
   3.1、系统重要文件完整行扫描
   3.2、系统可执行文件安全扫描
   3.3、临时目录文件安全扫描
   3.4、用户目录文件扫描
   3.5、可疑隐藏文件扫描
4、各用户历史操作类
   4.1、境外ip操作类
   4.2、反弹shell类
5、进程类安全检测
   5.1、CUP和内存使用异常进程排查
   5.2、隐藏进程安全扫描
   5.3、反弹shell类进程扫描
   5.4、恶意进程信息安全扫描
   5.5、进程对应可执行文件安全扫描
6、网络类安全检测
   6.1、境外IP链接扫描
   6.2、恶意特征链接扫描
   6.3、网卡混杂模式检测
7、后门类检测
   7.1、LD_PRELOAD后门检测
   7.2、LD_AOUT_PRELOAD后门检测
   7.3、LD_ELF_PRELOAD后门检测
   7.4、LD_LIBRARY_PATH后门检测
   7.5、ld.so.preload后门检测
   7.6、PROMPT_COMMAND后门检测
   7.7、Cron后门检测
   7.8、Alias后门
   7.9、SSH 后门检测
   7.10、SSH wrapper 后门检测
   7.11、inetd.conf 后门检测
   7.12、xinetd.conf 后门检测
   7.13、setUID 后门检测
   7.14、8种系统启动项后门检测
8、账户类安全排查
   8.1、root权限账户检测
   8.2、空口令账户检测
   8.3、sudoers文件用户权限检测
   8.4、查看各账户下登录公钥
   8.5、账户密码文件权限检测
9、日志类安全分析
   9.1、secure登陆日志
   9.2、wtmp登陆日志
   9.3、utmp登陆日志
   9.4、lastlog登陆日志
10、安全配置类分析
   10.1、DNS配置检测
   10.2、Iptables防火墙配置检测
   10.3、hosts配置检测
11、Rootkit分析
   11.1、检查已知rootkit文件类特征
   11.2、检查已知rootkit LKM类特征
   11.3、检查已知恶意软件类特征检测
12、WebShell类文件扫描
   12.1、WebShell类文件扫描
```

