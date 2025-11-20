
## **Webpack的VMjs**


1. **dev 模式**（`npm run serve`）
   为了“**热更新快**”，Webpack 默认把模块包成 **字符串** → 浏览器用 `eval()` 执行，\
   于是 DevTools 里出现大量 `vm####`。
   代码仍然是你写的源码（可读），只是被 eval 包裹。
2. **production 模式**（`npm run build`）
   默认 **不再用 eval**，而是生成普通 `.js` 文件，走正常 `<script src="">` 加载，\
   你看到的 `vm####` 基本消失；如果还有，那是第三方库或运行时编译（Vue template compile）自己调的 eval，不是 Webpack 的行为。



“vm2826、vm2356”不是自己生成的，而是 **Chrome DevTools 给匿名脚本临时起的名字**。
只要一段脚本没有 `//# sourceURL=xxx.js` 注释，DevTools 就会按“vm + 随机数字”的规则显示，每次刷新页面都会重新编号，和文件内容、哈希无关系。
^
vm#### 是 DevTools 给“没有名字的脚本”起的临时工牌，**页面一换就重新发牌**，纯粹为了调试时能点开、能区分，和缓存策略无关系。


^
## **Vue运行时编译的VMjs**
只要 Vue 在运行时通过 new Function(code) 编译模板，Chrome 就会把它当成**匿名脚本**，给的调试名同样是vm####和 Webpack 的 eval 模块命名一样，前缀都是 vm + 数字。
因为底层都是 V8 的“无 URL 脚本”逻辑。
出现场景：
| **运行时给 `template` 传字符串**             | ✅  | 浏览器里第一次才见到模板，必须现场编译 |
| **`.vue` 文件没走 `vue-loader`（CDN 引入）** | ✅  | 没有构建步骤，只能运行时编译      |


^
## **原因**
```
1、技术原因：匿名脚本没有“文件名”
动态 eval()、new Function()、<script> 插进来的代码，本来就没有 URL。
V8 引擎在解析时必须给它们一个“调试标识”，否则调用栈里就显示 (anonymous)，开发者根本点不进去。

于是 DevTools 维护一个页面会话级计数器：
scriptCount++
生成临时名: vm${scriptCount}

页面重载 → 计数器归零 → 同一段代码再次 eval，编号就变了。
所以你会看到 vm2356、vm2826……

2、 产品原因：让用户一眼知道“这是动态生成的”
如果 DevTools 直接把匿名脚本也叫 app.js，会和真正的文件混淆。
用 vm 前缀就是人为打上“这是虚拟机临时脚本”标签，方便开发者识别：
“哦，这段是 Webpack 的 eval 模块 / Vue 运行时编译模板 / 某个第三方 SDK 动态插进来的。”
```


## **什么时候会出现 vm####**

* 动态插入的 `<script>` 标签（`document.createElement('script')`）
* `eval`、`new Function`、`setTimeout('...')`
* Source-map 调试时，Webpack 把一些“eval 打包模块”塞进 `eval()` 里
* Vue 的 **runtime 编译**（模板字符串在浏览器里即时编译）也会走 `new Function`，于是被归类为“匿名脚本”




每段代码复制到本地 HTML 直接用 Chrome 打开，都能在 **DevTools → Sources** 里看到 `vm####` 临时名，刷新后数字会变。

***

### 1. 动态 `<script>` 标签
```html
<body>  <script>    // 动态插一段代码，没有 src，也没有 sourceURL    
const s = document.createElement('script');    
s.textContent = `console.log('动态 script 标签');`;    
document.head.appendChild(s);  
</script></body>
```
**结果**：出现 `vm1234`，内容就是那一行 `console.log`。



### 2. 裸 `eval`
```html
<script>  eval(`console.log('裸 eval');`);</script>
```
**结果**：`vm####` 里只有一行字符串代码。


### 3. `new Function`

```html
<script>  
const add = new Function('a', 'b', 'return a + b');  
console.log(add(1, 2));
</script>
```
**结果**：DevTools 会给 `new Function` 的函数体一个 `vm####`，点开就是 `return a + b`。



### 4. Vue 运行时编译（CDN 版）


```html
<!-- 引入带 compiler 的 Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<div id="app"></div>
<script>  
const { createApp } = Vue; 
createApp({    template: `<p>1+1={{ 1+1 }}</p>`   // 模板字符串  }).mount('#app');
</script>
```

**结果**：页面渲染后多出一个 `vm####`，里面就是 Vue 刚编译好的 `render` 函数源码。


### 5. Webpack dev 的 eval 模块（bonus）

用 CRA 或 Vue-CLI 默认跑 `npm run serve`，然后随意打开一个业务组件，
Sources 面板会出现一排：
```
vm200
vm201
vm202  
...
```
点开任意一个，顶部都是：
```js
eval("__webpack_require__.r(__webpack_exports__);\n// ...")
```
这就是 Webpack 在 **dev 模式**下把每个模块包进 `eval("")` 的典型产物。







