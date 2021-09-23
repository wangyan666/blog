import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入Login组件
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'

import First from '@/views/pages/first/First.vue'
import Content from '@/views/pages/content/Content.vue'
import Material from '@/views/pages/material/Material.vue'
import Publish from '@/views/pages/publish/Publish.vue'
import Comments from '@/views/pages/comments/Comments.vue'
import Fans from '@/views/pages/fans/Fans.vue'
import Setting from '@/views/pages/seting/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'first',
        component: First
      },
      {
        path: '/content',
        name: 'content',
        component: Content
      },
      {
        path: '/material',
        name: 'material',
        component: Material
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/comments',
        name: 'comments',
        component: Comments
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans
      },
      {
        path: '/setting',
        name: 'setting',
        component: Setting
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 错误处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

// 设置路由守卫
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (token) next()
  else {
    if (to.path === '/login' || to.path === '/') next()
    // else {
    //   if (to.path === '/unauthorized') next()
    //   else next('/unauthorized')
    // }
    else router.push('/login')
  }
}
)

export default router
