django框架，在开发的时候的debug模式会部署静态资源。
当debug关闭时，静态资源用nginx之类的挂在部署，可以反向代理。

django运行的方式有直接命令和服务器运行。
debug关闭时，默认只能127.0.0.1的ip访问，用nginx反向代理对外开放访问。
初始化：
<https://blog.csdn.net/qq_23488347/article/details/110296647>