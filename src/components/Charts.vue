<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <ExpenseReportSelector v-on:select-month="selectMonth" :months="firebaseExpenses"/>
                <PieChart :data="expenses" :month="selectedMonth" v-on:select-pie-section="selectPieChartSection"/>
            </div>
            <div class="col-md-4">
                <ExpenseList :expensesSection="expensesSection"/>
            </div>
        </div>
    </div>
</template>

<script>

  import {db} from '../main'
  import PieChart from './PieChart';
  import ExpenseReportSelector from './ExpenseReportSelector';
  import ExpenseList from './ExpenseList';
  import ExpenseItem from '../enums/ExpenseItem';

  export default {
    name: 'Charts',
    components: {
      PieChart,
      ExpenseReportSelector,
      ExpenseList
    },
    methods: {
      selectMonth: function (event) {
        this.selectedMonth = event.target.value;
        this.$bind('expenses', db.collection('expenses').doc(this.selectedMonth).collection('data'));
      },
      selectPieChartSection: function (data) {
        this.$bind('expensesSection', db.collection('expenses').doc(this.selectedMonth).collection('data')
            .where(ExpenseItem.EXPENSE_TYPE, "==", data.key).orderBy(ExpenseItem.PURCHASE_AMOUNT, "asc"));

      }
    },
    data() {
      return {
        selectedMonth: '',
        expenses: [],
        expensesSection: [],
        firebaseExpenses: [],
        ExpenseItem: ExpenseItem
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
