
## **浏览器F12操作**
常见操作：<https://mp.weixin.qq.com/s/Aen7T159KciSCveC7yiBKA>

<https://mp.weixin.qq.com/s/OhgSdEMOLaIkrq6POiwDRA>



## **常见js加密算法**
RSA 常使用jsencrypt库
AES 常使用crypto-js库
DES

sign : sign一般都是对提交的data和一个时间戳timestamp进行加密，对于这种我们只要找到关键的加密函数
```
var str="password=123456&timestamp=1691141967479&username=admin&secret=123456"
console.log(SHA1_Encrypt(str)) //sign
```



^
## **python中调用js**
python中调用js文件中方法：使用execjs库等。
如果你的JavaScript代码依赖于外部加密库（如`crypto-js`），你需要确保这些库在执行环境中可用。对于Node.js环境，你可能需要使用`npm`安装这些库。



## **jsRPC**