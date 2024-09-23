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
