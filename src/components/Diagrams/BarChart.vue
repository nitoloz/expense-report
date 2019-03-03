<template>
    <div></div>
</template>

<script>
    import * as d3 from 'd3';
    import stackedBarChart from '../../charts/StackedBarChart';
    import ChartDataProcessor from '../../services/ChartDataProcessor';

    const chartDataProcessor = new ChartDataProcessor();

    let barChart;
    export default {
        name: 'BarChart',
        props: {data: Array},
        watch: {
            data: function (newValue) {
                if (newValue.length > 0) {
                    this.expensesGroups = chartDataProcessor.processStackedBarChartData(newValue);
                    barChart
                    // .data([]);
                        .data(this.expensesGroups);
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

<style>


    .d3-tip {
        line-height: 1;
        padding: 6px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
    }

    /* Creates a small triangle extender for the tooltip */
    .d3-tip:after {
        box-sizing: border-box;
        display: inline;
        font-size: 10px;
        width: 100%;
        line-height: 1;
        color: rgba(0, 0, 0, 0.8);
        content: "\25BC";
        position: absolute;
        text-align: center;
    }

    /* Style northward tooltips specifically */
    .d3-tip.n:after {
        margin: -2px 0 0 0;
        top: 100%;
        left: 0;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    >>> path:hover,
    >>> rect:hover,
    >>> circle:hover {
        cursor: pointer;
    }
    >>>.tick line{
        opacity: 0.5;
    }

</style>
