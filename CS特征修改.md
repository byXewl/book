
修改服务端默认的50050端口
编辑teamserver文件，更改serverport部分

## **修改证书**
CS server >CS clinet :可以直接生成证书使用。
CS server > CDN > CS clinet :需要CDN支持的证书，CDN中申请证书的pem和私钥。


默认证书指纹：
```
所有者:CN=Major Cobalt Strike,OU=AdvancedPenTesting,O=cobaltstrike,L=Somewhere,ST=Cyberspace,C=Earth
发布者:CN=Major Cobalt Strike，OU=AdvancedPenTesting，O=cobaltstrike，L=Somewhere，ST=Cyberspace，C=Earth
```

^
自定义证书
生成证书：
```
java环境bin自带工具keytool
查看当前证书指纹：keytool-list-v-keystore cobaltstrike.store
生成证书指纹：keytool -keystore cobaltstrikel.store -storepass 123456 -keypass 123456 -genkey -keyalg RSA -alias xiaodi8.com -dname "CN=xiaodi8 e-Szigno Root CA, OU=e-Szigno CA, O=xiaodi8 Ltd.,L=Budapest，S=HU,C=HU"
应用证书指纹：keytool -importkeystore -srckeystore cobaltstrikel.store -destkeystore cobaltstrikel.store deststoretype pkcs12
查看当前证书指纹：keytool-list-v-keystore cobaltstrike.store
```
在profile文件中配置后门https走生成的证书。
teamserver文件中修改指向的证书名。
进入cs文件夹，将刚刚生成的证书.store和创建的.profile文件复制进去。
```
./c2lint .profile #命令后面跟你自己的c2文件
```



## **修改流量特征**
启用第三方profile文件，修改流量特征。
启用：
```
./teamserver ip 密码 第三方.profile
```
>profile 文件是一个配置文件，它用于定义 Cobalt Strike 客户端（也称为“beacon”）的行为和外观。这些配置文件允许攻击者自定义其恶意软件的行为，使其更难以被发现和分析。
