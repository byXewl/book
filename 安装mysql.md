docker，phpstudy，宝塔面板均可。
主流5.7,8.0
^
安装位置：
普通linux中mysql：/usr/lib/mysql/
宝塔linux中mysql：/www/server/mysql/lib
windows的phystudy中mysql：\phpstudy_pro\Extensions\MySQL5.7.26\lib\

^
启动后，使用mysql命令连接：
mysql -u root -p
输入密码
远程：
mysql -h 主机地址 -u 用户名 -P 端口号 -p
输入密码

^
开启远程
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
flush privileges;
```


## **linux安装**
```
# 下载 MySQL yum库
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
# 配置MySQL的yum库
sudo rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
# 安装社区版
yum -y install mysql-community-server
# 启动mysql服务
systemctl start mysqld.service
# 开机自启动mysql服务
systemctl enable mysqld.service
```
```
# 在日志文件中查找password关键字，得到默认密码
grep "password" /var/log/mysqld.log
# 用默认密码登录
mysql -uroot -p
# 修改密码
CREATE USER 'root'@'%' IDENTIFIED BY 'naQR****Gv2j7PX_';
```

