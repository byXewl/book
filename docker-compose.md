Docker Compose 是 Docker 官方提供的一个工具，用于定义和运行多容器的 Docker 应用。安装后即可使用命令。
通过一个简单的 YAML 文件，你可以定义应用的服务(不同容器)、网络和卷等配置，然后使用 docker-compose命令启动整个应用。
一次性管理多个容器，且容器在同一网络。
一个docker-compose.yml文件，对应着一个完整的项目。

^
所有命令都在docker-compose.yml所在目录下进行：
```
拉取或构建当前docker-compose.yaml的镜像(Dockerfile构建，目录中存在相应的 Dockerfile 和必要的包文件)
docker compose build
此时所有镜像到本地镜像了

拉取或构建镜像并 后台 启动所有容器:
docker compose up -d

停止并移除当前docker-compose.yaml的所有容器和网络：
docker compose down

停止当前docker-compose.yaml的所有容器：
docker compose top
```

## **配置docker-compose.yml**

**version配置:**
* version: '2': 这表示使用 Docker Compose 文件的第 2 版格式。它支持相对较旧的特性和语法。在此版本中，服务定义和配置使用较简单的结构。
* version: '3.8': 这表示使用 Docker Compose 文件的第 3 版格式，并且使用了特定的子版本（在此例中是 3.8）。较新的版本通常支持更多的功能和配置选项。在版本3及以上，您可以使用更丰富的特性，如配置文件扩展、资源限制等。

**配置样例:**
```
version: "3.8"​
​
services:​ // 每一个服务对应一个启动时的容器及配置
  mysql:​
    image: mysql​  //从本地镜像名寻找，如果没有，则拉取官网的
    container_name: mysql​
    ports:​
      - "3306:3306"​
    environment:​
      TZ: Asia/Shanghai​
      MYSQL_ROOT_PASSWORD: 123​
    volumes:​
      - "./mysql/conf:/etc/mysql/conf.d"​
      - "./mysql/data:/var/lib/mysql"​
      - "./mysql/init:/docker-entrypoint-initdb.d"​
    networks:​
      - hm-net​
  hmall:​
    build: ​  // 不直接使用拉取官网镜像或本地镜像，而是使用Dockerfile构建镜像。
      context: .​
      dockerfile: Dockerfile​  //Dockerfile构建，当前目录中存在相应的 Dockerfile 和必要的包文件
    container_name: hmall​
    ports:​
      - "8080:8080"​
    networks:​
      - hm-net​
    depends_on:​  //依赖的容器，表明启动此容器的时候，先启动mysql
      - mysql​
  nginx:​
    image: nginx​
    container_name: nginx​
    ports:​
      - "18080:18080"​
      - "18081:18081"​
    volumes:​
      - "./nginx/nginx.conf:/etc/nginx/nginx.conf"​
      - "./nginx/html:/usr/share/nginx/html"​
    depends_on:​
      - hmall​
    networks:​
      - hm-net​


networks:​ //配置网络，最新创建名为hmall的网络，这里需要确保没已经有名为hmall的网络
  hm-net:​
    name: hmall
```

也可一个服务的
```
version: '2'
services:
 struts2:
   image: vulhub/struts2:2.5.25 //从官网hub镜像的vulhub/拉取
   ports:
    - "8080:8080"
```