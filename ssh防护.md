1.避免弱密码
2.使用密钥登录
/etc/ssh/sshd_config中PubkeyAuthentication yes
>SSH（Secure Shell）使用密钥登录的原理时涉及公钥加密和非对称加密技术：
>1. **生成密钥对：** 首先在本地系统上生成一对密钥，包括公钥和私钥。这可以通过使用 ssh-keygen`命令来完成。公钥是用于加密的，而私钥则用于解密。
>2. **传输公钥到服务器：** 将生成的公钥传输到远程服务器。通常，这是通过将公钥内容添加到服务器上的 `~/.ssh/authorized_keys` 文件中来实现的，生成公钥和私钥的过程是统一的，但是将公钥放在不同的用户目录下，使得该用户可以通过其私钥进行登录。普通用户：~/.ssh/authorized_keys。root 用户： /root/.ssh/authorized_keys 。
也可以多个公钥放在同一目录
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDa71... 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDt9j...

>3. **加密登录请求：** 
    ssh -i /path/to/private/key user@hostname
    当用户尝试连接到远程服务器时，服务器会向用户发送一个随机的挑战字符串。
>4. **使用私钥进行加密：** 用户的 SSH 客户端使用私钥对挑战字符串进行加密。
>5. **传输加密后的挑战：** 用户将加密后的挑战字符串发送回服务器。
>6. **使用公钥进行解密：** 服务器使用用户的公钥对接收到的加密挑战字符串进行解密。
>7. **验证身份：** 如果解密后的挑战字符串与服务器预期的一致，服务器就可以确认用户的身份，并允许用户登录。




3.防火墙关闭22端口，通过wireguard（VPN）虚拟内网访问
4.关闭ssh服务
**ssh登录失败和成功日志：**
```
登录日志
last -f /var/log/wtmp |less 
登录失败
last -f /var/log/btmp |less
```
Ubuntu、Debian 等使用 systemd 的系统：
```
 /var/log/auth.log
```
 CentOS、RHEL 等使用 rsyslog 的系统：
```
 /var/log/secure
```

**防止ssh爆破，关闭密码登录：**
```
vi /etc/ssh/sshd_config
PermitRootLogin yes
PasswordAuthentication yes

/etc/init.d/ssh start
/etc/init.d/ssh restart
```

^
## **配置不当**
1. `/root/.ssh/authorized_keys`：
   * 这个文件存储了允许连接到服务器的公钥列表。每个公钥占一行，可以有多个公钥。当用户尝试通过SSH使用对应的私钥连接服务器时，服务器会检查用户的公钥是否在这个文件中。如果是，用户可以无密码登录（前提是SSH配置允许公钥认证）。

2. `/root/.ssh/id_rsa.pub`：
   * 这是SSH服务器使用的公钥，通常与私钥`id_rsa`配对。公钥用于加密会话密钥，私钥用于解密。在SSH公钥认证中，用户会将这个公钥复制到远程服务器的`authorized_keys`文件中，以便在连接时进行身份验证。

3. `/root/.ssh/id_rsa`：
   * 这是SSH服务器使用的私钥，通常与公钥`id_rsa.pub`配对。私钥在SSH公钥认证中用于解密会话密钥，确保只有拥有私钥的用户才能成功建立SSH连接。

如果/root/.ssh/id_rsa文件私钥被恶意读取到，并且公钥在authorized_keys中，则可以直接登录ssh。
