**mt_srand()函数**的作用是给随机数发生器播种，播种会初始化随机数生成器。语法为mt\_srand(seed)，其seed参数为必须。大多数随机数生成器都需要初始种子。在PHP中，因为自动完成，所以mt\_srand()函数的使用是可选的。从 PHP 4.2.0 版开始，seed 参数变为可选项，当该项为空时，会被设为随时数。播种后mt\_rand函数就能使用Mersenne Twister算法生成随机整数。\
但是用这个函数时会存在一些问题，每一次调用mt\_rand()函数的时候，都会检查一下系统有没有播种,(播种是由mt\_srand()函数完成的)，当随机种子生成后，后面生成的随机数都会根据这个随机种子生成。所以同一个种子下随机生成的随机数值是相同的。同时，也解释了我们破解随机种子的可行性。如果每次调用mt\_rand()函数都需要生成一个随机种子的话，那根本就没办法破解。

^
## **常规题**
手动播种，造成伪随机，生成是固定值。
```
<?php
mt_srand(372619038);
echo mt_rand();
?>
```

^
## **常规爆破**
知道生成的伪随机数，使用kali中php_mt_seed爆出种子
```
./php_mt_seed -683452613
```

^
## **爆破题**
```
$_SESSION['seed']=rand(0,999999999);
mt_srand($_SESSION['seed']);
mt_rand(xxx); 生成了OcRiTWUJrNxxxxxxx，知道前10位字符，共20位。
```
可以通过已经知道的几个字符去反推mt_rand()，再利用php_mt_seed工具反推种子
python代码
```
str1='abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str2='OcRiTWUJrN'
res=''
for i in range(len(str2)):  
    for j in range(len(str1)):
        if str2[i] == str1[j]:
            res+=str(j)+' '+str(j)+' '+'0'+' '+str(len(str1)-1)+' '
            break
print(res)
```
得到33 33 0 61 57 57 0 61 41 41 0 61 25 25 0 61 6 6 0 61 21 21 0 61 30 30 0 61 0 0 0 61 35 35 0 61 60 60 0 61
使用php_mt_seed工具得到种子。
```
git clone https://github.com/openwall/php_mt_seed.git
make
./php_mt_seed 50 50 0 61 2 2 0 61 53 53 0 61 8 8 0 61 55 55 0 61 58 58 0 61 56 56 0 61 45 45 0 61 17 17 0 61 49 49 0 61
```
得到648659070，php7，即上面的$_SESSION['seed']。
```
<?php
mt_srand(种子); //种子填你自己得到的
$str_long1 = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
$str='';
$len1=20;
for ( $i = 0; $i < $len1; $i++ ){
    $str.=substr($str_long1, mt_rand(0, strlen($str_long1) - 1), 1);       
}
echo $str;
```
即可到全部内容OcRiTWUJrNql3EegRLrS
