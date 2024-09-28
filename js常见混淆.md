## **逻辑混淆**
`!+[]` 的计算过程如下：
1. `[]` 被转换为数值 `0`。
2. `+[]` 因此是 `0`。
3. `!0` 转换为 `true`。
```
!+[]
true

!+[]+!+[]
2

[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]
'22'

![]
false

!+[]
true

false+[]
'false'

!+[]+[]
'true'

(!+[]+[])[!+[]+!+[]]
'u'
```

^
## **无用混淆**
一些无用的代码，实际没有意义。

## **eval混淆**
eval()函数中可以将字符串作为表达式或代码执行。
开发者可能使用eval()函数对一些关键的JS代码做混淆加密。
一键混淆JS代码网站：<https://tools.jb51.net/password/evalencode>
```
eval("5+1")
eval("debugger")
```
1、网站可能会对eval本身或内容字符串做混淆。
```
如：windows["e"+"v"+"a"+"l"]("1+4")
```

2、对于内容字符串混淆：
不管做的多复杂-包裹的就是一个生成js代码字符串的混淆代码。
我们把他里面的拿下来-用()包裹即可直接看到生成的js原代码。

对于一键混淆JS代码网站：<https://tools.jb51.net/password/evalencode>
的案例，混淆格式如eval(func(){---}())，其中(func(){---})()就可以还原原代码。
```
原代码
var showmsg="粘贴要加密/解密的javascript代码到这里";if(1==1){  alert(showmsg);}

混淆后
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 4="粘贴要加密/解密的3代码到这里";2(0==0){  1(4);}',62,6,'1|alert|if|javascript|showmsg|var'.split('|'),0,{}))

去除eva()，里面的代码运行后会生成原代码，里面需要位置加()
(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p})('5 4="粘贴要加密/解密的3代码到这里";2(0==0){  1(4);}',62,6,'1|alert|if|javascript|showmsg|var'.split('|'),0,{})
```



