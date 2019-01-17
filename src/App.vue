<template>
  <div id="app" class="container">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <ExpenseReportUpload/>
    <ExpenseItem item="REWE Frankfurt/Mai / Frankfurt"/>
    <ExpenseTypesList/>
  </div>
</template>

<script>
import ExpenseItem from './components/ExpenseItem.vue'
import ExpenseTypesList from './components/ExpenseTypesList.vue'
import ExpenseReportUpload from './components/ExpenseReportUpload.vue'

export default {
  name: 'app',
  components: {
    ExpenseItem,
    ExpenseTypesList,
    ExpenseReportUpload
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
