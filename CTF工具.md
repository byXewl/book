最新ctf操作系统：hello-ctf（不好安装）

综合：
<http://1o1o.xyz/ctfsoft.html>
<https://hello-ctf.com/HC_Crypto/Encode/>
 <https://ctf-wiki.org/>
^
工具大全：https://www.ctftools.com/
悬剑比赛工具操作系统（一般）：<https://www.cnblogs.com/fattygo/p/15554071.html>

杂项工具：<https://ctf.tj.cn/TK/>
<https://www.sqlsec.com/tools.html>
<https://forum.ywhack.com/wordlists.php>
杂项在线工具箱：<http://www.hiencode.com/>


^
win10做ctf题文件打开多后，卡顿：
点击设置-个性化-开始-关闭【在"开始“菜单或任务栏的跳转列表中以及文件资源管理器的"快速使用"中显示最近打开的项】

练习平台：
CTF-show:<https://ctf.show/challenges>
BUUCTF:<https://buuoj.cn/challenges>
ctfhub:<https://ctfhub.com>
bugku:<https://ctf.bugku.com>

^
GZ:CTF比赛平台搭建：
<https://blog.csdn.net/a00221aa/article/details/138073077>
<https://developer.aliyun.com/article/1521837>
制作题目镜像：
<https://blog.csdn.net/qq_39673370/article/details/140711518>

类似的平台CTFD。

^
## **web方向大纲**
一、 注入类

01 SQL注入原理与利用

02 SQL注入宽字节注入 + 赛题思路 解题方法 

03 SQL注入Union类型注入 绕过防御 过滤关键字

04 SQL注入 布尔注入 

05 SQL注入 报错注入

06 SQL注入 基于时间盲注 python脚本编写

07 SQL注入 insert delete 等注入

08 SQL注入 Fuzz + 构造绕过SQL语句

09 二次注入

二、 命令执行 

01 命令执行介绍与利用 

02 无命令回显命令执行 + dnslog利用

03 无数字字母的命令执行

04 n位可控字符下命令执行

三、 上传类

01 文件上传白名单 解析绕过

02 文件上传 内容检查

03 文件上传 文件包含利用 

04 文件上传 竞争上传

四、 SSRF

01 IP限制绕过及gopher对redis利用

02 gopher对mysql利用

03 XXE Blind xxe

五、 反序列化 

01 反序列化 与 php bug 72663利用

02 session序列化相关问题 pchar序列化

六、 PHP安全编码 

01 弱类型相关问题

02 变量覆盖相关问题

03 空白字符相关问题

04 伪随机数相关问题

05 正则匹配相关问题

06 绕过disable_function绕过方法讲解

07 代码审计 源码获取+扫描+fuzz思路

七、 SSTI安全
python的SSTI
java的SSTI

八、 Python脚本编写

01 HTTP相关库讲解 requests  

02 Python – sql注入

03 python – Burpsuite插件开发