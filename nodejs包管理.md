nodejs下载：<https://nodejs.org/en>
yarn和npm都是js的包管理工具，如管理node_modeules包等。


从 Node.js 版本 5 开始，npm 就成为 Node.js 的官方包管理工具，并随着 Node.js 一起发布。因此，一旦你安装了 Node.js，npm 也会被自动安装。主流nodejs版本要大于16.0了，18到20最好。
nodejs：v16  大概对应npm: 8
nodejs：v20 大概对应npm：10

^
## **nvm**
安装nvm前先卸载npm和yarn。
nvm是对 node 和npm进行版本控制，有的node_modeules依赖需要靠node17运行，而你的node可能为20。
当你使用 `nvm use <version>` 切换到特定版本的 Node.js 后，`npm` 命令应该自动关联到该版本的 `npm`。你可以使用 `npm -v` 来检查当前使用的 `npm` 版本，确保它与你切换的 Node.js 版本相对应。
如果你使用 `nvm use 10.0.0`，然后运行 `npm -v`，应该显示与 Node.js 10.0.0 相关的 `npm` 版本。
```
查看远程可安装node版本
nvm list available
安装长期支持版
nvm install lts
安装指定版本，如：
nvm install 14.20.0
查看本地上有的node版本
nvm list   //nvm ls
使用
nvm use lts
nvm use 14.20.0


在下载node版本的时候会顺便下载对应的npm，有时候可能github连接出错没有下载npm，需要卸载后多试几次，直到完全下载。
nvm uninstall 14.20.0
nvm install 14.20.0
最好在能下载的时候
把10，14，18，20版本的node及其对应npm都下载。
nvm use 18.12.0一般现在这个版本
```

^
## **yarn**
yarn好处：npm在你安装A的时候需要安装依赖C和D，很多依赖不会指定版本号，默认会安装最新的版本，这样就会出现问题：比如今天安装模块的时候C和D是某一个版本，而当以后C、D更新的时候，再次安装模块就会安装C和D的最新版本，如果新的版本无法兼容你的项目，你的程序可能就会出BUG，甚至无法运行。这就是npm的弊端，而yarn为了解决这个问题推出了yarn.lock的机制。
yarn有1.x和2.x版本。
1.x可以通过npm安装，然后自行配置环境变量。
```
npm install --global yarn
npm install -g yarn@1.19.2  //-g全局安装，安装在电脑的指定目录下，一般在node中可设定。

npm uninstall -g yarn //卸载

yarn install //也依赖与node的版本，有的依赖node版本对才能安装成功。

yarn global add @vue/cli
此时就有vue命令了
vue -V
```
^
## **npm install命令**


npm install用于安装项目的依赖项（通常是 JavaScript 包或模块），也可以npm i
这个命令会读取项目的 package.json`文件，并安装在该文件中列出的所有依赖项。
执行以下主要任务：
1. **安装项目依赖项**：根据 `package.json` 文件中的 `dependencies` 和 `devDependencies` 字段，安装项目所需的所有依赖项。
`dependencies` 通常包含在生产环境中运行应用程序时所需的依赖项。
`devDependencies` 包含在开发过程中所需的依赖项。
2. **创建 `node_modules` 目录**：`npm install` 会在项目根目录下创建一个名为 `node_modules` 的目录，并在其中安装所有依赖项的文件。
3. **生成 `package-lock.json` 文件**：如果 `package-lock.json` 文件不存在，`npm install` 会生成该文件。`package-lock.json` 文件用于锁定项目的精确依赖版本，以确保在不同环境中安装相同的依赖项版本，提高项目的可重复性。

如：安装axios
```
npm install axios
//此时package.json中：
 "dependencies": {
    "axios": "^1.6.2",
}
```
走镜像安装
```
npm install --registry=https://registry.npm.taobao.org
```
node-sass可能安装失败，他还依赖python2环境，通过以下解决：
<https://www.w3cschool.cn/article/29315017.html>
<https://zhuanlan.zhihu.com/p/656247517>


^
## **npm 其他命令**
npm ls  本项目安装的依赖
npm ls -g 全局安装的依赖


设置为淘宝源
npm config set registry https\://registry.npmmirror.com

查看下载源
npm config get registry


