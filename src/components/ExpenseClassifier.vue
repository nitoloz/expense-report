<template>
    <div>
        <div class="row">
            <div class="col-sm-4">
                <ExpenseReportSelector v-on:select-month="selectMonth" :months="firebaseExpenses"/>
            </div>
            <h4 class="col-sm-4">
                <div v-if="expenses.length > 0">
                    ({{currentExpenseIndex+1}}/{{expenses.length}})
                    <button type="button" class="btn btn-primary float-right" v-on:click="saveExpenses()">Save expenses
                    </button>
                </div>
            </h4>
            <div class="col-sm-4">
                <ExpenseReportUpload/>
            </div>

        </div>
        <ExpenseItem v-if="expenses.length > 0"
                     :item="expenses[currentExpenseIndex]"
                     v-on:click-left="viewPrevious"
                     v-on:click-right="viewNext"/>
        <ExpenseTypesList v-if="expenses.length > 0" :selectedType="expenses[currentExpenseIndex].ExpenseType"
                          v-on:select-type="onSelectType"/>
        <h3 v-else> Please select expenses month to start classification!</h3>
    </div>
</template>

<script>
  import ExpenseItem from './ExpenseItem.vue'
  import ExpenseTypesList from './ExpenseTypesList.vue'
  import ExpenseReportUpload from './ExpenseReportUpload.vue'
  import ExpenseReportSelector from './ExpenseReportSelector.vue'
  import {db} from '../main'


  export default {
    name: 'ExpenseClassifier',
    components: {
      ExpenseItem,
      ExpenseTypesList,
      ExpenseReportUpload,
      ExpenseReportSelector
    },
    methods: {
      onSelectType: function (type) {
        this.expenses[this.currentExpenseIndex]['ExpenseType'] = type;
        this.currentExpenseIndex++;
      },
      viewPrevious: function () {
        this.currentExpenseIndex = this.currentExpenseIndex > 0 ? this.currentExpenseIndex - 1 : this.expenses.length - 1;
      },
      viewNext: function () {
        this.currentExpenseIndex = this.currentExpenseIndex < this.expenses.length - 1 ? this.currentExpenseIndex + 1 : 0;
      },
      selectMonth: function (event) {
        this.selectedMonth = event.target.value;
        this.expenses = JSON.parse(localStorage.getItem('spendings'))[event.target.value];
        this.currentExpenseIndex = 0;
      },
      saveExpenses: function () {
        let storedSpendings = localStorage.getItem('spendings') ? JSON.parse(localStorage.getItem('spendings')) : {};
        storedSpendings[this.selectedMonth] = this.expenses;
        localStorage.setItem('spendings', JSON.stringify(storedSpendings));
        // db.collection('expenses').doc(this.selectedMonth).collection('data').doc() add(this.expenses[0])
        // console.log(d3.nest()
        //     .key(function(d) { return d.ExpenseType; })
        //     .rollup(function(expenses) { return d3.sum(expenses.map(d=>d['Betrag in EUR'])); })
        //         .entries(this.expenses));
      }
    },
    data() {
      return {
        currentExpenseIndex: 0,
        selectedMonth: '',
        expenses: [],
        months: [],
        firebaseExpenses:[]
      }
    },
    created: function () {
      this.months = Object.keys(JSON.parse(localStorage.getItem('spendings')))
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
