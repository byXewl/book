## **判断网站是否有CDN:**
1. 多地Ping/超级Ping：发起不同地方的请求的ip不一致。
    <http://ping.china2.com>
    <http://tools.ipip.net/cdn.php>
2. nslookup命令：
    查询域名系统（DNS）记录
    ```
    nslookup baidu.com
    返回多个Addresses的ip，则有
    返回CDN商域名/ip，则有
    ```



## **获取真实IP地址：**

1. 超级Ping/国外偏远地区(挂代理)请求
    <http://ping.china2.com>
    <http://tools.ipip.net/cdn.php>
2. 找未加CDN的域名
    如：子域名未加CDN，www加CDN，但是原域名未加。
3. 网站有邮件服务，通过发送来的邮件查看IP
    右键查看邮件源码，可能能找到服务器源IP。
    原理：服务端调用stemp服务器发送邮件给客户端，邮件源码中有该服务端ip。
4. DNS历史记录网站，进行查询绑定过的IP
    <http://securitytrails.com>
    <http://viewdns.info>
     微步网站    
5. 寻找网站遗留文件，如php.info的sever_addr等
6. 寻找网站漏洞xss等获取ip
7. 在目标站点上发起请求，获取ip
    - 如：钉钉上发送链接会自动get请求，
              抖音发送链接消息会自动get请求网站图标
    - 生成可获取ip的url，如dnslog:
       <http://dnslog.cn>
        <http://ceye.io>
        <http://admin.dnslog.link>
8.  用扫全网ip，获取ip
    funckcdn
    zmap 要求带宽大
    w8fuckcdn
9. 以量打量，把CDN流量打完。
