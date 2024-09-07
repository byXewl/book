## **前后端分离单体项目**
新增网络
配置mysql镜像，创建容器并加入网络
```
利用官方mysql镜像

docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e TZ=Asia/Shanghai \
  -v /root/mysql/data:/var/lib/mysql \
  -v /root/mysql/init:/docker-entrypoint-initdb.d \
  -v /root/mysql/conf:/etc/mysql/conf.d \
  -p 3306:3306 \
  mysql


/root/mysql/init/中放建表和数据的.sql文件
root 密码为123
```
配置java项目镜像，创建容器并加入网络
```
需要自定义Dockerfile，构建镜像
```
配置nginx和前端项目镜像，创建容器并加入网络
```
利用官方nginx镜像


docker run --name nginx 
    -p 80:80
     -v /data/nginx/html:/usr/share/nginx/html 
     -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf  
     -v /data/nginx/logs:/var/log/nginx 
     -v /data/nginx/conf.d:/etc/nginx/conf.d 
    -d 
    nginx:latest


docker run -d \
    --name nginx \
    -p 18080:18080 \
    -p 18081:18081 \
    -v /root/nginx/html:/usr/share/nginx/html \
    -v /root/nginx/nginx.conf:/etc/nginx/nginx.conf \
    --network hmall \
    nginx
```


^
## **微服务项目**
一个微服务一个镜像
镜像启动成容器的时候需要配置中心Nacos的ip，用于获取配置文件等。
```
docker run 参数
-e SPRING_CLOUD_NACOS_CONFIG_SERVER_ADDER=192.168.2.4:8848
```