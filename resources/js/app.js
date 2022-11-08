require('./bootstrap');

/**
 * Import Components
 */
import Vue from 'vue';
import Vuex from "vuex";
import Vuesax  from 'vuesax';
import StoreData from './store';
import router from './router.js';
import VueTimeago from 'vue-timeago';
import PrimeVue from 'primevue/config';
import BootstrapVue  from 'bootstrap-vue';


/**
 * Style files for packages
 */
import 'vuesax/dist/vuesax.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'


/**
 * Vue to use plugins
 */
Vue.use(Vuex);
Vue.use(Vuesax);
Vue.use(PrimeVue);
Vue.use(BootstrapVue);
Vue.use(VueTimeago, {
    name: 'Timeago',
    locale: 'en',
});

/**
 * Vue Warning handler
 */
Vue.config.warnHandler = message => {
    // console.log(message);
};
const store = new Vuex.Store(StoreData);
/**
 * Mount components to the DOM
 */

window.onload = function(){
    const login = new Vue({
        el: '#login',
        router
    });
    const home = new Vue({
        el: '#home',
        store,
        router,
        components: {
            'IndexHome': () => import(/* webpackChunkName: 'HomeMount' */ './components/home/Index.vue')
        }
    });
    const header = new Vue({
        el: '#header',
        store,
        router,
        components: {
            'IndexHeader': () => import(/* webpackChunkName: 'Header' */ './components/header/Index.vue')
        }
    });
}
