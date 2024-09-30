mitmproxy可以在中间层用python代码处理http请求的数据包。
简单教程：
<https://blog.wolfogre.com/posts/usage-of-mitmproxy/#:~:text=%E6%9C%AC%E6%96%87%E6%98%AF%E4%B8%80%E4%B8%AA%E8%BE%83%E4%B8%BA%E5%AE%8C%E6%95%B4%E7%9A%84>

案例：
yakit重发明文请求代理到mitmproxy的服务端口6666，mitmproxy通过指定的python通用模板对请求体全加密。并对响应体全解密。

mitmproxy服务启动，可以使用web版也可以命令行版。

```
mitmdump.exe -p 6666 -s test.py   --ssl-insecure
若安装了mitmproxy证书，可不使用--ssl-insecure
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

