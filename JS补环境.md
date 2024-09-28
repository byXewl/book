啥要补环境：简言概括下，是因为我们知道这个js文件代码内容会生成我们想要的参数，但是放到本地nodejs环境下运行不出结果，因为缺少浏览器环境特有的一些window/document/navigator/localstorage等参数，所以我们需要把这些缺少的浏览器环境补上让这份js代码在本地nodejs环境下也能运行出结果来。
参考：<https://blog.csdn.net/weixin_43411585/article/details/132440165>

![](.topwrite/assets/image_1727537066069.png)

![](.topwrite/assets/image_1727537163588.png)

^
补环境框架