//权限校验：当访问系统是，首先检验是否登录，如果没有登录，则跳转到登录页面
//使用vue-router中的前置导航钩子函数：beforeEach(to,from,next)

import router from './router/index'

import { getUserInfo } from './api/login'
router.beforeEach( (to,from,next) =>{
    //首先获取token值
    const token = localStorage.getItem('token')
    //没有获取到
    if(!token){
        //如果访问非登录页面，则指定跳转到/login
        if(to.path !=='/login'){
            next({ path:'/login' })
        }else{
        //如果访问登录页面
            next()
        }
    }else{
        //获取token成功
        //如果访登录页面
        if(to.path ==='/login'){
            next()
        }else{
        //如果访问非登录页面，先查看本地是否有用户信息
        const userdata = localStorage.getItem('usedata')
        //本地有用户信息，直接去目标路由
        if(userdata){
            next()
        }else{
        //本地没有用户信息，通过token获取用户信息
        getUserInfo(token).then(res=>{
            if(res.data.flag){
                //获取用户信息成功，则进入非登录页面，否则进入登录页面
                //保存信息
                localStorage.setItem('usedata',JSON.stringify(res.data))
                next()
            }else{
                //未成功获取用户信息，重新登陆
                next({path:'/login'})
            }
        })
        }
        }
    }
})