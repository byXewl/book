```
服务器部署：
1.程序打包成war包：
可配置打包不带servlet-api.jar和jsp-api.jar包，tomcat自带。
maven打包：自动合理打包。
原生手动打包：构建web归档型工件，点击构建工件构建在out/目录中生成war包

2.放入tomcat的webapps/目录：
不用手动解压，启动tomcat会自动解压部署。

3.启动：
bin/startup.bat

4.用已有角色身份验证访问管理：
访问8080:/manager/html
管理和访问网站。

也可登录Manager后台上传部署war包
```
