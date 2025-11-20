基础js模板
### 1.基础指令
1.frida-ps -U  查看当前手机运行的进程
2.frida-ps --help 查看help指令
```
frida-ps --help
使用方式: frida-ps [选项]

选项:
  -h, --help            显示帮助信息并退出
  -D ID, --device ID    连接到具有给定ID的设备
  -U, --usb             连接到USB设备
  -R, --remote          连接到远程frida-server
  -H HOST, --host HOST  连接到HOST上的远程frida-server
  --certificate CERTIFICATE
                        与HOST进行TLS通信，期望的CERTIFICATE
  --origin ORIGIN       连接到设置了"Origin"头为ORIGIN的远程服务器
  --token TOKEN         使用TOKEN验证HOST
  --keepalive-interval INTERVAL
                        设置心跳包间隔(秒)，或设置为0以禁用(默认为-1，根据传输方式自动选择)
  --p2p                 与目标建立点对点连接
  --stun-server ADDRESS
                        设置与--p2p一起使用的STUN服务器地址
  --relay address,username,password,turn-{udp,tcp,tls}
                        添加与--p2p一起使用的中继
  -O FILE, --options-file FILE
                        包含额外命令行选项的文本文件
  --version             显示程序版本号并退出
  -a, --applications    只列出应用程序
  -i, --installed       包括所有已安装的应用程序
  -j, --json            以JSON格式输出结果
```

### 2.操作模式:
| 操作模式 | 描述 |  优点 | 主要用途 |
|---|---|---|---|
| CLI（命令行）模式 | 通过命令行直接将JavaScript脚本注入进程中，对进程进行操作 | 便于直接注入和操作 | 在较小规模的操作或者需求比较简单的场景中使用 |
| RPC模式 | 使用Python进行JavaScript脚本的注入工作，实际对进程进行操作的还是JavaScript脚本，可以通过RPC传输给Python脚本来进行复杂数据的处理 |  在对复杂数据的处理上可以通过RPC传输给Python脚本来进行，有利于减少被注入进程的性能损耗 | 在大规模调用中更加普遍，特别是对于复杂数据处理的需求 |

### 3.注入模式与启动命令:

| 注入模式 | 描述 | 命令或参数 | 优点 | 主要用途 |
|---|---|---|---|---|
| Spawn模式 | 将启动App的权利交由Frida来控制，即使目标App已经启动，在使用Frida注入程序时还是会重新启动App | 在CLI模式中，Frida通过加上 -f 参数指定包名以spawn模式操作App | 适合于需要在App启动时即进行注入的场景，可以在App启动时即捕获其行为 | 当需要监控App从启动开始的所有行为时使用 |
| Attach模式 | 在目标App已经启动的情况下，Frida通过ptrace注入程序从而执行Hook的操作 | 在CLI模式中，如果不添加 -f 参数，则默认会通过attach模式注入App | 适合于已经运行的App，不会重新启动App，对用户体验影响较小 | 在App已经启动，或者我们只关心特定时刻或特定功能的行为时使用 |

Spawn模式
```
frida -U -f 包名 -l hook.js

apk自动重新打开。
frida -U -f com.zj.wuaipojie -l hook.js
```

attach模式 ：
```
frida -U 进程名 -l hook.js
```

frida_server自定义端口
```
frida server 默认端口：27042

taimen:/ $ su
taimen:/ # cd data/local/tmp/
taimen:/data/local/tmp # ./fs1280 -l 0.0.0.0:6666

```

adb输出日志
```
adb shell
`logcat |grep "D.zj2595"`日志捕获
`adb connect 127.0.0.1:62001`模拟器端口转发
```
### 4.基础语法

| API名称 | 描述 |
|---|---|
| `Java.use(className)` | 获取指定的Java类并使其在JavaScript代码中可用。|
| `Java.perform(callback)` | 确保回调函数在Java的主线程上执行。 |
| `Java.choose(className, callbacks)` | 枚举指定类的所有实例。 |
| `Java.cast(obj, cls)` | 将一个Java对象转换成另一个Java类的实例。 |
| `Java.enumerateLoadedClasses(callbacks)` | 枚举进程中已经加载的所有Java类。 |
| `Java.enumerateClassLoaders(callbacks)` | 枚举进程中存在的所有Java类加载器。 |
| `Java.enumerateMethods(targetClassMethod)` | 枚举指定类的所有方法。 |


### 5.日志输出语法区别

| 日志方法 | 描述 | 区别 |
|---|---|---|
| `console.log()` | 使用JavaScript直接进行日志打印 | 多用于在CLI模式中，`console.log()`直接输出到命令行界面，使用户可以实时查看。在RPC模式中，`console.log()`同样输出在命令行，但可能被Python脚本的输出内容掩盖。 |
| `send()` | Frida的专有方法，用于发送数据或日志到外部Python脚本 | 多用于RPC模式中，它允许JavaScript脚本发送数据到Python脚本，Python脚本可以进一步处理或记录这些数据。 |

