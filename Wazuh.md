Wazuh：一个免费的国外，开源的企业级安全监控解决方案，用于威胁检测，完整性监控，事件响应和合规性。
基于ELK的EDR系统。

<https://www.freebuf.com/sectool/264046.html>
## **Wazuh的组成**
Wazuh分为Manager(ELK+ Server)端和 Agent 端。


Agent 是 Wazuh 平台中的一个关键组件，它是安装在各个受监控主机上的软件代理。Wazuh Agent 负责收集主机上的安全相关数据，并将其发送到 Wazuh Manager 进行分析和处理。具体来说，Wazuh Agent 的功能包括：
1. **日志收集**：Wazuh Agent 可以收集主机上的各种日志，包括系统日志、应用程序日志等，以及其他安全相关数据，如文件完整性检查、Windows 注册表变更等。
2. **实时监控**：Wazuh Agent 可以监控主机上的进程、文件、注册表等活动，实时检测可能的安全事件和威胁。
3. **安全策略执行**：Wazuh Agent 可以执行预定义的安全策略，以确保主机上的安全配置符合规定的标准，并报告任何违规行为。
4. **事件响应**：Wazuh Agent 可以在检测到安全事件时触发响应动作，如发送警报、阻止恶意进程、隔离受感染的主机等。

## **使用**
服务端部署
客户端加入
1、主要功能：基线检测，ATT&CK攻击，日志分析，漏洞自查等
