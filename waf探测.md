## **探测加了什么防火墙waf工具**
1.kali的wafw00f：
wafw00f是个通过http返回报文来判断waf的python脚本识别工具,他发送一个普通的HTTP 请求并分析响应如果不成功，它会发送一些（可能是恶意的）HTTP 请求并使用简单的逻辑来推断它是哪个 WAF，如果这也不成功，它会分析先前返回的响应，并使用另一种简单的算法来猜测 WAF 或安全解决方案是否正在积极响应我们的攻击。
sudo wafw00f  网址

2.响应头：
X-Powered-By:WAF/2.0
X-Powered-By:SDWAF  //腾讯宙斯盾

3.手工输入字符测试
输入：% '' < > <script> ^ system shell 
触发waf了，先搜看看是什么，搜不到再看常见WAF：看图识WAF
<https://www.cnblogs.com/charon1937/p/13799467.html>
<https://www.freebuf.com/articles/web/265293.html>

4.工具探测
python3 identYwaf.py http://www.bjaimu.net/
^
## **测试绕过**
探测到有防火墙，安全狗，云盾等就不用扫描工具，防止触发开启防护。查资料，手动waf绕过，bypass。
^
fofa搜玄武盾(安恒云)，Safeline(长亭) 等，出来就是有waf的网站。
安恒明御waf
![image-20240709144907262](http://cdn.33129999.xyz/mk_img/image-20240709144907262.png)