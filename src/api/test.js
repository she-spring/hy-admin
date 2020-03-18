import request from "@/utils/request";

// request.get('/db.json')
// .then(res=>{
// console.log(res.data)
// })
//这里的request就是我们自己定义的axios.get(),还可以改造为下面写法

// const BASE_URL = process.env.VUE_APP_SERVICE_URL

export default{
    getData(){
        const req = request({
            method:'get',
            url:'/db.json'
        })
        return req
    }
}