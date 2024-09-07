Nginx
负载均衡基于反向代理：默认轮询访问不同服务器，
可自己设置权重，给强的服务器多点权重。
如果要解决session问题，加ip_hash,一个用户访问一直是同一台服务器。
token不用考虑分布式出现会话问题。
配置负载均衡：
```
1.
upstream xxServers {
    server 127.0.0.1:8080 weight=1;
    server 127.0.0.1:8081 weight=1;
}
2.配置location
server {
        listen  80;
        server_name localhost;
        
        location /api/ {
            proxy_pass    http://xxSevers/admin/; #反向代理
        }
    } 
```
实现负载均衡：
Spring Cloud 中集成的 Ribbon 可实现内部服务之间负载均衡
<br>
微服务架构中的各个微服务已经实现了内部的负载均衡，但仍然有一些场景和需求可以考虑使用 Nginx 作为额外的反向代理和负载均衡器，也可以用Nginx作静态资源服务器。


