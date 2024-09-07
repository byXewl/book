需要什么依赖导入坐标刷新即可
作为外部依赖，自动导入注册
```
<dependencies>
//tomcat10的sevlet
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>6.0.0</version>
        <scope>provided</scope>
    </dependency>

//mysql驱动程序
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.27</version>
    </dependency>

//mybatis
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.7</version>
    </dependency>
</dependencies>
```

可以通过Maven的配置项来控制是否要将依赖项打包到最终的构建文件中。
在 pom.xml 文件中，可以使用 <scope>元素来指定依赖的作用域。
例如，使用 <scope>provided</scope>`表示这个依赖项在编译时需要，但在运行时由容器提供。

