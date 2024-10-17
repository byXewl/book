## **hook**
Frida可以通过将JavaScript 脚本插入到APP的内存中来对APP的逻辑进行跟踪和监视乃至修改原程序的逻辑，实现逆向开发和分析人员想要实现的功能称之为HOOK。

## **hook操作**
hook常见请求库：
hook `okhttp3` `java.net.HttpURLConnection` `java.net.URL` 三个常见请求库，
如：发现捕获到的所有请求均来自`java.net.URL`。

