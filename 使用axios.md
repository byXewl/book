```
npm install axios
//此时package.json中：
 "dependencies": {
    "axios": "^1.6.2",
}

//js中：
import axios from 'axios'
```
## **axios使用步骤**
第一步：安装 npm install axios
第二步：创建axios实例----http.js
下面为vue2写法：
```
import axios from 'axios'
let instance= this.$axios.create({
	      baseURL: 'http://localhost:3000',
	      timeout: 2000
})
export default instance
``` 
下面为vue3写法：
```  
import axios from 'axios'
// 创建一个 axios 实例
const service = axios.create({
	      baseURL: 'https://www.fastmock.site/mock/047c095a50ff894af13ed89a465120e6/sss1', // 所有的请求地址前缀部分
	      timeout: 60000, // 请求超时时间毫秒
})
export default service
```
第三步：访问网络
```
import service from '../axios/http.js'
service.get('/goods.json').then(res => {
	       console.log(res.data);
})
```
可以这样分层写：
1）写一个中间层：user.js
```
// 导入axios实例
// import httpRequest from './http.js'
import service from './http.js'  ----------->由于前面导出是一个export default 所以可以任意命名
// 获取用户信息
export function apiGetUserInfo() {
    return service({
		url: '/api2',         ----------->给axios配置更详细的参数
		method: 'get',
	})}
```
2）访问网络
```
<script setup>
import { onMounted } from 'vue';
import { apiGetUserInfo } from './user.js';
function getUserInfo() {
    apiGetUserInfo().then((res) => {
        console.log(res);
    });
}
onMounted(() => {
    getUserInfo();
});
</script>

```