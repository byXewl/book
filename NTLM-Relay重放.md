利用NTLM协议可以PTH攻击和NTLM Relay攻击。
NTLM Relay又包括（中继攻击relay to smb，ldap，ews）。

1. **NTLM-Relay重放**：这是一种攻击技术，利用NTLM（NT LAN Manager）认证协议的缺陷来进行中继攻击。在这种攻击中，攻击者截获用户的NTLM认证凭据（如用户名和密码的哈希值），并将这些凭据重放到另一台服务器，以冒充用户并获得对目标系统的访问权限。这种攻击通常用于内网横向移动，即在已经渗透的网络上进一步获取对其他系统的控制权。
2. **Responder中继攻击**：Responder是一款开源工具，可以用于执行NTLM-Relay攻击。它通过监听网络请求并响应，来捕获网络中的NTLM挑战响应认证凭据，然后攻击者可以使用这些凭据进行横向移动或提升权限。
3. **LDAP（Lightweight Directory Access Protocol）**：LDAP是一种轻量级的目录访问协议，用于在互联网上查询和修改目录服务。在安全领域，LDAP有时被用于NTLM Relay攻击，攻击者通过LDAP协议重放截获的NTLM凭据，以访问或控制使用LDAP认证的服务。
4. **EWS（Exchange Web Services）**：EWS是Microsoft Exchange Server提供的一种应用程序接口，允许开发者访问Exchange邮箱的数据和服务。在NTLM Relay攻击中，EWS可以作为一个攻击目标，攻击者通过EWS服务重放NTLM凭据，以获取邮箱账户的控制权。

