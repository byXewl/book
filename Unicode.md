Unicode 是一个字符集，包含了世界上几乎所有的字，又称万国码。
其字符集兼容ASCII字符集表。

**Unicode 字符集：** Unicode 是一个字符集，它包含了世界上几乎所有的字符，每个字符都有一个唯一的标识符，称为码点(一个十六进制数)，表示字符在 Unicode 字符集中的位置。
```
例如:
字符 "A" 在 Unicode 中的码点是 U+0041。十进制65。
字符 "汉" 在 Unicode 中的码点是 U+6C49。
字符 😀 在 Unicode 中的码点是U+1F604。


编程中可以使用Unicode表示特殊字符：
console.log("\u0041"); // 输出为 "A"
console.log("\u6C49"); // 输出为 "汉"
console.log("\u1F604");/输出为😀
console.log("\uD83D\uDE04"); //输出为😀，UTF-16两个编码单元


String.fromCharCode() 是 JavaScript 方法，用于传入十进制数根据 Unicode 编码的创建字符串。
String.fromCharCode(65, 66, 67); // 输出 "ABC"



在Json传递中，对于包含特殊字符、表情符号或不可见字符等的 JSON 字符串，
使用 Unicode 转义（\uXXXX）是一个通用的做法，可以确保字符的正确传递和解析：
{
  "message": "a smiley face: \uD83D\uDE04"；//😀
}
```


^
^
**UTF 编码：** 
UTF（Unicode Transformation Format）是一种字符编码方案，它定义了如何将 Unicode 中的码点映射成字节序列，以便在计算机中存储和传输。
UTF-8、UTF-16、UTF-32 是 UTF 的不同实现方式，它们使用不同的规则将 Unicode 码点编码成字节序列。

**UTF-8编码：**
UTF-8 使用变长的字节序列不浪费空间，可以表示 Unicode 字符集中的任意字符。（字母1字节，汉字3字节）
UTF-8 兼容 ASCII，也可以表示 GBK 中的字符，因为 GBK 的字符都是 Unicode 字符。

```
"汉" 字在 Unicode 中的码点是 U+6C49。进行UTF-8 编码，字节序列表示为：
‭11100110 10110001 10001001‬
即这三个字节序列用UTF-8 解码，为Unicode字符集中的'汉'。

'汉'字UTF-8编码16进制表示
\xE6B189
\xE6\xB1\x89
其中\xE6\xB1\x89可以加入正则表达式中匹配。
```

^
**扩展字符编码：**
ASCII：使用一个字节表示，有256个但只用前128个表示字符。
GBK：GBK是中文编码标准之一，它是在GB2312标准的基础上进行扩展。(字母1字节，汉字2字节)，windows操作系统国内的应该是GBK编码。
BIG5：繁体中文字符集的一种编码方式。

以上编码：文字变数字
解码：数字变文字




