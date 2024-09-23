SnakeYaml是java解析yaml格式的组件库，SnakeYaml反序列化漏洞不存在版本限制，前提是能控制反序列化数据流。


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
全类名指定反序列化的类，反序列化过程中会实例化该类。snakeyaml 将全类名解析，并将类使用forname()进行加载，然后通过反射获取构造器，调用构造方法，控制适当的类的构造方法就能进行漏洞攻击。

