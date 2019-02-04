<template>
    <div>
        <select class="form-control" v-on:change="$emit('select-month', $event)">
            <option selected disabled>Select month</option>
            <option v-for="month in months" :key="month.id" v-bind:value="month.id">{{month.id}}</option>
        </select>

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

</style>
