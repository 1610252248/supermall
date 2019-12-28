module.exports = {

  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {//配置跨域
      '/api': {
        target: 'http://123.207.32.32:8000/api/w1/',//这里后台的地址模拟的;应该填写你们真实的后台接口
        // baseURL: 'http://106.54.54.237:8000/api/w1'
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''//请求的时候使用这个api就可以
        }
      }
    }
  }
}
