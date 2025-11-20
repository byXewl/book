

javascript-obfuscato “高强度”混淆


ob混淆：
<https://obfuscator.io/>

解ob:
<https://deobfuscate.io/>


你可以使用以下工具尝试反混淆：

* **de4js**（在线）：<https://lelinhtinh.github.io/de4js/>
* **jsnice.org**（统计反混淆）：<https://jsnice.org/>


^


## **Terser混淆与OB混淆对比**
| 特性            | Terser（webpack 默认） | javascript-obfuscator（OB） |
| :------------ | :----------------- | :------------------------ |
| 变量名压短         | ✅   a,b,!0              | ✅                         |
| 字符串加密         | ❌                  | ✅（`'_0xabc123'`）          |
| 控制流扁平化        | ❌                  | ✅（switch-case 死循环跳）       |
| 死代码注入         | ❌                  | ✅                         |
| 调试保护          | ❌                  | ✅（无限 debugger）            |
| 性能损耗          | 几乎 0               | 明显                        |
| 体积变化          | 大幅减小               | 可能变大                      |
| 是否 webpack 内置 | 是                  | 否，需装插件并开启OB混淆                    |


^
## **OB字符串混淆原理**
> 把字符串转成十六进制转义序列，再放到一个数组里，运行时通过下标还原。

 1. 原始代码
```
console.log('hello world');
```

2. OB 处理后（简化版）
```
var _0xabc123 = ['\x68\x65\x6c\x6c\x6f', '\x77\x6f\x72\x6c\x64'];
console.log(_0xabc123[0] + ' ' + _0xabc123[1]);
```
* `\x68\x65\x6c\x6c\x6f` 就是 `'hello'` 的十六进制 ASCII
* 变量名 `_0xabc123` 是随机生成的，每次混淆都会变
* 真正的 OB 还会再套一层 **旋转数组 + 解密函数**，让静态分析更难

***
3. 为什么这么做
* 肉眼一眼看不出字符串内容
* 正则搜索 `'hello world'` 搜不到
* 增大逆向成本，但运行时开销很小（只是多一次数组取值）

