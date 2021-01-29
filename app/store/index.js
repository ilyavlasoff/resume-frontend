import Vue from 'vue';
import Vuex from 'vuex';
import resume from './modules/resume';
import resume_card from './modules/resume_card';
import list_data from './modules/list_data';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        resume,
        resume_card,
        list_data
    }
});