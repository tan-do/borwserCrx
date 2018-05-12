import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const HomePage = () => import('../page/HomePage.vue')
const SeaPage = () => import('../page/SeaPage.vue')
const LowPage = () => import('../page/LowPage.vue')
const FavPage = () => import('../page/FavPage.vue')
const AppPage = () => import('../page/AppPage.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage.vue',
      component: HomePage
    },
    {
      path: '/sea',
      name: 'SeaPage.vue',
      component: SeaPage
    },
    {
      path: '/low',
      name: 'LowPage.vue',
      component: LowPage
    },
    {
      path: '/fav',
      name: 'FavPage.vue',
      component: FavPage,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/app',
      name: 'AppPage.vue',
      component: AppPage
    },

  ],

})
