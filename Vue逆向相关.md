Vue类型的框架网站，通过Webpack等工具打包成html，一些自定义的函数和变量名往往做了混淆。

webpack：
<https://www.cnblogs.com/zichliang/p/17517073.html>
<https://blog.csdn.net/Zuko_chen/article/details/131486608>

vue：
<https://blog.csdn.net/Lidppp/article/details/119732245>


## **webpack扣下来运行加密**
```
抓包请求包，某个参数被加密，搜索这个参数。
搜索到后，断点确认参数。
找到加密函数，可以控制台打印一些这个函数，进入函数分析加密方式。
找到加载器，他会加载加密库，如funtion n(t){  retruen xx.call()}
将这个n(t)函数导出扣下来
将加密函数的代码扣下来
补环境全局变量
```
<https://blog.csdn.net/sin_0119/article/details/129658679>
<https://www.cnblogs.com/zichliang/p/17517073.html>
操作
```
1.确定是否是webpack
2.找到加载器，扣下来
3.缺啥补啥。赋值全局变量。
```