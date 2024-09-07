以root权限启动
```
sudo systemctl start redis
或
sudo service redis-server start
```
一般安装Redis时会创建一个名为 "redis" 的用户和组，用于运行Redis服务器。这是为了增加安全性，使Redis运行在一个专门的用户权限下，以限制对系统的访问。
以redis用户启动
```
sudo -u redis /path/to/redis-server /etc/redis/redis.conf
或
sudo -u redis service redis-server start
```