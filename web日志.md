## Web日志

* web日志会记录用户对web页面的访问操作
* web日志会记录访问时间、访问IP地址、访问资源，以及是否访问成功等信息

## 清除Apache日志痕迹

```
搜索日志
        find / -name “*access*.log”
删除
        sed -i '/192.168.7.1/'d /var/log/apache2/access.log
修改
        sed -i 's/192.168.7.1/127.0.0.1/' /var/log/apache2/access.log
```

## 清除Nginx日志痕迹