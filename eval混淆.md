eval()函数中可以将字符串作为表达式或代码执行。
开发者可能使用eval()函数对一些关键的JS代码做混淆加密。
一键混淆JS网站：<https://tools.jb51.net/password/evalencode>
```
eval("5+1")
eval("debugger")

网站可能会对eval本身或内容字符串做混淆。
如：windows["e"+"v"+"a"+"l"]("1+4")

对于内容字符串混淆：
不管做的多复杂-包裹的就是一个生成js代码字符串的混淆代码。
我们把他里面的拿下来-用()包裹即可。
```



