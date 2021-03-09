module.exports = {
    devServer: {
        proxy: {
          "^/api": {
          target: "https://www.googleapis.com",
          ws: true,
          changeOrigin: true
        }
     }
  },
}