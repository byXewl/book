常用与作配置文件，没JSON前常用作请求响应的数据参数传输。

## **XML作请求响应：**
```
POST /api/endpoint HTTP/1.1
Host: example.com
Content-Type: application/xml
Content-Length: [实际内容长度]

<?xml version="1.0" encoding="UTF-8"?>
<request>
  <action>get_data</action>
  <parameters>
    <param1>value1</param1>
    <param2>value2</param2>
  </parameters>
</request>
```
```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: [实际内容长度]

<?xml version="1.0" encoding="UTF-8"?>
<response>
  <status>success</status>
  <data>
    <item>
      <name>Item 1</name>
      <price>10.99</price>
    </item>
    <item>
      <name>Item 2</name>
      <price>20.50</price>
    </item>
  </data>
</response>

```
## **有实体参数的XML：**

`<!DOCTYPE>`定义了XML文档的文档类型定义DTD，
下面是一个包含 `<!DOCTYPE>` 和实体声明的完整HTTP请求和响应：
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
```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: [实际内容长度]

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE response [
  <!ENTITY name "entity_value">
]>
<response>
  <status>success</status>
  <data>
    <item>
      <name>&name;</name>
      <price>10.99</price>
    </item>
    <item>
      <name>Item 2</name>
      <price>20.50</price>
    </item>
  </data>
</response>
```
## **XML文档约束:**
1. Schema约束:文档开头引入一个网站
2. DTD约束：约束只能使用哪些标签等。分为:文件开头定义 或 开头引入.dtd文件 

```
DTD（Document Type Definition）约束：

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE 班级[
    <!ELEMENT 班级(学生+)> //至少有一个<学生>
    <!ELEMENT 学生(名字)>
    <!ELEMENT 名字(#PCDATA)> //<名字>里不能再有标签
]>
```
## **XML实体：**
实体(ENTITY)：在xml中可给数据取一个变量名，使用时调用变量名即可。
|     |普通/一般实体 |参数实体   |    
| --- | --- | --- | 
|内部定义 |!ELEMENT 实体名 “文本内容”| %实体名    |     
|外部定义 |!ELEMENT 实体名 SYSTEM “外部文件/URL” |%实体名     |     
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