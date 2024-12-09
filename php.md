常量，静态变量
```
const url1 = "www.x.p";
define("pai","3.14");
使用常量无需加$

static $a=1;
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
foreach($arr as $v){}
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