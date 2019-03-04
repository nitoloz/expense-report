import * as d3 from 'd3';
import d3Tip from 'd3-tip'
import {expenseTypesArray} from '../enums/ExpenseTypes';
import {expensesColorScale, margin, ChartUtils} from "./Utils";
import stackedLegend from './StackedLegend';

function stackedBarChart() {

    let initialConfiguration = {
        width: 1000,
        height: 600,
        data: [],
        xAxisLabel: 'Month',
        yAxisLabel: 'Expenses (EUR)',
        colorScale: expensesColorScale,
        tooltipFormatter: (data) => {
            return `${xAxisLabel}: ${data.data.key}<br>
            Expense type: ${data.type}<br>
            ${yAxisLabel}: ${data[1] - data[0]}`;
        }
    };

    let width = initialConfiguration.width,
        height = initialConfiguration.height,
        data = initialConfiguration.data,
        xAxisLabel = initialConfiguration.xAxisLabel,
        yAxisLabel = initialConfiguration.yAxisLabel,
        colorScale = initialConfiguration.colorScale,
        tooltipFormatter = initialConfiguration.tooltipFormatter;

    function chart(selection) {
        selection.each(function () {
            const barChartSvg = selection.append('svg')
                .attr('height', height)
                .attr('width', width);

            const xDomainValues = data.map(group => group.key);
            const yDomainValues = data.map(group => group.total);

            const groupsScale = d3.scaleBand()
                .rangeRound([margin.left, width - margin.right])
                .paddingInner(0.1)
                .paddingOuter(0.1)
                .domain(xDomainValues);

            // const innerGroupScale = d3.scaleBand()
            //     .padding(0.05)
            //     .domain(data.map(group => group.key))
            //     .rangeRound([0, groupsScale.bandwidth()]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(yDomainValues)])
                .range([height - margin.top, margin.bottom]);

            const xAxis = d3.axisBottom(groupsScale)
            // .tickFormat(d => `${d}`)
                .tickSizeOuter(0);

            const gXAxis = barChartSvg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0,${(height - margin.top)})`)
                .call(xAxis);

            const yAxis = d3.axisLeft(yScale)
                .tickFormat(d => `${d} EUR`)
                .ticks(10)
                .tickSize(-width + margin.left + margin.right)
                .tickSizeOuter(0);

            const gYAxis = barChartSvg.append("g")
                .attr("class", "y axis")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis);

            ChartUtils.appendXAxisTitle(gXAxis, width - margin.right, -25, xAxisLabel);
            ChartUtils.appendYAxisTitle(gYAxis, -50, 5, yAxisLabel);
            ChartUtils.appendTitle(barChartSvg, width / 2, margin.top / 2, `${yAxisLabel} vs ${xAxisLabel}`);

            const tooltip = d3Tip()
                .attr("class", "d3-tip")
                .offset([-8, 0])
                .html(tooltipFormatter);

            barChartSvg.call(tooltip);
            let stackedData = d3.stack()
                .keys(expenseTypesArray)
                .order(d3.stackOrderDescending)(data);

            barChartSvg.append("g")
                .selectAll("g")
                .data(stackedData)
                .enter().append("g")
                .attr("fill", function (d) {
                    return colorScale(d.key);
                })
                .selectAll("rect")
                .data(d => {
                    d.forEach(rect => rect.type = d.key);
                    return d;
                })
                .enter().append("rect")
                .attr("x", d => groupsScale(d.data.key))
                .attr("y", d => yScale(d[1]))
                .attr("width", groupsScale.bandwidth())
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr('opacity', 0.8)

                // .attr("height", d => height - yScale(d.value) - margin.bottom)
                // .attr("fill", d => colorScale(d.groupKey))
                .on("mouseover", function(d) {
                    d3.select(this)
                        .transition()
                        .duration(100)
                    .attr('opacity', 1);
                    tooltip.show(d, this);

                })
                .on("mouseout", function() {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('opacity', 0.8);
                    tooltip.hide(this);
                });

            const barChartLegend = stackedLegend.stackedLegend()
                .colorScale(colorScale)
                // .columns(2)
                .data(colorScale.domain());

            barChartSvg.append("g")
                .attr("transform", `translate(${width - 150}, 5)`)
                .call(barChartLegend);
        })
    }

    chart.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.xAxisLabel = function (value) {
        if (!arguments.length) return xAxisLabel;
        xAxisLabel = value;
        return chart;
    };

    chart.yAxisLabel = function (value) {
        if (!arguments.length) return yAxisLabel;
        yAxisLabel = value;
        return chart;
    };

    chart.colorScale = function (value) {
        if (!arguments.length) return colorScale;
        colorScale = value;
        return chart;
    };

    chart.tooltipFormatter = function (value) {
        if (!arguments.length) {
            return tooltipFormatter
        }
        else {
            if (value == null) {
                tooltipFormatter = initialConfiguration.tooltipFormatter;
            } else {
                tooltipFormatter = value;
            }
            return chart;
        }
    };

    chart.data = function (value) {
        if (!arguments.length) return data;
        data = value;
        return chart;
    };

    return chart;
}

export default {stackedBarChart}

