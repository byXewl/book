spingMVC：在servelt上封装了接收请求和响应，增加AOP切面实现的拦截器，全局异常处理。
^
spring：即spring framework，提供了对象的控制反转（IOC），对象的依赖注入（DI），AOP 切面实现的日志，事务管理。
^
springboot：整合了spring和springMCV。常见2.x，最新3.x版本。
^
springTask：定时任务。
^
springSecurity：基于javaweb过滤器filter的安全框架，提供身份认证、授权、加密和会话管理等功能。


Shiro：基于javaweb过滤器filter的安全框架，比springSecurity轻量。

在Java Web应用中，`/auth/`后缀的API通常用于处理与认证（Authentication）和授权（Authorization）相关的功能。这种命名约定并不特定于任何框架，但它是一种常见的实践，用于表示该API端点与用户的安全和访问控制有关。
```
以下是`/auth/`后缀可能涉及的一些常见场景：
1. **用户登录**：一个常见的用途是用户登录，其中API可能设计为接受用户名和密码，然后返回一个认证令牌（如JWT - JSON Web Token）。
2. **用户注册**：提供用户注册的功能，允许新用户创建账户。
3. **令牌验证**：验证已登录用户的身份，通常通过传递访问令牌来完成。
4. **权限检查**：检查用户是否有权执行特定的操作或访问特定的资源。
5. **密码重置**：允许用户在忘记密码时重置密码。
6. **用户信息更新**：允许认证用户更新其个人资料信息。
```



^
Spring Cloud: 基于springboot用于构建分布式系统和微服务的一系列项目，包括服务注册与发现、配置管理、负载均衡等。

^
Struts2: 负责处理用户请求、调度控制器和视图，url后缀常以.do，.action结尾。
^
jpa
Hibernate
mybatis
mybatis-plus
都是封装了jdbc，实现对象关系映射（ORM）


^
ssh：Struts2 + Spring + Hibernate
ssm：Spring + Spring MVC + MyBatis

^
依赖包管理:
maven
gradle



