<template>
    <div>
        <ExpenseReportUpload/>
        <ExpenseItem item="REWE Frankfurt/Mai / Frankfurt"/>
        <ExpenseTypesList/>
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
