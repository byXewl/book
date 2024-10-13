BP和yakit好像默认不走系统代理，所以需要在软件里手动设置一个上层代理。
Proxy->Proxy settings->找到Upstream Proxy Servers
新版本可能在 Network->Connections->找到Upstream Proxy Servers

add添加代理：Destination hostProxy hostProxyport
目标主机填：*，代理主机填：127.0.0.1，端口填：10809（这里以v2举例）

^
原来：
浏览器/BurpSuite Repeater/lntruder.. > BurpSuite Proxy > 目标服务器
之后：
浏览器/BurpSuite Repeater/lntruder.. > BurpSuite Proxy >自定义代理服务器>目标服务器
