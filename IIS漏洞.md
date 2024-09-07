## **IIS服务器组件**
是一套windows服务器，包括ftp服务器,web服务器等。
常部署c#的asp程序。


## **常见版本**
1. **IIS 6.0:**
   * 运行在 Windows Server 2003 上。
   * 是 Windows Server 2003 的默认 Web 服务器。

2. **IIS 7.x:**
   * IIS 7.0 运行在 Windows Vista 和 Windows Server 2008 上。
   * IIS 7.5 运行在 Windows 7 和 Windows Server 2008 R2 上。
   * IIS 7.0 和 IIS 7.5 有一些共同的特性，但也有一些不同之处。

3. **IIS 8.0:（国企多）**
   * 运行在 Windows 8 和 Windows Server 2012 上。

4. **IIS 8.5:（国企多）**
   * 运行在 Windows 8.1 和 Windows Server 2012 R2 上。

5. **IIS 10.0:**
   * 运行在 Windows 10 和 Windows Server 2016 上。
   * IIS 10.0 还支持 HTTP/2 协议。


## **IIS常见历史漏洞**
IIS 6.0 解析漏洞
IIS 7.x 短文件泄露漏洞
ms15-034拒接服务攻击。
IIS put漏洞 (本质是任意文件上传)
原理：IIS开启了WebDAV配置了可以写入的权限，造成了任意文件上传漏洞。防御：关闭webDAV；关闭写入权限。
## **IIS解析漏洞**
IIS6.0:
1. 一个目录的名以".asp、.asa、.cer、.cdx"的字符串结尾，那么这个目录下所有文件都会以asp脚本解析。如:"test.asp/1.jpg"，1.jpg当作asp解析。
2. 一个文件的名称含有".asp;  、.asa;、.cer;、.cdx;"
    会优先以asp解析。如:"1.asp;.jpg"。 

防御方法：
1. 禁止上传和创建此类畸形文件
2. 图片存放目录设置为禁止脚本执行


^
IIS7.0/7.5:
1. 解析php时，在文件名的url后加"/xx.php",就会以php解析。
    如:"/upload/1.jpg/1.php"。

## **IIS短文件名猜测**
短文件名猜解原理：IIS的短文件名机制，可以暴力破解文件名。访问构造某个存在的短文件，会返回404，访问构造某个不存在的短文件，会返回400。使用payload验证目标是否存在短文件漏洞，显示404时，说明存在短文件。
防御方法：
1、升级.netframework
2、修改注册表键值:HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem修改NtfsDisable8dot3NameCreation为1。修改完成后，需要重启系统生效。命令行关闭fsutilbehaviorsetdisable8dot3

^
短文件名漏洞（通常称为"8.3 文件名漏洞"）是一个与 Windows 文件系统相关的安全问题，它源自于旧的DOS文件名系统的限制。在DOS时代，文件系统只允许文件名长度最多为8个字符，加上3个字符的扩展名。因此，每个文件都有一个与之对应的"8.3"格式的短文件名。
在现代Windows系统中，尽管文件名可以更长，但8.3格式的短文件名仍然被创建和使用，以确保与旧系统的兼容性。这个特性可以被用来发现和访问系统中的文件，即使它们的长文件名被设置为隐藏或不允许直接访问。
### 短文件名漏洞的表现：
1. **文件枚举**：攻击者可以尝试猜测或枚举系统中的文件和目录的短文件名。
2. **信息泄露**：通过访问短文件名，攻击者可能获取敏感信息或访问他们本不应该访问的文件。
3. **路径遍历**：攻击者可能利用短文件名来绕过某些安全限制，访问文件系统的其他部分。

^
探测利用工具：
<https://github.com/lijiejie/IIS_shortname_Scanner>
<https://github.com/bitquark/shortscan>
本地搜shortscan