lspatch：安卓9快速免root进行 Xposed插件 hook。
SimpleHook：快捷一键常见的hook操作，需要root。
算法助手：自义定hook。
```
查看某个方法返回值，直接算法助手添加自定义hook：类设置b.l.g.s，方法名设置a，打印日志。

找到广告方法位置，直接算法助手添加自定义hook：类设置b.l.g.s，方法名设置d，启用拦截。

邀请人免广告时间功能
getFree_time()方法里有free_time变量，修改赋值即可。
或者使用算法助手自定义hook修改返回值。
```