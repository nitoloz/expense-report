<template>
    <div></div>
</template>

<script>
  import * as d3 from 'd3';
  import stackedBarChart from '../../charts/StackedBarChart';
  // import ChartDataProcessor from '../../services/ChartDataProcessor';
  import ExpenseItem from "../../enums/ExpenseItem";

  // const chartDataProcessor = new ChartDataProcessor();

  let barChart;
  export default {
    name: 'BarChart',
    props: {data: Array},
    watch: {
      data: function (newValue) {
        if (newValue.length > 0) {
          // this.expensesGroups = chartDataProcessor.processPieChartData(newValue, ExpenseItem.EXPENSE_TYPE);
                barChart
                    .data([]);
              // .data(this.expensesGroups);
          if (d3.select(this.$el).selectAll('svg').size() === 0) {
            d3.select(this.$el).call(barChart);
          }
        }
      }
    },
    data() {
      return {
        expensesGroups: []
      }
    },
    created() {
        barChart = stackedBarChart.stackedBarChart()
          .width(1500)
          .height(600);

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    >>> path:hover,
    >>> circle:hover {
        cursor: pointer;
    }

</style>
