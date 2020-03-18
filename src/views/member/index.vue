<template>
    <div>
        <el-form :inline="true" :model="searchMap" ref="searchMap" class="demo-form-inline">
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="searchMap.payType" placeholder="支付类型">
                    <el-option v-for = "option in payTypeOption" :key="option.type" :label="option.name" :value="option.type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="searchMap.birthday"
                    type="date"
                    placeholder="出生日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="fetchData">查询</el-button>
                <el-button class="btn" type="primary" @click="openDialog('searchMap')">新增</el-button>
                <el-button  class="btn" @click="resetForm('searchMap')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="编辑会员" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="addForm" :rules="rules" ref="ruleForm" style="width:400px">
                <el-form-item prop="cardNum" label="会员卡号" :label-width="formLabelWidth" required>
                <el-input v-model="addForm.cardNum"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="会员姓名" :label-width="formLabelWidth" required>
                <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="birthday" label="会员生日" :label-width="formLabelWidth">
                <el-date-picker value-format="yyyy-MM-dd" v-model="addForm.birthday" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item prop="iphone" label="会员电话" :label-width="formLabelWidth">
                <el-input v-model="addForm.iphone"></el-input>
                </el-form-item>
                <el-form-item prop="integral" label="可用积分" :label-width="formLabelWidth">
                <el-input v-model="addForm.integral"></el-input>
                </el-form-item>
                <el-form-item prop="money" label="开卡金额" :label-width="formLabelWidth">
                <el-input v-model="addForm.money"></el-input>
                </el-form-item>
                <el-form-item prop="payType" label="支付类型" :label-width="formLabelWidth" required>
                <el-select v-model="addForm.payType" placeholder="支付类型">
                    <el-option v-for = "option in payTypeOption" :key="option.type" :label="option.name" :value="option.type"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item prop="address" label="会员地址" :label-width="formLabelWidth">
                <el-input v-model="addForm.address"></el-input>
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
            <el-table-column show-overflow-tooltip prop="cardNum" label="卡号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="birthday" label="生日"></el-table-column>
            <el-table-column show-overflow-tooltip prop="iphone" label="电话"></el-table-column>
            <el-table-column show-overflow-tooltip prop="integral" label="可用积分"></el-table-column>
            <el-table-column show-overflow-tooltip prop="money" label="开卡金额"></el-table-column>
            <el-table-column show-overflow-tooltip prop="payType" label="付款方式">
            <!-- 利用slot-scope="scope"返回该行数据信息scope.row -->
                <template slot-scope="scope">
                    <span>{{scope.row.payType | payTypeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="address" label="地址"></el-table-column>
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
    </div>
</template>

<script>
import memberApi from '@/api/member'

const payTypeOption = [
    {type: '1', name: '现金'},
    {type: '2', name: '微信'},
    {type: '3', name: '支付宝'},
    {type: '4', name: '银行卡'},
]
export default {
    data() {
        return{
            list:[],
            total:0,
            currentPage:1,
            pageSize:10,
            searchMap:{
                cardNum:'',
                name: '',
                payType: '',
                birthday:''
            },
            payTypeOption,
            dialogFormVisible: false,
            centerDialogVisible: false,
            addForm: {
                id:null,
                cardNum:'',
                name: '',
                payType: '',
                birthday:'',
                iphone:'',
                integral:'' ,
                address:'' 

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
           memberApi.pagination(this.currentPage,this.pageSize,this.searchMap).then(res=> {
               console.log(res.data)
               this.list = res.data.data.rows
               this.total = res.data.data.total  
           }) 
        },
        //重置查找条件
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
        //提交新增会员数据
        addData(formName){
            console.log('新增')
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    memberApi.add(this.addForm).then(res=>{
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
        //提交修改会员数据
        updateData(formName){
            console.log('修改')
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    memberApi.update(this.addForm).then(res=>{
                        if(res.data.flag){
                            this.fetchData()
                            this.dialogFormVisible = false
                        }else{
                            this.$message('修改失败')
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //打开新增和编辑对话框
        openDialog(){
            this.dialogFormVisible = true
            this.$nextTick(()=>{//作用是等到dom渲染结束，在执行回调函数
                this.$refs['ruleForm'].resetFields();
            })
        },
        //修改该条信息
        handleEdit(id) {
            console.log(id)
            this.openDialog()
            memberApi.getById(id).then(res=>{
                console.log(res)
                if(res.data.flag){
                    this.addForm  = res.data.data[0]
                }
            })
        },
        //删除该条信息
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            memberApi.delete(row.id).then(res=>{
                console.log(res.data)
                if(res.data.flag){
                     this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                    this.fetchData()   
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
        }); 
        },
    },
    filters: {
        //定义一个过滤方法，将支付类型数字转换成文字显示
        payTypeFilter(type){
            //过滤方法通过find()函数查找payTypeOption数组里符合条件（obj.type === type）的对象，如果符合，返回对象name属性
            // const payObj = payTypeOption.find(obj =>{ 
            //     obj.type === type//只有一个表达式时，大括号去掉
            // })
            const payObj = payTypeOption.find(obj => obj.type === type)
            return payObj ? payObj.name : null
        }
    }
}
</script>

<style scope>
.el-pagination{
    margin-top: 20px;
}
.el-form{
    margin-top: 20px;
}
.btn{
    padding: 12px 12px;
}
</style>