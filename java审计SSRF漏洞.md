场景：
  1、服务端接收前端传递的参数后，没有做充分的过滤限制或编码直接作为服务端请求发起的参数。
  2、关键词：HttpURLConnection.getInputStream、URLConnection.getInputStream、Request.Get.execute、Request.Post.execute、URL.openStream、ImageIO.read、OkHttpClient.newCall.execute、HttpClients. execute、HttpClient.execute等。


*******URL 关键字挖掘*******
share、wap、url、link、src、source、target、u、display、sourceURl、imageURL、domain



危害：服务端请求伪造泄露服务端真实IP、文件读取、内网探测等。
防御：过滤用户可控的参数，限制协议只能为http/https，设置请求白名单等。

## **协议支持**
php ssrf中的伪协议：
```
file dict sftp ldap tftp gopher
```

Java ssrf 中的伪协议：
```
file ftp mailto http https jar netdoc
```


####  SSRF漏洞

[](https://github.com/l4yn3/micro_service_seclab/#4-ssrf%E6%BC%8F%E6%B4%9E)

| 种类                   | 解释                          | 伪代码  |
| -------------------- | --------------------------- | ---- |
|  url.openConnection() | (HttpURLConnection支持http)或(URLConnection) url.openConnection()引起的SSRF | 参照代码 |
| Request.Get()        | Request.Get()引起的SSRF        | 参照代码 |
| OkHttpClient         | OkHttpClient引起的SSRF         | 参照代码 |
| DefaultHttpClient    | DefaultHttpClient引起的SSRF apache的http库的HttpClient使用new HttpGet()   | 参照代码 |
| url.openStream()     | url.openStream()引起的SSRF     | 参照代码 |
| ImageIO.read(url) | 图片才回显，盲SSRF |
| HttpUtil | hutool库createGet |
```
1、
(URLConnection) url.openConnection()支持http、file等。
(HttpURLConnection) url.openConnection() 支持http。

2、
Request.Get() 待测

3、
OkHttpClient 支持http。

4、
DefaultHttpClient、HttpClient 支持http、WebSocket。

5、
url.openStream() 支持http、file等。

6、
ImageIO.read(url) 图片才回显、盲SSRF，支持http、file等。

```





^
## **示例**
```
package com.llu.ssrf;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

@RestController
@RequestMapping("/ssrf")
public class SSRFController {

    //    URLConnection支持伪协议
    @RequestMapping("/urlconnection/vul")
    public String urlconnection(String url1) {
        if (!SafeUtils.checkSSRF(url1)){
            return " :( ";
        }
        StringBuilder res = new StringBuilder();
        try {
            // 创建一个URL对象，指向需要访问的网页地址
            URL url = new URL(url1);
            // 通过URL对象打开一个连接
            URLConnection connection = url.openConnection();
            // 实际执行连接操作
            connection.connect();

            // 获取连接后的输入流，用于读取网页内容
            InputStream inputStream = connection.getInputStream();
            // 使用BufferedReader读取输入流中的内容，这样可以按行读取
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            // 循环读取每一行，直到没有内容为止
            while ((line = reader.readLine()) != null) {
                // 输出读取的每一行内容
                System.out.println(line);
                res.append(line);
            }
            // 关闭BufferedReader以释放资源
            reader.close();
        } catch (Exception e) {
            // 捕获并处理所有异常
            e.printStackTrace();
        }
        return new String(res);
    }

//    HttpURLConnection不支持伪协议
    @GetMapping("/HttpURLConnection/vul")
    public void HttpURLConnection(@RequestParam String url1, HttpServletResponse response) {
        try {
            // 创建URL对象，指向目标网站
            URL url = new URL(url1);
            // 打开与URL的连接
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            // 设置请求方法为GET
            connection.setRequestMethod("GET");
            // 建立与URL的实际连接
            connection.connect();

            // 获取服务器响应码
            int responseCode = connection.getResponseCode();
            // 打印响应码
            System.out.println("Response Code: " + responseCode);
            response.getWriter().write( "responseCode:  " +  responseCode +"<br/>");

            // 获取服务器响应的输入流
            InputStream inputStream = connection.getInputStream();
            // 包装输入流，以便按行读取
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            // 读取并打印每一行响应内容
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                response.getWriter().write( line);
            }
            // 关闭输入流
            reader.close();
        } catch (Exception e) {
            // 处理异常
            e.printStackTrace();
        }
    }


//    openStream支持伪协议
    @GetMapping("/openStream/vul")
    public void openStream(@RequestParam String url1, HttpServletResponse response) {
        try {
            URL url = new URL(url1);
            InputStream inputStream = url.openStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                response.getWriter().write( line);
            }
            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 盲 SSRF，图片才回显，支持伪协议
     * @param url1
     * @param response
     */
    @GetMapping("/ImageIO/vul")
    public void ImageIO(@RequestParam String url1, HttpServletResponse response) {
        try {

            // 从URL读取图像
            URL url = new URL(url1);
            BufferedImage imageFromURL = ImageIO.read(url);
            System.out.println("Image read from URL: " + imageFromURL);
            response.getWriter().write( "Image read from URL: " + imageFromURL);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
```
