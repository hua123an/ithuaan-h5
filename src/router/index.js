import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('../views/tools/tools.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/mine/mine.vue')
    },
    {
      path : '/detail',
      name : 'detail',
      redirect : '/detail/zhihunews',
      children : [
        {
          path : '/detail/zhihunews',
          component : () => import('@/views/detail/homeDetial/dailyInfo/zhiHuNews.vue')
        },
        {
          path : '/detail/todayinhistory',
          component : () => import('@/views/detail/homeDetial/dailyInfo/todayInHistory.vue')
        },
        {
          path : '/detail/weibohotsearch',
          component : () => import('@/views/detail/homeDetial/dailyInfo/hotSearch/weiBoHotSearch.vue')
        },
        {
          path : '/detail/baiduhotsearch',
          component : () => import('@/views/detail/homeDetial/dailyInfo/hotSearch/baiduHotSearch.vue')
        }
      ]
    }
  ]
})

export default router
