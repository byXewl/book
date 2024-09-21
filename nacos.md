Nacos是国内主流的用于微服务的注册中心和配置中心。


^
可以jar启动，docker启动，k8s启动。
国内企业常用，hw中常见，且利用难度低。
nacos常见端口为：8848
nacos后台中心：http:/xxx:8848/nacos
Nacos 默认帐户名密码：nacos/nacos  test/test
默认kay：SecrtKey012345678901234567890123456789012345678901234567890123456789
利用工具：Nacos漏洞综合利用工具_v3.9Author:charonlight。探测漏洞，利用漏洞一键添加后台用户。
靶场：vluhub

最常用的版本2.x.x
常见漏洞版本
| Nacos <= 2.2.0 | JWT 默认密钥导致的 Nacos 身份认证绕过漏洞 |
| Nacos < 1.4.1 | Nacos 存在一个由于不当处理 User-Agent 导致的鉴权绕过漏洞 |


^
## **Nacos的数据库**
Nacos可以使用内置的Derby数据库，这是它默认的嵌入式数据库，适用于单机模式下的简单部署和测试环境。然而，对于生产环境，由于Derby数据库不支持高可用和并发性能较低，通常建议使用MySQL或其他更强大的数据库系统。
如果你选择不使用MySQL，而想继续使用Nacos的内置Derby数据库，你可以通过修改Nacos的配置文件来实现。在`application.properties`文件中，你可以屏蔽掉与MySQL相关的数据源配置，这样Nacos就会使用内置的Derby数据库。但是，需要注意的是，这样做可能会限制你查看和管理配置的能力，因为Derby数据库不如MySQL那样易于操作和维护。

在生产环境中，为了获得更好的性能和高可用性，建议使用MySQL作为Nacos的外部数据库。配置MySQL作为Nacos的数据源需要以下步骤：
1. 安装并配置好MySQL服务器。
2. 在MySQL中执行Nacos提供的SQL脚本来初始化数据库。
3. 修改Nacos的`application.properties`文件，添加MySQL数据源的配置信息，包括URL、用户名和密码。



