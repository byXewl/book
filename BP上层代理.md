BP和yakit好像默认不走系统代理，所以需要在软件里手动设置一个上层代理。
Proxy->Proxy settings->找到Upstream Proxy Servers
新版本可能在 Network->Connections->找到Upstream Proxy Servers

add添加代理：Destination hostProxy hostProxyport
目标主机填：*，代理主机填：127.0.0.1，端口填：10809（这里以v2举例）
