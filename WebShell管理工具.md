<https://blog.csdn.net/weixin_54161921/article/details/118579926>

![](.topwrite/assets/image_1710852281067.png)
上传一句话木马（php asp等）后，找到文件上传的地址。
jsp需要特殊一点，需要配合java中间件漏洞，利用工具上传特殊代码jsp，或压缩一个webshell生成jsp成war，上传tomcat。或者利用漏洞工具上传内存吗等。

## **管理工具：**
1. 蚁剑
改造的菜刀。
设置的入口为eval($_POST["密码"];);，必须为eval的post。
使用中国蚁剑，右击加链接，连接密码(POST参数名)
getshell
双击进行文件管理
右击可选择终端界面
蚁剑可配置代理查看每次请求包

^
2. 菜刀
设置的入口为assert($_GET[]),assert($_POST[])。

^
3. 冰蝎
流量加密，难以被检测 webshell免杀性好 加密方式：AES加密

^
4. 哥斯拉
提供了生成后门，如生成1.jsp，然后自己改成1.war上传tomcat。
^
5. 天蝎

