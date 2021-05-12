module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        //target: 'http://192.168.1.10:3030/v1/',
        target: 'http://172.16.10.31:3030/v1/',
        //target: 'http://dev.gamexarena.com:3030/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock-api': {
        target: 'https://5c5bf8cd8d018a0014aa1a6d.mockapi.io/api/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/mock-api': ''
        }
      }

    }
  }
}
