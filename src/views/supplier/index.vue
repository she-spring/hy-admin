<template>
    <div>
        <el-form :inline="true" :model="searchMap" ref="searchMap" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="linkman" v-if="!isDialog">
                <el-input v-model="searchMap.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item prop="iphone" v-if="!isDialog">
                <el-input v-model="searchMap.iphone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" @click="fetchData">查询</el-button>
                <el-button  type="primary" @click="openDialog('searchMap')" v-if="!isDialog">新增</el-button>
                <el-button  @click="resetForm('searchMap')" v-if="!isDialog">重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="编辑会员" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="addForm" :rules="rules" ref="ruleForm" style="width:400px">
                <el-form-item prop="name" label="供应商名称" :label-width="formLabelWidth" required>
                <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="linkman" label="联系人" :label-width="formLabelWidth" required>
                <el-input v-model="addForm.linkman"></el-input>
                </el-form-item>
                <el-form-item prop="iphone" label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="addForm.iphone"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="备注" :label-width="formLabelWidth">
                <el-input v-model="addForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addData('ruleForm')">确 定</el-button>
                <!-- <el-button type="primary" @click="addForm.id === null? addData('ruleForm'):updateData('ruleForm')">确 定</el-button> -->

            </div>
        </el-dialog>
        <el-table 
        highlight-current-row
        @current-change="handleChange" 
        :data="list" 
        height="450" 
        border 
        style="width: 100%">
            <el-table-column prop="id" label="ID" width="40px"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="公司名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="linkman" label="联系人"></el-table-column>
            <el-table-column show-overflow-tooltip prop="iphone" label="电话"></el-table-column>
            <el-table-column show-overflow-tooltip prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" width="150px" v-if="!isDialog">
                <template>
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination     
            v-if="!isDialog" 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout='total, sizes, prev, pager, next, jumper'
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import supplierApi from '@/api/supplier'
export default {
    props:{
        isDialog:Boolean
    },
    data(){
        return{
            list:[],
            total:0,
            currentPage:1,
            pageSize:10,
            searchMap:{},
            dialogFormVisible: false,
            addForm:{
                name:'',
                linkman:'',
                iphone:'',
                remark:''
            },
            formLabelWidth: '100px',
            rules:{
                name: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                linkman: [
                    { required: true, message: '不能为空', trigger: 'change' }
                ]
                },
                currentRow:null
        }
    },
    created() {
        this.fetchData()
    },
    methods:{
        //初始化供应商列表数据
        fetchData() {
           supplierApi.pagination(this.currentPage,this.pageSize,this.searchMap).then(res=> {
               console.log(res.data)
               this.list = res.data.rows
               this.total = res.data.total
           }) 
        },
        //动态改变分页每页显示条数
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val
            this.fetchData()
        },
        //动态改变当前页码
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val
            console.log(val)
            this.fetchData()
        },
        //重置查找条件
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //打开新增和编辑对话框
        openDialog(){
            this.dialogFormVisible = true
            this.$nextTick(()=>{//作用是等到dom渲染结束，在执行回调函数
                this.$refs['ruleForm'].resetFields();
            })
        },
        //提交新增供应商数据
        addData(formName){
            console.log('新增')
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    supplierApi.add(this.addForm).then(res=>{
                        if(res.data.flag){
                            this.fetchData()
                            this.dialogFormVisible = false
                        }else{
                            this.$message('新增失败')
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleChange(val) {
            console.log(val)
            this.$emit('supplier-select',val)
        },

    }
}
</script>

<style  scoped>
/* .el-table{
    margin-top: 20px;
} */

</style>