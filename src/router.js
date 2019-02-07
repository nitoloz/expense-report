import Vue from 'vue'
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import ExpenseClassifier from './components/Classifier/ExpenseClassifier.vue'
import Diagrams from './components/Diagrams/Diagrams.vue'
import Preset from './components/Preset/Preset.vue'
import Login from './components/Login/Login.vue'

Vue.use(VueRouter);

const router =  new VueRouter({
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
      path: '/login', component: Login
    },
    {
      path: '*', redirect: '/expenses'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (firebase.auth().currentUser || to.path.indexOf('login') !== -1) {
    next();
  } else {
    next({path: '/login'})
  }
});

export {router};


