<template>
    <el-breadcrumb  separator="/">
        <el-breadcrumb-item  :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped>
.el-breadcrumb{
    height: 10px;
    padding: 20px;
    border-radius: 4px;
    box-shadow:0px 2px 12px 0px rgba(0, 0, 0, 0.1);
}
.el-breadcrumb__item{
    border-left: 3px solid #31c17b;
    padding-left: 10px;
}

</style>