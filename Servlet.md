### **Servlet**
Servlet是javaweb中处理请求的一种对象。
对象有方法，定义对应的方法可以自动处理对应的请求和响应。
Servlet不是直接运行在JVM上，而是JVM上的容器中（如Tomcat）。
Tomcat容器跑起来就可以让请求可以找到对应注册了的Servlet对象及对象中方法。
<br>
<br>
### **一个Servlet的构成**
**Servlet接口**：定义了init,service,destroy等方法让实现类去实现。
**GenericServlet类**：
抽象类，实现了部分Servlet接口和配置接口，但没有完全实现Servlet接口。
最重要的service方法没有实现。(如果一个类扩展实现，也叫servlet类)
实现了getServletContext方法可获取全局上下文对象。
**HttpServlet类**：
继承GenericServlet类，实现了service方法(只处理http请求)，service方法中又调用本类中的doGet，doPost等方法。
使用者需要去service或重写doGet，doPost等方法，否则返回405请求方法不可以。
**开发者自定义继承HttpServlet的类**：
可以重写init,service,destroy或doGet等方法，实现MVC的控制层功能。
可以将这个类通过xml或注解来注册到程序模块中，使得可以被访问到而自动实例对象。
<br>
<br>
### **一个Servlet运行在tomcat的生命周期**
1.加载和实例化：一般来说，开发者自定义的一个Servlet只有第一次被访问时，tomcat才会去实例创建这个Servlet对象，之后再访问这个Servlet就是实例。当然也可以通过配置让在tomcat启动时就把自定义的Servlet按顺序实例创建。
2.初始化：一个Servlet只实例化时调用一次他的init()方法。
3.请求处理：访问一次就会调用一次service方法处理请求
4.服务终止：容器关闭，或主动关闭一个Servlet时，会自动调用destroy方法，实例被gc回收。

