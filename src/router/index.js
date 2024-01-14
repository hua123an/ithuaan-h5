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
          component : () => import('@/views/detail/homeDetial/dailyInfo/zhiHuNews/zhiHuNews.vue')
        },
        {
          path : '/detail/todayinhistory',
          component : () => import('@/views/detail/homeDetial/dailyInfo/todayInHistory/todayInHistory.vue')
        },
        {
          path : '/detail/weibohotsearch',
          component : () => import('@/views/detail/homeDetial/dailyInfo/hotSearch/weiBoHotSearch/weiBoHotSearch.vue')
        },
        {
          path : '/detail/baiduhotsearch',
          component : () => import('@/views/detail/homeDetial/dailyInfo/hotSearch/baiDuHotSearch/baiDuHotSearch.vue')
        },
        {
          path: '/detail/toutiaohotsearch',
          component: () => import('@/views/detail/homeDetial/dailyInfo/hotSearch/touTiaoHotSearch/touTiaoHotSearch.vue')
        },
        {
         path : '/detail/douyinhotsearch',
          component : () => import('@/views/detail/homeDetial/dailyInfo/hotSearch/douYinHotSearch/douYinHotSearch.vue')
        },
      ]
    },
    {

    }
  ]
})

export default router
