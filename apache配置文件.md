apache的配置文件：httpd.conf文件，mime.types文件，.htaccess文件

^
如果你希望 Apache 将 `.phtml` 文件解析为 PHP，你需要添加类似的 `AddType` 或 `AddHandler` 指令，告诉 Apache 如何处理这些文件。例如：

```
AddType application/x-httpd-php .php .phtml
```

上述配置告诉 Apache 当它遇到以 `.php` 或 `.phtml` 结尾的文件时，将其类型标记为 `application/x-httpd-php`，从而使用 PHP 解析器进行解析。确保将这样的配置添加到你的 `httpd.conf` 文件中，并确保重新加载或重启 Apache 服务器，以使配置生效

