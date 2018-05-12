import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
    showL: false,
};

const mutations = {
    headTrue(state) {
        state.headClass = true;
    },
    headFalse(state) {
        state.headClass = false;
    }
};

const actions = {
    increment(context) {
        context.commit('increment')
    }

}
export default new Vuex.Store({
    state,
    mutations,
    actions
});

