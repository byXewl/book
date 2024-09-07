php.ini
phpinfo.php
phpinfo();

^
配置说明：
## 指令名大小写敏感
```
ini_name=value
```

## []()全局变量注册开关

**5.3版本起废弃不推荐使用，5.4版本起移除**

```
register_globals
```

在设置为 On 时,php 会将$POST,$GET,$ COOKIE,$ENV,$ SESSION 数组中的$key=>$value直接注册 为变量\
比如$\_POST\[‘username’]就会被注册为$username。

## []()短标签

```
short_open_tag= On
```

## []()安全模式

```
safe_mode
```

本特性已自 PHP5.3.0 起废弃并将自 PHP5.4.0 起移除

```
safe_mode_include_dir safe_mode_exec_dir
safe_mode_allowed_env_vars
safe_mode_protected_env_vars
```

## []()禁用类/函数

```
disable_classes = 
disable_functions =
```

## []()PHP可访问目录

```
open_basedir=/www/a
```

目录间用分号(;)分隔 有效防止 php 木马跨站运行。降低执行效率。

## []()错误信息控制

```
display_error
```

是否显示PHP脚本内部错误

## []()设置错误报告级别

```
error_reporting =E_ALL
```

配置错误显示的级别

## []()魔术引号

```
magic_quotes_gpc= 
```

\*\*注意:本特性已自 PHP5.3.0 起废弃并将自 PHP5.4.0 起移除。 \*\*\
开启时会对HTTP请求中的G（$\_GET）、P（$\_POST）、C（$\_COOKIE）单双引号、空字符和 反斜线进行转义；反之则不会。

```
magic_quotes_runtime = 
```

\*\*注意:本特性已自 PHP5.3.0 起废弃并将自 PHP5.4.0 起移除。 \*\*\
php脚本读取文件或是从数据库中读取数据时，遇到反斜线（\）、单引号（‘）、双引号（“）、 NULL时，会在前面自动加上转义字符，变成\、\’ 、\” 、\NULL；

## []()是否允许包含远程文件

```
    allow_url_include
            默认为Off
```



