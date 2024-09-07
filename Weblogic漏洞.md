大型网站用Weblogic部署的多，护网多，7001端口。
要求服务器资源大。
浏览器插件可能识别Weblogic为tomcat。
^
Weblogic常见漏洞：
Weblogic的口令爆破
Weblogic后台部署war包getshell
Weblogic CVE 反序列化漏洞：<https://cloud.tencent.com/developer/article/1427720>

^
Weblogic版本号
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

^
访问ip:7001有特征页面：
Error 404-Not Found
From RFC 2068 *Hypertext Transfer Protocol -- HTTP/1.1*:

访问ip:7001/console为登录后台
账号密码配置文件：
/Oracle/Middleware/user_projects/domains/base_domain/config/config.xml