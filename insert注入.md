这里代表一定的非select注入。
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

^
## **插入记录回显注入**
插入记录后，或修改记录后，有回显，如列表。
使用select语句或union联合注入。