审计流程：
* 审计前了解服务环境
* 了解网站功能
* 制定计划（审核功能点，容易出现得漏洞）
* 工具扫描/正则搜索相关敏感函数、可控变量，输入，注册。
* 追踪危险函数，弱类型比较==。
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


mysqli : php7后的数据对象
$mysqli=@new mysqli($mysqlhost,$mysqluser,$mysqlpwd,$mysqldb);
$username=$_POST['userid'];
$userpwd=$_POST['userpwd'];
$sql="select sds_password from sds_user where sds_username='".$username."' order by id limit 1;";
$result=$mysqli->query($sql);


报错注入
die(mysqli_error($mysqli));
PDO::errorInfo();

$sql = mysql_query('select * from users where id=1 and updatexml(0,concat(0x7e,(select version())),1)');
if(!$sql) {
	echo mysql_error();
}
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
## **文件上传**
```
1. php.ini中 `file_uploads` 为 `on`。

   * `upload_tmp_dir`：文件上传存放的临时目录，文件上传成功之前存放。
   * `upload_max_filesize`：服务器允许上传文件的最大值。
   * `max_execution_time`：允许最大的执行时间。
   * `memory_limit`：允许的最大占用内存。

2. `<form method="post" enctype="multipart/form-data">`

3. 文件处理：

   * `$_FILES['name名']['name']`：文件名
   * `$_FILES['name名']['tmp_name']`：临时文件地址

4. `move_uploaded_file(临时文件，目的文件)`：处理文件移动。

   * 处理：重命名：用户ID+时间
   * 限制类型：①后缀 ②MIME类型

```


^
## **文件操作**
```
copy
file_get_contents()
file_put_contents()
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
**eval() assert()**
```
eval() — 把字符串作为PHP代码执行。这个函数一般都是攻击者用的，没什么人会拿这个放到自己的源码里面

assert() — 检查一个断言是否为 false（把字符串作为PHP代码执行）

PHP 5  ： assert( mixed$assertion, string $description= ? ) : bool
PHP 7 ：assert( mixed$assertion, Throwable $exception= ? ) : bool
assert()会检查指定的 assertion并在结果为 false时采取适当的行动（把字符串 $assertion 作为PHP代码执行）
```

**preg_replace — 执行一个正则表达式的搜索和替换**
```
preg_replace( mixed$pattern, mixed$replacement, mixed$subject, int $limit= -1 , int &$count= ? ) : mixed
搜索 subject中匹配 pattern的部分，以 replacement进行替换。

/e 修正符使 preg_replace() 将 replacement 参数当作 PHP 代码
preg_replace("/test/e",$_GET["h"],"jutst test");

如果我们提交 ?h=phpinfo()，/e就会将h参数当做PHP代码，phpinfo()将会被执行。
```

**create_function —创建一个匿名（lambda样式）函数**
```
语法
create_function（字符串 $args，字符串 $code）：字符串
根据传递的参数创建一个匿名函数，并为其返回唯一的名称。

举个例子
$newfunc = create_function('$v', 'return system($v);');
$newfunc('whoami');
这里就相当于执行了system('whoami')
```

**array_map — 为数组的每个元素应用回调函数**
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

**call_user_func — 把第一个参数作为回调函数调用**
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

**call_user_func_array — 调用回调函数，并把一个数组参数作为回调函数的参数**
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


**array_filter — 使用回调函数过滤数组的元素**
```
语法
array_filter( array $array, callable|null $callback= null, int $mode= 0 ) : array
遍历 array数组中的每个值，并将每个值传递给 callback回调函数。 
如果 callback回调函数返回 true，则将 array数组中的当前值返回到结果 array 数组中。

返回结果 array 数组的键名（下标）会维持不变，如果 array参数是索引数组，
返回的结果 array 数组键名（下标）可能会不连续。 可以使用 array_values()函数对数组重新索引。

参数
array
要遍历的数组

callback
使用的回调函数
如果没有提供 callback回调函数，将删除数组中 array的所有“空”元素。 
有关 PHP 如何判定“空”元素，请参阅 empty()。

