jeecg-boot是一个基于SpringBoot的低代码开发平台CMS，号称最具影响力。



特征：
/system/
/sys/
/jeecg-boot/
/jeecg-boot/sys/
/jeecg-boot/sys/common/upload

演示站细看：<http://boot3.jeecg.com/login>

JEECG的默认登录账号密码如下：
1. [账号：admin，密码：123456](http://idoc.jeecg.com/1275933)[1](http://idoc.jeecg.com/1275933)[2](https://www.cnblogs.com/CHENJIAO120/p/7079300.html)
2. [账号1：jeecg，密码1：jeecg#123456；账号2：qinfeng，密码2：jeecg#123456](http://jeecg.com/doc/demo)[3](http://jeecg.com/doc/demo)
3. [在jeecg-cloud-nacos中，nacos鉴权的默认用户名密码为nacosnacos](https://segmentfault.com/a/1190000045065819)[4](https://segmentfault.com/a/1190000045065819)
4. [在在线接口文档swagger中，登录名为jeecg，密码为jeecg1314](http://doc.jeecg.com/2043926)[5](http://doc.jeecg.com/2043926)

^
## **存在多个历史漏洞**
工具：<https://github.com/R4gd0ll/I-Wanna-Get-All>
<https://my.oschina.net/jeecg/blog/10150942>
<https://xz.aliyun.com/t/15138?time__1311=GqjxuQD%3DeYqeqGNDQi5BKKdgzwxAKGC%2BCeD>

接口文档泄露：
/jeecg-boot/v2/api-docs

账号创建漏洞：
/jeecg-boot/server/sys/user/addy

任意文件上传，可以传webshell：
/jeecg-boot/commonController.do?parserXml

SQL注入：
1）/sys/duplicate/check
2）/sys/ng-alain/getDictItemsByTable/
3）/sys/diet/query/TableData
4）/jmreport/qurestSql

RCE：
/jeecg-boot/jmreport/queryFieldBySql
/jeecg-boot/jmreport/loadTableData
/jeecg-boot/jmreport/testConnection
/jeecg-boot/api/../jeecgFormDemoController

如：/jeecg-boot/jmreport/loadTableData命令执行：
<https://blog.csdn.net/qq_36334672/article/details/136025263>
设置token(可选)和请求体，响应包里有命令执行结果。


^
jdbc


^
工具：<https://mp.weixin.qq.com/s/loTo06eNhyUIxUIPGJQuzg>