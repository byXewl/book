小型免费
HFish包括管理端和节点端（管理端本身也可以作为一个节点端），管理端用来生成和管理节点端，并接收、分析和展示节点端回传的数据，节点端接受管理端的控制并负责构建蜜罐服务。


蜜罐介绍：<https://www.freebuf.com/defense/376919.html>


安装使用：<https://developer.aliyun.com/article/1001666>
<https://lusensec.gitee.io/2024/02/19/Honeypot-Defense-Hfish/index.html>
https://www.cnblogs.com/ph4nt0mer/p/16538600.html\
<https://www.bilibili.com/read/mobile?id=27304081>



docker安装：<https://hfish.net/#/2-1-docker>

防火墙打开4433、4434这两个端口
```
firewall-cmd --add-port=4433/tcp --permanent   #（用于web界面启动）
firewall-cmd --add-port=4434/tcp --permanent   #（用于节点与管理端通信）
firewall-cmd --reload
```
管理后台
```
登陆地址：https://[server]:4433/web/
初始用户名：admin
初始密码：HFish2021
```
配置数据库。也可登录时配置，之后自动重启生效。
[在/usr/share/hfish/config.toml](https://hfish.net/#/2-1-docker?id=%e5%9c%a8usrsharehfishconfigtoml%e4%b8%8b%e9%9d%a2%e4%bf%ae%e6%94%b9%e9%85%8d%e7%bd%ae)


可以api对接微步情报中心或对接态势感知。


对结点配置蜜罐(不同服务端口)或蜜饵。
上钩示例：<https://blog.csdn.net/weixin_46789316/article/details/114885270#:~:text=%E8%B4%A6%E6%88%B7%E5%AF%86%E7%A0%81%E9%BB%98%E8%AE%A4%E9%83%BD%E6%98%AF%20admin%EF%BC%88%E5%8F%AF%E8%BF%9B%E5%85%A5%E5%AE%B9%E5%99%A8%E4%BD%BF%E7%94%A8,vi%20HFish%2Fconfig.ini%20%E5%91%BD%E4%BB%A4%E4%BF%AE%E6%94%B9%E9%BB%98%E8%AE%A4%E5%AF%86%E7%A0%81%EF%BC%89%EF%BC%8C%E6%88%90%E5%8A%9F%E8%BF%9B%E5%85%A5%E5%B9%B3%E5%8F%B0%EF%BC%8C%E6%94%BB%E5%87%BB%E6%95%B0%E6%8D%AE%E6%9A%82%E6%97%B6%E9%83%BD%E8%BF%98%E4%B8%BA%E7%A9%BA%E5%80%BC%EF%BC%9A>

