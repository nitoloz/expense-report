<template>
    <div class="container">
        <form>
            <div class="form-row text-left">
                <div class="form-group col-sm-5">
                    <label for="inputName">Name</label>
                    <input class="form-control" v-model="newExpense[ExpenseItem.EXPENSE_NAME]" id="inputName"
                           placeholder="Expense name">
                </div>
                <div class="form-group col-sm-2">
                    <label for="inputBetrag">Betrag</label>
                    <input type="number" v-model="newExpense[ExpenseItem.PURCHASE_AMOUNT]" class="form-control"
                           id="inputBetrag" placeholder="Betrag in EUR">
                </div>
                <div class="form-group col-sm-3">
                    <label for="inputBetrag">Type</label>
                    <select class="form-control" v-model="newExpense[ExpenseItem.EXPENSE_TYPE]">
                        <option selected disabled value="">Select type</option>
                        <option v-for="type in expenseTypesArray" :key="type" v-bind:value="type">{{type}}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <button type="submit" class="btn btn-primary mt-32" @click="addExpense">Add expense</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    import {db} from '../../main'
    import ExpenseItem from '../../enums/ExpenseItem';
    import {expenseTypesArray} from '../../enums/ExpenseTypes';

    export default {
        name: 'CreatePreset',
        props: {},
        components: {},
        methods: {
            addExpense: function () {
                db.collection('presetExpenses').add(this.newExpense);
            }
        },
        data() {
            return {
                ExpenseItem: ExpenseItem,
                expenseTypesArray: expenseTypesArray,
                newExpense: {[ExpenseItem.EXPENSE_TYPE]: ''}
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mt-32 {
        margin-top: 32px
    }
</style>
