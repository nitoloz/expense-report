<template>
    <div></div>
</template>

<script>
  import * as d3 from 'd3';
  import pieChart from '../../charts/PieChart';
  import ChartDataProcessor from '../../services/ChartDataProcessor';
  import ExpenseItem from "../../enums/ExpenseItem";

  const chartDataProcessor = new ChartDataProcessor();

  let barChart;
  export default {
    name: 'BarChart',
    props: {data: Array},
    watch: {
      data: function (newValue) {
        if (newValue.length > 0) {
          // this.expensesGroups = chartDataProcessor.processPieChartData(newValue, ExpenseItem.EXPENSE_TYPE);
          // const placeHolderTooltip = `<tspan x="0">${this.month}</tspan>
          //                       <tspan x="0" dy="1.2em">Total spendings: <tspan font-weight="bold">${-1 * d3.sum(newValue.map(d => d[ExpenseItem.PURCHASE_AMOUNT]))} EUR</tspan></tspan>`;
          // dynamicPieChart
          //     .groupByOptionLabel('Expense Type')
          //     .placeHolderTooltip(placeHolderTooltip)
          //     .clickCallback(this.pieChartSectorClick)
          //     .data(this.expensesGroups);
          // if (d3.select(this.$el).selectAll('svg').size() === 0) {
          //   d3.select(this.$el).call(dynamicPieChart);
          // }
        }
      }
    },
    data() {
      return {
        expensesGroups: []
      }
    },
    created() {
      // dynamicPieChart = pieChart.pieChart()
      //     .width(880)
      //     .height(600)
      //     .valueLabel(ExpenseItem.PURCHASE_AMOUNT);

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
