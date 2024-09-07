
java环境变量：
JAVA_HOME
```
D:/java/bin
```
CLASSPATH  为了java 运行class文件
```
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;%JAVA_HOME%\jre\lib\rt.jar;%JAVA_HOME%\lib\dt.jar
```

java8
java11
java17
最好都准备，java8才有javaFX库，一些图形工具要用他。
```
高版本也可以下载一个javafx-sdk-18.0.2然后用下面命令：
java -Dfile.encoding="UTF-8" --module-path "前置路径/javafx-sdk-18.0.2/lib" --add-modules "javafx.controls,javafx.fxml,javafx.web" -jar "工具.jar"
```


一些bp，cs工具可能用到java11以上。