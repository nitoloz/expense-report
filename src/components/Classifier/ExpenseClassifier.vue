<template>
    <div class="container">
        <div class="row">
            <h4 class="col-sm-9">
                <span v-if="selectedMonth">({{currentExpenseIndex+1}}/{{selectedMonthSize}})</span>
            </h4>
            <div class="col-sm-3">
                <MonthlyExpenseReportProcessor/>
                <ExpenseReportUpload/>
            </div>
        </div>
        <ExpenseItem v-if="selectedMonth && selectedExpense"
                     :item="selectedExpense"
                     v-on:click-left="viewPrevious"
                     v-on:click-right="viewNext"/>
        <ExpenseTypesList v-if="selectedMonth" :selectedType="selectedExpense.ExpenseType"
                          v-on:select-type="onSelectType"/>
        <h3 v-else> Please select expenses month to start classification or upload new file!</h3>
    </div>
</template>

<script>
  import ExpenseItem from './ExpenseItem.vue'
  import ExpenseTypesList from './ExpenseTypesList.vue'
  import ExpenseReportUpload from './ExpenseReportUpload.vue'
  import MonthlyExpenseReportProcessor from './MonthlyExpenseReportProcessor.vue'
  import {db} from '../../main'

  export default {
    name: 'ExpenseClassifier',
    props: {selectedMonth: String},
    components: {
      ExpenseItem,
      ExpenseTypesList,
      ExpenseReportUpload,
      MonthlyExpenseReportProcessor
    },
    watch: {
      selectedMonth: function () {
        this.monthSelected();
      }
    },
    methods: {
      onSelectType: function (type) {
        db.collection('expenses').doc(this.selectedMonth).collection('data')
            .doc(this.currentExpenseIndex.toString()).update({ExpenseType: type});
        this.viewNext();
      },
      viewPrevious: function () {
        this.currentExpenseIndex = this.currentExpenseIndex > 0 ? this.currentExpenseIndex - 1 : this.selectedMonthSize - 1;
        this.$bind('selectedExpense', db.collection('expenses').doc(this.selectedMonth).collection('data').doc(this.currentExpenseIndex.toString()));
      },
      viewNext: function () {
        this.currentExpenseIndex = this.currentExpenseIndex < this.selectedMonthSize - 1 ? this.currentExpenseIndex + 1 : 0;
        this.$bind('selectedExpense', db.collection('expenses').doc(this.selectedMonth).collection('data').doc(this.currentExpenseIndex.toString()));
      },
      monthSelected: function () {
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
        selectedExpense: {},
        selectedMonthSize: 0
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

</style>
