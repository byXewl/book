## **通过vue/cli架手架创建**
即vue命令创建。
是一个npm的全局包：一键生成工程化的vue 项目-基于webpack、大而全
```
npm install -g @vue/cli
安装后就有vue命令。
查看脚手架版本：vue -V

生成项目：vue ui  或者 vue create projectName   //根据projectName生成一个目录文件
选择vue2还是vue3

进入目录后热启动：npm run serve


使用yarn
yarn global add @vue/cli
此时就有vue命令了
vue -V
如果没有
C:\Users\Administrator.DESKTOP-L9N4RF9\AppData\Local\Yarn\Data\global\node\_modules\.bin\
设置到PATH。
```
## **通过vite创建**
vite也是一个npm 全局包：一键生成工程化的vue 项目-小而巧
可以创建vue react等项目。
```
npm init vite
回车选择vue3还是react，选择js还是ts。
cd vue3_vite
npm install
npm run dev
```

## **通过create-vue创建最新vue3项目**
需要nodejs高于16.20.0版本。本质也是基于vite。
```
npm init vue@latest
此时会安装create-vue
cd vue3-demo
npm install
npm run dev
```
高于16.20.0
**create-vue**
```
npm install -g create-vue
create-vue
进行选择依赖
```