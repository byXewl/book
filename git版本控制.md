本地文件->git工作区->git暂存区->git本地仓库->git远程仓库


## **gitee协作**
```
电脑安装git，git配置好邮箱，gitee绑定等。
gitee创建项目，邀请成员，加入项目组。

克隆创建本地仓库
git clone https://gitee.com/xewl/internet-outsourcing-project.git

进去
cd internet-outsourcing-project/

创建自己的分支
git checkout -b fenzhi01

切换到自己分支
git checkout fenzhi01

将最新主分支pull到自己分支
git pull origin master:fenzhi01
或 git pull origin master

测试修改文件，提交本地仓库
git add .
git commit -m "第一次修改"

将本地仓库的分支推送到远程仓库的分支
git push origin fenzhi01


gitee上远程仓库手动将分支合并到主分支
gitee项目上点[Pull Requests]
```
^
## **git删除历史记录.bat**

创建新的分支
在新分支下创建和提交
然后删除主分支
修改当前分支名字为主分支名字
将当前分支强行推上去

```bash
git checkout --orphan clean_log
git add .
git commit -m "add"
git branch -D master
git branch -m master
git push -f origin master
```