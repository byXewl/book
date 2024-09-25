
场景：
  1、头像等文件上传到服务器本地，没有对文件类型和后缀做安全校验，且可以解析jsp等。
  2、关键词：org.apache.comons.fileupload、file、xxxstream、RequestMethod、MultipartHttpServletRequest。
危害：上传木马并解析、获取系统shell、上传含有xss、xxe的文件等。
防御：对文件上传的类型和后缀做安全校验，使用云存储OSS等。

漏洞：
目录穿越上传，如果存在过滤..和/，使用url编码等方式绕过。
任意文件后缀上传

^
在文件上传功能中，先看框架——比如Spring框架，默认不会解析jsp文件。然后看代码有没有定义黑名单数组等等。

```
org.apache.commons.fileupload
file
File
xxxstream
RequestMethod
MultipartHttpServletRequest
multipart
MultipartFile
CommonsMultipartFile
new FileOutputStream
new file
```
## **常见上传方式**

1、在javaWeb没有框架的项目中，一般使用org.apache.commons.fileupload库实现文件上传。fileupload库又依赖commons io。

2、SpringBoot项目中一般使用自带的multipart库实现文件上传。
