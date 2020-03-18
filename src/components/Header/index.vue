<template>
    <div class="header">
        <a href="/home">
            <img class="logo" src="../../assets/logo.jpg" alt="">
            <span class="company">易乐员工管理系统</span>
        </a>
        <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">更改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { logout } from '@/api/login'
export default {
    methods:{
        handleCommand(command) {
        // console.log('click on item ' + command);
        switch(command){
            case 'a':
            //修改密码
            this.$message('修改密码')
                break;
            case 'b':
            //退出系统
            logout(localStorage.getItem('token')).then(res =>{
                console.log(res)
                if(res.data.flag){
                    //退出系统，清除数据
                    localStorage.removeItem('token')
                    localStorage.removeItem('usedata')
                    this.$router.push('/login')
                }else{
                    this.$message({
                        message: '警告哦，这是一条警告消息',
                        type: 'warning'
                    })
                }
            })
                break;
            default:
                break;
        }
      }
    }
}
</script>
<style scoped>
.logo{
    width: 25px;
    vertical-align: middle;
    padding: 0px 10px 0px 20px;
}
.company{
    color: white;
    position: absolute;
}
.el-dropdown{
    position: absolute;
    top: 0;
    right: 20px;

}
.el-dropdown-link {
    cursor: pointer;
    color: white;
  }
.el-icon-arrow-down {
    font-size: 12px;
  }

</style>