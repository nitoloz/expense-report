<template>
    <div>
        <h3> Charts</h3>
        <article v-for="expense in expensesGroups">
            <h1> {{expense.key}}:{{ expense.value }}</h1>
        </article>
    </div>
</template>

<script>

  import {db} from '../main'

  import * as d3 from 'd3';

  export default {
    name: 'PieChart',
    props: {data: Array},
    watch: {
      data: function (newVal, oldVal) { // watch it
        this.expensesGroups = d3.nest()
            .key(function (d) {
              return d.ExpenseType;
            })
            .rollup(function (expenses) {
              return d3.sum(expenses.map(d => d['Betrag in EUR']));
            })
            .entries(newVal)
            .sort((a, b) => a.value - b.value);
      }
    },
    methods: {},
    data() {
      return {
        expensesGroups: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
