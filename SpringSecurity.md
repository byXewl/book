spring项目可以集成SpringSecurity。最新版本6.x。
默认所有请求url接口都会302到登录页面。
可以配置Security过滤器链，实现所有接口不验证，登录接口返回一个json。
默认账号user密码在控制台打印，使用POST表单登录。
SpringSecurity登录后会重新发布sessionID。
SpringSecurity默认开启了防止csrf（CSRF Token），但一般开发者会关闭。
<https://blog.csdn.net/sh1307212321/article/details/126756963>


^
## **Spring Security的好处**
Spring Security是Spring框架的一个强大的安全性和身份验证框架，基于filter过滤器，提供了全面的安全服务，可以在各种Java应用程序中保护应用的安全性。以下是使用Spring Security的一些好处：

1. **综合的安全性特性：** Spring Security提供了一系列的安全性特性，包括身份验证、授权、会话管理、密码加密等。这使得开发人员能够方便地集成和配置安全性功能，而不必从头开始实现这些特性。
2. **易于集成：** Spring Security可以轻松地集成到Spring框架的其他模块中，如Spring Boot、Spring MVC等。这样，开发者可以在保持应用程序的结构一致性的同时，添加强大的安全性功能。
3. **灵活的身份验证和授权机制：** Spring Security支持多种身份验证机制，包括基于表单、基于HTTP基本认证、token、OAuth等。同时，它也提供了细粒度的授权机制，可以根据用户的角色和权限进行控制。
4. **集成Spring框架的依赖注入：** Spring Security可以与Spring框架的依赖注入机制无缝集成，使得在安全性配置中使用Spring的IoC容器变得更加方便。
5. **易于定制：** Spring Security允许开发者通过配置和扩展来定制安全性规则，以适应不同的应用程序需求。这种灵活性使得可以根据具体的业务场景来实现特定的安全性策略。
6. **集成社交登录：** Spring Security提供了对社交登录的支持，可以通过OAuth协议集成第三方登录，例如使用Facebook、GitHub等账户登录。
7. **密码加密：** Spring Security提供了密码加密的功能，可以保护用户密码的安全，避免以明文存储密码。
8. **安全事件和审计日志：** Spring Security提供了安全事件和审计日志的功能，开发者可以监控和记录应用程序中发生的安全事件，以便更好地了解和响应潜在的安全威胁。


## **Spring Security带来了什么**


`Authentication` 是一个表示用户认证信息的对象。
包含了用户的身份信息和相关的认证信息，以及用户所具有的权限等。

`Authentication` 接口定义了如下几个主要的方法：

1. **getPrincipal()**: 返回用户的身份信息，通常是一个代表用户User类的对象，（比如用户名、用户ID或自定义的用户对象）。
2. **getCredentials()**: 返回用于认证的凭证信息，通常是密码或其他安全令牌。
3. **getAuthorities()**: 返回用户所具有的权限，以集合的形式返回。
4. **isAuthenticated()**: 返回用户是否已经通过认证。通常，如果用户已通过认证，这个方法返回 `true`。


^

`User` 类是 Spring Security 提供的一个默认的用户实体类，它实现了 Spring Security 的 `UserDetails` 接口，该接口包含了描述用户身份信息的方法，如用户名、密码、权限等。

创建User对象，开发者需要重写UserDetailsService，提供用户的基本信息，例如用户名和密码，而不必自己实现整个 `UserDetails` 接口。这样，Spring Security 就能够使用这些提供的信息进行身份验证、授权等操作。
开发者也自定义用户实体类，实现 `UserDetails` 接口。



<https://www.cnblogs.com/hanease/p/15925069.html>
```
用户访问一个url
用户登录

判断用户是否有访问这个url权限:
查看这个url能被访问的角色列表
查看用户属于的角色是否在这个角色列表里

```


^
## **OAuth**
OAuth的主要目标是解决用户在不同服务之间共享资源的问题，同时确保用户的安全性。传统的用户名和密码模型虽然简单，但存在一些问题，如用户需要在不同服务中使用相同的用户名和密码，以及第三方应用能够获得用户的完整凭证。OAuth通过引入令牌（Token）的概念，提供了更安全、更可控的授权机制。
^
微信登录网站通常使用OAuth协议来实现。下面是一个简化的微信登录过程，以OAuth的角度解释：

1. **用户点击微信登录按钮：** 在网站上，用户选择使用微信登录，并点击相应的按钮。
2. **网站向微信请求授权：** 网站将用户重定向到微信的授权页面，并向微信发起授权请求。在这一步，网站向微信提供了自己的身份标识、请求的权限范围等信息。
3. **用户同意授权：** 用户在微信页面上看到了网站请求的权限信息，决定是否同意授权。如果同意，微信生成一个授权码。
4. **微信返回授权码给网站：** 微信将生成的授权码返回给网站。
5. **网站向微信请求访问令牌：** 网站使用获得的授权码，向微信请求访问令牌。在这个步骤中，网站可能还会提供自己的应用密钥等信息。
6. **微信颁发访问令牌：** 微信验证授权码和网站的身份，如果验证通过，微信颁发访问令牌给网站。
7. **网站使用访问令牌获取用户信息：** 网站使用获得的访问令牌，向微信请求用户的基本信息，例如用户的openid、昵称等。
8. **网站创建用户账户：** 如果是用户首次登录，网站可能会根据获得的用户信息创建本地账户，并关联用户在网站的身份。
9. **用户登录网站：** 最终，用户成功登录了网站，并可以在网站上进行操作。

这个过程中，OAuth提供了一个标准的授权框架，允许网站安全地获取用户授权，而无需用户提供微信的用户名和密码。网站只需获得访问令牌，就可以代表用户向微信请求用户信息。这种方式增加了安全性，同时也减少了网站与用户凭据直接交互的需求。


