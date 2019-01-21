<template>
  <div id="app" class="container">
    <ExpenseClassifier/>
  </div>
</template>

<script>
import ExpenseClassifier from './components/ExpenseClassifier.vue'

export default {
  name: 'app',
  components: {
      ExpenseClassifier
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
