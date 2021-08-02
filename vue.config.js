const path = require('path')
const glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const pages = {}
glob.sync('./src/project/**/app.js').forEach((filePath) => {
  let chunk = filePath.split('./src/project/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: filePath, // page入口
    template: 'public/index.html', // 模板
    title: chunk, // 標題需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    chunks: ['chunk-vendors', 'chunk-common', chunk] // 在這個頁面中包含的塊，默認情況下會包含提取出來的通用 chunk 和 vendor chunk。
  }
})

module.exports = {
  pages,
  lintOnSave: true,
  publicPath: './',
  outputDir: './dist',
  devServer: {},
  productionSourceMap: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    resolve: {
      alias: {
        '@css': resolve(`src/assets/css`),
        '@img': resolve(`src/assets/images`),
        '@data': resolve(`src/assets/data`),
        '@project': resolve(`src/project`),
        '@layout': resolve(`src/layout`),
        '@components': resolve(`src/components`),
        '@utils': resolve(`src/utils`),
        '@lang': resolve(`src/lang`)
      }
    },
    // splitChunks:分割公用模組
    optimization:{
      splitChunks:{
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
            minChunks: 2
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        data: '@import "@/assets/css/variables.scss";',
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('min-image')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ disable: process.env.NODE_ENV == 'development' ? true : false })
      .end()
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
        .loader("@kazupon/vue-i18n-loader")
        .end();
  }
};