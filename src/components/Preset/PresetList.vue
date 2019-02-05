<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <table v-if="presetExpenses.length > 0" class="table table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{{ExpenseItem.EXPENSE_NAME}}</th>
                        <th scope="col">{{ExpenseItem.PURCHASE_AMOUNT_SHORT}}</th>
                        <th scope="col">{{ExpenseItem.EXPENSE_TYPE_LABEL}}</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(presetExpense,index) in presetExpenses" :key="presetExpense.id">
                        <th scope="row">{{index+1}}</th>
                        <td>{{presetExpense[ExpenseItem.EXPENSE_NAME]}}</td>
                        <td>{{presetExpense[ExpenseItem.PURCHASE_AMOUNT]}} EUR</td>
                        <td>{{presetExpense[ExpenseItem.EXPENSE_TYPE]}}</td>
                        <td class="cursor-pointer">
                            <i class="fas fa-edit" @click="editExpense(presetExpense.id)"></i>
                            <i class="fas fa-trash-alt ml-2" @click="removeExpense(presetExpense.id)"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

  import {db} from '../../main'
  import ExpenseItem from '../../enums/ExpenseItem';

  export default {
    name: 'PresetList',
    props: {presetExpenses: Array},
    components: {},
    methods: {
      removeExpense: function (id) {
        db.collection('presetExpenses').doc(id).delete();
      },
      editExpense: function (id) {
        console.log(`Editing ${id}`);
      }
    },
    data() {
      return {
        expenses: [],
        ExpenseItem: ExpenseItem
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .cursor-pointer i {
        cursor: pointer;
    }
</style>
