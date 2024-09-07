### **TCP**
TCP仅支持单播，全双工可靠通信
向上层提供面向接可靠传输服务

TCP数据段，建立连接后，不会发生误码，丢失，乱序，重复。适合不能出不错的应用，如：文件传输。

#### **0x01 TCP报文段**
```
TCP报文段：首部+数据部分
首部：固定部分20字节+可变部分（0 ~ 40字节）
首部固定部分：源端口2字节+目的端口2字节+序号4字节(seq)+确认号4字节(ack)
+标志位1字节(URG/ACK/PSH/RST/SYN/FIN) +校验和(首部+数据二进制反码)+窗口2字节
```
```
不需要关心ip，但需要关心源端口，目标端口
序号seq：由数据部分最后一位确定，根据序号防止请求被网络重复传输。
确认号ack：期望收到的下一个报文段的第一个字节的序号seq，前面已经收到999字节，期望下一次收到1000
序号。
标志位：为1则是，为0则不是，为了体现不同操作。
SYN同步标志位
ACK确认位
FIN终止标志位
RST复位标志位，当RST=1时，TCP连接出现异常，必须释放连接，再重新建立连接。
PSH推送标志位，当PSH=1时，报文段尽快上交应用进程，不必等到接收缓存填满后再上交。TCP有发送缓冲区和接收缓冲区,缓冲区也有助于处理不同速度的数据流，进行流量控制和缓解数据传输时的延迟。
```
<br>
<br>


#### **0X02 TCP流量控制**
让发送方的发送速率不要太快，要让接收方来得及接收，利用滑动窗口机制让TCP连接上实现对发送方的流量控制。

TCP流量控制是指控制发送方向接收方发送数据的速率，以防止接收方因为无法及时处理大量数据而出现溢出或丢失数据的情况。TCP使用**滑动窗口**协议来实现流量控制（TCP报文发送数量）。接收方通过发送接收窗口大小的通知，告知发送方它可以接收多少数据。发送方根据这个窗口大小调整发送的数据量，确保不会超出接收方的处理能力，以避免数据丢失。
#### **0X03 TCP拥塞控制**
拥塞控制是为了防止在网络中出现拥塞，导致数据包丢失或网络性能下降。TCP利用**拥塞窗口**控制数据包的发送速率。当网络出现拥塞时，TCP发送方会减小拥塞窗口的大小，以降低发送数据的速率。随着时间的推移，发送方会逐渐增加拥塞窗口，以尽量发挥网络的潜力，同时又避免引起拥塞。


TCP（传输控制协议）通过使用拥塞控制机制来解决网络拥塞问题。TCP的拥塞控制机制包括四个主要部分：慢开始、拥塞避免、快重传和快恢复。

1. 慢开始：在连接建立后，发送方会从初始的拥塞窗口大小开始发送数据，并在每次成功传输后逐渐增加拥塞窗口的大小。这种策略的目的是避免突然增加数据流量而导致网络拥塞。

2. 拥塞避免：当拥塞窗口大小达到一个阈值后，发送方将采用指数退避算法来减少数据流量，以避免网络拥塞。这种策略的目的是在维持数据流量的同时，防止网络拥塞的发生。

3. 快重传：接收方会定期向发送方发送“快重传”信号，以提醒发送方某些数据包在网络中丢失或被丢弃。发送方在收到“快重传”信号后（收到三个连续的ACK），会立即重传丢失的数据包，而不是等待拥塞窗口完全关闭。

4. 快恢复：在发送方收到“快重传”信号后（收到三个连续的ACK），会立即将拥塞窗口大小减半，然后重新开始数据传输。这种策略的目的是尽快恢复数据传输，并避免长时间的网络拥塞。



