原生mvc架构：
index.php?c=index&a=new_detail&id=36
index控制器类中的new_detail方法。
index.php?m=xuekes&a=index&classify_id=20
xueke模型类中的index方法。
^
php热门框架：
thinkphp5.1  6 
yii 
laravel
众多cms和后台管理系统，如fastadmin是thinkphp5.1衍生的。

^
有的框架会封装一些原生函数，如：thinkphp。如果不按照官方写法，直接写原生，可能不受官方保护，审计时可搜索是否存在原生函数。

^
php框架运行断点调试：<https://blog.csdn.net/qq_45766062/article/details/121828751>


## **thinkphp审计**
1.搜THINK_VERSION查看thinkphp版本
2.开启调试显示，app_debug和app_trace开启为true，可以前台右下角看到sql语句的执行等。

获取参数：
$id=$_GET['x'];可以灵活性注入
$id=input('x');可以灵活性注入
$id=input('get.x');不可以灵活性注入
```
// 获取单个变量
input('get.id');
// 使用过滤方法获取 默认为空字符串
input('get.name');
// 获取全部变量
input('get.');

input('get.name','','htmlspecialchars'); // 获取get变量 并用htmlspecialchars函数过滤
input('username','','strip_tags'); // 获取param变量 并用strip_tags函数过滤
input('post.name','','org\Filter::safeHtml'); // 获取post变量 并用org\Filter类的safeHtml方法过滤
```