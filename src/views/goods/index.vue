<template>
    <div>
        <el-form :inline="true" :model="searchMap" ref="searchMap" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="searchMap.code" placeholder="商品代码"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <el-input v-model="searchMap.supplierName" readonly @click.native="dialogSupplierVisible=true"  placeholder="供应商名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="fetchData">查询</el-button>
                <el-button class="btn" type="primary" @click="openDialog('searchMap')">新增</el-button>
                <el-button  class="btn" @click="resetForm('searchMap')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="编辑会员" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="addForm" :rules="rules" ref="ruleForm" style="width:400px">
                <el-form-item prop="name" label="商品名" :label-width="formLabelWidth" required>
                <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="商品代码" :label-width="formLabelWidth" required>
                <el-input v-model="addForm.code"></el-input>
                </el-form-item>
                <el-form-item prop="spec" label="备注" :label-width="formLabelWidth">
                <el-input  v-model="addForm.spec"></el-input>
                </el-form-item>
                <el-form-item prop="retaiPrice" label="零售价" :label-width="formLabelWidth">
                <el-input v-model="addForm.retaiPrice"></el-input>
                </el-form-item>
                <el-form-item prop="purchasePrice" label="进价" :label-width="formLabelWidth">
                <el-input v-model="addForm.purchasePrice"></el-input>
                </el-form-item>
                <el-form-item prop="storageNum" label="存储数量" :label-width="formLabelWidth">
                <el-input v-model="addForm.storageNum"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="addData('ruleForm')">确 定</el-button> -->
                <el-button type="primary" @click="addForm.id === null? addData('ruleForm'):updateData('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="list" height="450" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="40px"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="商品名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="code" label="代码"></el-table-column>
            <el-table-column show-overflow-tooltip prop="spec" label="描述"></el-table-column>
            <el-table-column show-overflow-tooltip prop="retaiPrice" label="零售价"></el-table-column>
            <el-table-column show-overflow-tooltip prop="purchasePrice" label="进价"></el-table-column>
            <el-table-column show-overflow-tooltip prop="storageNum" label="存储量"></el-table-column>
            <el-table-column show-overflow-tooltip prop="supplierName" label="供应商名称"></el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 选择供应商对话框 -->
        <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="500px">
            <supplier @supplier-select="supplierSelect" :isDialog="true"></supplier>
        </el-dialog>
    </div>
</template>

<script>
import goodsApi from '@/api/goods'
import Supplier from '@/views/supplier'



export default {
    components:{
        Supplier
    },
    data() {
        return{
            list:[],
            total:0,
            currentPage:1,
            pageSize:10,
            dialogFormVisible: false,
            dialogSupplierVisible:false,
            centerDialogVisible: false,
            searchMap:{
                name:'',
                code: '',
                supplierName: ''
            },
            addForm: {
                id:null,
                name:'',
                code: '',
                spec: '',
                retaiPrice:'',
                purchasePrice:'',
                storageNum:'' ,
                supplierName:'' 

            },
            formLabelWidth: '100px',
            rules:{
                cardNum: [
                    { required: true, message: '请输入会员卡号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入会员姓名', trigger: 'change' }
                ],
                payType: [
                    { required: true, message: '请选择支付类型', trigger: 'change' }
                ],
                }
            }       
    },
    created() {
        this.fetchData()
    },
    methods: {
        //初始化会员列表数据
        fetchData() {
           goodsApi.pagination(this.currentPage,this.pageSize,this.searchMap).then(res=> {
               console.log(res.data.data.rows)
               this.list = res.data.data.rows
               this.total = res.data.data.total
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
            this.fetchData()
        },
        //打开供应商选择框
        openSupplier(){
            this.dialogSupplierVisible = true
        },
        //打开新增和编辑对话框
        openDialog(){
            this.dialogFormVisible = true
            this.$nextTick(()=>{//作用是等到dom渲染结束，在执行回调函数
                this.$refs['ruleForm'].resetFields();
            })
        },
        //重置查找条件
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //提交新增数据
        addData(formName){
            console.log('新增')
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    // memberApi.add(this.addForm).then(res=>{
                    //     if(res.data.flag){
                    //         this.fetchData()
                    //         this.dialogFormVisible = false
                    //     }else{
                    //         this.$message('新增失败')
                    //     }
                    // })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //提交修改会员数据
        updateData(formName){
            console.log('修改')
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // memberApi.update(this.addForm).then(res=>{
                    //     if(res.data.flag){
                    //         this.fetchData()
                    //         this.dialogFormVisible = false
                    //     }else{
                    //         this.$message('修改失败')
                    //     }
                    // })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //修改该条信息
        handleEdit(id) {
            console.log(id)
            this.openDialog()
            // memberApi.getById(id).then(res=>{
            //     console.log(res)
            //     if(res.data.flag){
            //         this.addForm  = res.data.data[0]
            //     }
            // })
        },
        supplierSelect(val){
         console.log(val)
         this.searchMap.supplierName = val.name
         this.dialogSupplierVisible = false
        }
    },
    
}
</script>

<style scope>
.el-pagination{
    margin-top: 20px;
}
</style>