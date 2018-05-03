const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      "axios",
      "js-cookie",
      "less",
      "less-loader"
      ]
  },
  output: {
    path: path.join(__dirname, './../static/js'),
    filename: 'Dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, './../static/js', 'manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]_library'
    })
  ]
};
// const path = require('path');
// const webpack = require('webpack');
//
// module.exports = {
//   entry: {
//     vendor: [
//       'babel-polyfill',
//       'axios',
//       "vue-i18n",
//     ]
//   },
//   output: {
//     path: path.join(__dirname, './../static/js'),
//     filename: '[name].dll.js',
//     library: '[name]_library'
//   },
//   plugins: [
//     new webpack.DllPlugin({
//       path: path.join(__dirname, '.', '[name]-manifest.json'),
//       name: '[name]_library'
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
//     })
//   ]
// };
