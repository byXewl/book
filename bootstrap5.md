```
验证哈希引入CSS:
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

验证哈希引入JS:
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```
国内引入：、
```
<!-- 新 Bootstrap5 核心 CSS 文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/css/bootstrap.min.css">
 
<!--  popper.min.js 用于弹窗、提示、下拉菜单 -->
<script src="https://cdn.staticfile.org/popper.js/2.9.3/umd/popper.min.js"></script>
 
<!-- 最新的 Bootstrap5 核心 JavaScript 文件 -->
<script src="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/js/bootstrap.min.js"></script>
```

简单导航：
```
<!doctype html>
<html lang="zh-CN">

<head>
    <!-- 必须的 meta 标签 -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap5 的 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/css/bootstrap.min.css">
 
    <!-- vue2 -->
    <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
    <title>一个导航</title>

</head>

<body>

    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">导航</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" href="#">首页</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">关于</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                      更多
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">更多1</a></li>
                      <li><a class="dropdown-item" href="#">更多2</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">无更多</a></li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1">登录</a>
                  </li>
                </ul>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="输入内容">
                  <button class="btn btn-outline-success" type="submit">OK</button>
                </form>
              </div>
            </div>
          </nav>
          
    </div>



  
    <script src="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/js/bootstrap.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {  
                isOK:true,
                username:'',
                phone:'',
                address:'',
                payway:1,
            },
            computed: {
               
            },
            methods: {
                submitForm(){
                    if(this.username.length>0 && this.phone.length>0 && this.address.length>0){
                        location.reload(); 
                    }else{
                        this.isOK=false;
                        return;
                    }

                }
            },
        });
    </script>
    
</body>

</html>
```