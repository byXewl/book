shell本身指的是命令解释器，更具体的来讲，shell就是一个用C语言编写的程序，这个程序提供了一个界面，用户可以通过这个界面访问操作系统内核的服务。就像shell的字面意思那样，shell——壳，它是一个壳，一个能让用户与操作系统内核沟通的壳，一个保护操作系统内核不被用户直接调用的保护壳。
^
以上可知shell是提供与内核沟通接口的命令解释器程序，但实际上shell是这种解释器的统称，Linux系统的shell种类很多，包括Bourne shell（简称sh）、Bourne Again shell（简称bash）、C shell（简称csh）、K shell（简称ksh）、Shell for Root等等
^
**bash 和 sh 都是 Unix 和类 Unix 操作系统中的命令解释器，用于执行命令和脚本。
也就是说sh和bash都是Linux系统shell的一种，其中bash命令是sh命令的超集，大多数sh脚本都可以在bash下运行。Linux系统中预设默认使用的就是bash。**

各种shell使用路径:
Bourne Shell （/usr/bin 或 /bin/sh）

Bourne Again Shell （/bin/bash）

C Shell （/usr/bin/csh）

K Shell （/usr/bin/ksh）

Shell for Root （/sbin/sh）



在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，像 #!/bin/sh**，它同样也可以改为 #!/bin/bash。






