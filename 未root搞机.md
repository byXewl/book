苹果有：巨魔、nb助手、爱思助手等。

安卓root：面具管理root、LSP+模块、Xposed+模块。参考<https://blog.cccyun.cn/post-543.html>
安卓未root：shizuku+模块+模块shizuku激活器、LSPatch(太极阴过时了)+克隆原应用+模块。

^
## **shizuku**

`Shizuku` 是一款开源的 ADB（Android Debug Briage）权限管理器。由于现阶段大部分安卓手机都无法解锁获取 ROOT 高级权限，但是用户又需要高级权限对系统进行一些操作，恰好这些功能可以通过 ADB 权限进行解决，比如冻结应用、卸载不想要的系统应用（只有少部分能通过adb卸载，更多的还是建议root）。这种情况下，`Shizuku` 就是一个非常好的解决方案。

具体关于shizuku是什么，官网已经给出了很明确的解释：`Shizuku` 可以帮助普通应用借助一个由 app\_process 启动的 Java 进程直接以 adb 或 root 特权使用系统 API。简单来说，root权限>`shizuku`的权限>普通用户，利用这一聊胜于无的权限，我们就已经可以做很多事了。

## [](https://blog.yuchu.me/posts/30e5/#%E5%AE%89%E8%A3%85shizuku "安装shizuku")安装shizuku

酷安的`shizuku`下载地址似乎已经被ban了，那就只能用[Google play](https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api\&pli=1)或者[github](https://github.com/RikkaApps/Shizuku/releases/download/v13.5.4/shizuku-v13.5.4.r1049.0e53409-release.apk)下载了。

## [](https://blog.yuchu.me/posts/30e5/#%E6%BF%80%E6%B4%BBshizuku "激活shizuku")激活shizuku

* `shizuku`官方提供了三种激活方式，root激活，连接电脑通过adb激活和无线调试激活。root激活就不提了，我都root了还折腾`shizuku`干嘛（笑），adb激活需要手边有电脑，总归是不太方便，而且后面我们还会介绍一种更好的方法。现在我们先演示用无线调试激活。
* 打开手机设置-我的设备（也可能是我的手机或其他类似的选项），找到版本号，连续点击至少5次，直到弹出“您已处于开发者模式”的提示。\
  返回设置-更多设置-开发者选项，启用无线调试。在 `Shizuku` 软件内开始配对- 点按“无线调试”中的“使用配对码配对设备”- 在下来菜单的`Shizuku`的通知中填入配对码

![](https://pic2.zhimg.com/80/v2-939e9ad3fc44143e564d816506713e7d_720w.webp)

![](https://pic4.zhimg.com/80/v2-22abc729f625f8298928f79dc53ccbf3_720w.webp)

* 无效调试激活方案注意事项: 如果无法输入配对码，请在系统-通知样式选项中，将默认通知样式改为 原生样式- 启用无线调试的过程中，部分系统会提示「某个应用遮挡了权限请求界面」，可以尝试关闭系统的侧边栏功能或者关闭掉所有允获取了悬浮窗权限的应用

#### [](https://blog.yuchu.me/posts/30e5/#%E9%80%9A%E8%BF%87%E9%BB%91%E9%98%88%E6%BF%80%E6%B4%BB "通过黑阈激活")通过黑阈激活

黑阈是一款不需要root就能待机或强行停止应用的工具，它可以配合shizuku实现对一些流氓应用的限制。但这里我们要用到的是它的另一个功能—指令。

#### [](https://blog.yuchu.me/posts/30e5/#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85%E9%BB%91%E9%98%88 "下载安装黑阈")下载安装黑阈

酷安可以直接下载：<https://www.coolapk.com/apk/me.piebridge.brevent>

安装完成后照着上面无线调试激活shizuku的步骤，无线激活黑阈就好了

激活后点击左上角-执行指令


输入

```
sh /storage/emulated/0/Android/data/moe.shizuku.privileged.api/start.sh 
``` 



即可激活`shizuku`这一步的原理其实与adb激活shizuku类似，不过不需要电脑，好处是适配性更好，也比较方便，仅此更推荐用这种方式激活shizuku。

## shizuku常见用法

1. [使用冰箱冻结应用]()
2. [给mt管理器提权，使之能访问Android/data目录]()
3. [给scene提权，查看CPU运行状态和检测游戏帧率]()
4. [给APP Ops提权，更好地监控和管理app权限，对抗摇一摇广告的神！]()
5. [给GKD提权，反开屏广告地神！]()
6. [给termux提权，在termux里也能访问Android/data目录]()


