## **手工排查**
linux重要日志var/log里面的message保存了比较重要的信息，一般出问题了登上去首先会去看这里。
lastb命令查看登录失败的用户信息（读取btmp日志），
last查看所有的登录日志（读取wtmp日志），
lastlog查看最后一次登录的日志。

还有/var/log/secure记录了验证和授权方面的信息，只要涉及账号和密码的程序都会记录，比如SSH登录，su切换用户，sudo授权。

home目录下面有个.bash_history，如果etc/passwd发现有新增的可疑用户的话会去看一下，他记录了历史命令。
var/spool/cron里面有计划任务，留后门的话有可能会定时反弹shell。

home/用户名/ssh记录了ssh公钥，查看有没有被留后门。
etc/rc.local开机自启动。
/var/tmp临时文件目录。
/tmp

history历史命令
cat /home/username/.bash_history 用户历史命令
cat /etc/passwd 有没有恶意用户
last 上一次登录时间。
lastlog 用户登录时间

^
ps -ef或ps -aux命令可以看到谁什么命令启动了什么程序：
```
root       1007    968  0 Apr25 ?        00:01:15 java -jar fastjsondemo.jar
root       1016    969  0 Apr25 ?        00:00:00 bash /init-scripts/start.sh
root       1061   1016  0 Apr25 ?        00:00:00 python3 /app.py
root       1093   1061  9 Apr25 ?        02:17:28 /usr/bin/python3 /app.py
home       4562    529  0 02:26 ?        00:00:00 /usr/sbin/apache2 -k start
```
端口号使用，外链ip，进程号：
netstat -anptl
netstat -tulnp

^
查文件名在哪：
find / -name app.py*
find . -name "app.py"

递归查目录文件内容：
grep -r  "内容" /



^
## **工具排查**
chkrootkit：http://www.chkrootkit.org
检测rookit

GScan：https://github.com/grayddq/GScan
```
python脚本，linux后门综合检测
git clone https://github.com/grayddq/GScan.git
```