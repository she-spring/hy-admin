module.export = {
    devServer :{
        port:8888,
        host:'localhost',
        https:false,
        open:true,
        proxy:{
            //开发环境代理配置，解决跨域
           [process.env.VUE_APP_BASE_API] :
           {
               target:process.env.VUE_APP_SERVICE_URL,
            changeOrigin:true,
            pathRewrite:{
                ['^'+process.env.VUE_APP_BASE_API]:''
            }
        }
        }
    },
    lintOnSave:false,
    productionSourceMap:false,
}