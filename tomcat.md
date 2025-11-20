## **tomcat**
<https://archive.apache.org/dist/tomcat/>
下载Windows的压缩包解压即可
javaee程序的服务器
servlet的容器
最新版本tomcat10
启动前conf先配置控制台GBK输出，否则有可能乱码
默认使用8080端口
webapp/目录放javaweb打包的war文件，自动部署
访问localhost:8080，可管理部署的javaweb程序和访问

^
## **idea集成tomcat**
idea集成tomcat并导入tomcat里面自带servlet-api.jar和jsp-api.jar
可在idea中直接部署运行javaweb程序
(集成tomcat 10引用servlets类时导包时使用import jakarta.servlet.;)
(集成tomcat 9引用servlets类时导包时使用import javax.servlet.;)

项目配置中，Facet要加入工件里，才会编译.java文件和包含.html.jsp文件。

编译的工件名称即为上下文名称，idea集成tomcat时的上下文名称要一样( : 和空格都变成_ )，不然找不到Servlet一直404

^
Tomcat 的 JMX（Java Management Extensions）端口通常默认为 1099。JMX 是 Java 平台的管理和监控标准，它允许应用程序在运行时暴露管理接口以供远程管理工具或监控系统使用，可以使用 JConsole客户端连接 Tomcat JMX。

## **为什么需要tomcat?**
Tomcat中运行的Java程序（Web应用）在启动时会加载到内存中，并且会一直驻留在内存中，以提供服务。Tomcat是一个Servlet容器，它负责管理和运行Java Servlet、JavaServer Pages（JSP）等Web组件。当Tomcat启动时，它会加载Web应用的类和相关资源，并创建相应的Servlet实例。

这些Java程序通常会保持在内存中，以便迅速响应客户端的请求。Tomcat会维护一个连接池，以重复使用Servlet实例，提高性能并减少资源消耗。在应用运行期间，Tomcat会不断处理来自客户端的请求，保持Java程序一直在内存中，直到Tomcat关闭或Web应用被卸载。

需要注意的是，虽然Java程序在内存中一直存在，但可能会受到一些因素的影响，比如内存管理策略、垃圾回收等。





