将域名一行一个放入一个.txt文件
配置运行py代码即可：
使用的xray的--basic-crawler参数，基础爬虫来主动扫描。
```
import os
import hashlib
import re

# 扫描
def get_url():
    f = open("xray_url.txt")
    lines = f.readlines()
    # 匹配http | https请求头
    pattern = re.compile(r'^(https|http)://')
    for line in lines:
        try:
            if not pattern.match(line.strip()):
                targeturl="http://"+line.strip()
            else:
                targeturl=line.strip()
            # print(targeturl.strip())
            outputfilename=hashlib.md5(targeturl.encode("utf-8"))
            do_scan(targeturl.strip(), outputfilename.hexdigest())
        except Exception as e:
            print(e)
            pass
    f.close()
    print("Xray Scan End~")
    return

# 报告
def do_scan(targeturl,outputfilename="test"):
    scan_command=r"O:\Web-Secure\漏扫\xray-scan\xray64.exe webscan --basic-crawler {} --html-output {}.html".format(targeturl,outputfilename)
    # scan_command = "ping 943ogg.dnslog.cn"
    # print(scan_command)
    os.system(scan_command)
    return

if __name__ == '__main__':
    get_url()
```