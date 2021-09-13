import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入Login组件
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
