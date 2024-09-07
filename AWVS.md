AWVS（Acunetix）：基于算法规则扫描，提供了API接口，很多扫描器调的AWVS的接口套壳。
利用爬虫进行探测，主动扫描扫web的top10漏洞。


## **安装：**
docker安装（不是破解版？）：
```
1. pull 拉取下载镜像
docker pull secfa/docker-awvs

2. 将Docker的3443端口映射到物理机的 13443端口
docker run -it -d -p 13443:3443 secfa/docker-awvs

3. 容器的相关信息
awvs13 username: admin@admin.com
awvs13 password: Admin123
AWVS版本：13.0.200217097
```

破解版安装：
windows安装14.1.2破解版:<https://blog.csdn.net/anlr2020/article/details/118484169>

## **访问：**
点击Acunetix图标
localhost:3443
登录：@qq.com  123@

## **AWVS使用：**
1. 添加目标，测试目标：<http://testphp.vulnweb.com/>
    add a target
    输入网址，单站点：端口站点，子域名站点。

2. 设置扫描速度
    普通网站：适度
    内网：快速

3. 登录网站（可选，有的页面需要登录才能访问才能扫描到）
    手动添加登录密码
    或
    点NEW BLR纪录你登录网站步骤

4. 添加网站的源代码（如果有可选）
    AcuSensor

5. 配置扫描源的UA(可选)

6. 开启功能
    配置选择要扫描的漏洞（默认全部）
    配置是否定时扫描
    一般请求两万次结束，可中途暂停结束。

## **AWVS扫描结果：**
高危中危低危漏洞
网站目录树