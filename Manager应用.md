**使用Tomcat的Manager Web程序管理**
默认访问localhost:8080/manager/html，需要添加角色用户名和密码用于身份验证：

1. 打开Tomcat的conf/tomcat-users.xml
2. 在`tomcat-users.xml`文件中，你需要定义一个用户并为其分配`manager-gui`角色（用于访问Manager应用程序的Web界面）或其他相关的角色。在`<tomcat-users>`元素内添加如下：

```xml
  <role rolename="manager-gui"/>
  <user username="admin" password="admin" roles="manager-gui"/>
```
3. 重启访问，输入账号密码身份验证。

注意事项：
- 确保你使用正确的角色。在上面的示例中，使用了`manager-gui`角色，但还有其他角色，如`manager-script`用于访问Manager应用程序的文本界面。根据你的需求，选择适当的角色。
- 在生产环境中，请确保设置强密码，并不要在生产环境中使用默认或弱密码。
- 请注意保护`tomcat-users.xml`文件的访问权限，以防止未经授权的访问。

以上步骤应该让你能够成功访问Tomcat的Manager应用程序并使用用户名和密码进行身份验证。