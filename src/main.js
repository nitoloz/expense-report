import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import App from './App.vue'
import {router} from './router';

Vue.config.productionTip = false;
Vue.use(VueFire);

firebase.initializeApp({
  apiKey: "AIzaSyAqrG_0_6JrWIZjqTyaMc2BRDqIIJBZxBc",
  authDomain: "expencesreport-f8c8c.firebaseapp.com",
  databaseURL: "https://expencesreport-f8c8c.firebaseio.com",
  projectId: "expencesreport-f8c8c",
  storageBucket: "expencesreport-f8c8c.appspot.com",
  messagingSenderId: "868933781431"
});
export const db = firebase.firestore();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
