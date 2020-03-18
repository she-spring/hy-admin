import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login"
import Layout from "../components/Layout"
import Home from "../views/home"
import Member from "../views/member"
import Supplier from "../views/supplier"
import Goods from "../views/goods"
import Staff from "../views/staff"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect() {
      return '/member'
    },
    children:[
      {
      path:"/home",
      component: Home,
      meta: { title:'公司简介' }
      },
      {
        path:"/member",
        component: Member,
        meta: { title:'会员管理' }
      },
      {
        path:"/supplier",
        component: Supplier,
        meta: { title:'供应商管理' }
      },
      {
        path:"/goods",
        component: Goods,
        meta: { title:'商品管理' }
      },
      {
        path:"/staff",
        component: Staff,
        meta: { title:'员工管理' }
      },
  ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
