java的包管理器，命令mvn。

^
maven配置文件conf\settings.xml
```
配置中央仓库阿里镜像
    <mirror>  
    <id>alimaven</id>  
    <name>aliyun maven</name>  
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>          
    </mirror>

配置本地仓库位置，默认为c/用户/.m2/repository
 <localRepository>D:\java1\apache-maven-3.6.1\mvn_repo\</localRepository>
```
idea的设置的构建中点击Maven，设置maven的路径，settings.xml路径，以及本地仓库位置。

maven中央仓库pom.xml坐标：
https://mvnrepository.com/



