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
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(presetExpense,index) in presetExpenses" :key="presetExpense.id">
                        <th scope="row">{{index+1}}</th>
                        <td>{{presetExpense[ExpenseItem.EXPENSE_NAME]}}</td>
                        <td>{{presetExpense[ExpenseItem.PURCHASE_AMOUNT]}} EUR</td>
                        <td>{{presetExpense[ExpenseItem.EXPENSE_TYPE]}}</td>
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

</style>
