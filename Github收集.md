## **github代码泄露**
GitHub搜 域名+password，看看有没有密码泄露。
可以搜edusrc上面的学校。
如：
```
eee.edu.cm+password
eee.edu.cm password
eee.edu.cm password in:file

@eee.edu.cm password
```

^
## **github项目被删搜索**
使用这个搜索备份：https://grep.app/
或github搜索同名，勾选有star等。


## **GitHub搜索语法**
```
防止广告，可净量用英文输入。
in:name mini-app           #仓库标题搜索含有关键字"mini-app"
in:descripton web          #仓库描述搜索含有关键字"web"
in:readme node             #README文件搜素含有关键字"node"
org:github                 #匹配github名下的仓库
stars:>3000                #stars数量大于3000的搜索仓库
stars:1000..3000           #stars数量大于1000小于3000的仓库
forks:>1000                #forks数量大于1000的搜索关键字
forks:1000..3000           #forks数量大于1000小于3000的搜索仓库
size:>=5000                #指定仓库大于5000k(5M)的搜索仓库
pushed:>2019-02-12         #发布时间大于2019-02-12的仓库
created:>2019-02-12        #创建时间大于2019-02-12的仓库
mirror:true(false)         #是否是镜像仓库
archived:true(false)       #是否是废弃的仓库
user:jack                  #用户名为"jack"的仓库
license:apache-2.0         #仓库的 LICENSE为"apache-2.0"
language:java              #使用"java"语言的仓库
user:jack in:name web      #组合搜索,用户名为"jack",且标题含有"web"的
topic:jekyll               #匹配topic中含有关键字"jekyll"的仓库
topic:5                    #匹配拥有5个topic的仓库
topic:>3                   #匹配拥有3个以上topic的仓库
is:public                  #公开的仓库
is:private                 #匹配有权限的私有仓库
```

## **搜issues**
```
漏洞
Reproduction
Unsafe Code
危害
```