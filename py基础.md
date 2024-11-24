
python 2 的print无() 包管理工具pip2
python 3 的print() 包管理工具pip3

## **一些特殊用法**
```
睡眠
time.sleep(3)

打印不换行
print("*", end="")

列表遍历
NBA = ['科比','詹姆斯','库里']

`range()` 用于简单的计数和循环
`enumerate()` 用于在循环中同时需要元素和索引的情况


for index,v in enumerate(NBA):
    print(f"{index}是"+v+"\n")

大到小
for i in range(len(NBA)-1,0,-1): #起始索引，结束索引（不包括），步长
    NBA[i]


for i in range(34):
    print(chr(NBA[i]),end='') #end不换行


NBA[0][-1] #不要后一位，则科




匿名函数，用于加两个数字
add = lambda x, y: x + y
result = add(5, 3)
```
## **面向对象**
```
class MyClass:
    def __init__(self):
        self.sum=18
        print("对象创建")

    def __del__(self):
        print("对象被销毁")

obj = MyClass()
del obj 
```
私有属性
```
self.__age=age  ,只能在类里被调用self.__age

```
继承
```
class A():
    def printA(self):
        print("来自A")

class B(A):
    pass

b = B
b.printA(b)

print(B.__bases__) # 查看继承关系
print(B.mro()) # 查看继承关系
```

## **函数参数特殊**
在Python中，`**kwargs`是一个常用的缩写，代表"keyword arguments"（关键字参数）。这是一种在函数中接收任意数量关键字参数的方式。

当你在函数定义中看到`**kwargs`时，它表示函数可以接受任意数量的以关键字（名称）的形式传递的参数，并将它们存储在一个字典中。这样做可以让你的函数更加灵活，因为它可以接收和处理在函数定义时可能还未知的参数。

使用`**kwargs`的例子：

```
def example_function(**kwargs):
    for key, value in kwargs.items():
        print(f"{key} = {value}")

# 调用函数时，可以传递任意数量的关键字参数
example_function(name="Kimi", age=20, country="Moonshot")
```

在这个例子中，`example_function`可以接受任意数量的关键字参数。当调用这个函数时，传递的每个关键字参数都会被存储在`kwargs`字典中，然后函数遍历这个字典并打印出每个参数的名称和值。

`**kwargs`的用途：

1. **提高函数的灵活性**：允许函数接收额外的参数，这些参数在编写函数时可能还未知。
2. **向后兼容**：当更新函数以接受新参数时，旧的调用代码仍然有效。
3. **创建可配置的函数**：允许用户通过传递不同的关键字参数来定制函数的行为。

注意事项：

* 使用`**kwargs`时，它总是在函数参数列表的最后，因为它会“捕获”所有未明确定义的关键字参数。
* 如果函数已经定义了其他参数，那么`**kwargs`应该放在这些参数之后。
* 如果你的函数同时使用`*args`（用于接收任意数量的位置参数）和`**kwargs`，`*args`需要在`**kwargs`之前。


^
## **模块特殊**

模块里的属性和方法
```
#导入函数
import os

#查看OS模块下的函数

>import example
>print(dir(example))
>这将列出`example`模块定义的所有属性和方法，包括函数、类、变量等。

print(dir(os))

#查看OS.path模块下的函数
print(dir(os.path))
```
模块要求
```
每一个文件模块中有一个__name__属性，
当在这个文件中运行时，__name__的值为__main__
当作为模块时，如os模块，os.__name__的值为os
````

