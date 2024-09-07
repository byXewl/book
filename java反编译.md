反编译class文件，jar文件解压后为class文件。

工具：
jd-gui适合看。
jadx。
idea看和反编译源代码idea中的最好用，java-decompiler.jar。

idea反编译原来的jar成源代码：
```
-反编译：
java -cp IDEA_HOME/plugins/java-decompiler/lib/java-decompiler.jar
org.jetbrains.java.decompiler.main.decompiler.ConsoleDecompiler -
dgs=true  <src.jar> <dest dir>

-具体命令：
"D:\Java\jdk11\bin\java.exe" -cp "C:\Program
Files\JetBrains\IntelliJ IDEA 2022.1.3\plugins\java-decompiler\lib\java-decompiler.jar"
org.jetbrains.java.decompiler.main.decompiler.ConsoleDecompiler -
dgs=true cobaltstrike.jar coba
```
将原来的jar文件，添加作为库依赖
src目录下新建对应名.java，编译打包时，新的src下代码就会覆盖原来jar里的class。