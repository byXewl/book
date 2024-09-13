druid是一个数据库连接池。
/druid/index.html可访问

常见登录名admin，进行爆破密码。

```
admin druid ruoyi
123456 admin druid
```

进入后台可以查看session，sql语句等。

^
## **session泄露**
http://127.0.0.1/druid/websession.html
这里泄露的主要是登录用户的session，不管是登陆成功的，没登陆成功的，还是失效的都会储存在这里。
进行替换碰撞找到高权限的session，<https://mp.weixin.qq.com/s/aL7LkinUoHgKl0KO0SrQZw>