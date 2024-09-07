### **原生javaweb项目：**
src/下：分层放类
web/WEB-INF/下：放lib/和web.xml，一般用户不能直接访问到。也可以放jsp作请求转发。
web/下：放静态文件
web/下：放jsp
<br>
out/WEB-INF/下：放classes/和lib/和/web.xml


### **maven的javaweb项目：**
src/mian/java/下：分层放类
src/mian/resources/下：放静态文件，thymeleaf页面，配置文件，和xml等。如：数据库的配置文件xml，mybatis的sql-xml
src/mian/webapp/下 ：放WEB-INF/web.xml，index.jsp等
target/：编译文件和打包文件
pom.xml



### **mavan的spring项目:**
src/mian/java/下：分层放类
src/mian/resources/下：放静态文件，纯前端，mybatis的sql-xml，多了配置文件application.yml
src/test/：单元测试类
target/:编译文件和打包文件
pom.xml
