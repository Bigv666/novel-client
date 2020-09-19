module.exports = {
  // baseUrl: './', //3.3弃用，改为publicPath
  publicPath: './',
  outputDir: 'dist', // 打包的目录
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径
  filenameHashing: true, //
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: false, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 9898, // 服务端口
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://120.79.189.214:9527/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
