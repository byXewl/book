
## **浏览器F12操作**
常见操作：
基础：<https://mp.weixin.qq.com/s/OhgSdEMOLaIkrq6POiwDRA>

系列教程：<https://mp.weixin.qq.com/s/9ZghHAZ3ICJKhFQuLCdUZg>

案例：JS逆向百例

## **常见js加密算法**
RSA 常使用jsencrypt库
AES 常使用crypto-js库
DES

sign : sign一般都是对提交的data和一个时间戳timestamp进行加密，对于这种我们只要找到关键的加密函数
```
var str="password=123456&timestamp=1691141967479&username=admin&secret=123456"
console.log(SHA1_Encrypt(str)) //sign
```

## **运行js**
1、可以将代码保存到.js文件中在本地nodejs的集成环境中运行。
2、可以在浏览器的控制台中运行。
3、对于一些依赖Windows对象环境的值，如果值固定的可以抠下本地运行，否则可以在[源代码/来源]的[代码段]Snippets面板中运行。
4、html中等等。

^
## **python中调用js**
python中调用js文件中方法：使用execjs库等。

>如果你的JavaScript代码依赖于外部加密库（如`crypto-js`），你需要确保这些库在执行环境中可用。对于Node.js环境，你可能需要使用`npm`安装这些库。

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

^
## **常用工具**
<https://blog.csdn.net/Not__Cry/article/details/139754358>