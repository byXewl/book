中间件使用的tomcat，那么数据库连接密码一般都是明文保存在配置文件中的，但很多政府单位或大中型企业用weblogic居多，而生产环境部署的weblogic默认会对数据库连接字符串进行加密，还会对console控制台的登录账号和密码进行加密。
^
访问ip:7001/console为登录后台
console账号和加密的密码配置文件：
/root/Oracle/Middleware/user_projects/domains/base_domain/config/config.xml
加密的密钥文件：
/root/Oracle/Middleware/user_projects/domains/base_domain/security/SerializedSystemIni.dat
是二进制文件
使用工具上传dat和密文进行解密。


^
weblogic在11gR1前的加密中使用的是3DES，而在WebLogic 11gR1的版本及之后中就开始使用AES进行加密
```
WebLogic Server 12cR2（12.2.1.4）-2019年9月27日 
WebLogic Server 12cR2（12.2.1.3）-2017年8月30日 
WebLogic Server 12cR2（12.2.1.2）-2016年10月19日 
WebLogic Server 12cR2（12.2.1.1）-2016年6月21日 
WebLogic Server 12cR2（12.2.1.0）-2015年10月23日 
WebLogic Server 12cR1（12.1.3）-2014年6月26日 
WebLogic Server 12cR1（12.1.2）-2013年7月11日 
WebLogic Server 12cR1（12.1.1）-2011年12月1日 
WebLogic Server 11gR1 PS5 (10.3.6) - 2012年2月23日 
WebLogic Server 11gR1 PS4 (10.3.5) - 2011年5月6日 
WebLogic Server 11gR1 PS3 (10.3.4) - 2011年1月15日 
WebLogic Server 11gR1 PS2 (10.3.3) - 2010年四月 
WebLogic Server 11gR1 PS1 (10.3.2) - 2009年11月

WebLogic Server 11g (10.3.1) - 2009年7月
WebLogic Server 10.3 - 2008年8月 
WebLogic Server 10.0 - 2007年3月 
WebLogic Server 9.2.4 - 2010年7月22日 
WebLogic Server 9.1 WebLogic Server 9.0 - 【Diablo】2006年11月 
```
解密：<https://www.freebuf.com/articles/web/220147.html>
