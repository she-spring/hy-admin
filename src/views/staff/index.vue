<template>
    <div>
        <el-table :data="list" height="450" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="40px"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sex" label="性别"></el-table-column>
            <el-table-column show-overflow-tooltip prop="age" label="年龄"></el-table-column>
            <el-table-column show-overflow-tooltip prop="iphone" label="电话"></el-table-column>
            <el-table-column show-overflow-tooltip prop="zhiwei" label="职位"></el-table-column>

            <el-table-column label="操作" width="150px">
                <template>
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

export default {
    data(){
        return{
            list:[
                {
                    "id":1,
                    "name": "李响",
                    "age":31,
                    "sex":"女",
                    "iphone":18911111111,
                    "zhiwei":"设计师"
                },
                {
                    "id":2,
                    "name": "王刚",
                    "age":33,
                    "sex":"男",
                    "iphone":18911111111,
                    "zhiwei":"设计师"
                },
                {
                    "id":3,
                    "name": "王贤水",
                    "age":30,
                    "sex":"男",
                    "iphone":18911111111,
                    "zhiwei":"设计师"
                },
                {
                    "id":4,
                    "name": "佘泽云",
                    "age":58,
                    "sex":"男",
                    "iphone":18911111111,
                    "zhiwei":"经理"
                }
            ]
        }
    }
}
</script>

<style  scoped>
.el-table{
    margin-top: 20px;
}

</style>