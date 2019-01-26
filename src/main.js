import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'

Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        {
            path: '', component: App
        }
    ]
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
