## **linux空间清理**
linux存储清理
查看存储
df -h 

查看某个目录下占用存储和文件
du /www/ -h --max-depth=1 | sort -gr

#### **搜大日志文件清理**
find / -size +1G -type f

sudo rm /var/log/mysql/access.log

```
发现大量刚刚删除文件的进程存在，自行kill -f掉进程号
lsof | grep deleted
```


#### **清理docker容器日志**

sh /data/soft/clean_docker_log.sh  清理docker日志。
```
#!/bin/sh 

echo "======== start clean docker containers logs ========"  

logs=$(find /var/lib/docker/containers/ -name *-json.log)  

for log in $logs  
        do  
                echo "clean logs : $log"  
                cat /dev/null > $log  
        done  

echo "======== end clean docker containers logs ========" 
```