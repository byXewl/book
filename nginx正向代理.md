![](.topwrite/assets/image_1711264055198.png)
对服务器端隐藏，当然也可以携带一些真实参数

```
server {
    listen 80;  # 监听端口

    server_name your_domain.com;  # 替换为你的域名

    location / {
        resolver 8.8.8.8;  # DNS解析器，用于解析目标服务器的IP
        proxy_pass http://$host$request_uri;  # 代理请求的目标地址
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;  # 传递真实客户端IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 传递客户端IP列表
        proxy_set_header X-Forwarded-Proto $scheme;  # 传递协议信息
    }
}
```