<https://mp.weixin.qq.com/s/LDPwjUXagvvJfLOkq51n0g>
通过jsRPC免去抠代码。适用于金融项目、请求和响应体全加密的场景。
针对请求接口加密/响应需要解密的情况，在使用Burp测试时无法对数据进行操作，需要确认传输都为明文我们才可以进行常规测试。这块有点JS基础和Python基础基本都可以通杀。

原理：往浏览器里弄个ws的客户端，然后接受服务器的指令，去调用已经加载好的js方法。
往浏览器注册一个ws客户端代码，可以通过运行定义的代码段，也可以通过某些油猴脚本，还可以在浏览器开启的时候就先在控制台注入环境，不要在调试断点时候注入。





# **使用**
## **1、分析JS中加密解密**
如果加密解密函数的调用：my1("123456"); my2("#fahkbf");
控制台代理加密函数到window对象变全局：window.encode=my1
控制台代理解密函数到window对象变全局：window.decode=my2
也可以替换JS文件，在JS代码中代理。

## **2、启动本地RPC服务端**
jsRPC服务端和使用案例：<https://github.com/jxhczhl/JsRpc?tab=readme-ov-file>

 .\window_amd64.exe
默认监听本地的12080端口。

## **3、浏览器中创建RPC客户端，将关键函数注入其中**
F12-源代码-片段：里面是RPC客户端的代码。
<https://github.com/jxhczhl/JsRpc/blob/main/resouces/JsEnv_Dev.js>
```
let Hlclient =function(wsURL) {
    this.wsURL = wsURL;
    this.handlers = {
        _execjs: function (resolve, param) {
            var res = eval(param)
            if (!res) {
                resolve("没有返回值")
            } else {
                resolve(res)
            }

        }
    };
    this.socket = undefined;
    if (!wsURL) {
        throw new Error('wsURL can not be empty!!')
    }
    this.connect()
}

Hlclient.prototype.connect = function () {
    console.log('begin of connect to wsURL: ' + this.wsURL);
    var _this = this;
    try {
        this.socket = new WebSocket(this.wsURL);
        this.socket.onmessage = function (e) {
            _this.handlerRequest(e.data)
        }
    } catch (e) {
        console.log("connection failed,reconnect after 10s");
        setTimeout(function () {
            _this.connect()
        }, 10000)
    }
    this.socket.onclose = function () {
        console.log('rpc已关闭');
        setTimeout(function () {
            _this.connect()
        }, 10000)
    }
    this.socket.addEventListener('open', (event) => {
        console.log("rpc连接成功");
    });
    this.socket.addEventListener('error', (event) => {
        console.error('rpc连接出错,请检查是否打开服务端:', event.error);
    });

};
Hlclient.prototype.send = function (msg) {
    this.socket.send(msg)
}

Hlclient.prototype.regAction = function (func_name, func) {
    if (typeof func_name !== 'string') {
        throw new Error("an func_name must be string");
    }
    if (typeof func !== 'function') {
        throw new Error("must be function");
    }
    console.log("register func_name: " + func_name);
    this.handlers[func_name] = func;
    return true

}

//收到消息后这里处理，
Hlclient.prototype.handlerRequest = function (requestJson) {
    var _this = this;
    try {
        var result = JSON.parse(requestJson)
    } catch (error) {
        console.log("catch error", requestJson);
        result = transjson(requestJson)
    }
    //console.log(result)
    if (!result['action']) {
        this.sendResult('', 'need request param {action}');
        return
    }
    var action = result["action"]
    var theHandler = this.handlers[action];
    if (!theHandler) {
        this.sendResult(action, 'action not found');
        return
    }
    try {
        if (!result["param"]) {
            theHandler(function (response) {
                _this.sendResult(action, response);
            })
            return
        }
        var param = result["param"]
        try {
            param = JSON.parse(param)
        } catch (e) {}
        theHandler(function (response) {
            _this.sendResult(action, response);
        }, param)

    } catch (e) {
        console.log("error: " + e);
        _this.sendResult(action, e);
    }
}

Hlclient.prototype.sendResult = function (action, e) {
    if (typeof e === 'object' && e !== null) {
        try {
            e = JSON.stringify(e)
        } catch (v) {
            console.log(v)//不是json无需操作
        }
    }
    this.send(action + atob("aGxeX14") + e);
}

let transjson = function(formdata) {
    var regex = /"action":(?<actionName>.*?),/g
    var actionName = regex.exec(formdata).groups.actionName
    stringfystring = formdata.match(/{..data..:.*..\w+..:\s...*?..}/g).pop()
    stringfystring = stringfystring.replace(/\\"/g, '"')
    paramstring = JSON.parse(stringfystring)
    tens = `{"action":` + actionName + `,"param":{}}`
    tjson = JSON.parse(tens)
    tjson.param = paramstring
    return tjson
}
```
关闭调试，点击代码段下面▲运行RPC客户端。
此时控制台创建一个浏览器中的RPC客户端demo，连接本地启动的RPC服务端
```
var demo = new Hlclient("ws://127.0.0.1:12080/ws?group=zzz");
```
访问http://127.0.0.1:12080/list 可以看到注册成功的组名和id。


