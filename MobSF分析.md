移动安全框架 (MobSF) 是一种自动化的一体化移动应用程序 (Android/iOS/Windows) 、恶意软件分析和安全评估框架，能够执行静态和动态分析。MobSF 支持移动应用二进制文件（APK、XAPK、IPA 和 APPX）以及压缩源代码，并提供 REST API 以与您的 CI/CD 或 DevSecOps 管道无缝集成。动态分析器可帮助您执行运行时安全评估和交互式仪器测试。

工具github：https://github.com/MobSF/Mobile-Security-Framework-MobSF


MobSF docker使用:

| 步骤  | 说明                    | 命令                                                                              |
| --- | --------------------- | ------------------------------------------------------------------------------- |
| 步骤1 | 下载docker镜像                  | docker pull opensecurity/mobile-security-framework-mobsf                        |
| 步骤2 | 启动容器                  | docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest |
| 步骤3 | 访问服务                  | [http://127.0.0.1:8000](http://127.0.0.1:8000/)                                 |
| 步骤4 | 上传Android或者iOS应用并确认结果 | -自动尝试反编译并分析。                                                                               |

