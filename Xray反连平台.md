官方文档：<https://docs.xray.cool/#/configration/reverse>
反连平台就是一个公网服务器端，配合反连平台才可以检测出来的漏洞包括但不限于：
* ssrf
* fastjson
* s2-052
* xxe 盲打
* 所有依赖反连平台的 poc


## **搭建和使用**
安装个linux版xray(<https://download.xray.cool/xray/1.9.6>)在公网服务端，配置文件，监听端口。
>解压安装包，执行 ./xray_linux_386 --config config.yaml会生成配置文件。

然后访问:端口/cland
><http://47.109.58.205:8087/cland/>
   密码12902243

电脑安装windows端的xray，配置公网服务端ip，即可开始有反连的扫描漏洞。
更多：<https://blog.csdn.net/xiaofengdada/article/details/122375019>
配置：<https://zhuanlan.zhihu.com/p/599070224>