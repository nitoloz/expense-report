<template>
    <div id="app">
        <Navbar v-on:select-month="selectMonth"/>
        <router-view :selectedMonth="selectedMonth"></router-view>
    </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'

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
