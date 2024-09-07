## **自制应用部署的镜像**


![image-20240117135716490](http://cdn.33129999.xyz/mk_img/image-20240117135716490.png)

### **1.Dockerfile文件**
使用Docker官方提供的CentOS或Ubuntu镜像作为基础镜像。然后再搭建其它层即可。
Docker提供了自动打包镜像的功能。我们只需要将打包的过程，每一层要做的事情用固定的语法写下来，交给Docker去执行即可。而这种记录镜像结构的文件就称为Dockerfile，其对应的语法可以参考官方文档：https://docs.docker.com/engine/reference/builder/


例如，要基于Ubuntu镜像来构建一个Java应用，其当前目录下Dockerfile文件内容如下：
```
指定基础镜像
FROM ubuntu:16.04

配置环境变量，JDK 的安装目录、容器内时区
ENV JAVA_DIR /usr/local
ENV TZ Asia/Shanghai

拷贝 JDK 和 Java 项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /app.jar

设定时区
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

安装 JDK
RUN cd $JAVA_DIR \
    && tar -xf ./jdk8.tar.gz \
    && mv ./jdk1.8.0_144 ./java8

配置环境变量
ENV JAVA_HOME $JAVA_DIR/java8
ENV PATH $PATH:$JAVA_HOME/bin

指定容器运行时监听的端口
EXPOSE 8080

入口，Java 项目的启动命令，启动后有日志打印
ENTRYPOINT ["java", "-jar", "/app.jar"]
```
需要Linux系统环境、JDK环境这两层，只有上面的3层不同（因为jar包不同）。
所以提供了基础的系统加JDK环境，我们在此基础上制作java镜像，就可以省去JDK的配置了
只需要将应用docker-demo.jar包准备到当前目录下即可。
其当前目录下Dockerfile文件内容如下
```
基础镜像
FROM openjdk:11.0-jre-buster

设定时区
ENV TZ Asia/Shanghai

设置时区
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

拷贝 Jar 包
COPY docker-demo.jar /app.jar

入口，Java 项目的启动命令
ENTRYPOINT ["java", "-jar", "/app.jar"]
```
^
### **2.利用Dockerfile构建本地镜像**
```
当前目录下有Dockerfile文件，和必要的文件包如docker-demo.jar
使用命令：根据Dockerfile文件自动从docker官网拉取基础镜像和本机文件包共同构建成最终镜像。
如果本地镜像中有Dockerfile中需要的基础镜像，则直接从本地镜像中获取来构建，加快速度。
docker build -t 镜像名:版本(默认last)  目录(当前目录用.)

此时查看本地镜像就有了:
docker images
```
案例:
当前目录下有mavn打包的hm-service.jar
和Dockerfile文件如下:
```
# 基础镜像
FROM openjdk:11.0-jre-buster
# 设定时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 拷贝jar包
COPY hm-service.jar /app.jar
# 入口
ENTRYPOINT ["java", "-jar", "/app.jar"]
```
### **3.镜像包载入本地镜像和本地镜像载出为镜像包**
```
可以将本地的镜像 导出为镜像包xx.tar，可以分析别人
docker save
docker save xxx > xxx.tar

也可以再导入
docker load -i xx.tar
```


^

docker pull命令不用，直接变tar镜像包下载：
<https://www.passerma.com/article/78>
项目<https://github.com/passerma/docker-pull>
<https://github.com/NotGlop/docker-drag>