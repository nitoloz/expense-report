import * as d3 from 'd3';

function pieChart() {

  const initialConfiguration = {
    width: 1000,
    height: 600,
    data: [],
    groupByOptionLabel: 'City',
    valueLabel: 'Respondents',
    colorScale: d3.scaleOrdinal()
        .domain(['Lebensmittel', 'Restaurants', 'Transport', 'Reisen', 'Haus', 'Unterhaltung', 'Shopping', 'Lehre', 'Medizin', 'Haushaltswaren', 'Sonstig', 'Other'])
        .range(["#8dd3c7", "#ffffb3", "#bebada", "#d9d9d9", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#fb8072", "#bc80bd", "#ccebc5", "#ffed6f"]),
    tooltipFormatter: (data) => {
      return `<tspan x="0">${groupByOptionLabel}: ${data.data.key}</tspan>
                    <tspan x="0" dy="1.2em">${valueLabel}: ${data.data.value.value} EUR (${data.data.value.percentageValue}%)</tspan>`;
    },
    placeHolderTooltip: null,
    clickCallback: null
  };

  let width = initialConfiguration.width,
      height = initialConfiguration.height,
      data = initialConfiguration.data,
      groupByOptionLabel = initialConfiguration.groupByOptionLabel,
      valueLabel = initialConfiguration.valueLabel,
      colorScale = initialConfiguration.colorScale,
      placeHolderTooltip = initialConfiguration.placeHolderTooltip,
      clickCallback = initialConfiguration.clickCallback,
      tooltipFormatter = initialConfiguration.tooltipFormatter;
  let updateData = null;
  let previousLabelY;

  function chart(selection) {
    selection.each(function () {
      const svg = selection
          .append('svg')
          .attr('height', height)
          .attr('width', width);

      const pieChartSvg = svg
          .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const radius = Math.min(width, height) / 2;

      const arc = d3.arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius * 0.75)
          .cornerRadius(8);

      const outerArc = d3.arc()
          .outerRadius(radius * 0.75)
          .innerRadius(radius * 0.85);

      const pie = d3.pie()
          .value(d => d.value.value)
          .sort(null);

      const path = pieChartSvg
          .selectAll('path')
          .data(pie(data))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', (d) => colorScale(d.data.key))
          .style('stroke', 'white');

      path.call(appendTooltip);
      path.call(appendClickCallback);

      if (placeHolderTooltip) {
        showTooltip(placeHolderTooltip, 'white');
      }

      pieChartSvg
          .selectAll('.label')
          .data(pie(data))
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('dy', '.35em')
          .html(function (d) {
            return `<tspan text-decoration="underline">${d.data.key}</tspan>: <tspan>${d.data.value.value} EUR</tspan>`;
          })
          .attr('transform', function (d) {
            let pos = outerArc.centroid(d);
            pos[0] = radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1);
            pos[1] = previousLabelY && (Math.abs(previousLabelY - pos[1]) < 20) ? previousLabelY - 20 : pos[1];
            previousLabelY = pos[1];
            return 'translate(' + pos + ')';
          })
          .style('text-anchor', function (d) {
            return (midAngle(d)) < Math.PI ? 'start' : 'end';
          });

      pieChartSvg.datum(data)
          .selectAll('polyline')
          .data(pie)
          .enter()
          .append('polyline')
          .attr('fill', 'none')
          .attr('stroke-width', 1)
          .attr('stroke', 'black')
          .attr('points', function (d) {
            let pos = outerArc.centroid(d);
            pos[0] = radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1);
            pos[1] = previousLabelY && (Math.abs(previousLabelY - pos[1]) < 20) ? previousLabelY - 20 : pos[1];
            previousLabelY = pos[1];
            return [arc.centroid(d), [outerArc.centroid(d)[0], pos[1]], pos]
          });

      updateData = function () {
        const updatedData = pie(data);
        const updatedPath = pieChartSvg.selectAll('path').data(updatedData);
        const updatedLabel = pieChartSvg.selectAll('.label').data(updatedData);
        const updatedPolylines = pieChartSvg.selectAll('polyline').data(updatedData);

        const enterPath = updatedPath.enter()
            .append('path')
            .attr('fill', (d) => colorScale(d.data.key))
            .attr('d', arc);
        
        enterPath.call(appendTooltip);
        enterPath.call(appendClickCallback);

        updatedPath
            .transition()
            .ease(d3.easeLinear)
            .duration(750)
            .attr('fill', (d) => colorScale(d.data.key))
            .attrTween('d', enterArcTween);

        updatedPath.exit()
            .transition()
            .ease(d3.easeLinear)
            .duration(100)
            .attrTween("d", exitArcTween)
            .remove();


        updatedLabel.enter()
            .append('text')
            .attr('class', 'label')
            .attr('dy', '.35em')
            .html(function (d) {
              return `${d.data.key}: <tspan>${d.data.value.value}</tspan>`;
            })
            .style('text-anchor', function (d) {
              return (midAngle(d)) < Math.PI ? 'start' : 'end';
            });

        updatedLabel
            .transition()
            .ease(d3.easeLinear)
            .duration(750)
            .style('text-anchor', function (d) {
              return (midAngle(d)) < Math.PI ? 'start' : 'end';
            })
            .style('opacity', 0)
            .on("end", function () {
              d3.select(this)
                  .html(function (d) {
                    return `${d.data.key}: <tspan>${d.data.value.value}</tspan>`;
                  })
                  .style('opacity', 1);
            });

        updatedLabel.exit()
            .transition()
            .ease(d3.easeLinear)
            .duration(100)
            .remove();

        updatedPolylines.enter()
            .append('polyline')
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('stroke', 'black');

        updatedPolylines.exit()
            .transition()
            .ease(d3.easeLinear)
            .duration(100)
            .remove();

        previousLabelY = null;
        pieChartSvg.selectAll('.label').attr('transform', function (d) {
          let pos = outerArc.centroid(d);
          pos[0] = radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1);
          pos[1] = previousLabelY && (Math.abs(previousLabelY - pos[1]) < 20) ? previousLabelY - 20 : pos[1];
          previousLabelY = pos[1];
          return 'translate(' + pos + ')';
        });

        previousLabelY = null;
        pieChartSvg.selectAll('polyline').attr('points', function (d) {
          let pos = outerArc.centroid(d);
          pos[0] = radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1);
          pos[1] = previousLabelY && (Math.abs(previousLabelY - pos[1]) < 20) ? previousLabelY - 20 : pos[1];
          previousLabelY = pos[1];
          return [arc.centroid(d), [outerArc.centroid(d)[0], pos[1]], pos]
        });
        d3.selectAll('.tooltipCircle').remove();
        showTooltip(placeHolderTooltip, 'white')
      };

      function enterArcTween(d) {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d)
        }
      }

      function exitArcTween(d) {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
          d.startAngle = i(t);
          return arc(d)
        }
      }

      function appendTooltip(selection) {
        selection
            .on("mouseover", (d) => {
              d3.selectAll('.tooltipCircle').remove();
              showTooltip(tooltipFormatter(d), colorScale(d.data.key));
            })
            .on("mouseout", () => {
              d3.selectAll('.tooltipCircle').remove();
              if (placeHolderTooltip) {
                showTooltip(placeHolderTooltip, 'white')
              }
            });
      }

      function appendClickCallback(selection) {
        selection
            .on("click", (d) => {
              clickCallback(d.data);
            });
      }

      function showTooltip(tooltipContent, color) {
        pieChartSvg.append('text')
            .attr('class', 'tooltipCircle')
            .attr('dy', -15)
            .html(() => tooltipContent)
            .style('font-size', '1.1em')
            .style('text-anchor', 'middle');

        pieChartSvg.append('circle')
            .attr('class', 'tooltipCircle')
            .attr('r', radius * 0.45)
            .style('fill', color)
            .style('fill-opacity', 0.35);
      }

      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

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

  chart.groupByOptionLabel = function (value) {
    if (!arguments.length) return groupByOptionLabel;
    groupByOptionLabel = value;
    return chart;
  };

  chart.valueLabel = function (value) {
    if (!arguments.length) return valueLabel;
    valueLabel = value;
    return chart;
  };

  chart.colorScale = function (value) {
    if (!arguments.length) return colorScale;
    colorScale = value;
    return chart;
  };

  chart.clickCallback = function (value) {
    if (!arguments.length) return clickCallback;
    clickCallback = value;
    return chart;
  };

  chart.placeHolderTooltip = function (value) {
    if (!arguments.length) return placeHolderTooltip;
    placeHolderTooltip = value;
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
    //TODO fix domain reinitialization after 1st data replacement
    if (chart.colorScale().domain().length === 0) {
      chart.colorScale().domain(data.map(d => d.key));
    }
    if (typeof updateData === 'function') updateData();
    return chart;
  };

  return chart;
}

export default {pieChart}

