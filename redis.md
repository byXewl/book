字典数据库，作缓存，作黑名单，白名单。

存储键值对，也可以设置 键值对 在redis中的过期时间。
^

SET 命令通常用于设置键的值，其基本语法为：
```
SET key value [EX seconds] [PX milliseconds] [NX|XX]

* `key` 表示要设置的键名。
* `value` 表示要设置的值。
* `EX seconds` 表示过期时间，单位为秒。
* `PX milliseconds` 表示过期时间，单位为毫秒。
* `NX` 表示只在键不存在时进行设置。
* `XX` 表示只在键已经存在时进行设置。

SET mykey "Hello, Redis!" PX 500 
//500毫秒过期
SET mykey "Hello, Redis!" EX 10
//10秒过期
```
^
## **redis基础操作**

默认bond 127.0.0.1 本地可以直接连接6379，且没有密码。
用自带的连接服务程序redis-cli：

```
=>redis-cli -h 127.0.0.1 -p 6379
```
在配置文件可以手动
将bond改为0.0.0.0则所有ip可连接，
也可以设置密码，如123456
```
用密码登录：
=>redis-cli -h 127.0.0.1 -p 6379 -a 123456
=>redis-cli -h 127.0.0.1 -p 6379 auth 123456


config get dir   //获取redis运行路径，默认 /root/redis-6.2.4
config get dbfilename //默认数据库名称dump.rdb，数据保存在这个文件里
redis是默认开启持久化某个时间点将数据写入dump.rdb中在dir目录下。
```
```
获取值
get <key>

查看键值过期时间（倒计时）
ttl <key>

查看所有键
keys *

查看键值对数量
dbsize

查看服务器信息
info

flushall //清掉所有变量数据
```

