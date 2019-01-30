<template>
    <div></div>
</template>

<script>

  import {db} from '../main'

  import * as d3 from 'd3';
  import pieChart from '../charts/PieChart';
  import RestResource from '../services/DataProcessor';

  const restResourceService = new RestResource();
  ;
  let dynamicPieChart;
  export default {
    name: 'PieChart',
    props: {data: Array},
    watch: {
      data: function (newVal, oldVal) {
        if (newVal.length > 0) {
          this.expensesGroups = restResourceService.processPieChartData(newVal, 'ExpenseType');
          dynamicPieChart
              .groupByOptionLabel('Expense Type')
              .data(this.expensesGroups);
          if (d3.select(this.$el).selectAll('svg').size() === 0) {
            d3.select(this.$el).call(dynamicPieChart);
          }
        }
      }
    },
    methods: {},
    data() {
      return {
        expensesGroups: []
      }
    },
    created() {
      dynamicPieChart = pieChart.pieChart()
          .width(1200)
          .height(600)
          .placeHolderTooltip('');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
