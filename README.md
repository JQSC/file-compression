# file-compression
多文件的合并压缩，以及单文件的实时压缩预览。

### 运行和打包桌面应用
```
/*
   需要全局安装electron、electron-packager，如果安装后者报错，则在npm的配置文件中加入
   electron_mirror="https://npm.taobao.org/mirrors/electron/"
*/
// 运行
npm start 
// 打包应用,默认只打包成win64下exe执行程序
npm script package 
```

### 设计初衷
网页上检索到的都是针对于单个文件的压缩,没有针对整个目录的所有js的压缩工具,而让每一个项目人员去装nodejs、gulp等一些压缩插件,并让其去写gulpfile.js文件容易出现各样的问题,为了避免项目人员频繁提问,故此作了一个简易的多文件合并压缩桌面工具供其使用。

### 工具
>electron、nodejs、gulp、angular1、ui-bootstrap

### 目录压缩
![按照目录压缩](https://github.com/JQSC/file-compression/blob/master/src/assets/img/p1.png)

### 单文件实时压缩预览
![单文件压缩](https://github.com/JQSC/file-compression/blob/master/src/assets/img/p2.png)

### 桌面应用程序
![桌面程序](https://github.com/JQSC/file-compression/blob/master/src/assets/img/p3.png)