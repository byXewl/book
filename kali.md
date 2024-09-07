Kali Linux 是基于Debian分支构建的。
vm虚拟机下载：
<https://mirrors.aliyun.com/kali/dists/kali-dev/?spm=a2c6h.25603864.0.0.39b15a29Xh6VfR>
初始化配置：
<https://blog.csdn.net/sdhswddlj/article/details/135394004>
默认使用apt软件源。可配置镜像源。

## **自带工具集：**
sqlmap，msf等
在/usr/share/目录下


^
## **自带编程环境：**
```
Kali Linux 自带了 Python 2 和 Python 3 的版本,只带了pip3:
python --version
python2 --version
python3 --version
pip3 -V

安装pip2:
wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
sudo python2 get-pip.py
升级
sudo pip2 install --upgrade pip 
安装pip2扩展工具，不然后面安装还是报错 
sudo pip2 install --upgrade setuptools
   

Kali Linux 自带了php
php -v

Ruby 环境，Ruby 是一种脚本语言：
ruby --version
 
Perl 是另一种常用的脚本语言，包含在 Kali Linux 中：
perl --version


自带java环境
```

## **默认有的账户:**
```
* Live 镜像或者 kali Linux 官方安装好的虚拟机镜像
* * 用户名：`kali`
  * 密码：`kali`
* [BeEF-XSS]
* * 用户名： `beef`
  * 密码： `beef`
  * 配置文件： `/etc/beef-xss/config.yaml`
* MySQL
* * 用户： `root`
  * 密码：`空白`
  * 安装程序： `mysql_secure_installation`
* [OpenVAS]
* * 用户名： `admin`
  * 密码： `在安装的过程中生成`
  * 安装程序： `openvas-setup`
* [Metasploit框架]
* * 用户名： `postgres`
  * 密码： `postgres`
  * 配置文件： `/usr/share/metasploit-framework/config/database.yml`
    用于连接自带的postgresql数据库

```