
通过Webview让移动端套壳网页。

## **调试**
`chrome://inspect/#devices` 是 Google Chrome 浏览器的一个内置页面，它允许开发者检查和调试连接到计算机的设备上的 Chrome 浏览器实例。这个页面通常用于远程调试移动设备上的 Chrome 浏览器，例如 Android 设备。通过这个功能，开发者可以在电脑的 Chrome 浏览器上调试手机端的网页，包括查看和修改 DOM 元素、监控网络请求、查看控制台输出等。

使用 `chrome://inspect/#devices` 的基本步骤如下：

1. 确保你的 Android 设备已经开启了开发者选项和 USB 调试功能。
2. 使用 USB 数据线将 Android 设备连接到电脑。
3. 在电脑上打开 Chrome 浏览器，输入 `chrome://inspect/#devices` 并按回车键。
4. Chrome 浏览器会列出所有可用的设备和它们的 Chrome 浏览器实例。
5. 选择你想要调试的设备和页面，点击 "Inspect" 按钮，这将打开一个新的标签页，其中包含了设备的远程调试会话。
6. 在开发者工具中，你可以使用各种功能来调试你的应用，比如 Elements、Network、Console、Sources 等。

这个功能对于开发和测试移动网站或移动应用中的 WebView 非常有用，因为它允许开发者在更大的屏幕上进行调试，并且可以利用 Chrome 开发者工具的强大功能。此外，这个功能也支持对一些第三方应用中的 WebView 内容进行调试，只要这些应用的 WebView 支持远程调试 。

需要注意的是，为了使用这个功能，你的计算机和设备需要在同一个 Wi-Fi 网络上，或者通过 USB 连接。此外，确保你的 Chrome 浏览器是最新版本，以获得最佳的调试体验。如果你遇到连接问题，可能需要检查 USB 连接、开发者选项设置，或者尝试重新连接设备。


^
## **安卓软件中的网页强开调试**
<https://blog.csdn.net/Jioho_chen/article/details/109345757>

lsposed上算法助手，强开webview调试，
chrome浏览器打开`chrome://inspect`，edge://inspect/#devices
软件里打开网页界面，然后回chrome调试，然后出现页面后，点击inspect就可以了
这里有个小技巧，每个页面第一个进入调试是抓不全的，chrome调试窗口里保留日志刷新一下即可。



