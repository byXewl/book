# 配置文件
配置文件存放目录：/etc/nginx
主配置文件：letc/nginx/conf/nginx.conf
管理脚本：/usr/lib64/systemd/system/nginx.service
模块：/usr/lisb64/nginx/modules
应用程序：/usr/sbin/nginx
程序默认存放位置：/usr/share/nginx/html
日志默认存放位置：Ivar/log/nginx
配置文件目录为：/usr/local/nginx/conf/nginx.conf
不同安装方式的nginx的配置文件位置不同，通过命令搜索到位置：
sudo find / -name "nginx.conf"



## **所有主机网卡可访问这个80的服务**

要允许所有主机上的网卡访问这个80端口上的服务，你需要修改Nginx配置文件中的 `server_name` 指令。当前配置中的 `server_name` 指令被设置为 `192.168.20.137`，这意味着只有这个IP地址能够访问这个特定的Nginx服务器块。

要更改这个设置，你可以采取以下几种方法之一：

1. **设置为通配符**： 将 `server_name` 设置为一个星号（`*`），这样任何IP地址都能访问这个服务器块。

   ```
   server_name *;
   ```

2. **设置为默认服务器**： 如果你的Nginx配置中没有其他 `server` 块，并且你想要这个服务器块作为默认服务器来响应所有请求，你可以使用 `default` 关键字：

   ```
   listen 80 default_server;
   server_name _;
   ```

## **常规网站**

```

##全局配置
user  www www;
worker_processes auto;
error_log  /www/wwwlogs/nginx_error.log  crit;
pid        /www/server/nginx/logs/nginx.pid;
worker_rlimit_nofile 51200;
stream {}

##配置
events{}
upstream{}//负载均衡

##http请求配置，里面有站点配置
http{ 
###站点
    server {
        listen  80;
        server_name localhost;
        
        location / {
            ip:访问/路径请求这个ip服务器
        }
        location /app {
            ip1:访问/app路径请求这个ip1服务器
        }
    } 
}

```
# 主配置文件解释
```
user  www www;  # 设置Nginx工作进程的用户和用户组

worker_processes auto;  # 设置Nginx工作进程的数量，auto表示由系统自动决定

error_log  /www/wwwlogs/nginx_error.log  crit;  # 指定错误日志文件路径和级别为“crit”

pid        /www/server/nginx/logs/nginx.pid;  # 指定保存主进程ID的文件路径

worker_rlimit_nofile 51200;  # 设置单个工作进程可以打开的文件描述符数量的最大值

stream {
    log_format tcp_format '$time_local|$remote_addr|$protocol|$status|$bytes_sent|$bytes_received|$session_time|$upstream_addr|$upstream_bytes_sent|$upstream_bytes_received|$upstream_connect_time';
    access_log /www/wwwlogs/tcp-access.log tcp_format;  # 定义TCP访问日志格式和记录位置
    error_log /www/wwwlogs/tcp-error.log;  # 指定TCP错误日志位置
    include /www/server/panel/vhost/nginx/tcp/*.conf;  # 引入TCP代理的配置文件
}

events
    {
        use epoll;  # 使用epoll事件模型
        worker_connections 51200;  # 设置每个进程的最大连接数
        multi_accept on;  # 允许一个进程同时接收多个新连接
    }

http
    {
        include       mime.types;  # 引入MIME类型设置文件
		#include luawaf.conf;

		include proxy.conf;

        default_type  application/octet-stream;  # 设置默认Content-Type

        server_names_hash_bucket_size 512;  # 设置服务器名称hash表桶的大小
        client_header_buffer_size 32k;  # 设置客户端请求头缓冲区大小
        large_client_header_buffers 4 32k;  # 存储大型请求头的缓冲区大小
        client_max_body_size 50m;  # 设置客户端请求体的最大尺寸

        sendfile   on;  # 开启sendfile功能，用于高效传输文件
        tcp_nopush on;  # 提高网络数据发送的效率

        keepalive_timeout 60;  # 设置客户端与服务器保持连接的超时时间
        tcp_nodelay on;  # 禁用TCP的Nagle算法

        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
        fastcgi_temp_file_write_size 256k;
		fastcgi_intercept_errors on;

        gzip on;
        gzip_min_length  1k;
        gzip_buffers     4 16k;
        gzip_http_version 1.1;
        gzip_comp_level 2;
        gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
        gzip_vary on;
        gzip_proxied   expired no-cache no-store private auth;
        gzip_disable   "MSIE [1-6]\.";

        limit_conn_zone $binary_remote_addr zone=perip:10m;
		limit_conn_zone $server_name zone=perserver:10m;

        server_tokens off;
        access_log off;

# 每一个server块就是一个虚拟主机，一个站点。
server
    {
        listen 888;  # 监听的端口号
        server_name phpmyadmin;  # 服务器名称
        index index.html index.htm index.php;  # 设置默认访问的文件名
        root  /www/server/phpmyadmin;  # 设置网站根目录

        #error_page   404   /404.html;
        include enable-php.conf;

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;  # 图片和动画文件的缓存时间
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;  # JavaScript和CSS文件的缓存时间
        }

        location ~ /\.
        {
            deny all;  # 阻止所有以.开头的文件或目录的访问
        }

        access_log  /www/wwwlogs/access.log;  # 访问日志文件路径
    }
include /www/server/panel/vhost/nginx/*.conf;  # 引入其他网站的配置文件
}

```
# **配置说明**


## nginx配置

**proxy\_pass**

