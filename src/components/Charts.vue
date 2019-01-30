<template>
    <div>
        <ExpenseReportSelector v-on:select-month="selectMonth" :months="firebaseExpenses"/>
        <PieChart :data="expenses" :month="selectedMonth"/>
    </div>
</template>

<script>

  import {db} from '../main'
  import PieChart from './PieChart';
  import ExpenseReportSelector from './ExpenseReportSelector';

  export default {
    name: 'Charts',
    components: {
      PieChart,
      ExpenseReportSelector
    },
    methods: {
      selectMonth: function (event) {
        this.selectedMonth = event.target.value;
        this.$bind('expenses', db.collection('expenses').doc(this.selectedMonth).collection('data'));
      }
    },
    data() {
      return {
        selectedMonth: '',
        expenses: [],
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
