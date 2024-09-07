接口漏洞测试工具：AWVS，ReadyAPI，SoapUI，swagger-hack.py
Postman自动化测试
小迪安全65,66
参考swagger接口泄露自动化测试未授权。
一般未授权访问漏洞。

^
WSDL的服务接口：
WSDL（Web Services Description Language）是一种用于描述 Web 服务的 XML 格式的语言。它定义了 Web 服务的接口、方法、参数、消息格式等信息，使得客户端应用程序能够理解和访问 Web 服务提供的功能。
WSDL 接口通常以 `?wsdl` 扩展名结尾。

客户端首先发送一个 HTTP GET 请求（/getA?wsdl）以获取 WSDL 文件的描述信息，然后根据 WSDL 文件中的信息构造 SOAP 消息，通过 HTTP POST 请求发送给 Web 服务。最后，客户端收到 Web 服务的响应。
ReadyAPI或SoapUI测试接口可用性。
可能存在sql注入。

^
WebService服务
WebService思想有点跟微服务很像，是一种比较"重"和“老”的Web接口技术，目前大部分应用于金融机构的历史应用和比较老的应中，在内网里面遇到的机会还是挺多的。
<https://blog.csdn.net/qq_53577336/article/details/124524175>

<https://xz.aliyun.com/t/7541?time__1311=n4%2BxnD0G0%3D%3D7wqQqGNnmjY553SDBDWuhD&alichlgref=https%3A%2F%2Fwww.bing.com%2F>











