const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  // 选项...
  publicPath: '',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, //匹配文件名
            threshold: 1024, //对超过10k的数据压缩
            deleteOriginalAssets: false //是否删除源文件
          })
        ]
      }
    }
  },
}