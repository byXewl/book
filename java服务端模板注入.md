Velocity、FreeMarker以及Thymeleaf三个模板注入。
<https://forum.butian.net/share/1661>
<https://www.cnblogs.com/LittleHann/p/17846825.html#_label1>

SSTI:Server Side Template Injection，即服务端模板注入。
在Web开发中，为了使用户界面与业务数据分离，提升开发效率，因此会使用模板引擎来生成一个标准的HTML文档用来数据的展示。
作为视图层，常见于前后端不分离的项目。

## **Thymeleaf模板注入**



## **修复方案**
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


