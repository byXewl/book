对于一些常规的JS加密方式，可以使用python自带的库直接复制一个。
有些JS中自定义的函数，就使用python调用。

## **python中调用js**
python中调用js文件中方法：使用execjs库等。
>首先本地的js环境没有问题，本地js可以直接运行。
>如：如果你的JavaScript代码依赖于外部加密库（如`crypto-js`），你需要确保这些库在执行环境中可用。对于Node.js环境，你可能需要使用`npm`安装这些库。

扣出js代码，让python调用：
<https://mp.weixin.qq.com/s/Sg8ADUF919vNkhaCP6iGow>
```
js导出方法：
module.exports = { getBv,    getSalt,    getSign,    getTs}


python调用方法获取返回值：
def getKey(msg):
    key = {}
    with open('./某某.js', encoding='utf-8') as f:
        jsDoc = execjs.compile(f.read())
        sign = jsDoc.call('getSign', msg)
        bv = jsDoc.call('getBv')
        ts = jsDoc.call('getTs')
        salt = jsDoc.call('getSalt')
        key['sign'] = sign
        key['bv'] = bv
        key['ts'] = ts
        key['salt'] = salt
    return key
```