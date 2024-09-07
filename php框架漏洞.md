**thinkphp rce漏洞**：比如5.0版本有个rce漏洞，该漏洞的漏洞关键点存在于thinkphp/library/think/Request.php文件中
在docker中复现了多种版本的rce漏洞。

**漏洞的原理有了解吗,攻击后的返回包的有分析过吗?**
THINKPHP RCE漏洞的原理：举例有一个RCE是这样的：Dispatcher.class.php中res参数中使用了**preg_replace**的/e危险参数，使得preg_replace第二个参数就会被当做php代码执行，导致存在一个代码执行漏洞，攻击者可以利用构造的恶意URL执行任意PHP代码。

