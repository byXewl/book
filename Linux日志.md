

## 位置

```
/var/log
```

## 清除登录系统信息

```
echo > /var/log/wtmp //清除
```

```
last //查询不到登录成功的信息
```

## 清除历史记录

```
echo > /root/.bash_history
```

## 清除用户最后一次登录时间

```
echo > /var/log/lastlog     #lastlog命令查看
```

## 清除当前登录用户的信息

```
echo > /var/log/utmp     #使用w,who,users等命令查看
```

## 清除安全日志记录
```
cat /dev/null > /var/log/secure
```

## 清除系统日志记录

```
cat /dev/null > /var/log/message
```



^
## **Linux的日志系统**
Linux的日志系统是确保系统安全性和稳定性的重要组成部分。以下是对Linux日志系统的归纳总结，特别是与安全相关的方面：

### 1. 日志文件的重要性

日志文件记录了系统和应用程序的运行状态，对于监控系统性能、排查故障以及进行安全审计至关重要。

### 2. 日志文件分类

* **系统日志**：记录系统启动、运行和关闭过程中的信息。
* **应用程序日志**：由应用程序生成，记录程序运行时的详细信息。
* **安全日志**：特别关注认证、授权和账户管理等安全相关的事件。

### 3. 常见的安全相关日志文件

* `/var/log/secure`：记录与安全相关的信息，如用户登录尝试、SSH登录等5253。
* `/var/log/auth.log`：某些Linux发行版中，这个文件可能与`/var/log/secure`相似或相同，记录认证相关日志。
* `/var/log/btmp`：记录失败的登录尝试，是二进制文件，需用`lastb`命令查看。
* `/var/log/lastlog`：记录系统中所有用户最后一次登录的信息，是二进制文件，需用`lastlog`命令查看。
* `/var/log/wtmp`：永久记录所有用户的登录和注销信息，是二进制文件，需用`last`命令查看。

### 4. 日志轮替（Log Rotation）

使用`logrotate`工具自动归档和清理旧日志文件，避免日志文件过大50。

### 5. 日志管理工具

* `syslog`和`rsyslog`：传统的日志管理系统，负责收集、处理和存储日志信息。
* `journalctl`：systemd的日志查看和管理工具，用于查询和操作systemd的日志。

### 6. 日志级别

日志通常分为不同的级别，如：

* `DEBUG`：调试信息。
* `INFO`：常规信息。
* `WARNING`：警告信息。
* `ERROR`：错误信息。
* `CRITICAL`：严重错误。

### 7. 安全日志分析

安全日志分析是识别潜在安全威胁、入侵检测和事故响应的关键步骤。分析工具如`grep`、`awk`、`sed`等用于过滤和分析日志数据。

### 8. 日志保护

保护日志文件的完整性和安全性至关重要，防止被未授权访问或篡改。定期备份日志文件，并确保它们的访问权限限制在可信任的用户和系统内。

### 9. 实践建议

* 定期审查日志文件，特别是安全相关的日志。
* 配置合适的日志级别，以便收集足够的信息，同时避免产生过多的日志数据。
* 使用自动化工具监控和分析日志，以便快速响应安全事件。

