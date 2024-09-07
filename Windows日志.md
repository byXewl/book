![image-20240614094834209](http://cdn.33129999.xyz/mk_img/image-20240614094834209.png)

## 日志策略开启：
在默认情况下，安全日志仅仅只记录一些简单的登录日志。需要记录详细的安全日志，则需要通过修改本地策略来启用其它项的安全日志记录功能。通过win+r->gpedit.msc打开本地策略编辑。
计算机配置-Windows设置-安全设置-本地策略-审核策略


## 清理Windows日志中的痕迹

```
• 打开事件查看器：开始->运行->eventvwr.msc
• 注册表位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\eventlog
```

## []()常见需要清理的日志

系统日志（SysEvent）

```
• 记录操作系统组件产生的事件，主要包括驱动程序、系统组件和应用软件的崩溃及数据
• 默认位置：C:\Windows\System32\winevt\Logs\System.evtx
```

应用程序日志（AppEvent）

```
• 包含应用程序或系统程序记录的事件，主要记录程序运行方面的事件
• 默认位置：C:\Windows\System32\winevt\Logs\Application.evtx
```

安全日志（SecEvent）

```
• 记录系统安全审计事件，包含各种类型登录日志、对象访问日志、进程追踪、特权使用、账号管理、策略变更和系统事件
• 默认位置：C:\Windows\System32\winevt\Logs\Security.evtx
```


## 查看`evtx`文件

要查看`evtx`文件中的内容，你可以使用Windows自带的事件查看器(Event Viewer)。以下是打开事件查看器的步骤：

1. 打开“开始”菜单。
2. 输入“事件查看器”并打开它。
3. 在事件查看器中，你可以看到不同的日志类别，如“应用程序和服务日志”、“Windows日志”等。
4. 选择“Windows日志”，然后选择“系统”类别，就可以看到`System.evtx`文件中的事件记录了。

请注意，直接打开`evtx`文件，删除修改需要相应的权限，通常需要管理员权限


## []()powershell命令自动清除

```
PowerShell -Command "& {Clear-Eventlog -Log Application,System,Security}"
```

## []()MSF清除Windows日志

```
显示
        run event_manager -i
清除
        run event_manager -c
```

