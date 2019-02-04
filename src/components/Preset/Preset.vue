<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <PresetList :presetExpenses="presetExpenses"/>
            </div>
        </div>
    </div>
</template>

<script>

    import {db} from '../../main'
    import ExpenseItem from '../../enums/ExpenseItem';
    import PresetList from './PresetList';

    export default {
        name: 'Preset',
        props: {selectedMonth: String},
        components: {PresetList},
        // watch: {
        //     selectedMonth: function () {
        //         this.monthSelected();
        //     }
        // },
        methods: {
            // monthSelected: function () {
            //     this.$bind('expenses', db.collection('expenses').doc(this.selectedMonth).collection('data'));
            // }
        },
        data() {
            return {
                presetExpenses: [],
                ExpenseItem: ExpenseItem
            }
        },
        mounted() {
            // if (this.selectedMonth) {
            //     this.monthSelected();
            // }
        },
        firestore() {
            return {
                presetExpenses: db.collection('presetExpenses').orderBy(ExpenseItem.PURCHASE_AMOUNT, "asc")
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
