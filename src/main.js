import Vue from 'vue'
import VueRouter from 'vue-router';
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import App from './App.vue'
import ExpenseClassifier from './components/ExpenseClassifier.vue'
import Charts from './components/Charts.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueFire);

firebase.initializeApp({
  projectId: 'expencesreport-f8c8c',
  databaseURL: 'https://expencesreport-f8c8c.firebaseio.com'
});
export const db = firebase.firestore();

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
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
