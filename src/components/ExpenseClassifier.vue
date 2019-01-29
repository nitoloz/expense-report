<template>
    <div>
        <div class="row">
            <div class="col-sm-4">
                <ExpenseReportSelector v-on:select-month="selectMonth" :months="firebaseExpenses"/>
            </div>
            <h4 class="col-sm-4">
                <span v-if="selectedMonth">({{currentExpenseIndex+1}}/{{selectedMonthSize}})</span>
            </h4>
            <div class="col-sm-4">
                <ExpenseReportUpload/>
            </div>

        </div>
        <ExpenseItem v-if="selectedMonth"
                     :item="selectedExpense"
                     v-on:click-left="viewPrevious"
                     v-on:click-right="viewNext"/>
        <ExpenseTypesList v-if="selectedMonth" :selectedType="selectedExpense.ExpenseType"
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
        db.collection('expenses').doc(this.selectedMonth).collection('data').doc(this.currentExpenseIndex.toString()).update({ExpenseType: type})
        this.currentExpenseIndex++;
        this.$bind('selectedExpense', db.collection('expenses').doc(this.selectedMonth).collection('data').doc(this.currentExpenseIndex.toString()));
      },
      viewPrevious: function () {
        this.currentExpenseIndex = this.currentExpenseIndex > 0 ? this.currentExpenseIndex - 1 : this.selectedMonthSize - 1;
        this.$bind('selectedExpense', db.collection('expenses').doc(this.selectedMonth).collection('data').doc(this.currentExpenseIndex.toString()));
      },
      viewNext: function () {
        this.currentExpenseIndex = this.currentExpenseIndex < this.selectedMonthSize - 1 ? this.currentExpenseIndex + 1 : 0;
        this.$bind('selectedExpense', db.collection('expenses').doc(this.selectedMonth).collection('data').doc(this.currentExpenseIndex.toString()));
      },
      selectMonth: function (event) {
        this.selectedMonth = event.target.value;
        this.currentExpenseIndex = 0;
        let that = this;
        db.collection('expenses').doc(this.selectedMonth).collection('data').get().then(function (querySnapshot) {
          that.selectedMonthSize = querySnapshot.size;
        });
        this.$bind('selectedExpense', db.collection('expenses').doc(this.selectedMonth).collection('data').doc(this.currentExpenseIndex.toString()));
      }
    },
    data() {
      return {
        currentExpenseIndex: 0,
        selectedMonth: '',
        expenses: [],
        months: [],
        firebaseExpenses: [],
        selectedExpense: {},
        selectedMonthSize: 0
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
