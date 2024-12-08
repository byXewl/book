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



PDO : php7后的数据对象，支持多种数据库。
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
预编译：
```
$name = $_GET['name'];
$query = "SELECT name,age,email, country FROM users_details
WHERE name = ?;";
$stmt = $conn->prepare($query);
$stmt->bindValue(1,$name);
$stmt->execute();
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
## **代码执行**
eval() assert()
```
eval() — 把字符串作为PHP代码执行。这个函数一般都是攻击者用的，没什么人会拿这个放到自己的源码里面

assert() — 检查一个断言是否为 false（把字符串作为PHP代码执行）

PHP 5  ： assert( mixed$assertion, string $description= ? ) : bool
PHP 7 ：assert( mixed$assertion, Throwable $exception= ? ) : bool
assert()会检查指定的 assertion并在结果为 false时采取适当的行动（把字符串 $assertion 作为PHP代码执行）
```

preg_replace — 执行一个正则表达式的搜索和替换
```
preg_replace( mixed$pattern, mixed$replacement, mixed$subject, int $limit= -1 , int &$count= ? ) : mixed
搜索 subject中匹配 pattern的部分，以 replacement进行替换。

/e 修正符使 preg_replace() 将 replacement 参数当作 PHP 代码
preg_replace("/test/e",$_GET["h"],"jutst test");

如果我们提交 ?h=phpinfo()，/e就会将h参数当做PHP代码，phpinfo()将会被执行。
```

create_function —创建一个匿名（lambda样式）函数
```
语法
create_function（字符串 $args，字符串 $code）：字符串
根据传递的参数创建一个匿名函数，并为其返回唯一的名称。

举个例子
$newfunc = create_function('$v', 'return system($v);');
$newfunc('whoami');
这里就相当于执行了system('whoami')
```

array_map — 为数组的每个元素应用回调函数
```
语法
array_map( callable$callback, array $array, array ...$arrays) : array

array_map()：返回数组，是为 array每个元素应用 callback函数之后的数组。 array_map()返回一个 array，数组内容为 array1的元素按索引顺序为参数调用 callback后的结果（有更多数组时，还会传入 arrays的元素）。 callback函数形参的数量必须匹配 array_map()实参中数组的数量。

举个例子
<?php
$arr=$_GET['arr'];
$array=array(1,2,3,4,5);
$new_array=array_map($arr,$array);
?>
```

call_user_func — 把第一个参数作为回调函数调用
```
语法
call_user_func( callable$callback, mixed$parameter= ? , mixed$...= ? ) : mixed
第一个参数 callback是被调用的回调函数，其余参数是回调函数的参数。

举个例子
<?php
call_user_func("assert",$_GET['cmd']);
?>

通常用来制作变形的PHP一句话后门
```

call_user_func_array — 调用回调函数，并把一个数组参数作为回调函数的参数
```
语法
call_user_func_array( callable$callback, array $param_arr) : mixed

把第一个参数作为回调函数（callback）调用，把参数数组作（param_arr）为回调函数的的参数传入。

参数¶
callback
被调用的回调函数。

param_arr
要被传入回调函数的数组，这个数组得是索引数组。

更新日志¶
版本	说明
5.3.0	对面向对象里面的关键字的解析有所增强。在此之前，使用两个冒号来连接一个类和里面的一个方法，把它作为参数来作为回调函数的话，将会发出一个E_STRICT的警告，因为这个传入的参数被视为静态方法。
举个例子

<?php
$cmd=$_GET['cmd'];
$array[0]=$cmd;
call_user_func_array("assert",$array);
?>
```


array_filter — 使用回调函数过滤数组的元素
```
语法
array_filter( array $array, callable|null $callback= null, int $mode= 0 ) : array
遍历 array数组中的每个值，并将每个值传递给 callback回调函数。 如果 callback回调函数返回 true，则将 array数组中的当前值返回到结果 array 数组中。

返回结果 array 数组的键名（下标）会维持不变，如果 array参数是索引数组，返回的结果 array 数组键名（下标）可能会不连续。 可以使用 array_values()函数对数组重新索引。

参数¶
array
要遍历的数组

callback
使用的回调函数

如果没有提供 callback回调函数，将删除数组中 array的所有“空”元素。 有关 PHP 如何判定“空”元素，请参阅 empty()。

mode
决定哪些参数发送到 callback回调的标志：

ARRAY_FILTER_USE_KEY- 将键名作为 callback回调的唯一参数，而不是值
ARRAY_FILTER_USE_BOTH- 将值和键都作为参数传递给 callback回调，而不是仅传递值
默认值为 0，只传递值作为 callback回调的唯一参数。
返回值¶
返回过滤后的数组。

举个例子
<?php
$cmd=$_GET['cmd'];
$array1=array($cmd);
$func =$_GET['func'];
array_filter($array1,$func);
?>
```

^
## **命令执行**

1、system — 执行外部程序，并且显示输出
```
system( string $command, int &$return_var= ? ) : string
同 C 版本的 system()函数一样， 本函数执行 command参数所指定的命令， 并且输出执行结果。
如果 PHP 运行在服务器模块中， system()函数还会尝试在每行输出完毕之后， 自动刷新 web 服务器的输出缓存。

如果要获取一个命令未经任何处理的 原始输出， 请使用 passthru()函数。
举个例子
<?php system("whoami");?>
```


2、exec — 执行一个外部程序
```
exec()执行 command参数所指定的命令
举个例子
<?php echo exec("whoami");?>
```

3、shell_exec — 通过 shell 环境执行命令，并且将完整的输出以字符串的方式返回。
```
举个例子
<?php echo shell_exec("whoami");?>
```

4、passthru — 执行外部程序并且显示原始输出
```
举个例子
<?php passthru("whoami");?>
效果跟上面的一样
```
5、proc_open — 执行一个命令，并且打开用来输入/输出的文件指针
6、pcntl_exec — 在当前进程空间执行指定程序
7、popen — 打开进程文件指针



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