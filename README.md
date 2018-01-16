## 简介
为了学习`webpack`，而模仿其实现的简单web打包工具。
主要参考了 https://github.com/youngwind/blog/issues/99， 十分感谢。

## 功能
- [x] 将所有模块打包到一个js。
- [ ] 代码分块（Code Splitting）。
- [ ] loader机制。


## 运行

### 安装依赖

```shell
// install yarn
$ npm install -g yarn
$ cd imitate-webpack
$ yarn install
```

### 运行

入口文件为根目录下`index.js`。

```shell
$ node <imitate-webpack-root-dir> <filename>
```

### 运行样例

```Shell
$ cd imitate-webpack
$ node . ./src/example/index.js
```


