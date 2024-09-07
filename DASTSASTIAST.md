![image-20240507150235263](http://cdn.33129999.xyz/mk_img/image-20240507150235263.png)

![image-20240507150639263](http://cdn.33129999.xyz/mk_img/image-20240507150639263.png)

^
## SAST：静态应用程序安全测试（Static Application Security Testing）
通常在编码阶段分析应用程序的源代码或二进制文件的语法、结构、过程、接口等来发现
程序代码存在的安全漏洞。
工具：kunlun-m.py（php、js），fortify（php,java）
<https://github.com/LoRexxar/Kunlun-M>
^
## DAST：动态应用程序安全测试（Dynamic Application Security Testing）
在测试或运行阶段分析应用程序的动态运行状态。它模拟黑客行为对应用程序进行动态攻
击，分析应用程序的反应，从而确定该 Web 应用是否易受攻击。

^
## IAST：交互式应用程序安全测试（Interactive Application SecurityTesting）
一种新的应用程序安全测试方案，通过代理、VPN 或者在服务端部署 Agent 程序，收集、监控 Web 应用程序运行时函数执行、数据传输，并与扫描器端进行实时交互，高效、准确的识别安全缺陷及漏洞，同时可准确确定漏洞所在的代码文件、行数、函数及参数。IAST 相当于是 DAST 和 SAST 结合的一种互相关联运行时安全检测技术。
目前免费可试用的四个IAST平台：
1、openrasp-iastopenxasp-ias t是一款灰盒扫描工具，目前开源的IAsT扫描器通过安装Agent和扫描器，能够结合应用内部hook点信息，针对获取到的url请求参数进行fuzz，从而检测到安全漏洞。
支持的编程语言：Java、PHP。

2、VulHunter检测原理是通过在应用程序的字节码中动态插桩检测探针"，来获取应用程序运行时的各种上下文信息。在应用程序运行时，实时分析程序的安全弱点。与基于SAST和DAST技术的产品相比，VulHunter的最大不同点是，通过字节码插桩应用程序获得更多准确的运行时信息。
支持的编程语言：java、node.js。

3、火线洞态 IAST洞态IAST提供SAAS平台，个人用户通过填写问卷注册登录，下载Agent进行应用程序部署，正常访问应用，就可以触发漏洞检测。漏洞结果提供比较详细的HTTP数据包和污点流图，可用于快速验证和复现漏洞。
<https://iast.io/>
支持的编程语言：Java、python、php、go。

服务端使用k8s或docker部署，代理端部署在本地电脑，springboot项目可以直接下载IDEA的洞态插件zip，IDEA中点击动态运行即可。

4、SemmleQLSemmle公司声称以一种独特的方法寻找代码中的漏洞。技术核心是把代码当成数据，将分析问题变成对数据库的请求。SemmleQL是一个声明式的面向对象的查询语言。
支持的编程语言：Java，JavaScript，Python，TypeScript，C#，Go，C/C++。