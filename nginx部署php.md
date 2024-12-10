Nginx作为一个Web服务器，不能直接执行PHP代码。当Nginx接收到一个PHP请求时，它会通过FastCGI协议将请求转发给PHP-FPM处理。
(FastCGI默认9000端口，或监听socket文件如listen = /tmp/php-cgi-74.sock宝塔默认)。
PHP-FPM监听在9000端口，接收来自Nginx的请求，并处理这些请求，然后将结果返回给Nginx，最终由Nginx返回给客户端

Apache可以配置为一个模块来执行PHP代码，这种情况下，PHP是作为Apache的一部分运行的。这意味着PHP代码可以直接在Apache内部执行，而不需要通过FastCGI协议进行通信。然而，Apache也可以配置为使用FastCGI来处理PHP请求，类似于Nginx与PHP-FPM的交互方式。



## **部署原理**
当用户访问一个以 `.php` 结尾的文件时，涉及到 Nginx 与 PHP-FPM 的协同工作。以下是整个过程的基本原理：

1. **用户请求：**

   * 用户通过浏览器或其他客户端访问一个以 `.php` 结尾的文件，比如 `example.php`。

2. **Nginx处理请求：**

   * Nginx作为Web服务器，首先接收到用户的HTTP请求。

3. **Nginx配置：**

   * Nginx配置文件中的 `location` 指令捕获了以 `.php` 结尾的请求，并定义了如何处理这些请求。

4. **FastCGI：**

   * Nginx通过FastCGI协议与PHP-FPM通信。FastCGI是一种将Web服务器与外部应用程序（如PHP解释器）进行通信的协议。

5. **转发到PHP-FPM：**

   * `location ~ \.php$` 配置块中的 `fastcgi_pass` 指令告诉Nginx将请求转发给PHP-FPM。这里通过UNIX套接字或TCP套接字（具体取决于配置）将请求传递给PHP-FPM。

6. **PHP-FPM处理请求：**

   * PHP-FPM（PHP FastCGI Process Manager）接收到由Nginx传递的请求。
   * PHP-FPM负责管理PHP进程池，根据需要启动、停止或重启PHP进程。

7. **PHP脚本执行：**

   * PHP-FPM将请求交给PHP解释器，解释器执行 `.php` 文件中的PHP脚本。
   * PHP脚本可以包含动态生成的HTML、数据库查询、文件操作等PHP语句。

8. **结果返回：**

   * PHP解释器生成动态内容，将其返回给PHP-FPM。

9. **Nginx接收响应：**

   * PHP-FPM将生成的HTML等内容传递回Nginx。

10. **Nginx返回给客户端：**

    * Nginx将最终生成的HTML响应返回给用户的浏览器。

这样，整个过程完成，用户的请求得到了由PHP脚本生成的动态内容。整个过程中，Nginx负责Web服务器的角色，而PHP-FPM则负责管理PHP脚本的执行。这种架构使得Nginx可以高效地处理HTTP请求，并通过FastCGI协议将动态请求传递给PHP解释器。

## **部署过程**

1. **安装Nginx：**

   * 对于Ubuntu系统：

     ```
     bashCopy code
     sudo apt update
     sudo apt install nginx
     ```

   * 对于CentOS系统：

     ```
     bashCopy code
     sudo yum install epel-release
     sudo yum install nginx
     ```

2. **安装PHP和PHP-FPM：**

   * 对于Ubuntu系统：

     ```
     bashCopy code
     sudo apt install php-fpm
     ```

   * 对于CentOS系统：

     ```
     bashCopy code
     sudo yum install php-fpm
     ```

3. **配置Nginx与PHP-FPM：**

   * 打开Nginx的配置文件（通常是 `/etc/nginx/nginx.conf` 或 `/etc/nginx/sites-available/default`），并确保包含以下内容：

     ```
     nginxCopy code
     server {
         listen 80;
         server_name your_domain.com;
         root /path/to/your/webroot;
         index index.php index.html index.htm;

         location / {
             try_files $uri $uri/ /index.php?$query_string;
         }

         location ~ \.php$ {
             include snippets/fastcgi-php.conf;
             fastcgi_pass unix:/var/run/php/php7.4-fpm.sock; # 根据实际安装的PHP版本和配置调整
             fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
             include fastcgi_params;
         }
     }
     ```

   * 请根据实际情况调整上述配置。

4. **重启Nginx和PHP-FPM：**

   ```
   bashCopy code
   sudo service nginx restart
   sudo service php7.4-fpm restart  # 根据实际安装的PHP版本和配置调整
   ```

5. **编写和测试PHP脚本：**

   * 在 `/path/to/your/webroot` 目录下创建一个 `index.php` 文件，包含以下内容：

     ```
     phpCopy code
     <?php
     phpinfo();
     ?>
     ```

   * 通过浏览器访问服务器的域名或IP地址，应该能够看到PHP信息页面。

这样，您就完成了Nginx与PHP-FPM的安装和配置，使其能够解析和执行PHP脚本。

## **类比Apache**


当用户访问一个以 `.php` 结尾的文件时，涉及到 Apache 与 PHP 的协同工作。以下是整个过程的基本原理：

1. **用户请求：**

   * 用户通过浏览器或其他客户端访问一个以 `.php` 结尾的文件，比如 `example.php`。

2. **Apache处理请求：**

   * Apache作为Web服务器，首先接收到用户的HTTP请求。

3. **Apache配置：**

   * Apache配置文件中的 `mod_php` 模块或其他类似模块负责处理PHP请求。

4. **PHP解析：**

   * Apache将请求传递给PHP解释器。通常，Apache使用 `mod_php` 模块直接嵌入PHP解释器。

5. **PHP脚本执行：**

   * PHP解释器执行 `.php` 文件中的PHP脚本。
   * PHP脚本可以包含动态生成的HTML、数据库查询、文件操作等PHP语句。

6. **结果返回：**

   * PHP解释器生成动态内容，将其返回给Apache。

7. **Apache接收响应：**

   * Apache接收由PHP生成的HTML等内容。

8. **Apache返回给客户端：**

   * Apache将最终生成的HTML响应返回给用户的浏览器。

这样，整个过程完成，用户的请求得到了由PHP脚本生成的动态内容。整个过程中，Apache负责Web服务器的角色，而PHP解释器直接嵌入在Apache中，处理PHP脚本的执行。这种方式与Nginx和PHP-FPM的协同工作稍有不同，但基本原理相似。

