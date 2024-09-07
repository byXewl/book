json web token
jwt如：
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.
eyJuYW1lIjoi5bCP5piOIiwiaWQiOjEsImV4cCI6MTcwMzYwMzAxMywiaWF0IjoxNzAyOTk4MjEzLCJhdXRob3JpdGllcyI6W119.
McX2dyX5yW0S6lUsDC4s4qQpKHW072bmoS3fRSaUn9I
```
好处：jwt可以用于分布式系统，cs系统。
只要jwt时间没有过期，服务端代码没有变，服务端重启也还生效。
## **jwt组成**
在线解密和生成：
<https://jwt.io/#debugger-io>
<https://tooltt.com/jwt-decode/>

生成的jwt，由三部分组成，用.区分：
首部（头部）：用的什么加密算法，一般HMAC256（HS256）。
中部（载体）：加入的用户信息，jwt生成时间，jwt过期时间。
尾部：前面部分->密钥+加密算法->签名后的值。

^
首部可以base64解码查看用的什么加密算法
中部可以base64解码查看用户信息，jwt过期时间等


^
## **jwt会话**
jwt一般后端通过json响应体或setcookie给前端
前端通过请求头携带Authorization: Bearer xxx.xxx.xxx
"Bearer" 表示使用 Bearer 身份验证方案

或token请求头字段

这样跨域时不自动携带cookie也没关系
```
请求头：
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c



前端：
axios.get('https://example.com/api/some-resource', {
  headers: {
    'Authorization': `Bearer ${jwtToken：从本地localstorage取等}`
  }
})
  .then(response => {
    // 处理响应
  })
  .catch(error => {
    // 处理错误
  });
```
具体：
登录接口登录成功后，后端返回json中有jwt，前端保存jwt到本地存储，之后每次请求携带上。

## **jwt失效**
1. 时间过期失效。
2. 加入黑名单主动失效。
3. 数据库实时验证： 将令牌和用户信息关联存储在数据库中，当用户登出时，删除相应的 Token 记录。验证时，检查数据库中是否存在对应的 Token 记录。





点击退出登录加入redis黑名单：
将 JWT的标识ID如UUID 存储在 Redis 中作为黑名单是一种常见的方式来实现用户退出登录后使 JWT 失效。这通常被称为 JWT 的黑名单机制。

实现方式如下：
1. **用户退出登录时：** 当用户主动退出登录或者进行注销操作时，将相应的 JWT的UUID 加入 Redis 黑名单。可以使用 Redis 的 Set 数据结构，将 JWT 的唯一标识存储UUID在 Set 中。
2. **验证 JWT 是否有效：** 在接收到请求时，首先解析JWT检查 JWT 的UUID是否在 Redis 黑名单中。如果 JWT的UUID 存在于黑名单，说明用户已经退出登录，此时应拒绝该 JWT 的访问。
3. **JWT 过期处理：** JWT 本身包含了过期时间信息，因此在验证 JWT 有效性时，也需要检查 JWT 是否已经过期。即使 JWT 不在黑名单中，如果已经过期，也应该拒绝其访问。

^
## **伪造jwt越权**
jwt的数据载体可能会有表示这个用户是否为管理员，如"admin":"flase"。
如果知道jwt的加密算法模式和密钥(爆破出，泄露出)，或者错误使用了空算法模式（无需密钥，"alg":"none"）。

无需密钥，如：
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi5bCP5piOMyIsImlkIjoyLCJleHAiOjE3MDM2MDMwMTMsImlhdCI6MTcwMjk5ODIxMywiYXV0aG9yaXRpZXMiOlsxXX0.GcIsfpEB3dv62Yt88yjYBeHhzHKAgNcfVzR5Fso6kjw
```
就可以修改"admin":"true"，再使用算法重新签名。
实现越权。

在线生成：<https://jwt.io/#debugger-io>
参考：<http://cnblogs.com/vege/p/14468030.html>

^
## **PS256算法的jwt可以伪造**
<https://blog.csdn.net/weixin_53090346/article/details/134277438>
<https://www.cnblogs.com/S1gMa/p/16846438.html>


^
## **RS256加密的jwt**
RS256加密的jwt是私钥加密，前端公钥解密。
JWT的签名加密算法有两种，对称加密算法和非对称加密算法。
对称加密算法比如HS256，加解密使用同一个密钥，保存在后端。
非对称加密算法比如RS256，后端加密使用私钥，前端解密使用公钥，公钥是我们可以获取到的。

如果我们修改header，将算法从RS256更改为HS256，后端代码会使用RS256的公钥作为HS256算法的密钥。于是我们就可以用RS256的公钥伪造数据
CTF题目：[http://demo.sjoerdlangkemper.nl/jwtdemo/rs256.php](https://links.jianshu.com/go?to=http%3A%2F%2Fdemo.sjoerdlangkemper.nl%2Fjwtdemo%2Frs256.php)





^
## **jwt逻辑漏洞**
生成jwt的密钥简单，如123456，如用用户名做密钥。
jwt没有主动失效，只有靠时间失效，容易被盗取。

^
## **更多学习和工具**
<https://www.jianshu.com/p/2488567c4a18>


^
## **破解jwt**
\#访问靶场，获取token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDIwMjQ3ODEsImxldmVsIjoidXNlciI
sInVzZXIiOiJqYXNwZXIifQ.zzr9KoJFdElwSGjcs3zs6Zgv0Lp\_eA4Secn8sUEVgIA

\#使用c-jwt-cracker-master 破解，获得key：hello
apt-get install libssl-dev

make
./jwtcrack
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDIwMjQ3ODEsImxldmVsIjoidXNlciI
sInVzZXIiOiJqYXNwZXIifQ.zzr9KoJzs6Zgv0Lp\_eA4Secn8sUEVgIA

\#使用https\://jwt.io/，进行加密

