特征页面：
绿叶子favtion.icon
Whitelabel Error Page页面springboot



## **敏感信息泄露**
<http://github.com/LandGrey/SpringBootVulExploit>
Actuator 是 Spring Boot 提供的模块，用于监控和管理 Spring Boot 应用程序。它为开发人员和运维人员提供了一系列的生产就绪特性，包括对应用程序的健康状况、审计、度量、环境属性、日志和更多内容的监控和管理。
Spring Boot 自带 Actuator，并且在应用程序中添加 spring-boot-starter-actuator 依赖后，这些端点会自动启用。
生产环境还启用并且配置为暴露所有Actuator端点，就会信息泄露。
```
#配置暴露所有Actuator端点，导致未授权
management.endpoints.web.exposure.include=*

若依微服务版就是默认全部暴露
```
^
Actuator模块包括一组内置的端点，这些端点允许你通过 HTTP 或 JMX访问不同的管理和监控功能。一些常用的端点包括：
```
加后缀：
-path /api/actuator/heapdump   //敏感配置密钥文件泄露
-path /actuator/heapdump   //敏感配置密钥文件泄露
-path /actuator/env   //提供应用程序的环境属性。是未授权接口，可能泄露秘密。
         /actuator/httptrace  //类似日志访问信息。
-path /actuator     //目录，各种接口地址。
-path /actuator/loggers  //允许动态更改应用程序的日志级别。回收日志
    /actuator/health: 提供应用程序的健康状况。
    /actuator/metrics: 提供应用程序的度量信息，例如内存使用、线程池状态等。
```

## **防御**
1. actuator端点可以看到项目的一些敏感信息，但是nacos又需要调用无法直接从底层关闭，我们可以在外层nginx反向代理进行处理

2. nginx针对网关进行反向代理并加入如下配置，返回码选择 403、404、444均可

   ```
   if ($request_uri ~ "/actuator") {
       return 403;
   }
   ```



## **springboot扫描和利用**
springboot扫描目录漏洞，heapdump等泄露扫描工具：
曾哥的SpringBoot-Scan：<https://github.com/AabyssZG/SpringBoot-Scan>

^
## **heapdump文件泄露**
heapdump文件泄露：/api/actuator/heapdump
heapdump文件泄露，文件中可获取密钥等信息。
参考：<https://blog.csdn.net/JHIII/article/details/126601858>
扫到后下载heapdump文件，使用heapdump_tool.jar工具进行解密。
选择1载入更好，然后搜索下面关键词获取对应敏感信息数据。
```
shirokey
accesskey  可能泄露oss或云主机管理台
passw 密码
user 用户
name 用户
code 代码
vertify 验证码
vertification  验证码接口
phone 手机号
login 登录框
register 注册地址
database 数据库
root 用户
123456 密码
```
## **heapdump里面密码泄露利用**
```
泄露的账号密码可以尝试撞库，
如：
登录xxljob.xxx.com平台。
XXL-JOB适用于各种需要定时任务调度的场景，如数据同步、批量处理、定时通知等。它通过提供简单易用的API和可视化的管理界面，使得任务调度变得简单而高效。
借助XXL-JOB计划任务可以反弹shell

登录nacos平台。
微服务注册中心。
```


^
## **Eureka_xstream_RCE**
springcloud/springboot站点开启了Actuator，且使用了 eureka-client。
>eureka-client 是 Spring Cloud 中的一个组件，用于实现微服务架构中的服务注册与发现。它是 Netflix Eureka 服务注册中心的 Java 客户端，与 Eureka 服务端一起构成了服务注册与发现的体系。
>一般不是nacos就是eureka

可以 POST 请求目标网站的/actuator/env接口设置属性
可以 POST 请求目标网站的/actuator/refresh 接口刷新配置(存在 spring-boot-starter-actuator 依赖)
目标使用的 eureka-client <1.8.7(通常包含在 spring-cloud-starter-netflix-eureka-client 依赖中)
目标可以请求攻击者的 服务器 (请求可出外网)
<https://blog.csdn.net/qq_18980147/article/details/128041932>




^
## **网关刷新加命令执行**
/actuator/gateway/可访问，
/actuator/gateway/refresh可刷新，
则可以加过滤器路由，内容SpEL表达式代码实现命令执行。
<https://blog.csdn.net/weixin_46301214/article/details/134556269>
