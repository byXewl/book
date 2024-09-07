mysql5.5后默认存储引擎InnoDB
5.5前默认MyISAM

存储引擎：
```
InnoDB：支持事务ACID，支持外键。

MyISAM：不支持事务，外键，访问快。

Memory：缓存如redis，数据存储在内存，速度快，支持hash索引。
```