<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/expenses">Classify</router-link>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/expenses">Expenses</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/diagrams">Diagrams</router-link>
                </li>
                <li class="nav-item ml-5">
                    <ExpenseReportSelector v-on:select-month="selectMonth" :months="firebaseExpenses"/>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
  import ExpenseReportSelector from './ExpenseReportSelector';
  import {db} from '../main'

  export default {
    name: 'Navbar',
    components: {
      ExpenseReportSelector
    },
    methods: {
      selectMonth: function (event) {
        this.$emit('select-month', event.target.value);
      }
    },
    data() {
      return {
        firebaseExpenses: []
      }
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
