<template>
    <table v-if="expensesSection.length > 0" class="table table-sm">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">{{ExpenseItem.EXPENSE_NAME}}</th>
            <th scope="col">{{ExpenseItem.PURCHASE_AMOUNT_SHORT}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(expense,index) in expensesSection" class="text-left">
            <th scope="row">{{index+1}}</th>
            <td>{{expense[ExpenseItem.EXPENSE_NAME]}}</td>
            <td>{{expense[ExpenseItem.PURCHASE_AMOUNT]}} EUR</td>
        </tr>
        </tbody>
    </table>
</template>

<script>

  import ExpenseItem from '../enums/ExpenseItem';

  export default {
    name: 'ExpenseList',
    props: {expensesSection: Array},
    data() {
      return {
        ExpenseItem: ExpenseItem
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
