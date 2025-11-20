对象的反序列化技术实现并不唯一。常见的反序列化协议有：
```
XML&SOAP 
JSON 
Protobuf 
Java Serializable接口
```

场景：
  1、不安全的json反序列化成Java对象，触发攻击链。如fastjson组件，关键词parseObject。
  2、不安全xml反序列化成Java对象，触发攻击链等。
  3、关键词：
```
ObjectInputStream.readObject
ObjectInputStream.readUnshared

XMLDecoder.readObject
Yaml.load
XStream.fromXML
fromXML
ObjectMapper.readValue
readValue

JSON.parseObject
JSON.parse
```

危害：通过触发反序列化攻击链，可以导致系统远程代码执行、写入木马等。
防御：升级Java的jdk版本，更换或升级出现漏洞的组件。

^
## **案例**

原生反序列化
```
ObjectInputStream ois= new ObjectInputstream(new FileInputStream(filePath));
Object objj= ois.readobject();
```


fastjson案例
```
@RestController
@RequestMapping(value = "/fastjson")
public class FastJsonController {

    @PostMapping(value = "/create")
    public Teacher createActivity(@RequestBody String applyData,
                                  HttpServletRequest request, HttpServletResponse response){
        Teacher teachVO = JSON.parseObject(applyData, Teacher.class);
        return teachVO;
    }
}
```

^
## **利用**
根据不同的反序列化点
会自动调用方法、初始化块，静态块等。
```
Java原生的标准反序列化要利用一定要满足两个条件，入口类实现了序列化接口并且重写了readObject函数。
实现序列化接口的类才能被Java序列化和反序列化，重写readObject方法才有可能执行到危险方法。否则无法调起和执行其他代码，更无从谈起利用。
要找到这么一个类，他可以反序列化并且重写了readObject方法，readObject方法中可以利用，则我们就反序列化这个类。

又如Fastjson反序列化自动调用之一是，类中setXxx(一个参数) 类似的方法，即使类中没有xxx属性。
```
寻找对应的利用类。
