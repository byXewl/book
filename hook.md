hook基础：
<https://mp.weixin.qq.com/s/VaKP7w1Tx3qyGmpPoXjYHg>
hook就是在执行某个函数前，将这个函数替换修改，实现定位或修改功能。
如：定位加密函数，定位加密前的函数调用，定位cookie生成位置、修改原函数等。

注入hook代码：
1、借助油猴的hook：你可以将hook的脚本放到油猴里面执行。
2、直接用控制台console界面进行hook：hook时机最好选择你看见的第一个js文件的第一行的时候下断点，然后在控制台console界面就注入。

常见hook操作：
<https://cloud.tencent.com/developer/article/2356843>
<https://mp.weixin.qq.com/s/Aen7T159KciSCveC7yiBKA>

^
常见代码：
有些时候想移除debugger
```
  _Function = Function;
  Function.prototype.constructor = function(){ 
    if (arguments[0].indexOf('debugger') != -1){ 
      //debugger;
      return _Function('');
    } 
    return _Function(arguments[0]);
  };
```
有时我们需要快速定位cookie在哪里生成，设置、获取的，需要hook cookie
```
var cookie_cache = document.cookie;
Object.defineProperty(document, 'cookie', {
    get: function() {
        debugger;
        console.log('Getting cookie');
        return cookie_cache;
    },
    set: function(val) {
        debugger;
        console.log('Setting cookie', val);
        var cookie = val.split(";")[0];
        var ncookie = cookie.split("=");
        var flag = false;
        var cache = cookie_cache.split("; ");
        cache = cache.map(function(a){
            if (a.split("=")[0] === ncookie[0]){
                flag = true;
                return cookie;
            }
            return a;
        })
        cookie_cache = cache.join("; ");
        if (!flag){
            cookie_cache += cookie + "; ";
        }
        this._value = val;
        return cookie_cache;
    },
});
```
有时候我们需要快速定位vm.js在哪里生成的，需要hook eval
```
window.__eval = window.eval
var myeval = function(src) {
    debugger ;
    console.log('=======eval====')
    return window.__eval(src)
}
Object.defineProperty(window.prototype, 'eval', {
    value: myeval
})
```
有时候我们需要固定随机参数，需要hook random
```
old_random = Math.random
window.Math.random =  Math.random = function () {
        return 0.3
 };
```
有时候我们需要知道代码如何进行格式化检测，需要hook 正则
```
 RegExp.prototype.my_test = RegExp.prototype.test

let my_regex = function(arguments) {
    debugger ;
    console.log(this, arguments)
    return this.my_test(arguments)
}

Object.defineProperty(RegExp.prototype, 'test', {
    value: my_regex
})
```