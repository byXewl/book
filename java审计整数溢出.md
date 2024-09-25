

在Java中，int类型占用 4个字节（32位）的存储空间。Java的int类型是固定大小的，始终占用4个字节， 无论是在32位系统还是64位系统中。这是Java语言的一种特性，与平台无关。

取值范围：int 类型的取值范围是从 -2^31 到 2^31-1，即 -2147483648 到 2147483647。 这是因为int类型使用的是32位有符号整数表示，最高位用于表示符号（0表示正数，1表示负数）。


```
package com.llu.intoverflow;

public class BaseTest {
    public static void main(String[] args) {
//        int a = 2147483647;
//        System.out.println(a);
//        System.out.println(a+1);

        System.out.println("int max :  " + Integer.MAX_VALUE);
        // 上界溢出
        System.out.println(Integer.MAX_VALUE + 1);
        // 下界溢出
        System.out.println("int min : " + Integer.MIN_VALUE);
        System.out.println(Integer.MIN_VALUE - 1);

        /*
        *
int max :  2147483647
-2147483648
int min : -2147483648
2147483647
        *
        *
        * */


        // 修复 让报错异常，而不是溢出后返回一个正常值
        // 加法
//        int i = Math.addExact(Integer.MAX_VALUE, 1); //  integer overflow
        // 减法
        int j = Math.subtractExact(Integer.MIN_VALUE, 1); // integer overflow

    }
}
```
