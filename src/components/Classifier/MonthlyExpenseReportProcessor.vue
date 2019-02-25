<template>
    <div>
        <button type="button" class="btn btn-secondary float-right ml-2" v-on:click="classify()"
                :disabled="!selectedMonth">Classify
        </button>
    </div>
</template>

<script>
  import {db} from '../../main'
  import UploadFileProcessor from '../../services/UploadFileProcessor';
  import ExpenseItem from '../../enums/ExpenseItem'

  const uploadFileProcessor = new UploadFileProcessor();

  export default {
    name: 'MonthlyExpenseReportProcessor',
    props: {selectedMonth: String},
    methods: {
      classify: function () {
        let expenseTypesMap = {};
        let that = this;
        db.collection('expenses').doc(this.selectedMonth).collection('data').get().then(function (querySnapshot) {
          querySnapshot.docs.forEach(d => {
            let data = d.data();
            expenseTypesMap[data[ExpenseItem.EXPENSE_TYPE]]
                ? expenseTypesMap[data[ExpenseItem.EXPENSE_TYPE]] += data[ExpenseItem.PURCHASE_AMOUNT]
                : expenseTypesMap[data[ExpenseItem.EXPENSE_TYPE]] = data[ExpenseItem.PURCHASE_AMOUNT]

          });
          db.collection('expenses').doc(that.selectedMonth).set({expenseTypes: expenseTypesMap}, {merge: true});
        });
      }
    },
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