### 6.Hook框架模板

```js
function main(){
    Java.perform(function(){
        hookTest1();
    });
}
setImmediate(main);
```

## 6.Frida常用API


### 1.Hook普通方法、打印参数和修改返回值

```js
//定义一个名为hookTest1的函数
function hookTest1(){
	//获取一个名为"类名"的Java类，并将其实例赋值给JavaScript变量utils
    var utils = Java.use("类名");
    //修改"类名"的"method"方法的实现。这个新的实现会接收两个参数（a和b）
    utils.method.implementation = function(a, b){
	    //将参数a和b的值改为123和456。
        a = 123;
        b = 456;
        //调用修改过的"method"方法，并将返回值存储在`retval`变量中
        var retval = this.method(a, b);
        //在控制台上打印参数a，b的值以及"method"方法的返回值
        console.log(a, b, retval);
        //返回"method"方法的返回值
        return retval;
    }
}

```


### 2.Hook重载参数

```js
// .overload()
// .overload('自定义参数')
// .overload('int')
function hookTest2(){
    var utils = Java.use("com.zj.wuaipojie.Demo");
    //overload定义重载函数，根据函数的参数类型填
    utils.Inner.overload('com.zj.wuaipojie.Demo$Animal','java.lang.String').implementation = function(a，b){
        b = "aaaaaaaaaa";
        this.Inner(a,b);
        console.log(b);
    }
}



```


### 3.Hook构造函数
```js
function hookTest3(){
    var utils = Java.use("com.zj.wuaipojie.Demo");
    //修改类的构造函数的实现，$init表示构造函数
    utils.$init.overload('java.lang.String').implementation = function(str){
        console.log(str);
        str = "52";
        this.$init(str);
    }
}


```


### 4.Hook字段
```js
function hookTest5(){
    Java.perform(function(){
        //静态字段的修改
        var utils = Java.use("com.zj.wuaipojie.Demo");
        //修改类的静态字段"flag"的值
        utils.staticField.value = "我是被修改的静态变量";
        console.log(utils.staticField.value);
        //非静态字段的修改
        //使用`Java.choose()`枚举类的所有实例
        Java.choose("com.zj.wuaipojie.Demo", {
            onMatch: function(obj){
	            //修改实例的非静态字段"_privateInt"的值为"123456"，并修改非静态字段"privateInt"的值为9999。
                obj._privateInt.value = "123456"; //字段名与函数名相同 前面加个下划线
                obj.privateInt.value = 9999;
            },
            onComplete: function(){

            }
        });
    });
    
}
```

### 5.Hook内部类
```js
function hookTest6(){
    Java.perform(function(){
        //内部类
        var innerClass = Java.use("com.zj.wuaipojie.Demo$innerClass");
        console.log(innerClass);
        innerClass.$init.implementation = function(){
            console.log("eeeeeeee");
        }

    });
}

```

### 6.枚举所有的类与类的所有方法
```js
function hookTest7(){
    Java.perform(function(){
        //枚举所有的类与类的所有方法,异步枚举
        Java.enumerateLoadedClasses({
            onMatch: function(name,handle){
	            //过滤类名
                if(name.indexOf("com.zj.wuaipojie.Demo") !=-1){
                    console.log(name);
                    var clazz =Java.use(name);
                    console.log(clazz);
                    var methods = clazz.class.getDeclaredMethods();
                    console.log(methods);
                }
            },
            onComplete: function(){}
        })
    })
}

```

### 7.枚举所有方法
```js
function hookTest8(){
    Java.perform(function(){
        var Demo = Java.use("com.zj.wuaipojie.Demo");
        //getDeclaredMethods枚举所有方法
        var methods =Demo.class.getDeclaredMethods();
        for(var j=0; j < methods.length; j++){
            var methodName = methods[j].getName();
            console.log(methodName);
            for(var k=0; k<Demo[methodName].overloads.length;k++){
                Demo[methodName].overloads[k].implementation = function(){
                    for(var i=0;i<arguments.length;i++){
                        console.log(arguments[i]);
                    }
                    return this[methodName].apply(this,arguments);
                }
            }
        }
    })
}

```

### 8.主动调用

静态方法
```js
var ClassName=Java.use("com.zj.wuaipojie.Demo"); 
ClassName.privateFunc();
```

非静态方法
```js
    var ret = null;
    Java.perform(function () {
        Java.choose("com.zj.wuaipojie.Demo",{    //要hook的类
            onMatch:function(instance){
                ret=instance.privateFunc("aaaaaaa"); //要hook的方法
            },
            onComplete:function(){
            	//console.log("result: " + ret);
            }
        });
    })
    //return ret;

```
保存后即运行。

^
### 9.jadx里直接右键复制frida代码