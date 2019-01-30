<template>
    <div>

        <form class="form-group float-center">
            <div class="form-group row">
                <label class="col-sm-8 col-lg-4 col-form-label text-right">Select month: </label>
                <select class="col-sm-4 form-control"  v-on:change="$emit('select-month', $event)">
                    <option selected disabled>Select month</option>
                    <option v-for="month in months" :key="month.id"  v-bind:value="month.id">{{month.id}}</option>
                </select>
            </div>
        </form>

    </div>
</template>

<script>

    export default {
        name: 'ExpenseReportSelector',
        props: {
            months: Array
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input {
        display: none;
    }
    select{
        max-width: 140px;
    }
</style>
