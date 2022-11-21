module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        proxy: {
            '/api': {
                target: process.env.BASE_URL,
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/' : '/'}
            }
        }
    }
}