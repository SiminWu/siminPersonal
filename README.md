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

##* 项目目录
``` bash
	  build
         |--- build.js
         |--- check-versions.js
         |--- utils.js
         |--- vue-loader.conf.js
         |--- webpack.base.conf.js
         |--- webpack.dev.conf.js
         |--- ebpack.dll.config.js
         |--- webpack.prod.conf.js	
	  config
		      |---dev.env.js
          |---index.js
          |---prod.env.js
          |---test.env.js
	  src
       |---js
		       |---common
           |---api
           |---config.js
           |---index.js
			 |---css
           |---common.less
           |---constants.less
           |---theme.less
			 |---js
           |---regexEnum.js
           |---utils.js
		 components
				   | （多个目录暂时未定）----（组件或页面）
     router
             |---路由
     store
       |---vuex数据
    app.vue
    main.js
    static
    test
    .babelrc
    .editorconfig
    gitignore
    .postcssrc.js
    index.html
    package.json
    README.md
    stats.json
```




For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

