import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import ExpenseClassifier from './components/ExpenseClassifier.vue'
import Charts from './components/Charts.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/classify', component: ExpenseClassifier
        },
        {
            path: '/charts', component: Charts
        },
        {
            path: '*',  redirect: '/classify'
        }
    ]
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
