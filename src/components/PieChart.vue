<template>
    <div></div>
</template>

<script>
  import * as d3 from 'd3';
  import pieChart from '../charts/PieChart';
  import ChartDataProcessor from '../services/ChartDataProcessor';

  const chartDataProcessor = new ChartDataProcessor();

  let dynamicPieChart;
  export default {
    name: 'PieChart',
    props: {data: Array, month: String},
    watch: {
      data: function (newVal, oldVal) {
        if (newVal.length > 0) {
          this.expensesGroups = chartDataProcessor.processPieChartData(newVal, 'ExpenseType');
          const placeHolderTooltip = `<tspan x="0">Month ${this.month}</tspan>
                                <tspan x="0" dy="1.2em">Total spendings: <tspan font-weight="bold">${-1*d3.sum(newVal.map(d => d['Betrag in EUR']))} EUR</tspan></tspan>`;
          dynamicPieChart
              .groupByOptionLabel('Expense Type')
              .placeHolderTooltip(placeHolderTooltip)
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
          .width(900)
          .height(600)
          .valueLabel('Betrag in EUR');

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
