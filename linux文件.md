查看文件
```
ls [-a -l -h]  路径
-a 可查看隐藏的文件.xx
-l  竖向显示，可看文件创建者，创建时间，文件权限，简写命令ll
-h 显示文件大小
```

文件权限 ls -l可看
```
L rwx rwx rwx       root(文件创建者用户)  root(所属用户组)
第一个一位表示文件类型，-文本文件，d目录，L软链接
第一个三位rwx，文件所属用户的权限
第二个三位rwx，文件所属用户组的权限
第三个三位rwx，其他用户权限

权限类型：
- 无权限
r  read对文件/夹可看。数值4
w wreate对文件/夹可修改，创建，删除，改名。数值2
x  execute对文件/夹可cd进入，可执行运行。数值1

修改文件权限：
chmod -r 权限 路径
-r 递归文件夹里生效
权限7 ：4+2+1
权限5 ：4+1+-
如：
chmod -r 777 /www/www/hellos/
hellos文件下，所有人都可以全部操作。

chmod  +x /www/www/hello  所有者可执行
chmod  xxx /www/www/hello  所有人可执行
```

创建文件
```
touch 路径/名称
echo. > newfile.txt
copy nul newfile.txt
```

无则创建该文件并写入内容：使用 `>` 会覆盖文件内容，而 `>>` 会在文件末尾追加内容。
```
echo "This is additional content." >> example.txt
```



查看文件
```
cat 路径名称
more 路径名称，支持翻译，按q退出
```

复制文件
```
cp
```
移动文件·
```
mv
```
删除文件
```
rm [-r -f] 
-r  删除文件夹
-f  强制删除
```