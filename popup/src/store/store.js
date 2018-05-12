import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default  new Vuex.Store({
    state: {
        loadingState: true
    },
    mutations: {
        showLoading(state) {
            state.loadingState = true;
        },

        hideLoading(state){
            state.loadingState =false;
        }
    }
});



