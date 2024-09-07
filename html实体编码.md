## **HTML 实体编码**
一种将 HTML 中的特殊字符表示为实体引用的方法。在 HTML 中，有一些字符具有特殊含义，如小于号 `<`、大于号 `>`、和号 `&`、引号 `"` 等，它们用于标识 HTML 标签或其他语法结构。为了在 HTML 中正确显示这些字符，需要使用实体引用，而不是直接输入字符本身。

HTML 实体引用的一般形式是 `&entity_name;` 或 `&#entity_number;`，其中 `entity_name` 是实体的名称，而 `entity_number` 是实体的字符编码对应的十进制数字。例如：

* `&lt;` 表示小于号 `<`
* `&gt;` 表示大于号 `>`
* `&amp;` 表示和号 `&`
* `&quot;` 表示双引号 `"`



PHP函数 htmlspecialchars() 用于将特殊字符转换为 HTML 实体。
   ```
   $text = '<p>This is an example.</p>';
   $encodedText = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
   echo $encodedText;
   ```

在 JavaScript 中，由于没有内置的直接用于 HTML 实体编码的函数，通常可以使用 DOM 操作或一些第三方库来实现。

## **实体化编码作用**
**避免 XSS 攻击：** 在用户提供的内容中，如果包含特殊字符，为了避免潜在的跨站脚本（XSS）攻击，通常会对用户输入的文本进行 HTML 实体编码，以确保用户输入的内容不被解释为 HTML 或 JavaScript 代码。

```
<script>
  var userText = "Hello &lt;script&gt;alert('XSS')&lt;/script&gt; World!";
  document.getElementById("output").innerHTML = userText;
</script>
```

