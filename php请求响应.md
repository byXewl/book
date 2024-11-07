## **php请求响应：**

获取请求参数
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
需要传a[sec



关键词：
$_GET,$_POST,$_REQUEST,$_FILES,$_SERVER

文件上传
$file = $_FILES['fileInput'];//<input>的name=fileInput
$fileName = $file['name'];  //文件名
$fileTmpName = $file['tmp_name']; //上传在服务器上的临时路径，不能直接在服务器上查看这些文件。
//不能直接访问临时文件。上传后可以用move_uploaded_file将临时文件移动到目标目录文件。
$fileSize = $file['size']; //上传文件大小
$fileError = $file['error']; //上传文件过程是否发送错误
```
响应
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

JSON请求
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
