# **php文件上传及文件操作：**
## **文件上传移动函数：**
$_FILES
move_uploaded_file，用于文件上传的临时文件移动到指定目录
copy，用于文件复制

^
## **文件写入函数：**
file_put_contents()
可能发生任意文件写入，写入shell.php

^
## **文件读取函数：**
file_get_contents
fread
fgets
readfile
fgets
file
parse_ini_file
hightlight_file
show_source
可能发生任意文件读取
读目标传参的时候使用../../进行任意文件读取。

^
## **文件删除函数：**
unlink()
可能发生任意文件删除：
删除目标传参的时候使用../../进行任意文件删除。
如：cms删除了../../install/install_ok.txt 或 install.lock 可以强制进行系统重新安装，重新安装时设置自己的远程数据库，系统数据就被控制登录了。
/upload/../install/install.lock