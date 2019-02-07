<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/expenses">Classify</router-link>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto" v-show="user">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/expenses">Expenses</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/diagrams">Diagrams</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/preset">Preset</router-link>
                </li>
                <li class="nav-item ml-5">
                    <ExpenseReportSelector v-on:select-month="selectMonth" :months="firebaseExpenses"/>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" v-if="user">
                    <a class="nav-link" href="" @click="logout">Logout</a>
                </li>
                <li class="nav-item" v-else>
                    <router-link class="nav-link" active-class="active" to="/login">Login</router-link>
                </li>

            </ul>
        </div>
    </nav>
</template>

<script>
  import ExpenseReportSelector from './ExpenseReportSelector';
  import {db} from '../main'
  import firebase from 'firebase/app';
  import 'firebase/auth';

  export default {
    name: 'Navbar',
    components: {
      ExpenseReportSelector
    },
    methods: {
      selectMonth: function (event) {
        this.$emit('select-month', event.target.value);
      },
      logout: function () {
        firebase.auth().signOut().then((result) => {
          this.$router.push('/login')
        });
      }
    },
    data() {
      return {
        firebaseExpenses: [],
        user: firebase.auth().currentUser
      }
    },
    mounted() {
      let that = this;
      firebase.auth().onAuthStateChanged(function (user) {
        that.user = user;
      });
    },
    firestore() {
      return {
        firebaseExpenses: db.collection('expenses')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
