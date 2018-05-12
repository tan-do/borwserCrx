// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/store.js'



Vue.use(Vuex)


import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


import GeminiScrollbar from 'vue-gemini-scrollbar'

Vue.use(GeminiScrollbar)



Vue.use(VueAxios, axios)


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    //alert('发送请求')
    store.commit('showLoading')

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    //alert('请求完成')
    store.commit('hideLoading')

    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
