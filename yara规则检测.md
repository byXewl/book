

## **Yara 规则使用-规则检测&分析特征&自写规则**
Yara 是一个用于检测和分类恶意软件样本的开源工具。
许多杀毒软件、入侵检测系统（IDS）、安全信息和事件管理系统（SIEM）等安全产品都使用 YARA 引擎来扫描文件、内存和其他数据源，以查找恶意软件的特征和模式。

链接：https://github.com/VirusTotal/yara
部分规则：https://github.com/Yara-Rules/rules

> 注：
>.yar为规则文件，网上每天都有更新最新规则可去获取最新。
> yara.exe 为 yara 使用程序
> yarac 为编译 yara 规则工具

检测范围：
* 样本文件(木马，病毒)
* 内存数据(内存马)
* 网络流量

## **利用已知规则库分析**
malware_index，危险软件：挖矿样本&后门木马&勒索病毒
```
yara64.exe malware_index.yar -r C:\Users\Administrator\Desktop\xmrig-6.16.2
```
成功识别后，可对比在线查杀平台


检测进程中是否有内存马
提取特征，自写内存马的yar。再检测相同类型的进程。
```
yara64.exe demo1.yar 进程PID
```



## **Yara自写规则**

**特征提取：**
* 多个样本同时对比筛选通用的数据
* 要根据样本的应用(分类,走的协议,文件头固定等)

**特征转成.yar文件规则：**
> Yara 规则内容支持字符串、正则表达式、十六进制进行匹配
> * 字符串：定义一个变量` $a = "字符串内容"`
> * 正则表达式：定义一个变量 `$a = /正则表达式内容/`
> * 十六进制：定义一个变量 `$a = {十六进制内容}`

Yara 规则条件
* and：与 or：或 not：非
* all of them：所有条件匹配即告警
* any of them：有一个条件匹配即告警
* `$a and $b and $c`：abc 同时匹配即告警
* `($a and $b) or $c`：匹配a和b或c即告警

Yara规则常用修饰符
* nocase:不区分大小写
* base64: base64字符串
* xor:异或字符串
* wide:宽字符

编写规则：
* xmrig挖矿样本
* 提取:文件头，关键字，协议，域名等
挖矿一般网络协议stratum，矿池域名中带有pool。
```
rule xmrigdemo 
{
	meta:
		tag="xmrigdemo"
		description = "test xmrigdemo"
		author="xiao"

	strings:
		$hex = {4D 5A}
		$a = "stratum"
		$b = "xmrig"
		$c = "pool"

	condition:
		all of them
}
```

**内存马特征提取：**


* 编写规则查找Java内存马
* 植入内存马，通过前面学过的java-memshell-scanner检测提取特征，结合procdump提取的内存数据，进行分析
procdump.exe -accepteula-ma idea64.exe java.dmp
用010分析java.dmp中特征
```
rule jspfindshell 
{
	meta:
		tag="jspfindshell"
		description = "test jspfindshell"
		author="xiao"

	strings:
		$a = "org.apache.coyote"

	condition:
		all of them
}
```

