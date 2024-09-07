```
$a = 'b';
$b = 'ab';
$$a = 'bc' ;//此时$b会变成bc
```
代码审计搜搜$$
经常导致变量覆盖漏洞场景有：
$$，extract()函数，parse_str()函数，import_request_variables()使用不当，开启了全局变量注册等。

## **extract()**
例如：
`extract($_POST);`: 这个函数将 `$_POST` 数组中所有的键值对转换为变量和对应的值。例如，如果 `$_POST['user']` 存在，及POST传参user=xx，那么该函数将创建一个名为 `$user` 的变量，并将其值设置为 `$_POST['user']` 的值xx。

如果传参_SESSION[flag]=123。
那么覆盖只有$_SEESION[flag]=123。



