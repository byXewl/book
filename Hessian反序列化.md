

由 nacos 引出的 Hessian 反序列化利用。


Nacos 在处理某些基于 Jraft 的请求时，采用 Hessian 进行反序列化，但并未设置限制，导致应用存在远程代码执行（RCE）漏洞。



<https://www.cnblogs.com/websec80/p/18096100>