<template>
    <div id="app">
        <Navbar v-on:select-month="selectMonth"/>
        <router-view :selectedMonth="selectedMonth"></router-view>
    </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import firebase from 'firebase'

  export default {
    name: 'app',
    components: {
      Navbar
    },
    methods: {
      selectMonth: function (value) {
        this.selectedMonth = value;
      }
    },
    data() {
      return {
        selectedMonth: ''
      }
    },
    mounted() {
      // const provider = new firebase.auth.GoogleAuthProvider();
      //
      // firebase.auth().signInWithPopup(provider).then((result) => console.log(result));
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
