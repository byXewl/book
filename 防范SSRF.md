网站及服务端要从其他服务器应用获取数据的功能，对目标地址做过滤与限制。
url白名单。

注意发起请求的函数：
```
php函数
file_get_contens(); //可使用file http 不支持dict gopher
curl_exec(); //支持众多协议如dict,gopher
```
```
java函数

```