VPN、防火墙大同小异。
拿下直通内网。

## **VPN漏洞**
搜索CVE，或者源码审计。

弱口令、未授权绕过直接登录。

通过RCE、文件读取、SQL注入等，读取VPN账号密码。
```
读取内存文件中VPN账号密码。
读取配置文件。
读取数据库中VPN账号秘密。

如果密码加密，还要解密。
```
然后登录打内网即可。

^
## **域边界VPN**
<https://www.akamai.com/zh/blog/security-research/vpn-post-exploitation-techniques-black-hat>

VPN在域环境内，90% 的企业 SSL/IPsec VPN 确实都采用“LDAP/AD 认证 + 专用绑定账户”这套模板。
即VPN里必须一个有“读目录”权限的 AD 域内账户去连接 LDAP，实现VPN账号密码登录认证。
拿下VPN一般就可以拿下这个域内账户账号密码，拿去碰撞、拖ladp数据等。


#### **域内账户连接LDAP**
常见VPN：SonicWall、Palo、ASA、Sangfor 、FortiGate等都一样。
只要支持 LDAP，就填一条“bind DN + 密码”，换汤不换药。

企业里约定俗成几种“一看就懂”的域内账户命名套路，方便运维交接和权限审计：
1. **svc-`<vendor/function>`-`<env>`**\
   例：`svc-fortigate-prod`、`svc-palo-dev`、`svc-vpn-dmz`\
   把厂商/用途/环境全塞进名字，防止误删。
2. **ldap-`<role>`-`<site>`**\
   例：`ldap-bind-hq`、`ldap-query-bj`\
   强调“只用来绑定/查询”，站点后缀方便多 DC 时分权。
3. **`<vendor><purpose>`**（无分隔符）\
   例：`fortibind`、`paloquery`、`fgldap`\
   短、好打，缺点是环境多时容易重名。
4. **srv-`<service>-<seq>`**\
   例：`srv-ldap-01`、`srv-radius-02`\
   通用服务账号命名法，不特指 VPN，也用于 NAS、打印机、备份系统。
5. **“隐藏式”** – 跟普通人名混一起\
   例：`wangwei`、`zhang01`（表面看不出是服务账号）\
   攻击者最爱：BloodHound 里一眼难辨，需要看 `userAccountControl` 的 `DONT_EXPIRE_PASSWORD` 或 `PASSWORD_NEVER_EXPIRES` 标志才能识别。

额外共性
* 密码永不过期（否则 VPN 一夜全断）
* 禁止本地登录 / 交互式登录
* 描述字段写清用途：“LDAP read-only”
* 统一放单独 OU（如 `OU=Service,OU=Accounts`），方便加 ACL 和审计

