### **UDP**
UDP支持单播，多播，广播。
一对一，一对多，一对全。

向上层提供无连接不可靠传输服务
UDP数据报，发生误码，**丢失**，不会重新发送，适合实时应用，如：视频会议，直播，实时游戏。

UDP数据报：首部8字节+数据部分。
首部：源端口2+目的端口2+长度2+校验和2。