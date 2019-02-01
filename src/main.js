import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import App from './App.vue'
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueFire);

firebase.initializeApp({
  projectId: 'expencesreport-f8c8c',
  databaseURL: 'https://expencesreport-f8c8c.firebaseio.com'
});
export const db = firebase.firestore();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
