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


mysqli :
$mysqli=@new mysqli($mysqlhost,$mysqluser,$mysqlpwd,$mysqldb);
$username=$_POST['userid'];
$userpwd=$_POST['userpwd'];
$sql="select sds_password from sds_user where sds_username='".$username."' order by id limit 1;";
$result=$mysqli->query($sql);
```

^
## **文件操作**
```
copy
file_get_contents()
highlight_file()
fopen()
read file()
fread()
fgetss()
fgets()
parse_ini_file()
show_source()
file()
```
任意文件读取、写入、删除往往是上面几个函数受到了控制（当然还有其他的函数）。
不同的函数在不同的场景有不同的作用和不同的利用手法。
读取：可以读取配置等文件，拿到key
写入：可以写入shell代码相关的内容
删除：可以删除.lock文件而可以重新安装覆盖
更多思路请自行挖掘测试！！

## **文件包含**
```
require、include、require_once、include_once
包含函数 一共有四个，主要作用为包含并运行指定文件。
这里就不多写函数介绍了，大家可以自己去PHP手册查询

include $file;
在变量 $file 可控的情况下，我们就可以包含任意文件，从而达到 getshell 的目的。
另外，在不同的配置环境下，可以包含不同的文件。
因此又分为远程文件包含和本地文件包含。
包含函数也能够读取任意文件内容，这就需要用到【支持的协议和封装协议】和【过滤器】。
例如，利用php流filter读取任意文件
include($_GET['file']);
?file=php://filter/convert.base64-encode/resource=index.php
解释：?file=php:// 协议 / 过滤器 / 文件
```






^
## **反序列化函数**
```
unserialize()



phar反序列化：
php.ini中的phar.readonly选项，需要为Off（默认是on）

phar文件可被上传至服务器，上传后可被phar://协议读取
//即要求存在file_get_contents、fopen、highlight_file这种函数
include、require、include_once、require_once、highlight_file 、
show_source 、readfile 、file_get_contents 、fopen 、file
```





^
## **XXE函数**
```
引发XEE的危险函数
__construct()
addAttribute()
addChild()
asXML()
attributes()
children()
getDocNamespaces()
getName()
getNamespaces()
registerXPathNamespace()
simplexml_import_dom()
simplexml_load_file()
simplexml_load_string()
xpath()
```

## **引发信息泄露的危险函数**
phpinfo — 输出关于 PHP 配置的信息
getenv — 获取一个环境变量的值
get_current_user — 获取当前 PHP 脚本所有者名称
getlastmod — 获取页面最后修改的时间
ini_get — 获取一个配置选项的值
glob — 寻找与模式匹配的文件路径
^
## **逻辑漏洞**
越权等