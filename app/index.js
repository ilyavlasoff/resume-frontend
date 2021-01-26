import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';
import "bootswatch/dist/lux/bootstrap.min.css";
import App from './components/app';
import Vuelidate from 'vuelidate';
import { VueJsonp } from 'vue-jsonp';
import { store } from './store';
import { config } from './config';

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.use(VueJsonp, 5000);
Vue.config.productionTip = false;
Vue.prototype.appConfig = config;

new Vue({
    store,
    router,
    render: (h) => h(App)
}).$mount('#app');