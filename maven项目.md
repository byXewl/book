### **原生javaweb项目：**
src/下：分层放类
web/WEB-INF/下：放lib/和web.xml
web/下：放静态文件
web/下：放jsp
<br>
out/WEB-INF/下：放classes/和lib/和/web.xml

### **maven作原始项目的依赖模块：**
加一个maven模块就一个pom.xml文件，原生项目模块可以将这个模块加入依赖，而获得pom.xml配置的依赖。

### **maven的javaweb项目：**
src/mian/java/下：分层放类
src/mian/resources/下：放静态文件，配置文件，和xml等。如：数据库的配置文件，mybatis的sql-xml
src/mian/webapp/下 ：放WEB-INF/web.xml，index.jsp，前端页面等
target/：编译文件和打包文件
pom.xml

^
maven的pom.xml中可以配置tomcat，直接用命令运行。
```
  <!-- Tomcat开发阶段使用 启动命令：mvn tomcat7:run-->
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
          <port>8080</port> <!-- 启动端口 默认:8080 -->
          <path>/note</path> <!-- 项目的站点名，即对外访问路径 -->
          <server>tomcat7</server> <!-- 服务器名称 -->
        </configuration>
      </plugin>
```
### **mavan的spring项目:**
src/mian/java/下：分层放类
src/mian/resources/下：放静态文件，纯前端，mybatis的sql-xml，多了配置文件application.yml
src/test/：单元测试类
target/:编译文件和打包文件
pom.xml
