审计流程：
* 审计前了解服务环境
* 了解网站功能
* 制定计划（审核功能点，容易出现得漏洞）
* 工具扫描/正则搜索相关敏感函数、可控变量
* 追踪危险函数
* 利用复现漏洞
* 形成PHP代码审计报告

审计结果：
同一种漏洞发生在后台可能是低危，前台发生就可能为高危。


^
危险函数：
<https://www.freebuf.com/articles/web/269184.html>


^
## **SQL注入**
关键词：
```
mysql_connect  : 打开一个到 MySQL 服务器的连接。PHP 5.5.0 起已废弃，并在自 PHP 7.0.0 开始被移除。
所以，这个函数都是一些比较老的系统才会有。

mysql_query : 发送一条 MySQL 查询。PHP 5.5.0 起已废弃，并在自 PHP 7.0.0 开始被移除。
mysql_query()向与指定的 link_identifier关联的服务器中的当前活动数据库发送一条查询（不支持多条查询）。



PDO :
$conn = new PDO($dsn, $user, $pass, $options);
$name = $_GET['name'];
$query = "SELECT name,age,email,country FROM users_details WHERE name = '{$name}';";
$stmt = $conn->prepare($query);
```