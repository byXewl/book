从开发视觉来看防护XSS漏洞，大多是过滤/转义用户的输入和输出。对于开发人员来说，不可能对每一个输入和输出点进行过滤/转义。因此一般常使用filter层（过滤器）或兰截器进行统一过滤。或者所使用的前端框架自带防XSS机制。

场景：
  1、服务端接收前端传递的参数后，没有做充分的过滤限制或编码又回显到了前端。
  2、Java过滤器类中可能会实现xss过滤和编码，查看黑名单是否可绕过。
  3、关键词：getParamter、<%=、param、el表达式。
危害：造成跨站脚本攻击、盗取cookie、实现CSRF攻击等。
防御：完全过滤用户可控的参数，对参数html实体化编码等。


^
## **JSP场景**
```
getParamter
request.getAttribute(
<%=
```


^
## **前端框架场景**
vue
```
<p v-html="test"></p>
 
export default {
  data () {
    return {
      test: `<a οnclick='alert("xss攻击")'>链接</a>`
    }
}
```
react
```
```



^
## **防御**
主要由后端防御。



# XSS 漏洞详攻防对抗过程

* <https://tech.meituan.com/2018/09/27/fe-security.html>

# VUE中的XSS

* <https://blog.csdn.net/weixin_48138187/article/details/135126485>

## v-html

v-html 是一个指令，用于动态地将 HTML 内容插入到元素中。与 {{ }} 绑定文本不同，v-html 可以解析并插入 HTML 内容，这使得你可以将 HTML 代码直接渲染到 DOM 中。

## DOMPurify

DOMPurify 是一个非常强大的库，用于清理和消毒 HTML 内容。它的主要目标是防止 XSS（跨站脚本攻击）和其他基于 HTML 的注入攻击。DOMPurify.sanitize 会移除或清理潜在的恶意代码，包括嵌入的 JavaScript 代码。具体地说，DOMPurify 会过滤掉不安全的元素和属性，而不是将其转换为实体编码。

## 绕过DOMPurify

* <https://xz.aliyun.com/t/6413?time__1311=n4%2BxnD0Dg70%3DG%3DfPGNnmnDRiWDCDunnnxWTuypD>
* <https://www.anquanke.com/post/id/219089>
* <https://xz.aliyun.com/t/8384?time__1311=n4%2BxnD0DcDuDgnDBDmx05fbDyQoUAhvqh%2BbID>

## payload

```javascript
// DOMPurify < V2.0.0 
<svg></p><style><a id="</style><img src=1 onerror=alert(1)>">

// DOMPurify <=  2.0.17
<form>
    <math><mtext>
</form><form>
    <mglyph>
        <style></math><img src onerror=alert(1)>
```

## **XSS漏洞在可能出现的位置**

前后端不分离
```
<%=
${
<c:out
<c:if
<c:for
ModelAndView
ModelMap
Model
request.getParameter
request.setAttribute
response.getWriter().print()
response.getWriter().writer()
```


前后端分离

    如果使用VUE或react，基本无漏洞，因为vue和react在渲染的时候会自动对html最实体编码。可能出现的地方是直接回显到前端，如果在filter中。直接返回数据。

response.getWriter().print()
response.getWriter().writer()