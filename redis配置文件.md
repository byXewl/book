## **redis配置文件**
一般在同级目录redis.conf，可以在这里手动修改bind和密码，然后重启redis。systemctl restart redis
```
bind 127.0.0.1   
//将bond改为0.0.0.0则所有ip可连接


port 6379

timeout 65
//设置客户端连接的超时时间（以秒为单位）。
//如果一个客户端在指定的时间内没有发送任何命令，服务器将关闭连接。


maxclients 10000
databases 16
maxmemory 1048576000



requirepass   登录密码
//登录密码，默认是没有的。
```
