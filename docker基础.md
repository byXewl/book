黑马文档：
飞书链接：https://b11et3un53m.feishu.cn/wiki/MWQIw4Zvhil0I5ktPHwcoqZdnec?from=from_copylink   
密码：j.N?-+4[
^
镜像源：
<https://linux.do/t/topic/150936>
docker可以配置代理，但是必须重启，并且代理不可达启动doker会失败。

^
安装启动
```
命令：
yum -y install docker 
systemctl start docker
有宝塔直接宝塔安装
```

docker-hub官方拉取镜像
http://hub.docker.com
<http://hub.docker.com/_/mysql>
```
```

架构：
镜像
```
自制镜像，docker build
打包导出镜像，docker save xxx > xxx.tar
导入tar镜像，docker load -i xxx.tar
上传推送镜像，docker push
使用镜像包，docker run        -d 后台一直运行，不在当前也打印日志。
```
容器(镜像实例而来)
```
创建容器
查看容器里的启动后运行日志，docker logs -f 容器名
停止运行容器
启动容器
删除容器
进入容器，docker exec -it xxx /bin/bash
```