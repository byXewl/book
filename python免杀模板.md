## **免杀方案**
使用Py2exe将python打包成exe 

**分离后用内存加载，无文件落地，加载器分离**
此方法比较通用，有免杀效果
python可以只分离shellcode，也可以代码都分离使用exec执行
```
使用文件读取分离shellcode

http分离  上传oss等白网站

socket消息分离

图片隐写分离读取，项目如DKMC-master
```