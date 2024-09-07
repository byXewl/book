python他人知识库：
基础语法：<https://www.kancloud.cn/haixu926611/study-python/108405>
<https://www.kancloud.cn/kancloud/python-basic/41729>
<https://www.kancloud.cn/kancloud/starter-learning-python/61776>
爬虫多线程：<https://www.kancloud.cn/digest/eastmount-python/120234>

^
## **虚拟环境**
为了方便包依赖不被统一管理删除，每一个程序依赖同一个库的版本可能不同。
使用虚拟环境：<https://www.kancloud.cn/idcpj/python/1347753>
在某一个虚拟环境中安装的依赖只会在该环境中，不会在本地系统公共的pip库里。
```
路径下执行，创建一个名为Demo的虚拟环境目录：
python -m venv Demo 或 virtualenv --no-site-packages Demo

Demo目录里有Include/ Lib/ Scripts/ .cfg目录，是独立的python初始环境，
其中 Scripts/目录里有python.exe和pip.exe
Scripts/目录里有个active，命令执行正式打开一个虚拟环境的终端。

在这里pip install或pip uninstall都不影响系统本地环境的pip。

退出deactive

这个目录右键以pycharm打开，设置中设置python解释器为这个目录里Scripts/python.exe即可。
```

^
## **基础使用**
python 2 的print无() 包管理工具pip2
python 3 的print() 包管理工具pip3

pip install -r requirements.txt
^
包管理升级
pip2 install --upgrade pip 
安装pip2扩展工具，不然后面安装还是报错 
sudo pip2 install --upgrade setuptools

^
.pyc文件
.py文件在被import运行的时候会在同目录下编译一个pyc的文件（为了下次快速加载），这个文件可以和py文件一样使用，但无法阅读和修改；python工具支持将pyc文件反编译为py文件:<https://tool.lu/pyc/>