import Vue from 'vue'
import Router from 'vue-router'


const PriceLine = () => import('../components/PriceLine.vue')
const PushNotice = () => import('../components/PushNotice.vue')
const MyFocus = () => import('../components/MyFocus.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PriceLine',
      component: PriceLine
    },
    {
      path: '/notice',
      name: 'PushNotice',
      component: PushNotice
    },
    {
      path: '/focus',
      name: 'MyFocus',
      component: MyFocus
    }
  ]
})
