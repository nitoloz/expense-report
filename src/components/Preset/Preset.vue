<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3>Preset</h3>
            </div>
        </div>
    </div>
</template>

<script>

    import {db} from '../../main'
    import ExpenseItem from '../../enums/ExpenseItem';

    export default {
        name: 'Preset',
        props: {selectedMonth: String},
        components: {},
        watch: {
            selectedMonth: function () {
                this.monthSelected();
            }
        },
        methods: {
            monthSelected: function () {
                // this.$bind('expenses', db.collection('expenses').doc(this.selectedMonth).collection('data'));
            }
        },
        data() {
            return {
                expenses: [],
                ExpenseItem: ExpenseItem
            }
        },
        mounted() {
            if (this.selectedMonth) {
                this.monthSelected();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
