import axios from 'axios'

//vue中使用axios 的写法
// axios.get('/db.json')
// .then(res=>{
// console.log(res)
// })

//自定义封装axios的写法
const request = axios.create({
    baseURL:' http://mengxuegu.com:7300/mock/5e6861cce7a1bb0518bb73bd',//后端服务器地址
    timeout:5000
})

//在此文件导出数据时
// request.get('/db.json')
// .then(res=>{
// console.log(res.data)
// })

export default request//导出自定义创建的axios到外部文件使用