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