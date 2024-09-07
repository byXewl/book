## **Linux配置PATH环境变量**
### 配置java环境
单用户生效：
在当前用户目录下的~/.bashrc或~/.bash_profile文件中
末尾加export PATH=$PATH:/www/server/java/jdk1.8.0_371/bin
再刷新source ~/.bash_profile
就可以任意使用java命令。

^
多用户所有生效：
在 /etc/profile 文件中末尾添加以下行：
export PATH=$PATH:/www/server/java/jdk1.8.0_371/bin
或者JAVA_HOME，CLASSPATH也加上的：
```
JAVA_HOME=/www/server/java/jdk1.8.0_371
CLASSPATH=$JAVA_HOME/lib/
PATH=$PATH:JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH
```
再刷新source /etc/profile
就可以任意使用java命令。