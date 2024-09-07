base64编码后可能会补=结尾

特点：
1. 明文越长编码后越长，长度一定能被4整除
2. =的个数为0,1,2
3. 使用的字符：英文大小写，数字，=，+，/
4. 如果是对称加密算法中的base64可能会频繁出现/,+号

## **base64图片**
jpeg特征有/9j/
```
/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAuRXhpZgAA...
```
data:image/jpeg;base64 是用于在 HTML 或 CSS 中嵌入 Base64 编码的 JPEG 图片的数据 URI 格式。
```  
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAuRXhpZgAA...
```
png
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAA....
```

## **base32**
 Base64 使用了 64 个不同的字符，通常是 A-Z、a-z、0-9 这 62 个字符，再加上两个额外的字符比如 `+` 和 `/`。
 Base32 使用了 32 个不同的字符，通常是 A-Z 和 2-7 这 32 个字符。
大写加数字就可能是base32。

## **base16**
base16是0-9a-f


