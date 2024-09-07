如：
```
# 所有以 `runtime/` 或 `application/` 开头的 URL，
返回 HTTP 403 禁止访问的状态码。
location ~* (runtime|application)/{
	return 403;
}

location / {
	if (!-e $request_filename){
		rewrite  ^(.*)$  /index.php?s=$1  last;   break;
	}
}
```