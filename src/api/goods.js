import request from '@/utils/request'

export default{
    //分页:page为当前页码，size为每页查询的条数，searchMap条件查询的条件值
    pagination(page, size, searchMap) {
        return  request({
               method:'post',
               url:`/goods/list/search/${page}/${size}`,
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