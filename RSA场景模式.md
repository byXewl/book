<https://mp.weixin.qq.com/s/DKyplEETXNzZ7Bt_Nm5-6g>

一般用轩禹CTE_RSA工具秒。
```
有dp，dq
只有dp
有e1 e2共模攻击
```



^
公私钥题：给你一个密文文件和一个公钥文件。
>理论上，如果可以从公钥推算出 p 和 q，那么就可以计算出私钥。然而，由于 n 是两个非常大的质数的乘积，目前没有已知的算法能在合理时间内完成这个任务。这就是为什么RSA算法被认为是安全的。在CTF题中n往往比较小，或p和q太接近 或相差过大，可以算出p，q。
生成案例脚本：<https://www.bilibili.com/read/cv13392382/?from=readlist>
```
给你公钥文件pub.key，可以用CTE_RSA提取里面的n和e
利用n分解p,q，求出d。

再用python的rsa库生成私钥key。
key = rsa.PrivateKey(n,e,d,p,q)

文件读取加密文件，用私钥key解密。
rsa.decrypt(f.read(),key).decode()
```
