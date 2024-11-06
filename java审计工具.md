JD-GUI：class转java

Fortify：利用fortify进行扫描，生成初步扫描结果，进行误报分析，排除误报
  --开心版安装使用参考：<https://blog.csdn.net/qq_51577576/article/details/128429287>

SonarQube：静态扫描，可以免费使用，而Fortify需要许可证

CodeQL：codeql

PMD

FindBugs

jar-analyzer：对jar包漏洞一键分析等：<https://github.com/jar-analyzer/jar-analyzer>

ChanziSAST 铲子：静态SAST扫描

框架项目一键搭建工具：<http://goldpankit.com/>

## **IDEA**
IDEA：全局搜索，视图-方法调用层次，变量-查找用法，反编译
新功能：<https://mp.weixin.qq.com/s/Ke5ehiVE4sU-TAQalVKhtQ>

## **IDEA插件**
1、IDEA代码审计插件SecInspector：<https://github.com/KimJun1010/inspector>
安装后，代码-检查代码-规则-全不选-只选java中漏洞扫描Inspector-开始分析

^
2、mybatis插件
mybatis的mapper中xml点击跳转方法插件：free-idea-mybatis(Free MyBatis Tool 绿色箭头)，mybatisx(鸟头)
mybatis查看编译后执行sql语句插件：MyBatis Log Free (点击tools，再点击监听) ps：只能看看就好，无法参考。推荐使用php程序的mysql监控。

^
3、自动化检测第三方依赖包漏洞可使用 dependency-check 。
官方地址：
https\://owasp.org/www-project-dependency-check/
Github地址：
https\://github.com/jeremylong/DependencyCheck
通过maven方式：<https://www.jianshu.com/p/f6478a3c5901>

^
4、pom.xml查看依赖版本。
查看项目所有依赖树（附属依赖）
```
mvn dependency:tree
```






^
## **CodeQL**
Github收购的静态漏洞扫描工具。
学习和配套漏洞靶场。
<https://www.freebuf.com/articles/web/283795.html>

#### **安装**
1、安装可执行文件codesql ，并加入PATH环境变量。
2、安装sdk规则，在规则目录执行，codeql pack ls查看规则。

#### **运行**
通过命令：
可执行文件codesql + 项目路径 = 生成数据库
可执行文件codesql + 数据库 + 规则 = 检测漏洞  
或
vscode安装codesql插件，配置可执行文件路径，执行数据库，进行一个规则一个规则点(不好，用命令行可以批量)。

^
结合CodeQLpy项目，就可以不写ql语句检测漏洞。

华夏erp2.3配置codeql
<https://www.freebuf.com/articles/web/377973.html>
<https://ai2news.com/blog/3347130/>
<https://www.cnblogs.com/bmjoker/p/14856437.html>
