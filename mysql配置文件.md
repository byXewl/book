 **my.cnf**：通常用于 Linux 等类 Unix 操作系统，一般在/etc/目录下
 **my.ini**：通常用于 Windows 系统，一般在安装目录的根目录下。

常使用配置
```
wait_timeout=28800
作用： 用于配置 MySQL 服务器等待连接断开的时间。
默认值： 默认情况下，`wait_timeout` 的值为 28800 秒（8 小时）。
说明： `wait_timeout` 定义了服务器在没有活动的连接时等待多长时间后自动关闭连接。
如果客户端连接在指定的时间内没有活动，服务器将关闭连接。
这有助于释放服务器资源，并防止不必要的连接保持活动状态。

bind-address = 0.0.0.0 或注释bind-address，监听所有端口。

允许外链权限mysql中：
GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%' IDENTIFIED BY 'mypassword';

FLUSH PRIVILEGES;

```
配置文件修改后需要重启mysql
