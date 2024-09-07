## **分离加载**
**分离后用内存加载，无文件落地，加载器分离**
此方法比较通用，有免杀效果
python可以只分离shellcode，也可以代码都分离使用exec执行
```
使用文件读取分离shellcode

http分离  上传oss等白网站

socket消息分离

图片隐写分离读取，项目如DKMC-master
```
^
## **直接分离内存加载问题**
<https://www.anquanke.com/post/id/262666>
分离后用内存加载，无文件落地，加载器分离很好，但当我们开辟一块内存，然后直接将shellcode写入到对应的内存中并且该内存是可读可写可执行的状态，那么这种方式太容易被AV所查杀。

因此当我们如果是利用Windows自身提供的API（uuid、mac、ipv4字符串处理成二进制）来将加密或者封装好的shellcode写入到内存执行的话，将会大大增加查杀的难度。
>如：UuidFromStringA是Windows API RPC（远程过程调用）的一部分，用于将字符串形式的UUID转换为二进制形式。

如此内存加载进一步免杀，实现shellcode的内存加载器免杀。

## **内存加载免杀方案**
将64位程序的shellcode转成其他格式的数据，如uuid，mac，ipv4。
通过UUID方式实现内存加载
利用MAC实现内存加载
利用lPv4方式实现内存加载（效果不好）
![image-20240719170225305](http://cdn.33129999.xyz/mk_img/image-20240719170225305.png)
^
再进行分离加载，如
使用文件读取分离、
http分离、
socket消息分离、
图片隐写分离读取。







