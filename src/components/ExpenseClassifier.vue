<template>
    <div>
        <div class="row">
            <div class="col-sm-6">
                <ExpenseReportSelector  v-on:select-month="selectMonth" :months="months"/>
            </div>
            <div class="col-sm-6">
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
                this.expenses = JSON.parse(localStorage.getItem('spendings'))[event.target.value];
                this.currentExpenseIndex = 0;
            }
        },
        data() {
            return {
                currentExpenseIndex: 0,
                expenses: [],
                months: []
            }
        },
        created: function () {
            this.months = Object.keys(JSON.parse(localStorage.getItem('spendings')))
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
