## **CSRF**
就是一个表单操作，关键操作前，没有判断请求发起的来源，以及是否本人意愿的漏洞。
from表单可以随便跨域，所以是Web的CSRF重灾区。

如果是ajax，则需要前提有cros漏洞，即服务端允许任意地方的跨域请求。

## **CSRF防御**
原生可以生成csrftoken放入session中。
SpringSecurity配置的要有.csrf()配置。或有.ignoringAntMatchers("/api/**") //禁用API路径的CSRF保护


