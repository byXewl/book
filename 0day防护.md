1、基于业务方面的0day防御
系统维护升级！！（24小时一般官方升级补丁或者0day防御手段出现）
2、基于技术方面0day防御
0day爆发前拿到poc，根据poc漏洞攻击规则，进行代码修补
虚拟补丁进行流量封堵
设：
流量规则 /index.php?cmd=whoami;
访问index.php页面的并且函数为cmd，存在whoami ，pwd等流量，直接拦截


^
最新漏洞库：http://avd.aliyun.com/hight-risk/list
