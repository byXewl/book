mitmproxy可以在中间层用python代码处理http请求响应的数据包。
简单教程：
<https://cloud.tencent.com/developer/article/1823288>

<https://blog.wolfogre.com/posts/usage-of-mitmproxy/#:~:text=%E6%9C%AC%E6%96%87%E6%98%AF%E4%B8%80%E4%B8%AA%E8%BE%83%E4%B8%BA%E5%AE%8C%E6%95%B4%E7%9A%84>

案例：
yakit重发明文请求代理到mitmproxy的服务端口6666，mitmproxy通过指定的python通用模板对请求体全加密。并对响应体全解密。

mitmproxy服务启动，可以使用web版也可以命令行版。

```
mitmdump.exe -p 6666 -s test.py   --ssl-insecure
若安装了mitmproxy证书，可不使用--ssl-insecure

mitmdump.exe -p 6666 -s test.py  --ssl-insecure
请求发起处->6666->请求包处理后->目标服务器->响应->6666->响应包处理后->发起处

mitmdump.exe -p 6666 -s test.py --mode upstream:http://127.0.0.1:8083  --ssl-insecure
设置一个上游服务器http://127.0.0.1:8083，配置后：
请求发起处->6666->请求包处理后->8083->目标服务器->响应->8083->6666->响应包处理后->发起处
在8083看到的是处理后的请求包和未处理的响应包。
在发起处看到的是自己的请求包和处理后的响应包。

此时如果8083配置上游代理6667，另一个mitmproxy 6667。则可以完全自由加解密。
请求发起处->6666->请求包处理后->8083->6667->请求包处理后->目标服务器->响应->6667->8083->6666->响应包处理后->发起处
```

> 安装证书：在连接mitmproxy之后，手机或设备需要设置mitm代理端口，输入http://mitm.it/ 安装证书

test.py
```
import json
import requests
import mitmproxy
from mitmproxy import http, ctx
from mitmproxy import flowfilter


class Hook:
    def __init__(self):
        pass

    # 处理request请求
    def request(self, flow: mitmproxy.http.HTTPFlow):
        request = flow.request
        request.headers["Sign1"]="111"

    # 处理response响应
    def response(self, flow: mitmproxy.http.HTTPFlow):
        response = flow.response
        response.headers["Sign2"] = "222"
        response.text = "你看嘛"

addons = [
    Hook()
]
```

