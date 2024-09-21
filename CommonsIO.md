简化io操作
```
IOUtils.toString()
```
.
<br>
配合使用：
`FileUpload` 和 `commons-io` 是 Java 中常用的两个库。

1. **Apache Commons FileUpload**：
   `FileUpload` 是 Apache 软件基金会提供的一个项目，用于处理文件上传。它提供了用于解析 HTTP 请求中的文件上传部分的功能。在 Java Web 应用程序中，特别是在处理 HTTP POST 请求时，如果请求中包含了文件上传，可以使用 Apache Commons FileUpload 来解析这些文件。

2. **Apache Commons IO**：
   `commons-io` 是 Apache Commons 项目的一部分，提供了许多有用的工具类和方法，用于简化 Java I/O 操作。这个库包含了一些操作文件、流、输入输出的常用工具类，如文件复制、流处理、文件操作等。它为处理输入输出提供了一系列简洁而强大的工具类。

在处理文件上传时，通常会同时使用这两个库。`FileUpload` 用于处理解析上传的文件部分，而 `commons-io` 用于处理文件的读写操作，包括复制文件、流操作、文件内容的处理等。这两个库都是 Apache Commons 项目的一部分，为 Java 开发者提供了方便和实用的工具类和方法。


