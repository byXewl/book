composer


## 安装Composer

> 如果还没有安装 `Composer`，在 `Linux` 和 `Mac OS X` 中可以运行如下命令：
>
> ```
> curl -sS https://getcomposer.org/installer | php
> mv composer.phar /usr/local/bin/composer
> ```
>
> 在 Windows 中，你需要下载并运行 [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe)。\
> 如果遇到任何问题或者想更深入地学习 Composer，请参考Composer 文档（[英文文档](https://getcomposer.org/doc/)，[中文文档](http://www.kancloud.cn/thinkphp/composer)）。

由于众所周知的原因，国外的网站连接速度很慢。因此安装的时间可能会比较长，我们建议使用国内镜像。

> 打开命令行窗口（windows用户）或控制台（Linux、Mac 用户）并执行如下命令：
>
> ```
> 阿里云：
> composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
> 华为云：
> composer config -g repo.packagist composer https://repo.huaweicloud.com/repository/php/
> ```

