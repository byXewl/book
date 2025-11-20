## **php请求响应：**

#### 获取请求参数
```
传参?a=1
$_GET[a]     //1
$_GET[a][0]  //1

传参数组?a[]=1&b[1][2]=3
$_GET[a]     //“array”
$_GET[a][0]  //1
$_GET[b][1][2]  //3

传参数组?a[]=1&a[]=2      PHP不支持?a=1&a=2这样传数组。
$_GET[a]     //array( [0] => 1 [1] => 2 )


传参特性：
$_POST['a_sec']
需要传a[sec=


$input = file_get_contents('php://input');
$headers = (array)json_decode($input)->headers;

这里的$headers是POST请求体中的{"headers":“xx”}  xx


从POST中获取请求体参数
$email = filter_input(INPUT_POST, 'email',FILTER_VALIDATE_EMAIL);
filter_input()用于从外部变量（如$_GET、$_POST、$_COOKIE、$_SERVER、$_ENV、$_REQUEST）中获取输入，并应用过滤器对输入进行处理。
可能被模仿邮箱地址绕过sql注入:'union/**/select/**/username/**/from/**/user#@qq.com
123@qq.com' UNION SELECT * FROM admin WHERE 1=1 #


```
^
#### 关键词数组
$_GET,$_POST,$_REQUEST,$_FILES,$_SERVER


```
存在waf1($_REQUEST)；，而 $_REQUEST 有一个特性，当GET和POST有相同的变量时，匹配POST的变量，
那么就可以同时传参GET和POST即可绕过，也就是POST传参满足waf1即可。
```
默认情况下（php.ini 的 `variables_order` 指令未改动时）：

```php
$_REQUEST = array_merge(
    $_COOKIE,   // 优先级最高
    $_POST,     // 中间
    $_GET       // 最低
);
```

- **键名**是表单字段名 / URL 参数名 / Cookie 名
- **键值**是用户传来的原始字符串（未转义，未验证）

------

URL：

```
<https://example.com/test.php?id=123&name=tom>
```

同时 POST 表单里又有：

```
name=jerry&age=20
```

且浏览器带了一个 Cookie：

```
id=999; token=abc
```

那么：

```php
$_REQUEST == [
    'id'    => '999',     // Cookie 把 GET 的 123 覆盖了
    'name'  => 'jerry',   // POST 把 GET 的 tom 覆盖了
    'age'   => '20',      // 来自 POST
    'token' => 'abc',     // 来自 Cookie
]
```
$_REQUEST和$_GET获取的值不同也可以进行一些绕过。


^
#### 文件上传
```
$file = $_FILES['fileInput'];//<input>的name=fileInput
$fileName = $file['name'];  //文件名
$fileTmpName = $file['tmp_name']; //上传在服务器上的临时路径，不能直接在服务器上查看这些文件。
//不能直接访问临时文件。上传后可以用move_uploaded_file或copy+unlink将临时文件移动到目标目录文件。
//此时的间隙可被条件竞争访问

$fileSize = $file['size']; //上传文件大小
$fileError = $file['error']; //上传文件过程是否发送错误
```

#### 会话
```
cookie中没有sessionid的请求识为新请求，此时服务端的session为空。
session['any']==  ;空
```
#### 响应
```

响应JSON:
header('Content-Type: application/json');
echo json_encode($response);
echo json_encode($response,JSON_UNESCAPED_UNICODE);//不要unicode码，是汉字就汉字

<?php
if (isset($_REQUEST['a']) && isset($_REQUEST['b'])) {
    // 构建关联数组
    $responseData = array(
        'result' => 'success',
        'message' => '你输入的 ' . $_REQUEST['a'] . ' 和 ' . $_REQUEST['b']
    );

    // 设置响应头为 JSON
    header('Content-Type: application/json');

    // 输出 JSON 格式的响应
    echo json_encode($responseData);
} else {
    // 如果缺少参数，返回错误信息
    $errorResponse = array(
        'result' => 'error',
        'message' => '缺少参数'
    );

    // 设置响应头为 JSON
    header('Content-Type: application/json');

    // 输出 JSON 格式的错误响应
    echo json_encode($errorResponse);
}
?>

```

#### JSON请求
在 PHP 中，如果您使用的是标准的 POST 请求，并且 Content-Type 是 "application/x-www-form-urlencoded" 或 "multipart/form-data"，那么 `$_POST` 数组会被自动填充。然而，如果请求的 Content-Type 是 "application/json"，`$_POST` 不会被填充，因为 PHP 不会解析 JSON 数据并放入 `$_POST` 中。

当 Content-Type 是 "application/json" 时，需要手动解析原始的 JSON 数据。
```
<?php

// 获取原始的 POST 数据
$inputJSON = file_get_contents('php://input');

// 解码 JSON 数据
$data = json_decode($inputJSON, true);

// 如果解码成功，$data 将包含解码后的数据
if ($data !== null) {
    // 打印接收到的 JSON 数据
    print_r($data);

    // 可以通过 $data['a'], $data['b'] 等方式访问具体的数据项
    $aValue = $data['a'];
    $bValue = $data['b'];

    // 在这里进行后续的处理
} else {
    // 解码失败
    echo "解码失败\n";
}
?>
```
