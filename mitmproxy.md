mitmproxy可以在中间层用python代码处理http请求的数据包。

案例：
yakit重发明文请求代理到mitmproxy的服务端口6666，mitmproxy通过指定的python通用模板对请求体全加密。并对响应体全解密。

mitmproxy服务启动，可以使用web版也可以命令行版。

```
mitmdump.exe -p 6666 -s totalRpc.py --mode upstream:http://127.0.0.1:8083  --ssl-insecure
若安装了mitmproxy证书，可不使用--ssl-insecure
```

> 安装证书：在连接mitmproxy之后，手机或设备需要设置代理，输入[http://mitm.it/安装证书](http://mitm.it/%E5%AE%89%E8%A3%85%E8%AF%81%E4%B9%A6)

totalRpc.py

```
import json
import requests
import mitmproxy
from mitmproxy import http, ctx
from mitmproxy import flowfilter

info = ctx.log.info


# 工具方法
def is_valid_json(text):
    try:
        json.loads(text)
        return True
    except json.JSONDecodeError:
        return False


# sign
def rpcSign(param):
    return getRpc(param, 'sign')


# 加密方法
def rpcEncode(param):
    return getRpc(param, 'encode')


# 解密方法
def rpcDecode(param):
    return getRpc(param, 'decode')


# 获取RPC调用方法
def getRpc(param, method):
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    data = {
        'action': method,
        'group': 'zzz',
        'param': param
    }
    resJson = requests.post('http://127.0.0.1:12080/go', headers=headers, data=data).json()
    return resJson["data"]


# 处理Param模式
def changeRequestParam(reqObj):
    reqObj.query.set_all("要修改的key", ["要修改的任意类型,又可以改为encode(xxx)"])
    info(reqObj.query)


# 处理Form模式
def changeRequestForm(reqObj):
    reqObj.urlencoded_form["要修改的key"] = "要修改的任意类型,又可以改为encode(xxx)"
    info(reqObj.urlencoded_form)


# 处理JSON模式
def changeRequestJson(reqObj):
    if reqObj.headers["Content-Type"].find("application/json") != -1:
        if len(str(reqObj.content)) != 0:
            if is_valid_json(reqObj.content):
                # 说明传入的是JSON
                jsonObj = json.loads(reqObj.content)
                jsonObj["要修改的key"] = "要修改的任意类型,又可以改为encode(xxx)"
                reqObj.content = json.dumps(jsonObj).encode('utf-8')
                info(reqObj.content)


# 处理整个请求体都为加密时
def changeRquestBody(reqObj):
    info("'=======Request修改前:" + str(reqObj.content) + "======")
    reqObj.content = rpcEncode(reqObj.content).encode('utf-8')
    info("'=======Request修改后:" + str(reqObj.content) + "======")
    info(reqObj.content)


# 处理请求头加密时候
def changeRequestHeaders(reqObj):
    reqObj.headers["Sign1"] = "要修改的任意类型,又可以改为sign(xxx)"


# 响应全加密时候
def changeResponseBody(reqObj):
    info("'=======Response修改前:" + str(reqObj.content) + "======")
    reqObj.text = rpcDecode(reqObj.text)
    info("'=======Response修改后:" + str(reqObj.content) + "======")
    info(reqObj.text)


# 响应为json且部分加密的时候
def changeResponseJson(reqObj):
    if reqObj.headers["Content-Type"].find("application/json") != -1:
        if len(str(reqObj.content)) != 0:
            if is_valid_json(reqObj.content):
                jsonObj = json.loads(reqObj.content)
                jsonObj["要修改的key"] = "要修改的任意类型,又可以改为encode(xxx)"
                reqObj.content = json.dumps(jsonObj).encode('utf-8')
                info(reqObj.content)


# 请求处理最终控制器(只需要改这里启用)
def totalRequest(reqObj):
    changeRquestBody(reqObj)
    pass


# 响应处理最终控制器(只需要改这里启用)
def totalResponse(reqObj):
    changeResponseJson(reqObj)
    pass


class Hook:
    def __init__(self):
        pass

    # 处理request请求方式
    def request(self, flow: mitmproxy.http.HTTPFlow):
        request = flow.request
        totalRequest(request)

    # 处理response响应方式
    def response(self, flow: mitmproxy.http.HTTPFlow):
        response = flow.response
        totalResponse(response)


addons = [
    Hook()
]
```

