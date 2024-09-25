## **权限绕过，未授权访问**
Shiro权限绕过之Shiro-682&CVE-2020-13933

利用条件：Shiro版本小于1.5.2。
成因：Spring与Shiro对于"/"和";"处理差异导致绕过。
<https://blog.csdn.net/weixin_43263451/article/details/126218008>

^
## **Shiro配置漏洞：可能存在未授权访问**
```
# 如一个叫tumo的程序
tumo.shiro.session_timeout=3600
tumo.shiro.cookie_timeout=86400
# 无需认证路径，这里可能存在未授权访问
tumo.shiro.anon_url=\
/login,/logout,/register,\
/,/about,/p/**,/links,/comment/**,/link/list,/article/list,\
/css/**,/js/**,/img/**

tumo.shiro.login_url=/login
tumo.shiro.success_url=/system
tumo.shiro.logout_url=/logout
tumo.shiro.cipher_key=tycoding
```


^
## **加密key硬编码**
key泄露后可以被反序列化漏洞利用。
```
cookieRememberMeManager.setCipherKey(Base64.decode("4AvVhmFLUseKTA3Kprsdag=="));
```