^
## **4、注册关键函数到RPC并调用**
将代理的加解密函数注册到RPC服务demo里面。
```
demo.regAction("encode", function (resolve,param) {
    //这样添加了一个param参数，http接口带上它，这里就能获得
    var ret = window.encode(JSON.stringify(param))
    resolve(ret);
})
```
此时可以通过本地的RPC服务，调用浏览器中加密函数
```
curl 'http://127.0.0.1:12080/go?group=zzz&action=encode&param='

curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36' -d 'action=encode&group=zzz&param=' 'http://127.0.0.1:12080/go'
```
```
接口用?group分组 如 "ws://127.0.0.1:12080/ws?group={}
127.0.0.1:12080/list
```
其他接口：
* `/list` :查看当前连接的ws服务 (get)
* `/ws` :浏览器注入ws连接的接口 (ws | wss)
* `/wst` :ws测试使用-发啥回啥 (ws | wss)
* `/go` :获取数据的接口 (get | post)
* `/execjs` :传递jscode给浏览器执行 (get | post)
* `/page/cookie` :直接获取当前页面的cookie (get)
* `/page/html` :获取当前页面的html (get)

^
这里使用curl测试，优化成python的调用
```
import requests


def getRpc(param,method):
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

def encode(param):
    return getRpc(param, 'encode')

def decode(param):
    return getRpc(param, 'decode')

print(encode('{"username":"admin","password":"123456","code":"2","uuid":"xxxxx"}'))
```
这里以及可以通过python实现批量脚本了。
也可以继续优化成mitmproxy的python通用模板totalRpc.py，使得可以通过mitmproxy自动调用。




^
### **5、整合mitmproxy和yakit**
yakit重发明文请求代理到mitmproxy的服务端口6666，mitmproxy通过指定的python通用模板对请求体全加密。并对响应体全解密。

mitmproxy服务启动，可以使用web版也可以命令行版。

```
mitmdump.exe -p 6666 -s totalRpc.py --mode upstream:http://127.0.0.1:8083  --ssl-insecure

设置一个上游服务器，这里为yakit中间人8083
若安装了mitmproxy证书，可不使用--ssl-insecure
```
>安装证书：在连接mitmproxy之后，手机或设备需要设置代理，输入http://mitm.it/ 安装证书

totalRpc.py
```
import json
import requests
import mitmproxy
from mitmproxy import http, ctx
from mitmproxy import flowfilter

# 默认去请求jsRPC的http服务，参数：http://127.0.0.1:12080/go、组名为zzz、方法名encode、decode、sign

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

![](.topwrite/assets/image_1727580420081.png)

