## Windows 镜像

由于 Windows 并不直接开放 syscall ，所有的 Windows 程序都必须通过 sys dll 与内核沟通，这就导致 Windows 镜像并不能直接通过 scratch 来构建，只能基于微软提供的几个基础镜像来构建。

镜像包括：

* [windows servercore](https://hub.docker.com/_/microsoft-windows-servercore) 功能最完整，包含传统的 .net framework 环境
* [windows nanoserver](https://hub.docker.com/_/microsoft-windows-nanoserver) 包含 .net core 运行环境
* [windows](https://hub.docker.com/_/microsoft-windows) 提供完整的 windows server api，正在被 windows server 替代
* [windows server](https://hub.docker.com/_/microsoft-windows-server/) 提供完整的 windows server api

