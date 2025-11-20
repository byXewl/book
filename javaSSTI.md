## **表达式注入**
Struts2-OGNL
Spring-SPEL
JSP-JSTL_EL
Elasticsearch-MVEL

最常考的就是SPEL表达式注入


^
## **模板引擎注入SSTI**
由java后端模板引擎注入导致的RCE漏洞，如：Freemarker、Velocity、Thymeleaf等
```
Freemarker：在html中
<divclass="content-txt">${announce.content}</div>

<#assign value="freemarker.template.utility.Execute"?new()>${value"calc.exe")}
````