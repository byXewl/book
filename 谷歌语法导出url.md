py脚本，走本地10809代理请求谷歌
```
import requests
from lxml import etree
import time
def create_requests(page,data):
    url="https://www.google.com/search?q="+data+"&lr=lang_zh-CN&start={}".format(page)+"&ie=utf-8"
    header={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    }
    proxy={
        "http":"127.0.0.1:10809",
        "https":"127.0.0.1:10809"
    }
    response=requests.get(url=url,headers=header,proxies=proxy)
    response.encoding="utf-8"
    context=response.text
    return context
def parse_data(context):
    parse=etree.HTML(context)
    data=parse.xpath('//*/@href')
    f=open(r"url.txt","a")
    for url in data:
        if "/search?" in url:
            continue
        if "google.com" in url:
            continue
        if ".jpg" in url:
            continue
        if "jpeg" in url:
            continue
        if "png" in url:
            continue
        if "#" in url:
            continue
        if "%" in url:
            continue
        if "url=https://" in url:
            continue
        if "url=http://" in url:
            continue
        if ".pdf" in url:
            continue
        if ".htm" in url:
            continue
        if ".htmls" in url:
            continue
        if ".html" in url:
            continue
        if ".gov.cn" in url:
            continue
            break
        f.write(url+"\n")
        print(url+"成功写入")
    f.close()
if __name__ == '__main__':
    data = input("请输入Google语法:")
    print("----------------------开始抓取----------------------")
    for page in range(0,int(input("请输入结束页面的倍数:")),10):
        context=create_requests(page,data)
        parse_data(context)
    print("----------------------抓取完毕----------------------")
```