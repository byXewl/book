系统环境代理设置

编辑文件为/etc/profile，如果只想给自己的账户设置，则编辑\~/.bashrc即可

添加：
```
export http_proxy="http://child-prc.intel.com:913"

export https_proxy="http://child-prc.intel.com:913"

export ftp_proxy=$http_proxy
```
然后source /etc/profile 或者source ~/.bashrc即可

^
临时
```
export HTTP_PROXY=http://192.168.192.28:10809
export HTTPS_PROXY=http://192.168.192.28:10809
export http_proxy=http://192.168.192.28:10809
export https_proxy=http://192.168.192.28:10809

查看：
env | grep -i proxy
```


