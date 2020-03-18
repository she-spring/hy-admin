<template>
  <div>
      <!-- <div class="header">头部</div>
      <div class="navbar">左侧导航</div>
      <div class="main">内容</div> -->
      <app-header></app-header>
      <app-left></app-left>
      <app-main></app-main>
  </div>
</template>

<script>
//将抽取的组件分别引入
import AppHeader from './Header/index'
import AppLeft from './Left/index'
import AppMain from './Main/index'

export default {
    components:{
        AppHeader,
        AppLeft,
        AppMain
    }
    
}

</script>
<style  scoped>
.header{
    position: absolute;
    line-height: 50px;
    top: 0;
    left: 0;
    right: 0;
    background-color: #2d3a4b;
}
.navbar{
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 230px;
    overflow-y: auto;
    background-color: #545c64;
}
.main{
    position: absolute;
    top: 50px;
    left: 230px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    padding: 20px;
}

</style>