漏洞利用
XSS注入在线脚本危害：
通过脚本获取访问者信息，访问者的cookie，操作用户客户端等操作。
<script>alert(document.cookie)</script>

1. kali中的beef (apt search beef-xss)
    开启监控，生成一个xxx.com:3000/hook.js在线脚本
    在网站中引入此JS
    进入xss后台管理平台
2. BLUE-LOTUS
    用网站搭建一个蓝恋花xss后台管理平台
3. 其他XSS测试平台