拥塞窗口是TCP协议中用于控制数据流量、避免网络拥塞的一种机制。它是**发送端**维护的一个窗口，用于限制可以发送的数据量，以避免发送端和接收端之间的链路因流量过大而过载。
简单来说，拥塞窗口可以控制发送端的发送速率，从而避免网络拥塞。如果发送速率过快，接收端可能会来不及接收数据，导致数据丢失或延迟，从而引发网络拥塞。
> cwnd，即拥塞窗口，是发送方维护的一个窗口，用于限制可以发送的数据量。它的大小可以根据网络状况动态调整，以适应不同的网络环境。
    ssthresh，即慢启动阈值，是在慢启动算法中使用的参数。当cwnd的大小增加到ssthresh时，TCP算法就会进入拥塞避免阶段。在拥塞避免阶段，TCP协议使用加性增长和乘性减少的机制进行拥塞控制。如果发生拥塞，TCP协议就会将ssthresh的值减半，并将cwnd的大小设置为ssthresh。这样cwnd的大小就会回到慢启动阶段，并根据慢启动算法逐渐增加。

![tcp1](http://cdn.33129999.xyz/mk_img/tcp1.png)






#### **0X04 TCP超时重传**
当TCP发送数据后，它会期待接收方发送确认（ACK）来确认已收到的数据。如果发送方在规定的时间内没有收到确认（往返时间RTT>超时重传时间RTO：Retransmission Time-Out），就会假定数据包丢失，并进行超时重传。发送方重新发送未收到确认的数据包，确保数据的可靠传输。超时重传机制是TCP确保数据可靠性的一个重要方面。
#### **0X05 TCP可靠传输**
TCP通过一系列机制来保证可靠传输，其中涉及到序列号 确认应答（三次握手四次挥手）、超时重传机制、流量控制（滑动窗口）、拥塞控制。


^
#### **0X06 TCP运输连接管理**
因为TCP是全双工的，所以关闭连接需要双方都发送关闭请求和确认。这样的设计可以确保数据的可靠传输，避免未完成的数据传输或连接未关闭的情况。
序号seq
确认号ack
SYN同步标志位
ACK确认位
FIN终止标志位
<br>
**1. 建立TCP连接：**
三报文握手
1. TCP客户进程发送TCP连接请求报文段，SYN=1，序号x
2. TCP服务器进程发送TCP连接请求确认报文段，SYN=1,ACK=1,序号y,确认号x+1（希望下一个序号）
3. TCP客户进程发送TCP确认，ACK=1,序号x+1,确认号y+1
<br>
**2. TCP数据传输：**
<br>
**3. 释放TCP连接：**
四报文挥手
1. TCP客户进程发送TCP释放请求报文段，FIN=1,ACK=1,序号u,确认号v
2. TCP服务器进程发送TCP释放请求确认报文段，ACK=1,序号v,确认号u+1
此时TCP服务器进程还能发数据传输
3. TCP服务器进程发送TCP释放最后确认报文段，FIN=1,ACK=1,序号w,确认号u+1
4. TCP客户进程发送TCP普通确认报文段，ACK=1，序号u+1,确认号w+1


^
^
#### **0X07 访问网站的TCP连接情况**

访问一个网站往往有多个请求，多个 HTTP 请求可以共享一个 TCP 连接，以提高效率并减少连接的开销。
<br>
在 HTTP/1.1 中，持久连接（Keep-Alive）机制被广泛采用，它允许客户端和服务器在单个 TCP 连接上发送和接收多个 HTTP 请求和响应，而无需为每个请求建立新的 TCP 连接。这种持久连接的机制使得多个 HTTP 请求可以通过同一个 TCP 连接发送，减少了连接建立和释放的次数，从而提高了性能。
<br>
通常，浏览器会尽可能地重用现有的 TCP 连接来发送多个请求，特别是在同一个域名下的请求，例如请求同一网站中的不同资源（HTML 页面、图片、样式表、JavaScript 等）。这种复用连接的方法能够显著减少连接建立和释放的次数，提高传输效率。
<br>
然而，如果涉及不同的域名（跨域请求）或一些特殊的情况，浏览器可能会使用不同的 TCP 连接。例如，对于不同域名下的资源请求，浏览器通常会采用不同的连接，而不是复用现有连接，以避免跨域安全问题。

总的来说，在现代 HTTP 应用中，通常会尽可能地重用现有的 TCP 连接，以减少连接建立和释放的次数，提高网络传输的效率。
