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

{"dbType":"4","dbDriver":"com.mysql.cj.jdbc.Driver","dbUrl":"jdbc:mysql://127.0.0.1:3306/jeecg-boot?characterEncoding=UTF-8&useUnicode=true&useSSL=false&tinyInt1isBit=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai","dbUsername":"11","dbPassword":"111"}
```


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

改密码，可以若密码
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

{"username":"1111","password":"123456","confirmpassword":"123456","orgId":"LIS20170328006643931"}
```