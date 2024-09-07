已经有了webshell。
但MySQL没有开启外网连接。

^
- 通过web程序中部署php程序链接他的本地数据库。
- 使用phpmyadmin登录mysql。
- 使用navicat自带php程序中转连接。
- 上传这个php程序到目标站点，登录内网mysql和一键UDF提权：<https://github.com/echohun/tools/blob/master/%E5%A4%A7%E9%A9%AC/udf.php>
- 传正向木马，开代理，主动连接