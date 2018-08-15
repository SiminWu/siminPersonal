#开发文档
---------------------------
> 基础环境搭建

## Build Setup
Thank `You` . Please `Call` Me `Coder`

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
##前端工程化
------------------------
## 项目目录
``` 
siminPersonal
    |-- build---（webpack配置目录）
    |-- config ---（config文件主要是项目相关配置，当端口冲突时配置监听端口，打包输出路径及命名等）
    |-- src
        |-- common
            |-- api -----（后台接口统一配置）
            |-- css ------（样式目录）
            |-- js -----（共用js目录）
        |-- components ---（公共组件）
        |-- router  ----（路由配置）
        |-- store ----
            |--actions.js
                getter.js
                mutations.js
                states.js
                index.js
    |-- static------（静态资源文件）
        |-- font
        |-- images
        |-- js
    |-- docs
        .babrlec
        .gitignore
        index.html
        package.json
        README.md

```
## 规范标准
```
js规范
* 统一采用CommonJ规范
* 遵循严格模式
* 使用ES6/ES7语法糖
css规范
* 合理使用该id, 尽量避免使用id作为样式选项
* css选择器，避免携带标签名
* 采用精准选择，减少多重嵌套
* 缩写属性，例如font, border等
* 如果值为0，就不要带单位
* 颜色值尽量采用十六进制，如#aaa, 不建议#aaaaaa
* 分隔符可采用 - 或 _
* 内容统一采用双引号
html规范
* 尽可能的语义化
* 多媒体回溯，例如img, 需带上 alt=""
* 关注点分离，将css, html, js分离，避免在html嵌套其他
* 减少没实际作用的标签
一般规范
* 文本缩进统一采用两个空格大小
* 如果非函数，尽量减少多行注释
* 使用Eslint检测代码格式(视情况而定)
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

