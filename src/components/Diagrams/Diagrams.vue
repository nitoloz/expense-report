<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-7">
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
  import ExpenseList from './ExpenseList';
  import ExpenseItem from '../../enums/ExpenseItem';

  export default {
    name: 'Diagrams',
    props: {selectedMonth: String},
    components: {
      PieChart,
      ExpenseList
    },
    watch: {
      selectedMonth: function () {
        this.$bind('expenses', db.collection('expenses').doc(this.selectedMonth).collection('data'));
        this.fetchSectionExpenses();
      }
    },
    methods: {
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
      },
      monthSelected: function () {
        this.$bind('expenses', db.collection('expenses').doc(this.selectedMonth).collection('data'));
        this.fetchSectionExpenses();
      }
    },
    data() {
      return {
        expenses: [],
        expensesSection: [],
        ExpenseItem: ExpenseItem
      }
    },
    mounted() {
      if(this.selectedMonth){
        this.monthSelected();
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
