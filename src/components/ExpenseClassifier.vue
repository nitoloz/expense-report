<template>
    <div>
        <ExpenseReportUpload/>
        <ExpenseItem :item="expenses[currentExpenseIndex]['Umsatz/Ort']"/>
        <ExpenseTypesList v-on:select-type="onSelectType"/>
    </div>
</template>

<script>
    import ExpenseItem from './ExpenseItem.vue'
    import ExpenseTypesList from './ExpenseTypesList.vue'
    import ExpenseReportUpload from './ExpenseReportUpload.vue'

    export default {
        name: 'ExpenseClassifier',
        components: {
            ExpenseItem,
            ExpenseTypesList,
            ExpenseReportUpload
        },
        methods: {
            onSelectType: function (type) {
                this.expenses[this.currentExpenseIndex]['ExpenseType'] = type;
                this.currentExpenseIndex++;
            }
        },
        data() {
            return {
                currentExpenseIndex: 0,
                expenses: ['Rewe']
            }
        },
        created: function () {
            // `this` указывает на экземпляр vm
            this.expenses = JSON.parse(localStorage.getItem('spendings'))['2019-01-09'];
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