* proxy\_pass配置中url末尾有/时，nginx转发会将原url去除loc带/时ation匹配表达式 后的内容拼接在proxy\_pass中url之后。
* proxy\_pass配置中url末尾不带/时，如url中不包含path，则直接将原url拼接在proxy\_pass中url之后；如url中包含path，则将原uri去除location匹配表达式后的内容拼接在proxy\_pass中的url之后。

```
// 举例 - 测试地址：http://www.web-jshtml.cn/productapi/getSms/


// 1、配置中url末尾有/时
// 代理后实际访问地址：http://www.web-jshtml.cn/api/getSms/;
location ^~ /productapi/ {
    proxy_pass http://www.web-jshtml.cn/api/;
}
// 代理后实际访问地址：http://www.web-jshtml.cn/getSms/;
location ^~ /productapi/ {
    proxy_pass http://www.web-jshtml.cn/;
}
// 代理后实际访问地址：http://www.web-jshtml.cn//getSms/;
location ^~ /productapi {
    proxy_pass http://www.web-jshtml.cn/;
}
// 代理后实际访问地址：http://www.web-jshtml.cn/api//getSms/;
location ^~ /productapi {
    proxy_pass http://www.web-jshtml.cn/api/;
}

// 2、配置中url末尾无/时 
// 代理后实际访问地址：http://www.web-jshtml.cn/productapigetSms/;
location ^~ /productapi/ {
    proxy_pass http://www.web-jshtml.cn/productapi;
}
// 代理后实际访问地址：http://www.web-jshtml.cn/api/getSms/;
location ^~ /productapi {
    proxy_pass http://www.web-jshtml.cn/api;
}
// 代理后实际访问地址：http://www.web-jshtml.cn/productapi/getSms/;
location ^~ /productapi/ {
    proxy_pass http://www.web-jshtml.cn;
}
// 代理后实际访问地址：http://www.web-jshtml.cn/productapi/getSms/;
location ^~ /productapi {
    proxy_pass http://www.web-jshtml.cn;
}
```

## **location匹配规则**

| **标识符** | **描述**                                                           |
| ------- | ---------------------------------------------------------------- |
| =       | **精确匹配**；用于标准url前，请求字符串和url严格匹配。如果匹配成功，就停止匹配，立即执行该location里面的请求。 |
| \~      | **正则匹配**；用于正则url前，表示uri里面包含正则，并且区分大小写。                           |
| \~\*    | **正则匹配**；用于正则url前，表示uri里面包含正则，不区分大小写。                            |
| ^\~     | **非正则匹配**；用于标准url前，nginx服务器匹配到前缀最多的uri后就结束，该模式匹配成功后，不会使用正则匹配。    |
| 无       | **普通匹配（最长字符匹配）**；与location顺序无关，是按照匹配的长短来取匹配结果。若完全匹配，就停止匹配。       |

> **优先级** - 多个location配置的情况匹配顺序为：首先精确匹配 = ；其次前缀匹配 ^\~；其次是按照配置文件中的正则匹配；然后匹配不带任何修饰符的前缀匹配；最后交给/通用匹配；

```
// 举例
location = / {  
   //精确匹配/ ，主机名后面不能带任何字符串
    echo "规则A";
}
location = /login {
  //精确匹配 /login 开头的地址，匹配符合以后，不在继续往下搜索 
    echo "规则B";
}
location ^~ /blog/ { 
  //非正则匹配，匹配/blog/后，停止往下搜索正则，采用这一条
  echo "规则C";
}
location ~  \.(gif|jpg|png|js|css)$ {
    //区分大小写的正则匹配  若匹配成功，停止往下搜索正则，采用这一条
    echo "规则D";
}
location ~* \.png$ {  
   //区分大小写的正则匹配 ，停止往下搜索正则，采用这一条
    echo "规则E";
}
location / {
  //因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  //如果没任何规则匹配上，就采用这条规则
    echo "规则F";
}
location /blog/detail { 
  //最长字符串匹配，若完全匹配成功，就不在继续匹配，否则还会进行正则匹配
  echo "规则G";
}
location /images {  
    //最长字符串匹配，同上 
    echo "规则Y";
}
location ^~ /static/files {  
    //非正则匹配，若匹配成功，就不在继续匹配
    echo "规则X";
}

// 当访问根路径/的时候，比如http://www.web-jshtml.cn/ ，会匹配规则A。
// 当访如http://www.web-jshtml.c/login ，会匹配规则B。
// 当访如http://www.web-jshtml.c/login.html ，会匹配规则F。
// 当访如http://www.web-jshtml.c/blog/detail/3.html ，会匹配规则C。 - 按匹配优先级去找
```

## **rewrite 重定向**

指令语法：`rewrite regex replacement [flag];`

| 字符        | 描述                               |
| --------- | -------------------------------- |
| \\        | 将后面接着的字符标记为一个特殊字符或者一个原义字符或一个向后引用 |
| ^         | 匹配输入字符串的起始位置                     |
| $         | 匹配输入字符串的结束位置                     |
| \*        | 匹配前面的字符零次或者多次                    |
| +         | 匹配前面字符串一次或者多次                    |
| ?         | 匹配前面字符串的零次或者一次                   |
| .         | 匹配除“\n”之外的所有单个字符                 |
| (pattern) | 匹配括号内的pattern                    |

rewrite最后一项flag参数：

| 标记符号      | 说明                              |
| --------- | ------------------------------- |
| last      | 本条规则匹配完成后继续向下匹配新的location URI规则 |
| break     | 本条规则匹配完成后终止，不在匹配任何规则            |
| redirect  | 返回302临时重定向                      |
| permanent | 返回301永久重定向                      |

```
// 举例：
// 表示匹配成功后跳转，执行永久301跳转
rewrite ^/(.*) http://www.web-jshtml.cn/ permanent;    
```

