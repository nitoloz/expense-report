import Vue from 'vue'
import VueRouter from 'vue-router';

import ExpenseClassifier from './components/Classifier/ExpenseClassifier.vue'
import Diagrams from './components/Diagrams/Diagrams.vue'
import Preset from './components/Preset/Preset.vue'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/expenses', component: ExpenseClassifier
        },
        {
            path: '/diagrams', component: Diagrams
        },
        {
            path: '/preset', component: Preset
        },
        {
            path: '*',  redirect: '/expenses'
        }
    ]
});

