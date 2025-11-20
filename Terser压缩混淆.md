
Webpack等构建工具的默认混淆。
PS：vite工具的esbuild最小化压缩（比 Terser 快），效果同 Terser。


配置：optimization.minimize: true + terser




## **作用**
1. 删空白、注释、死代码
2. 把局部变量、函数参数重命名为最短字母（a, b, c …）
3. 把语法压缩成更短形式（例如 `if`→`&&`、`true`→`!0`）

目的：减小体积，顺带让人眼阅读变难，但逻辑、字符串、属性名基本原样。



