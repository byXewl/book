场景：
  1、服务端接收前端传递的参数后，没有做充分的过滤限制或编码直接作为文件读取的路径参数。
    场景：导出xls下载，文件读取等。
  2、关键词：path、System.GetProperty(“user.dir”)、fileInputStream、file.read、filePath。
危害：通过目录穿越读取服务器文件、目录遍历等。
防御：过滤用户可控的参数等。

^
new File()写文件，传入路径时，可能目录穿越。
偶尔会借助commons io库。


^
springboot中获取资源目录路径
```
String filePath = ResourceUtils.getURL("classpath:").getPath()
```

^
## **压缩包自动解压场景**
程序可以上传压缩包，通过ZipFile的压缩流api，让压缩包会自动解压到服务器上。
本质上是new File()写压缩包里面的文件。
此时可以构造恶意穿越名称，解压时可以穿越写文件。