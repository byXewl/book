模板引擎
国际化语言
占位符

^
1.创建项目时选择javaee8,勾选thymeleaf
或pom.xml中加thymeleaf依赖。

2.在resouce/目录下创建html
`<html lang="en" xmlns:th="http://www.thymeleaf.org">`
这个html里写java代码也会有提示。

3.servlet中传值：
html标签中接收值：
`<div th:text="${ value }></div>`