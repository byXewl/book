## frida_rpc
frida 提供了一种跨平台的 rpc(就是Remote Procedure Call 远程过程调用) 机制，通过 frida rpc 可以在主机和目标设备之间进行通信，并在目标设备上执行代码，简单理解就是可以不需要分析某些复杂加密，通过传入参数获取返回值，进而来实现python或易语言来调用的一系列操作，多用于爬虫。

`包名附加进程`
```python
import frida, sys
jsCode = """ ...... """
script.exports.rpcfunc()
process = frida.get_usb_device().attach('包名') # 获取USB设备并附加到应用
script = process.create_script(jsCode) # 创建并加载脚本
script.load()# 执行脚本
sys.stdin.read()# 保持脚本运行状态，防止它执行完毕后立即退出
```
`spawn方式启动`
```python
import frida, sys
jsCode = """ ...... """
script.exports.rpcfunc()
device = frida.get_usb_device()
pid = device.spawn(["包名"])    #以挂起方式创建进程
process = device.attach(pid)
script = process.create_script(jsCode)
script.load()
device.resume(pid)  #加载完脚本, 恢复进程运行
sys.stdin.read()
```
`连接非标准端口`
```python
import frida, sys
jsCode = """ ...... """
script.exports.rpcfunc()
process = frida.get_device_manager().add_remote_device('192.168.1.22:6666').attach('包名')
script = process.create_script(jsCode)
script.load()
sys.stdin.read()
```

```js
function get_url() {
    let ChallengeNinth = Java.use("com.zj.wuaipojie.ui.ChallengeNinth");
    ChallengeNinth["updateUI"].implementation = function (list) {
        let ret = this.updateUI(list);
        // 获取List的大小
        var size = list.size();
        // 遍历并打印List中的每个ImageEntity对象
        for (var i = 0; i < size; i++) {
            var imageEntity = Java.cast(list.get(i), Java.use('com.zj.wuaipojie.entity.ImageEntity'));
            console.log(imageEntity.name.value + imageEntity.cover.value);
        }
        return ret;
    };
}

```

需要提前pip安装好的几个库
```
frida14.2.18

frida-tools==9.2.4，uvicorn，fastapi，requests

python3
pip3
```
```python
# 导入需要的库
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import frida, sys
import uvicorn

# 创建FastAPI应用实例
app = FastAPI()

# 定义一个GET请求的路由'/download-images/'
@app.get("/download-images/")
def download_images():
    # 定义处理frida消息的回调函数
    def on_message(message, data):
        message_type = message['type']
        if message_type == 'send':
            print('[* message]', message['payload'])
        elif message_type == 'error':
            stack = message['stack']
            print('[* error]', stack)
        else:
            print(message)

    # Frida脚本代码，用于在目标应用内部执行
    jsCode = """
    function getinfo(){
        var result = [];
        Java.perform(function(){
            Java.choose("com.zj.wuaipojie.ui.ChallengeNinth",{
                onMatch:function(instance){
                    instance.setupScrollListener(); // 调用目标方法
                },
                onComplete:function(){}
            });
            
            Java.choose("com.zj.wuaipojie.entity.ImageEntity",{
                onMatch:function(instance){
                    var name = instance.getName();
                    var cover = instance.getCover();
                    result.push({name: name, cover: cover}); // 收集数据
                },
                onComplete:function(){}
            });
        });
        return result; // 返回收集的结果
    }
    rpc.exports = {
        getinfo: getinfo // 导出函数供外部调用
    };
    """

    # 使用frida连接到设备并附加到指定进程
    process = frida.get_usb_device().attach("com.zj.wuaipojie")
    # 创建并加载Frida脚本
    script = process.create_script(jsCode)
    script.on("message", on_message)  # 设置消息处理回调
    script.load()  # 加载脚本
    getcovers = script.exports.getinfo()  # 调用脚本中的函数获取信息
    print(getcovers)

    # 返回获取的信息作为JSON响应
    return JSONResponse(content=getcovers)

# 主入口，运行FastAPI应用
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)  # 使用uvicorn作为ASGI服务器启动应用


```

```
写一段python的requests代码，访问http://127.0.0.1:8000/download-images/端口，会获得如下的json数据，按照名字把图片爬取到同目录的pic文件夹里，并写好注释
[{
"name": "霸王别姬",
"cover": "https://p0.meituan.net/movie/ce4da3e03e655b5b88ed31b5cd7896cf62472.jpg@464w_644h_1e_1c"
},{
"name": "这个杀手不太冷",
"cover": "https://p1.meituan.net/movie/6bea9af4524dfbd0b668eaa7e187c3df767253.jpg@464w_644h_1e_1c"
},{
"name": "肖申克的救赎",
"cover": "https://p0.meituan.net/movie/283292171619cdfd5b240c8fd093f1eb255670.jpg@464w_644h_1e_1c"
}]
```