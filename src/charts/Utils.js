import * as d3 from "d3";

const expensesColorScale = d3.scaleOrdinal()
    .domain(['Lebensmittel', 'Restaurants', 'Transport', 'Reisen', 'Haus', 'Unterhaltung', 'Shopping', 'Lehre', 'Medizin', 'Haushaltswaren', 'Sonstig', 'Other'])
    .range(["#8dd3c7", "#ffffb3", "#bebada", "#d9d9d9", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#fb8072", "#bc80bd", "#ccebc5", "#ffed6f"]);

const margin = {top: 50, right: 50, bottom: 50, left: 100};

class ChartUtils {

    static appendXAxisTitle(selection, x, y, text) {
        selection.append('text')
            .attr('class', 'label x axis')
            .attr('y', y)
            .attr('x', x)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .style('font-size', '12')
            .style('fill', 'black')
            .text(text);
    }

    static appendYAxisTitle(selection, x, y, text) {
        selection.append('text')
            .attr('class', 'label y axis')
            .attr('transform', 'rotate(-90)')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', '.71em')
            .style('font-size', '12')
            .style('fill', 'black')
            .style('text-anchor', 'end')
            .text(text);
    }

    static appendTitle(selection, x, y, text) {
        selection.append("text")
            .attr('class', 'title')
            .attr("x", x)
            .attr("y", y)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(text);
    }
}

export {expensesColorScale, margin, ChartUtils};
