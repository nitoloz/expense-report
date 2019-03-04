import * as d3 from 'd3';

function stackedLegend() {
    let colorScale = d3.scaleOrdinal(d3.schemeSet3);
    let data = [];
    let updateLegendData = null;
    let columns = 1;

    function chart(selection) {
        selection.each(function () {

            const legend = d3.select(this)
                .selectAll("legend")
                .data(data)
                .enter().append('g')
                .attr("class", "legend")
                .attr("transform", (d, i) => `translate(${(i % columns) * 100},${Math.trunc(i / columns) * 20})`);

            legend.call(appendLegendItem);

            updateLegendData = () => {

                const updatedLegend = selection
                    .selectAll(".legend")
                    .data(data);

                updatedLegend
                    .enter()
                    .append('g')
                    .attr("class", "legend")
                    .attr("transform", (d, i) => `translate(0,${i * 20})`)
                    .call(appendLegendItem);

                updatedLegend
                    .select('rect')
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(750)
                    .style("fill", d => colorScale(d));

                updatedLegend
                    .select('text')
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(750)
                    .text(d => d);

                updatedLegend.exit()
                    .remove();
            };

            function appendLegendItem(selection) {
                selection.append('rect')
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", d => colorScale(d));

                selection.append('text')
                    .attr("x", 20)
                    .attr("y", 10)
                    .text(d => d)
                    .attr("class", "textselected")
                    .style("text-anchor", "start")
                    .style("font-size", 15);

            }
        })
    }

    chart.colorScale = function (value) {
        if (!arguments.length) return colorScale;
        colorScale = value;
        return chart;
    };

    chart.columns = function (value) {
        if (!arguments.length) return columns;
        columns = value;
        return chart;
    };

    chart.data = function (value) {
        if (!arguments.length) return data;
        data = value;
        if (typeof updateLegendData === 'function') updateLegendData();
        return chart;
    };

    return chart;
}

export default {stackedLegend}
