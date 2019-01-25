<template>
  <div id="app" class="container">
    <Navbar/>
    <ExpenseClassifier/>
  </div>
</template>

<script>
import ExpenseClassifier from './components/ExpenseClassifier.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
      ExpenseClassifier,
      Navbar
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