mode
决定哪些参数发送到 callback回调的标志：

ARRAY_FILTER_USE_KEY- 将键名作为 callback回调的唯一参数，而不是值
ARRAY_FILTER_USE_BOTH- 将值和键都作为参数传递给 callback回调，而不是仅传递值
默认值为 0，只传递值作为 callback回调的唯一参数。

返回值
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





// 允许加载外部实体
libxml_disable_entity_loader(false);
// xml文件来源于数据流
$xmlfile = file_get_contents('php://input');
if(isset($xmlfile)){
    $dom = new DOMDocument();
  	// 加载xml实体，参数为替代实体、加载外部子集
    $dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);
  	// 把 DOM 节点转换为 SimpleXMLElement 对象
    $creds = simplexml_import_dom($dom);
  	// 节点嵌套
    $ctfshow = $creds->ctfshow;
    echo $ctfshow;
}

[POST]Payload:
<?xml version="1.0"?>
<!DOCTYPE payload [
<!ELEMENT payload ANY>
<!ENTITY xxe SYSTEM "file:///flag">
]>
<creds>
<ctfshow>&xxe;</ctfshow>
</creds>


类似的
libxml_disable_entity_loader(false);
$xmlfile = file_get_contents('php://input');
if(isset($xmlfile)){
    $dom = new DOMDocument();
    $dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);
}
```

PHP的内置类
SimpleXMLElement
对象
```
// 解析 XML 数据
$xmlData = '<root><element>value</element></root>';
$xml = new SimpleXMLElement($xmlData);

// 解析 XML 文件 URL
$xmlUrl = 'http://example.com/example.xml';
$xml = new SimpleXMLElement($xmlUrl, 0, TRUE);
此时外链的xml是存在xxe即可。

// 解析 XML 数据并指定解析选项
$xmlData = '<root><element>value</element></root>';
$xml = new SimpleXMLElement($xmlData, LIBXML_NOCDATA | LIBXML_NOEMPTYTAG);

// 解析 XML 数据并指定命名空间
$xmlData = '<root xmlns:ns="http://example.com/ns"><ns:element>value</ns:element></root>';
$xml = new SimpleXMLElement($xmlData, 0, FALSE, 'http://example.com/ns');
```

## **引发信息泄露的危险函数**
phpinfo — 输出关于 PHP 配置的信息
getenv — 获取一个环境变量的值
get_current_user — 获取当前 PHP 脚本所有者名称
getlastmod — 获取页面最后修改的时间
ini_get — 获取一个配置选项的值
glob — 寻找与模式匹配的文件路径


^
## **SSRF函数**
常见的引发SSRF的函数
```
curl():用于执行指定的CURL会话，支持的协议比较多，常用于SSRF的协议经过测试都支持，如dict,ghoper,file
    // 初始化 cURL 会话
    $ch = curl_init();
    
    // 设置请求的 URL
    curl_setopt($ch, CURLOPT_URL, $url);
    
    // 设置不返回 HTTP 头，只返回响应体
    curl_setopt($ch, CURLOPT_HEADER, false);
    
    // 设置 cURL 执行后返回响应内容，而不是直接输出
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // 设置允许 cURL 跟随服务器的重定向
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    // 关闭对 SSL 证书的验证（不安全，仅用于测试）
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
    
    // 关闭对 SSL 证书主机名的验证（不安全，仅用于测试）
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    
    // 执行 cURL 请求
    $res = curl_exec($ch);
   
    // 关闭 cURL 资源，释放系统资源
    curl_close($ch);



file_get_contents():把文件写入字符串，当把url是内网文件的时候，会先去把这个文件的内容读出来再写入，导致了文件读取

fopen():打开一个文件

readine():打开一个文件，并按行读取内容
```
^
## **逻辑漏洞**
越权等，最好黑盒。
未授权，路由和一些隐藏文件。
```
if(!isset($_SESSION\['login'])){
header("location:login.php");
}
//如果没有exit();或者die(); 后面的代码还是会执行。
```