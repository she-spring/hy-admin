<template>
  <div class="login_container">
    <el-form class="login_form" :rules="rules" ref="form" :model="form" label-width="80px">
      <h2 class="login_title">易乐员工管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button type="primary" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
   
  </div>
</template>

<script>
//以后就会直接调用api里接口，不会调用utils里的封装的axios
import { login,getUserInfo } from '@/api/login'
export default {
    data() {
      return {
        form: {
          username: '',
          password:''
        },
        rules: {
          username: [
            { required: true, message: '请输入账户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],  
        }
      }
    },
    methods: {

      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.form.username,this.form.password).then(res=>{
            // console.log(res.data.value.token);
            const token = res.data.value.token
            if(res.data.flag){
              //验证成功，通过token获取用户信息
              getUserInfo(res.data.value.token).then(res=>{
                console.log(res.data.data);
                const userData = res.data.data
                //保存token和用户信息
                localStorage.setItem('token',token)
                localStorage.setItem('usedata',JSON.stringify(userData))
                //保存好了。跳转到系统首页
                this.$router.push('/')
              })
            }else{
              alert('验证失败')
            }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
    }
  }
</script>

<style scoped>
.login_form{
  width: 350px;
  background-color: rgb(255, 255, 255,0.8);
  margin: 160px auto;
  padding: 22px;
  border-radius: 20px;
}
.login_container{
position: absolute;
width: 100%;
height: 100%;
background: url('../../assets/login.jpg');
  
}
.login_title{
  text-align: center;
  color: #303133;
}

</style>