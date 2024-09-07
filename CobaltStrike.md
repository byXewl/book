Cobalt Strike（CS）团队作战工具
Cobalt Strike由来：
metasploit（MSF）是一款开源框架，armitage是metasploit框架的图形化界面方式， cobalt strike是armitage的增强版，同时也是收费软件。cobalt strike在2.0版本还是依托metasploit框架，在3.0之后的版本使用单独的平台。
^
目前主流4.+版本，分为客户端和服务端。
服务端只能安装在linux，默认端口为50050，并且需要java环境，最好java11环境。
^
Cobalt Strike集成了端口转发、扫描多模式端口Listener、Windows exe程序生成、Windows dll动态链接库生成、java程序生成、office宏代码生成， 包括站点克隆获取浏览器的相关信息等。
例：创建监听器，生成后门exe文件绑定监听器，让对方windows下载打开运行（没有被安全软件杀死），CS里即可看到上线shell。

更多说明：<https://wbglil.gitbook.io/cobalt-strike>
魔改项目：<https://mp.weixin.qq.com/s/RBS-cIXs6ktw2SN36SBS-w>
![image-20240402210022441](http://cdn.33129999.xyz/mk_img/image-20240402210022441.png)

^
## **服务端部署**
服务端一般部署在linux，默认端口为50050，并且需要java环境jdk8。
4.7以下java8，4.8以上java11
```
配置java的Path环境变量，多用户所有生效：
在 /etc/profile 文件中末尾添加以下行：

JAVA_HOME=/www/server/java/jdk1.8.0_371
CLASSPATH=$JAVA_HOME/lib/
PATH=$PATH:JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH

再刷新source /etc/profile
就可以任意使用java命令。
```
将teamserver配套文件上传服务器
启动服务端：
```
chmod 777 teamserver
chmod +x teamserver cobaltstrike
chmod +x TeamServerImage
./teamserver 当前服务器ip 密码
如：./teamserver 47.109.58.20 3312
./teamserver 192.168.16.128 3312
./teamserver 192.168.20.128 byxe

nohup ./teamserver ip 密码  //后台运行，关闭终端依旧运行
nohup ./teamserver 47.109.58.20 chenjie

nohup关闭：
ps aux | grep your_program_name  
kill -15 your_pid
```

## **客户端连接**
Linux上./cobaltstrike启动客户端
或windows启动
输入ip端口号50050，用户名随便填不要和团队其他一样，密码就是服务端启动时设置的如3312。

^
## **程序文件说明**
agscript：扩展应用的脚本     
c2lint：该文件主要检查profile的错误和异常     
teamserver：服务端启动程序     
cobaltstrike.jar：CobaltStrike主要核心程序     
cobaltstrike.auth：用于客户端和服务端认证的文件（建议自己有时间可以查看一下cs的源码） 
cobaltstrike.store：密钥证书存放文件    
data：用于保存当前TeamServer的数据     
logs：日志文件（web日志、Beacon日志、截图日志、下载日志、键盘记录日志等等）     
third-party：第三方工具目录     
AggressorScripts-master：插件目录 复制

## **客户端界面操作**
<https://cloud.tencent.com/developer/article/2160439>
<https://www.freebuf.com/articles/web/255876.html>

例：创建监听器，生成后门exe文件绑定监听器，让对方windows下载打开运行（没有被安全软件杀死），CS里即可看到上线shell。<https://cloud.tencent.com/developer/article/2160439>

^
1.创建监听器:
点击左上耳机

Payload协议选择：一般http
>nc可以接收查看是什么请求包协议，tcp、udp、http、dns等：nc -lvvp 1234

监听域名(第一个)：就是服务端域名。如果有cdn，可以放多个cdn的ip进行轮询。
上线端口：就是服务端开放的一个端口就行。
绑定端口不填。
有域名可填HOST头。
其他不用管。
^
2.生成后门程序：
绑定监听器
选择程序类型
^
3.后门程序在目标机运行：
（测试时有windows安全，右击后门程序手动扫描检测有病毒，但任然保留程序在电脑即可）
^
4.即可看到上线：
进行beacon操作。
有图形化按钮或beacon命令。
如查看目标机文件目录，截屏，提权等。

beacon命令:
sleep 0
shell whoami   
getuid
<https://blog.csdn.net/kang_12358/article/details/107319366>

spawn 监听器名 ：进行监听器传递上线。



