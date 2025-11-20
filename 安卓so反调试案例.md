检测函数
```
int __cdecl check_status(int a1)
{
  int v1; // esi
  int result; // eax
  int v3; // eax
  FILE *stream; // [esp+1Ch] [ebp-530h]
  int v5; // [esp+28h] [ebp-524h] BYREF
  char filename[256]; // [esp+2Ch] [ebp-520h] BYREF
  char s[1024]; // [esp+12Ch] [ebp-420h] BYREF
  int v8; // [esp+52Ch] [ebp-20h]

  snprintf(filename, 0xFFu, "/proc/%d/status", a1);
  v1 = 1;
  stream = fopen(filename, "rw");
  if ( stream )
  {
    do
    {
      if ( !fgets(s, 1024, stream) )
      {
        v1 = 1;
        goto LABEL_6;
      }
    }
    while ( memcmp(s, "TracerPid:", 0xAu) );
    v5 = 0;
    sscanf(s, "%*s%d", &v5);
    v3 = v5;
    LOBYTE(v3) = v5 != 0;
    v1 = v3;
    printf("%s", s);
LABEL_6:
    fclose(stream);
  }
  result = v1;
  if ( v8 != _stack_chk_guard )
    sub_810();
  return result;
}
```


 循环检测到就退出的
```
void __noreturn my_debugger_thread()
{
  __pid_t v0; // esi

  v0 = getpid();
  while ( !(unsigned __int8)check_status(v0) )
    sleep(1u);
  exit(1);
}

```
开启子线程
```
int my_debugger()
{
  pthread_t newthread[4]; // [esp+1Ch] [ebp-10h] BYREF

  return pthread_create(newthread, 0, (void *(*)(void *))my_debugger_thread, 0);
}
```
begin函数
```
int begin()
{
  return my_debugger();
}
```
初始化开启检测begin函数
```
.init_array:00002E9C                               ; ELF Initialization Function Table
.init_array:00002E9C                               ; ===========================================================================
.init_array:00002E9C
.init_array:00002E9C                               ; Segment type: Pure data
.init_array:00002E9C                               ; Segment permissions: Read/Write
.init_array:00002E9C                               _init_array segment dword public 'DATA' use32
.init_array:00002E9C                               assume cs:_init_array
.init_array:00002E9C                               ;org 2E9Ch
.init_array:00002E9C 90 07 00 00                   dd offset begin
.init_array:00002EA0 00                            db    0
.init_array:00002EA1 00                            db    0
.init_array:00002EA2 00                            db    0
.init_array:00002EA3 00                            db    0
.init_array:00002EA3                               _init_array ends
```

1. 启动一条 **子线程** 轮询 `/proc/<pid>/status` 里的 `TracerPid`（`check_status` 里大概率就是读这个字段）。
2. 只要发现 **> 0**（被 gdb/strace/frida 等 attach），立即 `exit(1)` 把进程拉闸。
3. 主线程照常跑业务，**用户感知不到**，调试器却瞬间掉线。

***

### 为什么有效

* `TracerPid` 由内核维护，**ptrace 一 attach 就自动写 1**，detach 归零，检测零成本。
* 放在子线程里 **持续 1 s 轮询**，**gdb 刚附加上去就会被强制退出**，来不及下断点。
* 直接 `exit(1)` **不给信号处理机会**，调试器来不及拦截。

***

### 如何过掉（逆向常用手段）

* 把 `check_status` 返回值永远 patch 成 0；
* 或者 `nop` 掉 `exit(1)`；
* 最懒：frida 脚本早期 hook `exit` / `kill` 让它空返回即可。


## **方案**
改.init_array比较麻烦，改begin函数让其直接返回。


方案1就是“**不改数组，让 `begin` 函数一进场就返回**”。

做法：把函数第一条指令（以及可能需要的后续指令）改成 **x86 的 `ret`**，这样 `begin` 被 `.init_array` 调用时直接返回，反调试逻辑（`my_debugger`）永远不会执行，也不会触发 NULL 调用。

***

步骤（照着干就行）

1. 确定要改多少字节\
   x86 的 `ret` 只占 **1 字节：`0xC3`**\
   但为了保证栈平衡，最好把 **push ebx** 也抵消掉，所以改前 2 字节即可：
   ```
   00000790  53                    push    ebx
   00000791  E8 95 00 00 00        call    sub_82B
   ```
   改成：
   ```
   00000790  C3                    ret
   00000791  90                    nop
   ```

   这样栈也没问题（少了一次 push/pop，但 `begin` 里自己还有 `pop ebx`，所以完全平衡）。

2. 在 IDA 里打补丁

   * 光标放到 `0x790` 行 → `Edit → Patch program → Patch bytes`
   * 把 `53 E8 95 00 00 00` 改成 `C3 90 90 90 90 90`（后面多余字节填 NOP，防止你改错位数）
   * 再 `Edit → Patch program → Apply patches to input file…` → 勾选备份 → OK




