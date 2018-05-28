import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

const HomePage = () => import('../page/HomePage.vue')
const SeaPage = () => import('../page/SeaPage.vue')
const LowPage = () => import('../page/LowPage.vue')
const FavPage = () => import('../page/FavPage.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage.vue',
      component: HomePage
    },
    {
      path: '/oversea',
      name: 'SeaPage.vue',
      component: SeaPage
    },
    {
      path: '/lowest',
      name: 'LowPage.vue',
      component: LowPage
    },
    {
      path: '/myfocus',
      name: 'FavPage.vue',
      component: FavPage,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
  ],

})
