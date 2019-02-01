<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-7">
                <ExpenseReportSelector v-on:select-month="selectMonth" :months="firebaseExpenses"/>
                <PieChart :data="expenses" :month="selectedMonth" v-on:select-pie-section="selectPieChartSection"/>
            </div>
            <div class="col-lg-5 expenses-list">
                <ExpenseList :expensesSection="expensesSection"/>
            </div>
        </div>
    </div>
</template>

<script>

  import {db} from '../../main'
  import PieChart from './PieChart';
  import ExpenseReportSelector from '../ExpenseReportSelector';
  import ExpenseList from './ExpenseList';
  import ExpenseItem from '../../enums/ExpenseItem';

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
        this.fetchSectionExpenses();
      },
      selectPieChartSection: function (data) {
        if (!data) {
          this.fetchSectionExpenses();
        } else {
          if (data.key === 'Other') {
            this.expensesSection = [];
          } else {
            this.fetchSectionExpenses(data);
          }
        }
      },
      fetchSectionExpenses: function (section) {
        if (section) {
          this.$bind('expensesSection', db.collection('expenses').doc(this.selectedMonth).collection('data')
              .where(ExpenseItem.EXPENSE_TYPE, "==", section.key).orderBy(ExpenseItem.PURCHASE_AMOUNT, "asc"))
        } else {
          this.$bind('expensesSection', db.collection('expenses').doc(this.selectedMonth).collection('data')
              .orderBy(ExpenseItem.PURCHASE_AMOUNT, "asc"));
        }
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
    .expenses-list {
        max-height: 600px;
        overflow-y: auto;
    }
</style>
