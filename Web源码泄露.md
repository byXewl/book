## Web源码泄露漏洞

**常见的Web源码泄露：**

- • git源码泄露
- • svn源码泄露
- • DS_Store 文件泄露
- • 网站备份压缩文件泄露
- • Web-INF/Web.xml 泄露
- • CVS泄露
- • hg源码泄漏
- • Bazaar/bzr泄露
- • SWP 文件泄露

### 1、git 源码泄露

#### 漏洞成因：

Git是一个开源的分布式版本控制系统，在执行git init初始化目录的时候，会在当前目录下自动创建一个.git目录，用来记录代码的变更记录等。发布代码的时候，如果没有把.git这个目录删除，就直接发布到了服务器上，攻击者就可以通过它来恢复源代码。
而.git目录结构如下:
![null](http://cdn.33129999.xyz/mk_img/1665492399_634565afccc92e831df5f.png!small)

- • **HEAD：**这个git项目当前处在哪个分支里；
- • **config：**文件包含项目特有的配置选项，git config命令会改动它；
- • **description：**项目的描述信息
- • **hooks/：**系统默认钩子脚本目录
- • **info/：**目录包含一个全局性排除（global exclude）文件，用以放置不希望被记录在 .gitignore 文件中的忽略模式（ignored patterns）
- • **objects/：**目录存储所有数据内容 (commits, trees, blobs, tags)
- • **refs/：**标识你项目里的每个分支指向了哪个提交(commit)。
- • **index:**文件保存暂存区信息

需要注意的就是HEAD、index、objects、refes这四个条目，在发布代码时若果没有把.git目录删除，直接发布到了运行目录。攻击者就可以通过这个文件夹，用来获取源代码
例如：

```
<http://www.test.com/.git/config>
```

#### 漏洞利用：

利用工具：GitHack（一个.git泄露利用脚本，通过泄露的.git文件夹下的文件，重建还原工程源代码。）
用法示例：

```
GitHack.py http://www.test.com/.git/
```

靶场示例：BABY PHP

![null](https://image.3001.net/images/20221011/1665492400_634565b08674deeee942c.png!small)

浏览页面，发现GIT，猜测有源码泄露，小试一下

![image.png](https://image.3001.net/images/20221011/1665492401_634565b136b1f746b8613.png!small)image.png

发现存在.git目录泄露

![image.png](https://image.3001.net/images/20221011/1665492401_634565b1cce9e0e21702b.png!small)image.png直接上工具
![null](https://image.3001.net/images/20221011/1665492402_634565b287a68f1e732ea.png!small)可成功获取源文件
![null](https://image.3001.net/images/20221011/1665492403_634565b30cd4a940ba5af.png!small)

#### 修复建议：

删除.git目录或者修改中间件配置进行对.git隐藏文件夹的访问。

### 2、SVN 源码泄露

#### 漏洞成因：

SVN是源代码本地管理软件。使用SVN管理本地代码过程中，会生成一个名为.svn的隐藏文件夹，其中包含重要的源码信息。而造成.svn文件泄露的主要原因还是网站管理员在发布代码时，没有使用导出功能，而直接进行复制粘贴。

#### 漏洞利用：

关于.svn源码泄露漏洞利用，如今依照版本不同，也分两种方式。一种是**svn>1.7**,另一种是**svn<1.7**。

- • svn>1.7,文件名会被hash，然后再按照文件名对应hash的方式存到wc.db中,就是个sqlite数据库。最后我们按照名称遍历下载即可。
- • svn<1.7,文件会先去读取entries文件的中的目录结构,因为默认文件名都是直接明文存的。

可通过访问.svn/entries进行判断svn的版本,例如:

```
<http://www.test.com/.svn/entries>
```

利用工具：svnExploit（SVN源代码利用工具，其完美支持SVN<1.7版本和SVN>1.7版本的SVN源代码泄露）

- • 示例1： svn<1.7
  像我们通过访问目标地址+`/.svn/entries`，可以看到下面这些数据的，以此判断是<1.7的
  ![null](https://image.3001.net/images/20221011/1665492403_634565b3a51605e172326.png!small)

使用svnexploit进行测试,命令如下：

```
python .\svnExploit.py -u [http://www.xxx.com/.svn/](http://www.xxx.com/.svn/)
```


![null](https://image.3001.net/images/20221011/1665492404_634565b450f8684e7b96a.png!small)--dump 一下
![null](https://image.3001.net/images/20221011/1665492405_634565b5008441c1aad53.png!small)这样源码就被我们给dump下来了
![null](https://image.3001.net/images/20221011/1665492405_634565b5c1056d4897790.png!small)

- • 示例2： svn>1.7
  像我们通过访问目标地址+`/.svn/entries`，可以看到页面中“12”字样的，以此判断是>1.7的
  ![null](https://image.3001.net/images/20221011/1665492406_634565b684c5115ffe6b9.png!small)

直接上svnexploit
![null](https://image.3001.net/images/20221011/1665492407_634565b721ff9e621064e.png!small)我们通过使用工具SQLiteStudio工具，对wc.db进行读取
![null](https://image.3001.net/images/20221011/1665492407_634565b7e94ac30585561.png!small)在**NODES表**中，通过遍历local_relpath列下的每一行，我们就可以下载这个系统的所有代码数据了
![null](https://image.3001.net/images/20221011/1665492408_634565b8e240809aed769.png!small)在**REPOSITORY表**中，里面存储了svn的项目路径和 uuid，如果没有做访问IP限制的话，你可以直接使用此信息取得此项目的SVN权限（下载、提交等）
![null](https://image.3001.net/images/20221011/1665492409_634565b9b4e3ecfbb5b65.png!small)

#### 修复建议：

- • 不要使用svn checkout和svn up更新服务器上的代码，使用svn export（导出）功能代替。
- • 使用git代替svn。
- • 服务器软件（Nginx、apache、tomcat、IIS等）设置目录权限，禁止访问.svn和.git目录，下面示范为禁止访问点号开头的目录

### 3、DS_Store 文件泄露

#### 漏洞成因

.DS_Store是Mac OS保存文件夹的自定义属性的隐藏文件，如文件的图标位置或背景色，相当于Windows的desktop.ini。
由于开发人员发布代码时未删除文件夹中隐藏的.DS_store，可能造成文件目录结构泄漏、源代码文件等敏感信息的泄露。

#### 漏洞利用

我们可以通过直接访问`url+/.ds_store`来判断是否存在此漏洞
利用工具： ds_store_exp示例：
ds_store_exp是一个.DS_Store 文件泄漏利用脚本，它解析.DS_Store文件并递归地下载文件到本地

```
命令：python ds_store_exp.py https://www.xxx.com/.DS_Store
```

![null](https://image.3001.net/images/20221011/1665492410_634565ba689901fcf5fdd.png!small)![null](https://image.3001.net/images/20221011/1665492410_634565bae4445c706c9be.png!small)

#### 修复建议

不影响应用运行的情况下删除.DS_Store文件

### 4、网站备份压缩文件泄露

#### 漏洞成因

在网站正常使用中，往往需要经过修改和升级，这时就需要对网站或对某处数据进行备份。而备份文件会因为各种原因保存在网站web目录下，而当对此目录没有访问权限限制时，就很可能会导致备份或缓存文件被下载下来。
该漏洞往往会导致服务器整站源代码或者部分页面的源代码被下载，利用。源代码中所包含的各类敏感信息，如服务器数据库连接信息，服务器配置信息等会因此而泄露，造成巨大的损失
**常见的备份文件后缀**：

- • .rar
- • .zip
- • .7z.
- • tar
- • .gz
- • .bak
- • .swp
- • .txt
- • .html

#### 漏洞利用

像备份压缩文件泄露，可以直接用专门的目录扫描工具进行敏感文件扫描
利用工具：御剑、disearch.py

![null](https://image.3001.net/images/20221011/1665492411_634565bb82401f1fe8474.png!small)![null](https://image.3001.net/images/20221011/1665492412_634565bc09ebac299eb47.png!small)

#### 修复建议

- • 做好目录访问限制
- • 在不影响运行的情况下，及时删除备份文件

### 5、WEB-INF/web.xml泄露

#### 漏洞成因

**概念：**WEB-INF是Java的WEB应用的安全目录。如果想在页面中直接访问其中的文件，必须通过web.xml文件对要访问的文件进行相应映射才能访问。
**WEB-INF**主要包含一下文件或目录：

- • /WEB-INF/web.xml：Web应用程序配置文件，描述了 servlet 和其他的应用组件配置及命名规则
- • /WEB-INF/classes/：含了站点所有用的 class 文件，包括 servlet class 和非servlet class，他们不能包含在 .jar文件中
- • /WEB-INF/lib/：存放web应用需要的各种JAR文件，放置仅在这个应用中要求使用的jar文件,如数据库驱动jar文件
- • /WEB-INF/src/：源码目录，按照包名结构放置各个java文件。
- • /WEB-INF/database.properties：数据库配置文件

WEB-INF/web.xml泄露的起因就是我们在使用网络架构的时候，对静态资源的目录或文件的映射配置不当，可能会引发一些的安全问题，导致web.xml等文件能够被读取。

#### 漏洞利用

通过找到web.xml文件，分析可用敏感信息，推断class文件的路径，直接class文件，最后再通过反编译class文件，得到网站源码。
**示例：**【RoarCTF 2019】Easy Java1

![null](https://image.3001.net/images/20221011/1665492412_634565bca2c71a8a98018.png!small)开局我们访问靶机地址，是个登录页面
![null](https://image.3001.net/images/20221011/1665492413_634565bd474d8d5ec3114.png!small)点开help发现，提示java
![null](https://image.3001.net/images/20221011/1665492413_634565bddc24ad550e839.png!small)有个download，尝试改为post，试下任意文件下载，输入/WEB-INF/web.xml
![null](https://image.3001.net/images/20221011/1665492414_634565bebf848ddbcb124.png!small)再返回的配置信息中，发现flag的信息，通过推断flag路径，拼接url进行访问，
![null](https://image.3001.net/images/20221011/1665492415_634565bf8647bdddee367.png!small)猜测flag进行了base64加密，进行解密，成功找到了flag
![null](https://image.3001.net/images/20221011/1665492416_634565c0ab74915d8cee3.png!small)

#### 修复建议

控制目录访问权限

### 6、CVS泄漏

#### 漏洞成因

cvs项目在初始化(cvs checkout project)的时候, 会在project目录下创建一个名为CVS的目录,
其中保存了各个文件的修改和commit记录. 通过此目录可以获取代码的历史版本. 其中两个关键文件为:
CVS/Root和CVS/Entries, 分别记录了项目的根信息和所有文件的结构

#### 漏洞利用

主要是针对 **CVS/Root**以及**CVS/Entries**目录，直接就可以看到泄露的信息。

```
<http://www.test.com/CVS/Root>
#返回根信息
```

![null](https://image.3001.net/images/20221011/1665492417_634565c172da36ee1a172.png!small)

```
<http://www.test.com/CVS/Entries>
#返回所有的文件结构
```

![null](https://image.3001.net/images/20221011/1665492418_634565c22868a12e62aa4.png!small)

#### 修复建议

删除CVS的CVS目录

### 7、.hg源码泄漏

#### 漏洞成因

Mercurial 是一种轻量级分布式版本控制系统，
使用hg init 新建仓库的时候，会生成一个备份文件.hg。当然也存在着泄露问题，不过较为少见 ，关于这个.hg文件泄露，网上的示例也很少，暂时还没有找到合适的呈现给大家 。

#### 漏洞利用

利用工具：dvcs-ripper

```
rip-hg.pl -v -u http://www.example.com/.hg/
```

当访问`/.hg`存在的时候，就证明存在该漏洞

#### 修复建议

删除web目录中所有.hg隐藏文件夹

### 8、Bazaar/bzr泄露

#### 漏洞成因

bzr也是个版本控制工具, 虽然不是很热门, 但它也是多平台支持, 并且有不错的图形界面。

#### 漏洞利用

利用工具：dvcs-ripper

```
rip-bzr.pl -v -u http://www.example.com/.bzr/
```

#### 修复建议

删除web目录中所有.bzr隐藏文件夹

### 9、.swp文件泄露

#### 漏洞成因

swp即swap文件，在编辑文件时产生的临时文件，它是隐藏文件，如果程序正常退出，临时文件自动删除，如果意外退出就会保留，文件名为 .filename.swp。

#### 漏洞利用

可通过直接访问.swp文件，下载回来后删掉末尾的.swp，获得源码文件。

#### 修复建议

删除web目录中所有.swp隐藏文件夹