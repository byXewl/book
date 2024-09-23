RMI（Remote Method Invocation）为远程方法调用，是允许运行在一个Java虚拟机的对象调用运行在另一个Java虚拟机上的对象的方法。 这两个虚拟机可以是运行在相同计算机上的不同进程中，也可以是运行在网络上的不同计算机中,它的底层是由socket和java序列化和反序列化支撑起来的。


RMI服务端
```
Registry registry = LocateRegistry.createRegistry(1099);
registry.bind("hello", new HelloServiceImpl());
```
RMI客户端
```
Registry registry = LocateRegistry.getRegistry("127.0.0.1",1099);
HelloService helloService = (HelloService) registry.lookup("hello");
System.out.println(helloService.sayHello());
```
RMI客户端 调用 RMI服务端 的接口实现方法时，服务端同时也会执行这个方法。
 

## **RMI客户端 打 RMI服务端**
当RMI服务端的方法可以接收一个对象参数时，我们可以在客户端调用这个方法，传递一个恶意类对象进去，服务端会同时执行这个方法，实现恶意类执行。
若服务端存在CC链依赖，可以传递一个CC1链的类实现命令执行。


## **RMI客户端 反序列化打 RMI服务端**
RMI的底层协议为JRMP，JRMP本质是序列化数据，远程调用传递后必须反序列化。
直接打反序列化，无需关注服务端的方法和接收参数。
借助ysoserial工具包。
## **RMI服务端 反序列化打 RMI客户端**
前提客户端本地连接服务端的地址可控。
借助ysoserial工具包启动一个恶意RMI服务端，客户端连接即可。
