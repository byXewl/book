## **CS本身自带休眠**

"休眠"通常指的是恶意软件或攻击者控制的代理（如Cobalt Strike的Beacon）在一段时间内不执行任何显著活动或网络通信的状态。这种休眠状态可以用于以下目的：
1. **避免检测**：通过减少活动频率，恶意软件可以降低被入侵检测系统（IDS）、反病毒软件或其他安全工具发现的风险。
2. **隐蔽性**：休眠可以让攻击者控制的代理在网络中保持隐蔽，只有在特定条件下或在攻击者触发时才进行通信。
3. **节省资源**：休眠还可以帮助节省受感染系统或代理的资源，因为它们不需要持续执行复杂操作或保持网络连接。

即使在休眠状态，某些恶意软件或代理可能会发送"心跳包"，这是一种简单的网络通信，用于确认代理仍然处于活动状态并等待进一步的指令。心跳包通常具有以下特点：
* **小尺寸**：心跳包通常很小，只包含必要的信息，以减少被网络监控工具检测到的机会。
* **低频率**：心跳包的发送频率可能很低，例如每小时或每天一次，以避免引起注意。
* **伪装**：心跳包可能被设计成看起来像正常的网络流量，例如HTTP请求或DNS查询，以避免引起怀疑。
                    使用Tcpview等软件实时查看网络外链。


^
## **反编译二开**
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

反编译cs4.4以上的cobaltstrike.jar最好用java11
版本要对应，最好准备好java8 java11 java17等
/d/java1/jdk11/bin/java.exe -cp "/d/Program Files/Android/Android Studio/plugins/java-decompiler/lib/java-decompiler.jar" org.jetbrains.java.decompiler.main.decompiler.ConsoleDecompiler -dgs=true -rf=1 ./cobaltstrike-client.jar coba

```
将原来的jar文件，添加作为库依赖
src目录下新建对应名.java，编译打包时，新的src下代码就会覆盖原来jar里的class。


^
## **拓展哥斯拉、冰蝎二开**
哥斯拉，冰蝎由java开发，魔改过程其实就以下几步：
(1)反编译
(2)修改指纹、添加更多的加密算法
(3)项目重新整合，运行
总结：操作简单，得懂java开发！