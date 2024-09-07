全球第一的免费Web防火墙软件。
部署在中间代理实现waf，https需配置证书私钥即可。
docker安装雷池运行，管理平台在9443端口。
如：nginx改为监听81，雷池添加一个waf站点监听80，再配置http:80代理到81。
能检测哥斯拉流量，冰蝎不行。

官方：<https://waf-ce.chaitin.cn/docs/guide/install>
安装：<https://zhuanlan.zhihu.com/p/676260323>

