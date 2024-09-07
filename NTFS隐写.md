NTFS又叫ADS
.![](.topwrite/assets/image_1709796685085.png)

cmd使用命令
notepad 加密文件名:寄生文件名
如：notepad 1.txt:flag.txt
即可看到寄生加密的内容

^
看到一个txt可能加了寄生文件，如果知道寄生文件名就可以直接用上面命令，
如果不知道，则需要用NtfsStreamsEditor工具exe进行探测。
工具：<https://files.cnblogs.com/files/rainbow7/ntfsstreamseditor.zip>
特别：用WinRAR解压压缩包，否则可能会探测不到。