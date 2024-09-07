SwaggerAPI 未授权访问漏洞
会泄露增删改查接口
未授权访问
敏感信息泄露等
示例：
```
xxx.com:8080/swagger-ui.html
/swagger-resources
/v2/api-docs
/swagger/
/api/swagger/
/swagger/ui/
/api/swagger/ui/
/swagger-ui.html/
/api/swagger-ui.html/
/user/swagger-ui.html/
/swagger/ui/
/api/swagger/ui/
/libs/swaggerui/
/api/swaggerui/
/swagger-resources/configuration/ui/
/swagger-resources/configuration/security/
```
如何存在但是不让访问，响应码401，直接修改状态码401——>200，可能突破查看。
^
问题描述：http://www.baidu.com/link?url=ZPOuybhip1LrtwLloyKoYOEcUbjF0W-ZXIKy8sgqdrouKYorfmNcAj8qQ0eO-k7loUVDhCMKvCi8ZXR_uJtRj0yxmaivwyrB8M23EiqZUDG
edu fofa语法：
"Swagger" && title == "Swagger UI"
"swagger.json"

^
## **测试接口工具**
浏览器插件：swagger-ui
点击插件，输入网址，将纯json优化成api接口文档显示。


^
批量测试swagger-hack.py
<https://github.com/jayus0821/swagger-hack>
```
python swagger-hack2.0.py -u http://102.133.182.17/swagger/v1/swagger.json
```

^
knife4j自动生成分类接口文档的html
swagger-exp-knife4j.py
```
```
有时开发者已经有knife4j文档，访问/doc.html查看。



^
其他工具：
bp插件<https://github.com/API-Security/APIKit/releases/tag/v1.5.4>、

<https://github.com/lijiejie/swagger-exp>
^
## **漏洞说明**
接口api泄露需要测试危险接口，必须找到能利用的接口才算漏洞。

如：未授权删除（最后不要测），上传文件接口。/sys/接口(可能用了jeecgboot框架有历史漏洞)。
获取敏感信息接口。

接口测试可能需要session，session可以从小程序登录等地方获取。
