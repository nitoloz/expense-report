import Vue from 'vue'
import VueRouter from 'vue-router';

import ExpenseClassifier from './components/Classifier/ExpenseClassifier.vue'
import Charts from './components/Charts/Charts.vue'

Vue.use(VueRouter);

export default new VueRouter({
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
});

