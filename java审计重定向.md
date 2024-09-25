## **url恶意重定向**
1、场景
```
请求转发是将url加载主域名后面，并且內部无感转发，基本不可控。
dispatcher.forward(request, response);


重定向就可以自定义。
有重定向的输入口，一般也有反射型xss。
```

2、浏览器解析URL的格式
```
scheme://userinfo@host:port/path?query#fragment

Scheme:协议
userinfo: 认证信息
Host: 实际访问的域名
Path：访问路径
?参数和锚链接
```

 

如下面网址，实际访问的是www.eval.com
http://www.baidu.com.com[@www.eval.com/tou

在业务场景中，在实际浏览器解析访问时中反斜线 \ 会被纠正为正斜线 /。也就是说类似
www.baidu.com\asd 浏览器会自动纠正为：www.baidu.com/asd 

^
3、常见代码函数
```
springmvc的重定向：
redirect
重定向
url = "redirect:" + url;
return new ModelAndView(url)


servet的原生重定向：
sendRedirect()

setStatus(302)
```


## url常见跳转参数：
redirect
domain
link
to
target
targets
jump
jump_to
redirect_url

## nuclei中的绕过技巧：
http://xxx.xxx.xxx/%0a/baidu.com
http://xxx.xxx.xxx/%5C%5Cbaidu.com/%252e%252e%252f

## 其它url跳转绕过技巧：
http://xxx.xxx.xxx/redirect.php?url=/www.baidu.com
http://xxx.xxx.xxx/redirect.php?url=//www.baidu.com
http://xxx.xxx.xxx/redirect.php?url=///www.baidu.com
http://xxx.xxx.xxx/redirect.php?url=http://www.baidu.com
http://xxx.xxx.xxx/redirect.php?url=http://www.baidu.com\www.evil.com
http://xxx.xxx.xxx/redirect.php?url=http://www.baidu.com
http://xxx.xxx.xxx/redirect.php?url=.evil.com(可能会跳到evil.com)
http://xxx.xxx.xxx/redirect.php?url=.evil(可能会跳到www.evil.com.evil)
### 期望跳转到www.baidu.com
http://www.test.com[@www.baidu.com/tou

可绕过众多防御
http://@www.realsee.com[@www.baidu.com/tou

http://baidu.com\test.com

## 绕过URL跳转
https://www.cnblogs.com/-meditation-/articles/16243218.html

## java代码审计漏洞-URL跳转
https://www.cnblogs.com/-meditation-/articles/16243853.html


