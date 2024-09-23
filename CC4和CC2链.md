
```
<dependency>  ​
 <groupId>org.apache.commons</groupId>  ​
 <artifactId>commons-collections4</artifactId>  ​
 <version>4.0</version>  ​
</dependency>
```

因为 CommonsCollections4 除 4.0 的其他版本去掉了 InvokerTransformer 的 Serializable 继承，导致无法序列化​。
CC4链找到InvokerTransformer的替换。
CC2链是在CC4链的基础上修改。

​

