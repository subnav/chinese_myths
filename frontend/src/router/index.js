import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/signUp',
    component: () => import('@/views/SignUp')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/plate/PlateDetails')
  },
  {
    path: '/plate',
    name: 'plate',
    component: () => import('@/views/plate/Plate')
  },
  {
    path: '/RelationshipGraph',
    component: () => import('@/views/RelationshipGraph')
  },
  // 后台路由
  {
    path: '/backstage',
    redirect: '/bghome',
    component: () => import('@/views/backstage/Backstage'),
    children: [
      {
        path: '/usermanagement',
        component: () => import('@/views/backstage/UserManagement')
      },
      {
        path: '/bghome',
        component: () => import('@/views/backstage/BgHome')
      },
      {
        path: '/usermanagement',
        component: () => import('@/views/backstage/UserManagement')
      },
      {
        path: '/PlateList',
        component: () => import('@/views/backstage/PlateList')
      },
      {
        path: '/PlateDetailList',
        component: () => import('@/views/backstage/PlateDetailList')
      },
      // {
      //   path: '/RecyclePlate',
      //   component: () => import('@/views/backstage/RecyclePlate')
      // }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/user/User'),
    redirect: '/userinfo',
    children: [
      {
        path: '/userinfo',
        component: () => import('@/views/user/UserInfo')
      },
      {
        path: '/userarticle',
        component: () => import('@/views/user/UserArticle')
      },
      {
        path: '/updatepwd',
        component: () => import('@/views/user/UpdatePwd')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 解决跳转重复路由(函数劫持)
const routerPath = router.push
router.push = (path) => {
  // 判断当前路由是否是需要跳转的路由
  console.log(typeof router.currentRoute.fullPath)
  console.log(path)
  if (router.currentRoute.fullPath.includes(path)) {
    return Vue.prototype.$notify({
      title: '警告',
      message: '已在当前页面，请勿重复点击',
      type: 'warning'
    })
  }
  return routerPath.call(router, path)
}

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = localStorage.getItem('token')
  // 判断个人中心页面
  if (
    to.path === '/userinfo' ||
    to.path === '/userarticle' ||
    to.path === '/updatepwd' ||
    to.path === '/invitation' ||
    to.path === '/bghome' ||
    to.path === '/bgHome' ||
    to.path === 'usermanagement'
  ) {
    if (!tokenStr) {
      Vue.prototype.$message.error('您还没有登录哦~')
      return next('/login')
    }
  }
  store.commit('updateActivePath', to.path)
  next()
})

export default router
