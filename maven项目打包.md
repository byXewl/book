maven项目使用打包：
<https://blog.csdn.net/weixin_43978412/article/details/107430114>

<https://cloud.tencent.com/developer/article/2081508>
## **jar包和war包区别**
JavaSE程序可以打包成Jar包(J其实可以理解为Java了)，而JavaWeb程序可以打包成war包(w其实可以理解为Web了)。
然后把war发布到Tomcat的webapps目录下，Tomcat会在启动时自动解压war包。 
打成Jar包如果是运行java程序，就不需要在寻找包含main方法的类去执行；如果是使用第三方jar包，直接在自己项目中导入jar包，而不是复制一堆类文件。
打成war包是真实生产环境选择的web应用部署方式，网上说这样不会像直接复制文件夹那样可能造成文件丢失，而且服务器会对应用做优化，如删除空文件夹等。

>JAR（Java Archive，Java 归档文件）是与平台无关的文件格式，它允许将许多文件组合成一个压缩文件。
为 J2EE 应用程序创建的 JAR 文件是 EAR 文件（企业 JAR 文件）。 JAR 文件格式以流行的 ZIP 文件格式为基础。与 ZIP 文件不同的是，JAR 文件不仅用于压缩和发布，而且还用于部署和封装库、组件和插件程序，并可被像编译器和 JVM 这样的工具直接使用。
在 JAR 中包含特殊的文件，如 manifests 和部署描述符，用来指示工具如何处理特定的 JAR。 

>对于WAR包，如果一个Web应用程序的目录和文件非常多，那么将这个Web应用程序部署到另一台机器上，就不是很方便了，我们可以将Web应用程序打包成Web 归档（WAR）文件，这个过程和把Java类文件打包成JAR文件的过程类似。利用WAR文件，可以把Servlet类文件和相关的资源集中在一起进行发布。在这个过程中，Web应用程序就不是按照目录层次结构来进行部署了，而是把WAR文件作为部署单元来使用。 一个WAR文件就是一个Web应用程序，建立WAR文件，就是把整个Web应用程序（不包括Web应用程序层次结构的根目录）压缩起来，指定一个.war扩展名。下面我们将第2章的Web应用程序打包成WAR文件，然后发布 要注意的是，虽然WAR文件和JAR文件的文件格式是一样的，并且都是使用jar命令来创建，但就其应用来说，WAR文件和JAR文件是有根本区别的。

JAR文件的目的是把类和相关的资源封装到压缩的归档文件中，而对于WAR文件来说，一个WAR文件代表了一个Web应用程序，它可以包含 Servlet、HTML页面、Java类、图像文件，以及组成Web应用程序的其他资源，而不仅仅是类的归档文件。 
我们什么时候应该使用WAR文件呢？在开发阶段不适合使用WAR文件，因为在开发阶段，经常需要添加或删除Web应用程序的内容，更新 Servlet类文件，而每一次改动后，重新建立WAR文件将是一件浪费时间的事情。在产品发布阶段，使用WAR文件是比较合适的，因为在这个时候，几乎不需要再做什么改动了。

## **打war包**
如果是非maven的javeweb项目，需要配置运行环境，如idea右上角配置tomcat运行环境路径，将tomcat带有的三种依赖加入进项目。
然后通过idea的配置项目结构，部署描述符，工件名称，依赖，最终编译的同时部署在tomcat服务器运行。
也可以打包成war包，单独从tomcat后台管理中心进行部署。

^
javaweb项目在maven中一般打成war包。类似命令：编译+jar -cvf comment.war . （jsp可以不需要编译）
```
<groupId>com.lezijie</groupId>
<artifactId>lezijie-note</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>war</packaging>
```
默认为war包需要配置tomcat运行。

此时可以在pom.xml中加一个tomcat依赖，就可以通过命令直接运行javaweb程序。
```
<!-- Tomcat插件开发阶段使用 编译并启动命令：mvn tomcat7:run-->
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
此时使用mvn tomcat7:run命令可以直接编译运行javaweb项目。

原生javaweb项目一般不自己打包成可执行jar包（需要嵌入tomcat，并在 MANIFEST.MF 文件中指定一个主类，这个类负责启动嵌入式 Tomcat 服务器并部署应用程序），对此有封装好的springboot框架正是这样。
^
## **原生打库jar包**
```
jar -cvf helloworld.jar .
```

## **原生打可运行jar包**

1. 编译Java文件：

   ```
   javac HelloWorld.java
   ```

2. 命令创建 `META-INF` 目录和 `MANIFEST.MF` 文件。
    添加属性：（***注意，冒号为英文冒号且冒号后有空格***）
    **Main-Class:** 包含main方法的类，指定主类
    **Class-Path:** 依赖的jar包的路径，如果依赖多个jar包，使用空格隔开 
    **路径：**
    相对路径，jar包相对于helloworld.jar文件的路径 
    绝对路径，jar包在操作系统中的路径 常用相对路径，将依赖的jar包和自己的jar包放在同一级目录下，这样Class-Path直接写依赖jar包的名字即可。

   ```
   mkdir META-INF
   echo 'Manifest-Version: 1.0' > META-INF/MANIFEST.MF
   echo 'Created-By: 1.8.0_231 (Oracle Corporation)' >> META-INF/MANIFEST.MF
   echo 'Main-Class: HelloWorld' >> META-INF/MANIFEST.MF
   ```

3. 打包成 `.jar` 文件：

   ```
   jar cfm HelloWorld.jar META-INF/MANIFEST.MF HelloWorld.class
   ```

4. 运行 `.jar` 文件：

   ```
   java -jar HelloWorld.jar
   ```

 5. 后台运行
    ```
    命令：nohup java –jar 包名.jar > testout.log &  
    命令nohup：表示不挂断运行命令 
    符号">"：表示将输出打印到后面的文件中 
    符号“&”：表示在后台运行
    ```