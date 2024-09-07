
php的ide需要配置xdebug程序监听调试debug。
```
phpstudy点击php设置开启xdebug，再设置php.ini中
xdebug.remote_enable=1
xdebug.remote_host=localhost
xdebug.remote_port=9002
xdebug.idekey=PHPSTORM [Xdebug]

phpstorm中设置中，监听9002
即可开启debug。
设置中配置和phpstudy的服务器一样域名端口
右上编辑配置加phpweb使用设置中同phpstuy的服务器
```
php框架运行断点调试：<https://blog.csdn.net/qq_45766062/article/details/121828751>