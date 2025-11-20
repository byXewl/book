字符  ↔  ASCII 整数   : ord() / chr()
字符  ↔  16 进制串   : bin2hex() / hex2bin()
字符  ↔  8 进制串    : decoct(ord()) / chr(octdec())
任意进制串 ↔ 10 进制 : base_convert()
```
echo base_convert('FF', 16, 10);   // 255
echo base_convert('377', 8, 10);   // 255
```
## **16进制编码**
is_numeric遇到
php5下is_numeric可识别16进制，如0x2e，然后调用hex2bin转成字符串写入木马，
但题目环境没配好，是php7的is_numeric不能识别16进制。
1. 16 进制字符串 → 原始二进制
      ```
    python的16进制和8进制:
    \x11
    \137
    php的:
    0x11
    0137

   $hex  = '414243';          // ABCDEF 都可以
   $bin  = hex2bin($hex);     // "ABC"
   ```
2. 原始二进制 → 16 进制字符串
   ```
   $bin  = "ABC";
   $hex  = bin2hex($bin);     // "414243"
   ```

^
## **8进制编码**
PHP 没有内置“oct2bin / bin2oct”，但 8 进制本质就是 **整型字符串**，两步即可：
1. 8 进制字符串 → 字符

   ```
   $oct = "101";              // 8 进制
   $chr = chr(octdec($oct));  // 'A'  （65 的 8 进制是 101）
   ```

2. 字符 → 8 进制字符串
   ```
   $chr  = 'A';
   $oct  = decoct(ord($chr)); // "101
   ```




^
## **ASCII编码**
```
$ascii = ord('A');     // 65
$chr   = chr(65);      // 'A'

a 97
z 122
```

`chr()` 只能接受 0–255；超过 255 用 `mb_chr()`（PHP 7.2+）
打印看看
```
for ($i = 1; $i <= 255; $i++) {
 echo sprintf("%3d : 0x%02X : %s\n", $i, $i, $i < 32 || $i > 126 ? '.' : chr($i));
}
```
大值转化是取模256循环。当要求值大于122，又要转换成字符时可用
```
echo chr(97+256); //a
echo chr(353); //a
echo chr(7777); //a
```

^
## **URL编码**
一般双重编码记得用php的官方函数。
admin
%xxdmin