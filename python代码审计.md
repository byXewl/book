## **url中的unicode漏洞**
```
℆这个字符在经过
for h in host.split('.'):
      newhost.append(h.encode('idna').decode('utf-8'))
处理后变成c/u

以及ℂ变成c等
```

于是传入url=file://suctf.cc/etc/passwd
可以变成传入url=file://suℂtf.cc/etc/passwd绕过过滤，最终又变回来
>非预期这个也可绕过：url=file:////suctf.cc/etc/passwd
```
@app.route('/getUrl', methods=['GET', 'POST'])
def getUrl():
    url = request.args.get("url")
    host = parse.urlparse(url).hostname
    if host == 'suctf.cc':
        return "我扌 your problem? 111"


    parts = list(urlsplit(url))
    host = parts[1]
    if host == 'suctf.cc':
        return "我扌 your problem? 222 " + host


    newhost = []
    for h in host.split('.'):
        newhost.append(h.encode('idna').decode('utf-8'))
    parts[1] = '.'.join(newhost)
    #去掉 url 中的空格
    finalUrl = urlunsplit(parts).split(' ')[0]
    host = parse.urlparse(finalUrl).hostname
    if host == 'suctf.cc':
        return urllib.request.urlopen(finalUrl).read()   #http读网站，file读本地文件
    else:
        return "我扌 your problem? 333"
```

^
## **字符绕过**
如果判断是：
if "scan" in self.action:
则action中含有scan字符即可通过。
一般是两种字符按顺序拼接一起可以绕过多个判断，如xx+readscan ，xxread+scan

^
## **请求参数**
flask：
param = urllib.unquote(request.args.get("param", ""))
获取param参数值，如果没有默认为第二个空。

^
## **读文件**
tmpfile = open("./%s" % self.sandbox, 'w')

^
get请求读远程网址中文件前50字节，可能造成ssrf：
urllib.urlopen(param).read()[:50]
使用urllib.urlopen(param) 包含文件，可以直接填写文件路径`./flag.txt`，也可以使用伪协议。

本地文件读取协议:
fie://
local-file://绝对路径 或 local-file://flag.txt
gopher://





