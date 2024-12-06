

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