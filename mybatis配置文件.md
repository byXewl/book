### **mysbatis的配置文件**
**maven的javaweb中用xml配置**
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 数据源配置 -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:33066/xuexi"/>
                <property name="username" value="username"/>
                <property name="password" value="password"/>
            </dataSource>
        </environment>
    </environments>
    <!-- SQL 映射配置:注册数据层接口 -->
    <mappers>
        //<mapper resource="com/example/mapper/MyMapper.xml"/>
        <mapper class="com.example.mavenjavaweb.mapper.UserMapper"/>
    </mappers>
</configuration>
```
**maven的spring中用application.yml配置**
springboot自动扫描
下是一个使用 Spring Boot 和 MyBatis 的示例配置：
```
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/database1?useUnicode=true&characterEncoding=utf-8
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      # springboot自集成的HikariCP 连接池配置
      maximum-pool-size: 10

```
