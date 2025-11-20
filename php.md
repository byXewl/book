常量，静态变量
```
const url1 = "www.x.p";
define("pai","3.14");
使用常量无需加$

static $a=1;
```

预定义魔术常量
```
__FILE__    当前文件绝对路径，包括自己
__DIR__    当前文件所在目录
__FUNCTION__ 所在函数函数名

```

打印数组
```
print_r()
var_dump()
```

创建空数组
```
$arr=array();
$arr=[];


$a ="1234" 
字符串，如果在数据场景，自动变为下标为数值的字符数组。print_r($a)  //不会报错

$a[0] == $a['key'] == '1'   //字符下标当做0
// 赋值只会改变第一个
$a['key1'] = "789" 相当于 $a[0]="7"

```

运算符
```
!=
<> 不等于
== 弱比较
=== 强比较
```

数组操作
```
合并数组 array_merge($arr1,$arr2);
最后一个出栈 array_pop($arr1);
入栈最后一个 array_push($arr,"xx");
去除重复值 array_unique($arr);
是否存在该值 in_array("xx",$arr);
json转换 $j = json_encode($arr);

数组循环遍历
foreach($arr as $v){ $v为每一项 }


array_unshift($a,$_GET);
作用：把 $_GET数组当成一个整体元素插到 $a数组的第一位。

$a = [$_POST];
array_unshift($a, $_GET);
之后：
$a === [$_GET, $_POST];
```
^
函数
```
$num3 =20;
function sum($num1,$num2=10){
    global $num3; //函数内使用全局变量需要声明，实际$GLOBALS['num3']可直接调用。
    return $num1+$num3;
}


function sum($num1,$num2=10) : void{ //可无返回值
    global $num3; 
}
```

^
类和静态方法
```
class MyClass {
    public static function myStaticMethod() {
        echo "Static method called";
    }
}

MyClass::myStaticMethod(); // 直接通过类名调用静态方法

$myClassInstance = new MyClass();
$myClassInstance->myStaticMethod(); // 这不是推荐的做法


call_user_func('MyClass::myStaticMethod');
call_user_func(['MyClass','myStaticMethod']);//传入数组，值为对应的。也等效。
```

session
```
session_start() 开启
$_SESSION['username']=$username 存放
$_SESSION['username'] 调用
unset($_SESSION['username']) 销毁



当用户访问一个 PHP 页面时，如果他们还没有会话，
PHP 会自动创建一个新的会话，并生成一个唯一的 PHPSESSID。
每次会话的SESSION有个id叫PHPSESSID，此时的$_SESSION['username']存放的内容对于这个PHPSESSID的。

php的session常见存储位置，里面为键值对 字符
/var/lib/php5/sess_PHPSESSID
/var/lib/php7/sess_PHPSESSID
/var/lib/php/sess_PHPSESSID
/tmp/sess_PHPSESSID
/tmp/sessions/sess_PHPSESSED
/var/lib/php/sessions/sess_PHPSESSID

PHPSESSID会在cookie会存储
如
/tmp/sess_99se2w33sddcs
```

命名空间及引入
```
```

^
## **一些函数作用说明**

#### 1、stripslashes清除/
```
$data = stripslashes($_GET['data']);
这行代码是在“清理”从 URL 传来的 `data` 参数，去掉其中可能存在的转义反斜杠
\
```


#### 2、htmlentities实体化
假设 `$res` 的内容是：
```
$res = '<script>alert("XSS")</script>';
```
执行：
```
$aff = htmlentities($res);
```
后，`$aff` 的值会变成：
```
&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

#### 3、ini_set('open_basedir',)
运行时设置php.ini
ini_set获取

```
ini_set('open_basedir', '/var/www/example.com/public_html:/tmp');
```
的作用是 **通过 PHP 动态设置 `open_basedir` 限制**，
告诉 PHP：**“你只能访问 `/var/www/example.com/public_html` 和 `/tmp` 这两个目录下的文件，其他一律禁止。”**



绕过：
<https://www.cnblogs.com/LLeaves/p/13210005.html>

session文件场景
如果可以函数调用session_start('/tmp')，如此可以控制session文件存储位置


#### 4、php_uname
| php\_uname | 返回运行 PHP 的系统的有关信息，php\_num('s')返回运行php服务的操作系统信息 |

#### 5、addslashes转义
在特定字符前加上反斜杠 `\`，用于转义这些字符。
 ✅ 转义哪些字符？
| 字符         | 转义后  |
| :--------- | :--- |
| `'`        | `\'` |
| `"`        | `\"` |
| `\`        | `\\` |
| `NUL`（空字节） | `\0` |

 ✅ 典型用途（**已过时，见警告**）
```php
$name = "O'Reilly";$name = addslashes($name); // 输出：O\'Reilly
```
```php
$query = "SELECT * FROM users WHERE name = '" . addslashes($name) . "'";
```
 ⚠️ 重要警告（2025 年了，别再用它防注入）

* **`addslashes()` 不能有效防止 SQL 注入**。
* 它**不转义所有数据库特殊字符**，比如 **MySQL 的 `\x00`, `\n`, `\r`, `\x1a`**。
* 正确做法是使用 **预处理语句（Prepared Statements）**：


^
#### **5、date()函数**
格式化获取时间函数。date()中的字符串参数有很多有特殊含义的字符，例如”l”代表星期，”Y”代表年份，”F”代表月份。可以用反斜杠+字符来表示原字符。
如果是字符串。参考如下：
```
echo date("/flag");
echo "\n";
echo date("/\\\f\l\a\g");


/fSaturdaypm11
/flag
```
