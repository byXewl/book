## **功能和作用**
**入侵检测系统**（IDS）主要负责监控网络流量，寻找异常行为或已知攻击模式。当检测到可疑活动时，IDS 会发出警报通知网络管理员。
IDS 分类：基于网络加换机的（NIDS）和基于主机的（HIDS）以及分布式的（DIDS）。基于网络的 IDS 分析整个网络的流量，而基于主机的 IDS 则关注特定设备上的活动。

**入侵预防系统**（IPS）在 IDS 的基础上增加了主动防御功能。当检测到恶意活动时，IPS 不仅会发出警报，还会采取措施阻止或减轻攻击。这可能包括阻止来自特定来源的流量、终止与恶意实体的连接或自动更新防火墙规则。
虽然许多公司会部署 IDS 和 IPS 来保护其网络安全，但实际的实施程度和策略可能因公司规模、行业和安全需求而异。除了 IDS 和 IPS，公司还可能采用其他安全措施，如防火墙、安全信息和事件管理（SIEM）系统、数据丢失预防（DLP）解决方案等，以确保网络和数据的安全。

**IDS 在交换机网络中检测流量的方法：**
IDS程序部署到一个主机上监听主机上的网卡，此时在把交互机的镜像端口流量转发到这个主机的网卡上，实现IDS程序可以监听交换机上流量。
1. **镜像端口（SPAN端口）**：交换机通常支持镜像端口（也称为SPAN端口或端口镜像），它可以将特定端口的所有流量镜像到另一个端口上。IDS 可以通过连接到镜像端口来监视网络流量，从而检测潜在的恶意活动或攻击。
2. **流量嗅探器（Inline）**：IDS 可以通过部署在网络架构中的特定位置，如网络边界或内部子网，来嗅探经过交换机的流量。这些 IDS 可以直接与交换机交互，并检测通过交换机的流量，而无需镜像端口。
3. **集成到交换机**：有些高级交换机可能集成了 IDS/IPS 功能。这些交换机可以直接检测和阻止流经它们的恶意流量，而无需额外的 IDS 设备。



SNORT和Suricata是检测网卡的流量包，然后根据定义的规则，**匹配规则才**写入格式化的日志，如：攻击格式的日志。
都可以用作IDS（入侵检测系统）和IPS（入侵防御系统），具体取决于它们的配置和使用方式。
## **SNORT**
SNORT入侵防御系统是世界上最重要的开源IPS，已经正式推出了Snort3，这是一次全面的升级，其特点是改进和新功能，从而增强了性能，加快了处理速度，提高了网络的可扩展性，并有一系列200多个插件，因此用户可以为他们的网络创建一个自定义设置。
snort.conf中引入xx.rules规则。
再命令监听网卡启动即可。
检测到对应流量包就会加入日志文件。

## **Suricata**
与SNORT类似，Suricata也能够分析网络流量以检测潜在的攻击或异常行为。
但与SNORT不同的是，Suricata采用了多线程处理和高性能网络处理技术，使其能够处理大量的网络流量，并具有更好的性能和扩展性。
Suricata引擎能够进行实时入侵检测(IDS)、内联入侵预防(IPS)、网络安全监控(NSM)和离线pcap处理。Suricata使用强大而广泛的规则和签名语言来检查网络流量，并提供强大的Lua脚本支持来检测复杂的威胁。使用标准的输入和输出格式(如YAML和JSON)，使用现有的SIEMs、Splunk、Logstash/Elasticsearch、Kibana和其他数据库等工具进行集成将变得非常简单。

^
ubuntu系统复现：
安装：
apt install snort
安装：
apt-get install suricata

<https://zhuanlan.zhihu.com/p/34329072>

## **检测规则**
<https://zhuanlan.zhihu.com/p/503067178>



SNORT和Suricata使用的规则都遵循一种特定的格式，通常称为"Snort规则语法"，文件后缀.rules。以下是一个典型的Snort规则的示例以及对其各个部分的解释：

```
alert tcp any any -> any 80 
(msg:"发现Potential HTTP Exploit Attempt"; content:"GET /cgi-bin/vuln.cgi"; sid:10001;)
```

在这个例子中，规则由几个部分组成：

1. **动作（Action）**：在这个例子中，动作是 "alert"，表示当规则匹配时，会触发一个警报。

2. **协议（Protocol）**：在括号内的 "tcp" 表示该规则适用于TCP协议。

3. **源IP地址和端口（Source IP Address and Port）**："any any" 表示来自任何IP地址和任何端口的流量。

4. **目标IP地址和端口（Destination IP Address and Port）**： "-> any 80" 表示流量将发送到任何IP地址的端口80（HTTP端口）。

5. **规则选项（Rule Options）**：规则选项提供了规则的具体条件和细节：

   * **msg**：消息（Message）选项是可选的，用于描述该规则所检测到的事件。在这个例子中，消息是 "发现Potential HTTP Exploit Attempt"。
   * **content**：内容（Content）选项指定了规则要匹配的特定字符串或模式。如果数据包中包含指定的内容，规则就会匹配。在这个例子中，要匹配的内容是 "GET /cgi-bin/vuln.cgi"。
   * **sid**：规则ID（Rule ID）选项指定了该规则的唯一标识符。这对于管理和跟踪规则非常有用。在这个例子中，规则ID是10001。

^
如：老板冰蝎通信流量规则
```
alert http any any -> any any  
(msg: "Behinder3 PHP HTTP Request"; flow: established, to_server; content:".php"; http_uri;  pcre:"/[a-zA-Z0-9+/]{1000,}=/i"; flowbits:set,behinder3;noalert; classtype:shellcode-detect; sid: 3016017; rev: 1; metadata:created_at 2020_08_17,by al0ne;)

alert http any any -> any any 
(msg: "Behinder3  PHP HTTP Response"; flow: established,to_client; content:"200"; http_stat_code; flowbits: isset,behinder3; pcre:"/[a-zA-Z0-9+/]{100,}=/i"; classtype:shellcode-detect; sid: 3016018; rev: 1; metadata:created_at 2020_08_17,by al0ne;)

```

ICMP规则
```
alert icmp any any->any any(msg:“发现ping ICMP test":gid:1;sid:10000001;rev:1;)
```