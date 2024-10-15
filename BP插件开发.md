从一个插件学习开发
<https://github.com/no001ce/N-DecodeAllUnicode/blob/main/N-DecodeAllUnicode.py>
该插件N-DecodeAllUnicode.py，加载到burp后可以将数据包中unicode字符转成明文中文
## **源码**
```
#!/usr/bin/env python
# coding=utf8
from burp import IBurpExtender
from burp import IHttpListener
from burp import IHttpRequestResponse
from burp import IResponseInfo

import re
# Class BurpExtender (Required) contaning all functions used to interact with Burp Suite API
info='''author:syunaht.com
modify:no001ce'''
print(info)


class BurpExtender(IBurpExtender, IHttpListener):

    # define registerExtenderCallbacks: From IBurpExtender Interface
    def registerExtenderCallbacks(self, callbacks):

        # keep a reference to our callbacks object (Burp Extensibility Feature)
        self._callbacks = callbacks
        # obtain an extension helpers object (Burp Extensibility Feature)
        # http://portswigger.net/burp/extender/api/burp/IExtensionHelpers.html
        self._helpers = callbacks.getHelpers()
        # set our extension name that will display in Extender Tab
        self._callbacks.setExtensionName("Decode All Unicode")
        # register ourselves as an HTTP listener
        callbacks.registerHttpListener(self)

    # define processHttpMessage: From IHttpListener Interface
    def processHttpMessage(self, toolFlag, messageIsRequest, messageInfo):

        # determine what tool we would like to pass though our extension:
        # print(toolFlag)
        if toolFlag in [64, 16, 32, 4]:  # if tool is Proxy Tab or repeater
            # determine if request or response:
            if not messageIsRequest:  # only handle responses
                response = messageInfo.getResponse()
                # get Response from IHttpRequestResponse instance
                analyzedResponse = self._helpers.analyzeResponse(
                    response)  # returns IResponseInfo
                headers = analyzedResponse.getHeaders()
                # 替换iso8859-1
                # iterate though list of headers
                new_headers = []
                for header in headers:
                    # Look for Content-Type Header)
                    if header.startswith("Content-Type:"):
                        # Look for HTML response
                        new_headers.append(
                            header.replace('iso-8859-1', 'utf-8'))
                    else:
                        new_headers.append(header)

                body = response[analyzedResponse.getBodyOffset():]
                body_string = body.tostring()
                # print(body_string)
                u_char_escape = re.findall(r'\\u[a-z0-9A-Z]{4}', body_string)
                u_char_escape = list(set(u_char_escape))
                if u_char_escape:
                    for i in u_char_escape:
                        u_char = i.decode('unicode_escape').encode('utf8')
                        body_string = body_string.replace(
                            i, u_char)
                    new_body = self._helpers.bytesToString(body_string)
                    messageInfo.setResponse(
                        self._helpers.buildHttpMessage(new_headers, new_body))
```
## **整体架构**


1. **导入必要的模块**：

   * `burp`模块：这是Burp Suite提供的API，允许插件与Burp Suite进行交互。
   * `re`模块：Python的正则表达式库，用于文本模式匹配。

2. **插件信息**：

   * 定义了一个多行字符串`info`，包含了插件的作者和修改者信息。

3. **插件类定义**：

   * `BurpExtender`类：
        class BurpExtender(IBurpExtender, IHttpListener):
        实现了`IBurpExtender`和`IHttpListener`接口，是插件的主要逻辑部分。

4. **插件初始化**：

   * `registerExtenderCallbacks`方法：在插件加载时被调用，用于初始化插件，设置回调对象、帮助器对象，并注册HTTP监听器。

5. **处理HTTP消息**：

   * `processHttpMessage`方法：作为HTTP监听器，处理通过Burp Suite的HTTP请求和响应消息。这个方法主要关注响应消息，对响应头和响应体进行处理。

     **处理响应头**：

   * 遍历响应头，查找`Content-Type`头，如果其值包含`iso-8859-1`，则将其替换为`utf-8`。

     **处理响应体**：

   * 提取响应体，并使用正则表达式查找所有的Unicode转义字符。
   * 对找到的Unicode转义字符进行解码，替换为对应的UTF-8字符。

     **构建和设置新的响应消息**：

   * 使用Burp Suite的帮助器对象构建新的HTTP响应消息，并将修改后的响应体设置回`messageInfo`对象。

6. **输出插件信息**：

   * 在插件加载时，打印插件信息。

