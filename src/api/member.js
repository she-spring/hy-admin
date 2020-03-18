import request from "@/utils/request";

export default{
    //获取会员列表数据
    getList(){
     return  request({
            method:'get',
            url:'/member/list'
        })
    },
    //分页:page为当前页码，size为每页查询的条数，searchMap条件查询的条件值
    pagination(page, size, searchMap) {
        return  request({
               method:'post',
               url:`/member/list/search/${page}/${size}`,
               data: searchMap
           })
    },
    //新增会员，提交新增表单数据
    add(addForm) {
        return  request({
               method:'post',
               url:'/member',
               data: addForm
           })
    },
    //通过id查询某一条数据
    getById(id) {
        return  request({
               method:'get',
               url:`/member/${id}`
           })
    },
    //通过id，将该条信息修改后提交表单数据
    update(addForm) {
        return  request({
               method:'put',
               url:`/member/${addForm.id}`,
               data:addForm
           })
    },
    //通过id删除该条信息
    delete(id) {
        return  request({
               method:'delete',
               url:`/member/${id}`
           })
    },

}