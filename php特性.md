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
$v0=is_numeric($v1) and is_numeric($v2) and is_numeric($v3); //and优先级低于=。所以$v0的值就是$v1的判断，检查变量$v1是否包含一个数字值。
if($v0){
    if(!preg_match("/\;/", $v2)){
        if(preg_match("/\;/", $v3)){
            eval("$v2('ctfshow')$v3");
        }
    }   
}
```