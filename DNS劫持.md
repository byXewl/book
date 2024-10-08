kali工具Ettercap
Ettercap 基于arp欺骗实现 DNS 劫持的原理通常涉及以下几个步骤：

1. **网络监听**：Ettercap 首先需要放置在目标网络的路径上，以便捕获流经网络的流量。这通常涉及到将 Ettercap 运行在网络网关或使用 ARP 欺骗技术来拦截流量。
2. **ARP 欺骗**：Ettercap 可以使用 ARP 欺骗（也称为 ARP 毒化或 ARP 投毒）来让网络上的设备认为攻击者控制的机器是网关。这样，所有流向真正网关的流量都会被发送到攻击者机器上。
3. **DNS 欺骗**：当 Ettercap 截获到 DNS 查询请求时（通常是对域名的解析请求），它可以用虚假的 DNS 响应来响应这些请求。例如，如果用户尝试访问 `bank.com`，Ettercap 可以返回一个指向攻击者控制服务器的 IP 地址的 DNS 响应。如访问baidu.com访问到攻击者主机ip上的一个8080服务。
4. **流量转发**：在发送虚假 DNS 响应之后，Ettercap 会将原始的 DNS 查询转发给真正的 DNS 服务器，并获取合法的响应。然后，Ettercap 将这个合法的响应替换为包含攻击者指定 IP 地址的响应，并将这个虚假响应发送给原始请求者。
5. **会话劫持**：一旦 DNS 响应被篡改，用户的浏览器或应用程序将连接到攻击者指定的 IP 地址，而不是正确的地址。如果攻击者控制的服务器配置了相应的网站内容，用户可能会在不知情的情况下访问一个假冒的网站。
6. **数据捕获**：在用户与假冒服务器交互的过程中，攻击者可以捕获敏感信息，如登录凭证、个人信息等。

使用 Ettercap 进行 DNS 劫持是一种非法行为，除非是在渗透测试或网络安全培训的合法和授权的环境下进行。在任何其他情况下使用这些技术都可能导致严重的法律后果。同时，网络管理员应该采取措施保护 DNS 服务器不受此类攻击的影响，例如使用 DNSSEC（DNS 安全扩展）和确保网络设备配置了防止 ARP 欺骗的安全设置。

## **DNS劫持防范**
1.本地HOST文件配置，这里可以查一下本地的HOST文件有没有被修改，一些木马攻击后都会修改HOST文件，所有可以排查一些本地的HOST文件的配置。查询地址：C:IWindowsISystem32IdriversletclHOSTS
2.网卡的DNS服务器地址有没有被篡改。
3.WiFi路由器的DNS服务器有没有被篡改，部分木马会对WiFi路由器进行攻击，例如弱口令爆破，如果WiF路由器的密码简单，那么可能就会被修改，同时批量修改DNS就会导致解析出现问题。
4.还有就是运营商DNS，默认情况下运营商会将你访问的地址强制跳转到某个DNS上进行解析，确保你的访问正常，同时屏蔽一些恶意网址。查询运营商DNS：<https://nstool.netease.com/>
5.安装杀毒软件，也可以降低一些DNS劫持的风险，部分杀毒软件是有专门对DNS修改进行检测的。
