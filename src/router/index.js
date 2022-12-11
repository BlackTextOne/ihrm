import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    // component: () => import('@/views/permissions/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'guide' }
    }]
  },
  {
    path: '/employees',
    component: Layout,
    children: [{
      path: '',
      name: 'Employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'user' }
    }]
  },
  {
    path: '/money',
    component: Layout,
    children: [{
      path: '',
      name: 'Money',
      component: () => import('@/views/money/index'),
      meta: { title: '工资', icon: 'money' }
    }]
  },
  {
    path: '/social',
    component: Layout,
    children: [{
      path: '',
      name: 'Social',
      component: () => import('@/views/social/index'),
      meta: { title: '社保', icon: 'list' }
    }]
  },
  {
    path: '/attendance',
    component: Layout,
    children: [{
      path: '',
      name: 'Attendance',
      component: () => import('@/views/attendance/index'),
      meta: { title: '考勤', icon: 'table' }
    }]
  },
  {
    path: '/permissions',
    component: Layout,
    children: [{
      path: '',
      name: 'Permissions',
      component: () => import('@/views/permissions/index'),
      meta: { title: '公司权限', icon: 'tree' }
    }]
  },
  {
    path:'/moneySet',
    component: Layout,
    children:[{
      path:'',
      name:'MoneySet',
      component:()=>import('@/views/moneySet/index'),
    }]
  },
  {
    path:'/setting',
    component: Layout,
    children:[{
      path:'',
      name:'Setting',
      component:()=>import('@/views/setting/index'),
    }]
  },
  {
    path:'/report',
    component:Layout,
    children:[{
      path:'',
      name:'Report',
      component:()=>import('@/views/report/index')
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
