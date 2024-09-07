文档：<https://docs.xray.cool/#/scenario/rad>
rad是一个高速爬虫，可以指定txt中域名，自动批量打开谷歌浏览器进行爬虫。
安装：<https://github.com/chaitin/rad/releases/latest>

## **联合使用**
```
host="edu.cn"&& is_domain=true &&Country="cN"&& status_code=200
//导出为url.txt

xray.exe webscan --listen 127.0.0.1:7777 --html-output 618.html
//xray被动扫描监听7777端口

rad_windows_amd64.exe --url-file url.txt -http-proxy 127.0.0.1:7777 -wait-login
//rad 爬虫通过代理7777端口，打开谷歌浏览器请求url.txt中的url。
```
