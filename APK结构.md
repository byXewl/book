

## 1、Apk结构

[](https://github.com/ZJ595/AndroidReverse/blob/main/Article/02%E7%AC%AC%E4%BA%8C%E8%AF%BE%E3%80%81%E5%88%9D%E8%AF%86APK%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84%E3%80%81%E5%8F%8C%E5%BC%80%E3%80%81%E6%B1%89%E5%8C%96%E3%80%81%E5%9F%BA%E7%A1%80%E4%BF%AE%E6%94%B9.md#1apk%E7%BB%93%E6%9E%84)

apk 全称 Android Package，它相当于一个压缩文件，只要在电脑上将apk后缀改为rar即可解压。

| 文件                    | 注释                                                                                                 |   |
| --------------------- | -------------------------------------------------------------------------------------------------- | - |
| assets目录              | 存放APK的静态资源文件，比如视频，音频，图片等                                                                           |   |
| lib 目录                | armeabi-v7a基本通用所有android设备，arm64-v8a只适用于64位的android设备，x86常见用于android模拟器，其目录下的.so文件是c或c++编译的动态链接库文件 |   |
| META-INF目录            | 保存应用的签名信息，签名信息可以验证APK文件的完整性，相当于APK的身份证(验证文件是否又被修改)                                                 |   |
| res目录                 | res目录存放资源文件，包括图片，字符串等等，APK的脸蛋由他的layout文件设计                                                         |   |
| AndroidMainfest.xml文件 | APK的应用清单信息，它描述了应用的名字，版本，权限，引用的库文件等等信息                                                              |   |
| classes.dex文件         | classes.dex是java源码编译后生成的java字节码文件，APK运行的主要逻辑                                                       |   |
| resources.arsc文件      | resources.arsc是编译后的二进制资源文件，它是一个映射表，映射着资源和id，通过R文件中的id就可以找到对应的资源                                    |   |

## 2.双开及原理

[](https://github.com/ZJ595/AndroidReverse/blob/main/Article/02%E7%AC%AC%E4%BA%8C%E8%AF%BE%E3%80%81%E5%88%9D%E8%AF%86APK%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84%E3%80%81%E5%8F%8C%E5%BC%80%E3%80%81%E6%B1%89%E5%8C%96%E3%80%81%E5%9F%BA%E7%A1%80%E4%BF%AE%E6%94%B9.md#2%E5%8F%8C%E5%BC%80%E5%8F%8A%E5%8E%9F%E7%90%86)

双开：简单来说，就是手机同时运行两个或多个相同的应用，例如同时运行两个微信

| 原理          | 解释                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| 修改包名        | 让手机系统认为这是2个APP，这样的话就能生成2个数据存储路径，此时的多开就等于你打开了两个互不干扰的APP                                                       |
| 修改Framework | 对于有系统修改权限的厂商，可以修改Framework来实现双开的目的，例如：小米自带多开                                                                 |
| 通过虚拟化技术实现   | 虚拟Framework层、虚拟文件系统、模拟Android对组件的管理、虚拟应用进程管理 等一整套虚拟技术，将APK复制一份到虚拟空间中运行，例如：平行空间                               |
| 以插件机制运行     | 利用反射替换，动态代理，hook了系统的大部分与system—server进程通讯的函数，以此作为“欺上瞒下”的目的，欺骗系统“以为”只有一个apk在运行，瞒过插件让其“认为”自己已经安装。例如：VirtualApp |

## 3.汉化APK

[](https://github.com/ZJ595/AndroidReverse/blob/main/Article/02%E7%AC%AC%E4%BA%8C%E8%AF%BE%E3%80%81%E5%88%9D%E8%AF%86APK%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84%E3%80%81%E5%8F%8C%E5%BC%80%E3%80%81%E6%B1%89%E5%8C%96%E3%80%81%E5%9F%BA%E7%A1%80%E4%BF%AE%E6%94%B9.md#3%E6%B1%89%E5%8C%96apk)

汉化：使用专门的工具对外文版的软件资源进行读取、翻译、修改、回写等一系列处理，使软件的菜单、对话框、提示等用户界面显示为中文，而程序的内核和功能保持不变，这个过程即为软件汉化

基本上字符串都是在arsc里，建议一键汉化，然后再润色。 少量没汉化到的字符串参考视频中的方法定位去逐个汉化。

### 流程图

[](https://github.com/ZJ595/AndroidReverse/blob/main/Article/02%E7%AC%AC%E4%BA%8C%E8%AF%BE%E3%80%81%E5%88%9D%E8%AF%86APK%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84%E3%80%81%E5%8F%8C%E5%BC%80%E3%80%81%E6%B1%89%E5%8C%96%E3%80%81%E5%9F%BA%E7%A1%80%E4%BF%AE%E6%94%B9.md#%E6%B5%81%E7%A8%8B%E5%9B%BE)

这里还需要注意的是，如果要直装应用，那就应该先签名安装，看看是否有签名校验导致的闪退 [![|800](https://github.com/ZJ595/AndroidReverse/raw/main/Article/_assets_02/cb35179c3ff8786b19fc1d2d2ecae12e.webp)](https://github.com/ZJ595/AndroidReverse/blob/main/Article/_assets_02/cb35179c3ff8786b19fc1d2d2ecae12e.webp)

## 4.初识AndroidMainfest.xml

[](https://github.com/ZJ595/AndroidReverse/blob/main/Article/02%E7%AC%AC%E4%BA%8C%E8%AF%BE%E3%80%81%E5%88%9D%E8%AF%86APK%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84%E3%80%81%E5%8F%8C%E5%BC%80%E3%80%81%E6%B1%89%E5%8C%96%E3%80%81%E5%9F%BA%E7%A1%80%E4%BF%AE%E6%94%B9.md#4%E5%88%9D%E8%AF%86androidmainfestxml)

***

AndroidManifest.xml文件是整个应用程序的信息描述文件，定义了应用程序中包含的Activity,Service,Content provider和BroadcastReceiver组件信息。每个应用程序在[根目录](https://so.csdn.net/so/search?q=%E6%A0%B9%E7%9B%AE%E5%BD%95\&spm=1001.2101.3001.7020)下必须包含一个AndroidManifest.xml文件，且文件名不能修改。它描述了package中暴露的组件，他们各自的实现类，各种能被处理的数据和启动位置。

| 属性                                   | 定义                                         |
| ------------------------------------ | ------------------------------------------ |
| versionCode                          | 版本号，主要用来更新，例如:12                           |
| versionName                          | 版本名，给用户看的，例如:1.2                           |
| package                              | 包名，例如：com.zj.52pj.demo                     |
| uses-permission android\:name=""     | 应用权限，例如：android.permission.INTERNET 代表网络权限 |
| android\:label="@string/app\_name"   | 应用名称                                       |
| android\:icon="@mipmap/ic\_launcher" | 应用图标路径                                     |
|  android\:debuggable="true"          | 应用是否开启debug权限                              |

