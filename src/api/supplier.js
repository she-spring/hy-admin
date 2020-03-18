import request from '@/utils/request'

export default{
    //获取供应商列表数据
    getList(){
        return  request({
            method:'get',
            url:'/supplier/list'
        })
    },
    //分页:page为当前页码，size为每页查询的条数，searchMap条件查询的条件值
    pagination(page, size, searchMap) {
        return  request({
               method:'post',
               url:`/supplier/list/search/${page}/${size}`,
               data: searchMap
           })
    },
    //新增供应商，提交新增表单数据
    add(addForm) {
        return  request({
               method:'post',
               url:'/supplier',
               data: addForm
           })
    },
}